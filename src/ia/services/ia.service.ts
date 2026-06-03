import { Injectable, Logger } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GroqService } from './groq.service';
import { RH_ASSISTANT_PROMPT, SST_COMPLIANCE_PROMPT } from '../prompts/rh-assistant.prompt';
import { TREINAMENTO_SUGESTAO_PROMPT } from '../prompts/treinamento-sugestao.prompt';

export interface MensagemChat {
  role:    'user' | 'assistant';
  content: string;
}

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);

  constructor(
    private readonly gemini: GeminiService,
    private readonly groq:   GroqService,
  ) {}

  async chat(mensagem: string, historico: MensagemChat[] = [], contexto?: string): Promise<string> {
    const prompt = `${RH_ASSISTANT_PROMPT.replace('{{contexto}}', contexto ?? 'Não informado')}\n\nPergunta: ${mensagem}`;
    try {
      return await this.gemini.gerarResposta(prompt);
    } catch (err) {
      this.logger.warn('Gemini falhou, usando Groq como fallback');
      const msgs = [
        { role: 'system', content: RH_ASSISTANT_PROMPT },
        ...historico,
        { role: 'user', content: mensagem },
      ];
      return this.groq.gerarResposta(msgs);
    }
  }

  async analisarConformidadeSST(dadosEmpresa: any): Promise<string> {
    const prompt = SST_COMPLIANCE_PROMPT.replace(
      '{{dados}}',
      JSON.stringify(dadosEmpresa, null, 2),
    );
    return this.gemini.gerarResposta(prompt);
  }

  async sugerirTreinamentos(perfil: {
    cargo:        string;
    departamento: string;
    treinamentos: string[];
    nrs:          string[];
  }): Promise<any> {
    const prompt = TREINAMENTO_SUGESTAO_PROMPT
      .replace('{{cargo}}',         perfil.cargo)
      .replace('{{departamento}}',  perfil.departamento)
      .replace('{{treinamentos}}',  perfil.treinamentos.join(', ') || 'Nenhum')
      .replace('{{nrs}}',           perfil.nrs.join(', ') || 'Não especificadas');
    return this.gemini.gerarRespostaJson(prompt);
  }

  async resumirRelatorio(dados: any, tipoRelatorio: string): Promise<string> {
    const prompt = `
Você é assistente de RH do PeopleCore ERP. Resuma o seguinte relatório de ${tipoRelatorio} em linguagem clara para gestores, destacando os pontos mais importantes, tendências e recomendações de ação.

Dados: ${JSON.stringify(dados, null, 2)}

Responda em português brasileiro, de forma concisa e estruturada.
    `.trim();
    return this.gemini.gerarResposta(prompt);
  }
}
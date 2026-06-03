import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GroqService {
  private readonly logger  = new Logger(GroqService.name);
  private readonly apiKey  = process.env.GROQ_API_KEY ?? '';
  private readonly baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  async gerarResposta(mensagens: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model:       'llama-3.3-70b-versatile',
          messages:    mensagens,
          max_tokens:  1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`Groq API: ${response.status}`);
      const data: any = await response.json();
      return data?.choices?.[0]?.message?.content ?? 'Sem resposta.';
    } catch (error) {
      this.logger.error('Erro ao chamar Groq:', error);
      throw error;
    }
  }
}
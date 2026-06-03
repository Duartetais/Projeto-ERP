import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private readonly logger  = new Logger(GeminiService.name);
  private readonly apiKey  = process.env.GEMINI_API_KEY ?? '';
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  async gerarResposta(prompt: string, contexto?: string): Promise<string> {
    const promptFinal = contexto
      ? prompt.replace('{{contexto}}', contexto)
      : prompt;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptFinal }],
          }],
          generationConfig: {
            temperature:     0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        this.logger.error(`Gemini API error: ${err}`);
        throw new Error(`Gemini API: ${response.status}`);
      }

      const data: any = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sem resposta da IA.';
    } catch (error) {
      this.logger.error('Erro ao chamar Gemini:', error);
      throw error;
    }
  }

  async gerarRespostaJson(prompt: string): Promise<any> {
    const texto = await this.gerarResposta(prompt);
    try {
      const jsonMatch = texto.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: texto };
    } catch {
      return { raw: texto };
    }
  }
}
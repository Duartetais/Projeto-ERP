import { Injectable } from '@nestjs/common';

@Injectable()
export class XmlBuilderService {
  private objectToXml(obj: any, rootKey: string): string {
    const toXml = (value: any, key: string): string => {
      if (Array.isArray(value)) {
        return value.map(item => toXml(item, key)).join('');
      }
      if (typeof value === 'object' && value !== null) {
        const inner = Object.entries(value)
          .map(([k, v]) => toXml(v, k))
          .join('');
        return `<${key}>${inner}</${key}>`;
      }
      return `<${key}>${value}</${key}>`;
    };
    return toXml(obj, rootKey);
  }

  buildXml(evento: object, nomeEvento: string): string {
    const xmlBody = this.objectToXml(evento, nomeEvento);
    return `<?xml version="1.0" encoding="UTF-8"?><eSocial xmlns="http://www.esocial.gov.br/schema/evt/${nomeEvento}/v_S_01_03_00">${xmlBody}</eSocial>`;
  }

  buildEnvioLote(eventos: string[], grupoEvt: string): string {
    const lote = eventos.join('');
    return `<?xml version="1.0" encoding="UTF-8"?><eSocial><envioLoteEventos><eventos>${lote}</eventos></envioLoteEventos></eSocial>`;
  }
}
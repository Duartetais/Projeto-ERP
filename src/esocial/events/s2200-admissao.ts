export interface S2200Admissao {
  evtAdmissao: {
    ideEvento: {
      indRetif:    number;
      nrRec?:      string;
      tpAmb:       number;
      procEmi:     number;
      verProc:     string;
    };
    ideEmpregador: {
      tpInsc: number;
      nrInsc: string;
    };
    trabalhador: {
      cpfTrab:    string;
      nmTrab:     string;
      sexo:       string;
      racaCor:    number;
      estCiv?:    number;
      grauInstr:  number;
      endereco: {
        brasil: {
          tpLograd:  string;
          dsLograd:  string;
          nrLograd:  string;
          bairro:    string;
          cep:       string;
          codMunic:  number;
          uf:        string;
        };
      };
    };
    vinculo: {
      matTrab:    string;
      tpRegTrab:  number;
      tpRegPrev:  number;
      dtAdm:      string;
      tpAdmissao: number;
      indAdmissao: number;
      cargo:      string;
      cbo:        string;
      natAtividade: number;
      remuneracao: {
        vrSalFx:    number;
        undSalFixo: number;
      };
    };
  };
}

export function buildS2200(dados: Partial<S2200Admissao>): S2200Admissao {
  return {
    evtAdmissao: {
      ideEvento: {
        indRetif: 1,
        tpAmb:    2, // 1=produção, 2=homologação
        procEmi:  1,
        verProc:  '1.0',
        ...dados.evtAdmissao?.ideEvento,
      },
      ideEmpregador: dados.evtAdmissao?.ideEmpregador ?? { tpInsc: 1, nrInsc: '' },
      trabalhador:   dados.evtAdmissao?.trabalhador   ?? {} as any,
      vinculo:       dados.evtAdmissao?.vinculo        ?? {} as any,
    },
  };
}
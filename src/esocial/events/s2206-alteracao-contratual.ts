export interface S2206AlteracaoContratual {
  evtAltContratual: {
    ideEvento:     { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador: { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string };
    altContratual: {
      dtAlteracao: string;
      cargo?:      string;
      cbo?:        string;
      remuneracao?: { vrSalFx: number; undSalFixo: number };
    };
  };
}
export interface S2210Cat {
  evtCAT: {
    ideEvento:     { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador: { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string; nisTrab: string };
    cat: {
      dtAcid:      string;
      tpAcid:      number;
      hrAcid?:     string;
      hrsTrabAntesAcid?: number;
      tpCat:       number;
      indCatObito: number;
      indComunPolicia: number;
      codCNAE:     string;
      localAcidente: {
        tpLocal:   number;
        dscLocal?: string;
      };
      parteAtingida: {
        codParteAting: number;
        lateralidade:  number;
      };
      agenteCausador: {
        codAgntCausador: number;
      };
    };
  };
}
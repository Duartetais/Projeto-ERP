export interface S2240RiscosEpi {
  evtExpRisco: {
    ideEvento:      { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador:  { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string; nisTrab?: string };
    infoExpRisco: {
      dtIniCondicao: string;
      localAmb: Array<{
        tpInsc:     number;
        nrInsc:     string;
        descAtiv:   string;
        codSesTrab: number;
        fatorRisco: Array<{
          codRisco:   string;
          intensidade?: number;
          epc?: Array<{ utilizEPC: number; eficEpc: number }>;
          epi?: Array<{
            caEPI:       string;
            utilizEPI:   number;
            eficEpi:     number;
          }>;
        }>;
      }>;
    };
  };
}
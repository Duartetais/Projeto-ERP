export interface S2220Aso {
  evtMonit: {
    ideEvento:      { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador:  { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string; nisTrab?: string };
    exMedOcup: {
      tpExameOcup: number;
      dtExm:       string;
      ordExame: Array<{
        dtRealizExm:    string;
        procRealizado:  number;
      }>;
      aso: {
        dtAso:     string;
        resAso:    number;
        medico: {
          nmMed:  string;
          nrCRM:  string;
          ufCRM:  string;
        };
      };
    };
  };
}
export interface S2299Desligamento {
  evtDeslig: {
    ideEvento:      { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador:  { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string; nisTrab?: string };
    infoDeslig: {
      matTrab:         string;
      dtDeslig:        string;
      mtvDeslig:       string;
      dtProjFimAPI?:   string;
      pensAlim?:       number;
      percAliment?:    number;
      verbasResc: {
        dmDev: Array<{
          ideDmDev:  string;
          nrRec:     string;
        }>;
      };
    };
  };
}
export interface S2230Afastamento {
  evtAfastTemp: {
    ideEvento:      { indRetif: number; tpAmb: number; procEmi: number; verProc: string };
    ideEmpregador:  { tpInsc: number; nrInsc: string };
    ideTrabalhador: { cpfTrab: string; nisTrab?: string };
    infoAfastamento: {
      iniAfastamento: {
        dtIniAfast:  string;
        codMotAfast: string;
      };
      fimAfastamento?: {
        dtTermAfast: string;
      };
    };
  };
}
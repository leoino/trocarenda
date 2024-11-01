export interface UserData {
  CodEmprs: number;
  CodEspbnf: number;
  CreateDate: string;
  DatInicioBfpart: string;
  DatReferFcfnpt: string;
  DcrPlbnf: string;
  EmprsDesc: string;
  Id: number;
  IsSync: boolean;
  MesRef: string;
  NomEmprg: string;
  NomRepres: string;
  NumCpfEmprg: number;
  NumCpfRepres: number;
  NumIdntfRptant: number;
  NumMatrPartf: number;
  NumPlbnf: number;
  NumRgtroEmprg: number;
  NumVrbfss: number;
  ParametroRendaAtual: number;
  SaldoAtuReais: number;
  TipoRenda: string;
  UpdateOn: string;
  VlrCalculFcfnpt: number;
}

export interface ParametroPlano {
  Id: number;
  CodPlano: number;
  TipoRenda: number;
  DescTipoRenda: string;
  ParamMinimo: number;
  ParamMaximo: number;
  ValorMinimoRecebimento: number;
  LimiteMaximoSaldo: number;
  IsEnabled: boolean;
  Escala: number;
}

export interface TextoAjuda {
  Id: number;
  CodPlano: number;
  TipoRenda: number;
  Texto: string;
  Order: number;
}

export interface SolicitacaoTrocaRenda {
  IdSimulacao: string,
  CodEmprs: string,
  NumRgtroPartf: string,
  NumPlbnf: string,
  TipoRendaEscolhido: string,
  ParamRendaEscolhido: number,
  ParamRendaEscolhidoFormatado: string,
  BeneficioSimulado: number,
  BeneficioSimuladoFormatado: string,
  DataSolicitacao: string
}

export interface DadosSalvarSolicitacaoTrocaRenda {
  p_cod_emprs: number,
  p_num_rgtro_emprg: number,
  p_num_plbnf: number,
  p_num_cpf_emprg: number;
  p_desc_tipo_renda_simulado: string,
  p_vlr_param_renda_simulado: number,
  p_vlr_beneficio_simulado: number,
  p_desc_tipo_renda_atual: string,
  p_vlr_param_renda_atual: number,
  p_vlr_beneficio_atual: number,
  p_num_cpf_repres: number;
  p_num_manifestacao: string;
  p_cod_espbnf_atual: number;
  p_cod_tipo_renda_simulado: number;
}

export interface DadosSalvarSolicitacaoTrocaRendaV2 {
  TipoRendaEscolhido: string,
  ParamRendaEscolhido: number,
  BeneficioEscolhido: number,
  TipoRendaAtual: string;
  ParamRendaAtual: number,
  BeneficioAtual: number,
  NumManifestacao: string,
  CodEspnbfAtual: number,
  CodTipoRendaEscolhido: number,
}


export interface TokenValueCredential {
  CPF: string,
}

export interface TokenReturn {
  token: string,
}

export interface RetornoSalvarTrocaRenda {
  IdSolicitacao: number,
  Protocolo: string;
}

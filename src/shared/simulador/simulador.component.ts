import { Component, signal } from '@angular/core';
import { SelecionartiporendaComponent } from '../selecionartiporenda/selecionartiporenda.component';
import { TipoRendaService } from '../../services/tipoRenda.service';
import { ParametroPercentualComponent } from '../parametro-percentual/parametro-percentual.component';
import { ParametroReaisComponent } from '../parametro-reais/parametro-reais.component';
import { ParametroPrazoComponent } from '../parametro-prazo/parametro-prazo.component';
import { ResultadoRendaComponent } from '../resultado-renda/resultado-renda.component';
import { ParametroPlanoService } from '../../services/parametroPlano.service';
import { TextosAjudaComponent } from '../textos-ajuda/textos-ajuda.component';
import { UserDataService } from '../../services/userdata.service';
import { SimulacaoService } from '../../services/simulacao.service';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';
import { DadosSalvarSolicitacaoTrocaRenda, DadosSalvarSolicitacaoTrocaRendaV2 } from '../types';
import { SolicitacoesTrocaRendaService } from '../../services/solicitacoesTrocaRenda.service';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [SelecionartiporendaComponent, ParametroPercentualComponent, ParametroReaisComponent,
    ParametroPrazoComponent, ResultadoRendaComponent, TextosAjudaComponent, ConfirmacaoComponent],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss'
})
export class SimuladorComponent {

  constructor(public tipoRendaService: TipoRendaService, public parametroPlanoService: ParametroPlanoService,
    public userDataService: UserDataService, public simulacaoService: SimulacaoService, private solicitacoesTrocaRendaService: SolicitacoesTrocaRendaService) {}

  clearSimulation() {
    this.simulacaoService.simulado.update(() => false);
    this.tipoRendaService.setTipoRenda(0);
    this.simulacaoService.resetarValores();
  }

  confirmar() {
    let tipoRenda = 0;
    let codEspnbf = 0;
    let desc_tipo_renda_simulado = '';
    if (this.tipoRendaService.tipoRenda() == 5) {
      tipoRenda = 2;
      codEspnbf = 67;
      desc_tipo_renda_simulado = 'Renda em Valor Constante (Em Reais)'
    } else if (this.tipoRendaService.tipoRenda() == 6) {
      tipoRenda = 1;
      codEspnbf = 42;
      desc_tipo_renda_simulado = 'Renda em Percentual do Saldo';
    } else {
      tipoRenda = 3;
      codEspnbf = 44;
      desc_tipo_renda_simulado = 'Renda em Prazo Certo';
    }
    // const novaSolicitacao: DadosSalvarSolicitacaoTrocaRenda = {
    //   p_cod_emprs: this.userDataService.userData()?.CodEmprs!,
    //   p_num_rgtro_emprg: this.userDataService.userData()?.NumRgtroEmprg!,
    //   p_num_plbnf: this.userDataService.userData()?.NumPlbnf!,
    //   p_num_cpf_emprg: this.userDataService.userData()?.NumCpfEmprg!,
    //   p_desc_tipo_renda_simulado: desc_tipo_renda_simulado,
    //   p_vlr_param_renda_simulado: this.simulacaoService.parametroRenda(),
    //   p_vlr_beneficio_simulado: this.simulacaoService.rendaReaisSimulado(),
    //   p_desc_tipo_renda_atual: this.userDataService.userData()?.TipoRenda!,
    //   p_vlr_param_renda_atual: this.userDataService.userData()?.ParametroRendaAtual!,
    //   p_vlr_beneficio_atual: this.userDataService.userData()?.VlrCalculFcfnpt!,
    //   p_num_cpf_repres: this.userDataService.userData()?.NumCpfRepres!,
    //   p_num_manifestacao: '',
    //   p_cod_espbnf_atual: codEspnbf,
    //   p_cod_tipo_renda_simulado: tipoRenda
    // };
    const novaSolicitacao: DadosSalvarSolicitacaoTrocaRendaV2 = {
      TipoRendaEscolhido: desc_tipo_renda_simulado,
      ParamRendaEscolhido: this.simulacaoService.parametroRenda(),
      BeneficioEscolhido: this.simulacaoService.rendaReaisSimulado(),
      TipoRendaAtual: this.userDataService.userData()?.TipoRenda!,
      ParamRendaAtual: this.userDataService.userData()?.ParametroRendaAtual!,
      BeneficioAtual: this.userDataService.userData()?.VlrCalculFcfnpt!,
      NumManifestacao: '',
      CodEspnbfAtual: codEspnbf,
      CodTipoRendaEscolhido: tipoRenda
    };
    this.solicitacoesTrocaRendaService.novaSolicitacao.update(() => novaSolicitacao);
    this.simulacaoService.confirmando.update(() => true);
    this.simulacaoService.simulado.update(() => true);
  }
}

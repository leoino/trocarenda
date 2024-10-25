import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimulacaoService } from '../../services/simulacao.service';
import { TipoRendaService } from '../../services/tipoRenda.service';
import { SolicitacoesTrocaRendaService } from '../../services/solicitacoesTrocaRenda.service';

@Component({
  selector: 'app-sucesso',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sucesso.component.html',
  styleUrl: './sucesso.component.scss'
})
export class SucessoComponent {
  constructor(public simulacaoService: SimulacaoService, public tipoRendaService: TipoRendaService, public solicitacoesTrocaRendaService: SolicitacoesTrocaRendaService) { }

  voltarHome() {
    this.solicitacoesTrocaRendaService.solicitacao.set({});
    this.solicitacoesTrocaRendaService.novaSolicitacao.update(() => null);
    this.solicitacoesTrocaRendaService.idSolicitacao.update(() => 0);
    this.simulacaoService.confirmando.update(() => false);
    this.simulacaoService.concluido.update(() => false);
    this.tipoRendaService.setTipoRenda(0);
    this.simulacaoService.resetarValores();
  }
}

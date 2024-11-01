import { Component } from '@angular/core';
import { SimulacaoService } from '../../services/simulacao.service';
import { SolicitacoesTrocaRendaService } from '../../services/solicitacoesTrocaRenda.service';
import { UserDataService } from '../../services/userdata.service';
import { TipoRendaService } from '../../services/tipoRenda.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, CheckboxComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent {
  constructor(public simulacaoService: SimulacaoService, private solicitacoesTrocaRendaService: SolicitacoesTrocaRendaService,
     public userDataService: UserDataService, public tipoRendaService: TipoRendaService) {}
  confirmacao1 = false;
  confirmacao2 = false;

  cancelar() {
    this.simulacaoService.confirmando.update(() => false);
  }

  finalizar() {
    this.simulacaoService.loading.update(() => true);
    this.solicitacoesTrocaRendaService.salvarSolicitacaoTrocaRenda(this.solicitacoesTrocaRendaService.novaSolicitacao()!, this.userDataService.userToken());
  }

  updateConfirmation(confirmation: number, value: boolean) {
    confirmation == 1 ? this.confirmacao1 = value : this.confirmacao2 = value;
  }
}

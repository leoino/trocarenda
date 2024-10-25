import { Component } from '@angular/core';
import { SimulacaoService } from '../../services/simulacao.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-resultado-renda',
  standalone: true,
  imports: [CurrencyMaskModule, FormsModule],
  templateUrl: './resultado-renda.component.html',
  styleUrl: './resultado-renda.component.scss'
})
export class ResultadoRendaComponent {
  constructor(public simulacaoService: SimulacaoService, private currency: CurrencyPipe) {}

  valorExibir = this.currency.transform(this.simulacaoService.rendaReaisSimulado(), 'BLR', 'R$', '1.2-2');
}

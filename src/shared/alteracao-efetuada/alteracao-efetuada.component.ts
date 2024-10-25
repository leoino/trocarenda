import { Component } from '@angular/core';
import { SolicitacoesTrocaRendaService } from '../../services/solicitacoesTrocaRenda.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alteracao-efetuada',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './alteracao-efetuada.component.html',
  styleUrl: './alteracao-efetuada.component.scss'
})
export class AlteracaoEfetuadaComponent {
  constructor(public solicitacaoTrocaRendaService: SolicitacoesTrocaRendaService) {}
}

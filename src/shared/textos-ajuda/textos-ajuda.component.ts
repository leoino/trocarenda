import { Component, effect } from '@angular/core';
import { TextosAjudaService } from '../../services/textosAjuda.service';
import { UserDataService } from '../../services/userdata.service';
import { TextoAjuda } from '../types';
import { TipoRendaService } from '../../services/tipoRenda.service';

@Component({
  selector: 'app-textos-ajuda',
  standalone: true,
  imports: [],
  templateUrl: './textos-ajuda.component.html',
  styleUrl: './textos-ajuda.component.scss'
})
export class TextosAjudaComponent {
  constructor(public userDataService: UserDataService, public textosAjudaService: TextosAjudaService, private tipoRendaService: TipoRendaService) {
    effect(()=> {
      if(this.textosAjudaService.listaTextosAjuda().length > 0) {
        this.textosAjudaFiltrados = this.textosAjudaService.listaTextosAjuda().filter(a => a.TipoRenda == this.tipoRendaService.tipoRenda()) as TextoAjuda[];
      }
    })
  }

  textosAjudaFiltrados!: TextoAjuda[];

  ngOnInit() {
    if (this.userDataService.userData()?.CodEspbnf) {
      this.textosAjudaService.getTextosAjuda(this.userDataService.userData()?.NumPlbnf as number);
    }
  }
}

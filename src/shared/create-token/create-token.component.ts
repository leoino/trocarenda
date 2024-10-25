import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-create-token',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-token.component.html',
  styleUrl: './create-token.component.scss'
})
export class CreateTokenComponent {
  constructor(private tokenService: TokenService) {}

  cpf = '';

  createToken() {
    this.tokenService.createTokenByCPF(this.cpf);
  }
}

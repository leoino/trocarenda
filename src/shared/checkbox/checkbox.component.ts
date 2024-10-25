import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  valueChange = output<boolean>();

  sendValue(e: Event) {
    this.valueChange.emit((<HTMLInputElement>e.target).checked);
  }
}

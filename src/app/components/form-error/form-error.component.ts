import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {

  @Input() formGroup: FormGroup | undefined;
  @Input() controlName: string | undefined;
  @Input() subFormGroup: string[] | undefined;

  get ctrl() {
    if (this.subFormGroup) {
      return this.formGroup?.get([...this.subFormGroup, this.controlName] as string[]);
    }
    return this.formGroup?.get(this.controlName!);
  }
}

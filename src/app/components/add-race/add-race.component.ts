import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RaceService } from '../../services/race.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-add-race',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, InputMaskModule],
  templateUrl: './add-race.component.html',
  styleUrl: './add-race.component.scss'
})
export class AddRaceComponent {
  private fb = inject(FormBuilder);
  private ar = inject(ActivatedRoute);
  private router = inject(Router);
  private rs = inject(RaceService);

  raceForm: FormGroup = this.fb.group({
    raceName: [null, [Validators.required]],
    place: [null, [Validators.required]],
    raceType: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    distance: [null, [Validators.required]],
    realDistance: [null, [Validators.required]],
    file: [null, [Validators.required]],
  });

  onSubmit() {
    this.raceForm.value.startDate = this.convertDate(this.raceForm.value.startDate),

    this.rs.create(this.toFormData(this.raceForm.value)).subscribe({
      next: data => console.log(data)
    })
  }

  onFilePicked(event: Event) {
    console.log(event)
    let file = (event.target as HTMLInputElement)?.files?.[0]; // Here we use only the first file (single file)
    console.log(file);
    
    this.raceForm.patchValue({ file: file });
  }

  toFormData( formValue: any ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

  convertDate(dateAConvertir: string) {
    let dateArray = dateAConvertir.split("/");
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }
  
  getControl(ctrl: string[]): FormControl {
    return this.raceForm.get(ctrl) as FormControl;
  }
}

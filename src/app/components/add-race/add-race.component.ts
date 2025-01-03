import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { validDateValidator } from '../../../validators/date.validator';
import { Locality } from '../../models/locality';
import { MyMessageService } from '../../services/my-message.service';
import { RaceService } from '../../services/race.service';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-add-race',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, CheckboxModule,InputTextModule, InputNumberModule, InputMaskModule, FloatLabelModule, FormErrorComponent, FileUploadModule, AutoCompleteModule, SelectModule, CardModule],
  templateUrl: './add-race.component.html',
  styleUrl: './add-race.component.scss'
})
export class AddRaceComponent {
  private fb = inject(FormBuilder);
  private ar = inject(ActivatedRoute);
  private router = inject(Router);
  private rs = inject(RaceService);
  private messageService = inject(MyMessageService);

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  localities = this.ar.snapshot.data['localities'];
  filteredLocalities: Locality[] = [];

  raceTypes = ['route', 'nature', 'trail'];

  raceForm: FormGroup = this.fb.group({
    raceName: [null, [Validators.required]],
    place: [null, [Validators.required]],
    raceType: [null, [Validators.required]],
    startDate: [null, [Validators.required, validDateValidator()]],
    distance: [null, [Validators.required]],
    realDistance: [null, [Validators.required]],
    file: [null, [Validators.required]],
    keepData: [null, []],
  });

  onSubmit() {
    let formValue = {...this.raceForm.value};
    formValue.startDate = this.convertDate(formValue.startDate);

    this.rs.create(this.toFormData(formValue)).subscribe({
      next: () => {
        this.messageService.showMessage({ title: 'Course ajoutée', detail: `La course ${formValue.raceName} a été ajoutée` });
        if (formValue.keepData)
          this.raceForm.reset(this.raceForm.value);
        else {
          this.fileUpload.clear();
          this.raceForm.reset();
          this.raceForm.markAsUntouched();
          this.raceForm.markAsPristine();
        }
      },
      error: (error) => console.log(error)
    })
  }

  onFilePicked(event: FileSelectEvent) {
    let file = event.files[0]; // Here we use only the first file (single file)

    this.raceForm.patchValue({ file: file });
  }

  toFormData( formValue: any ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      if (typeof value == 'number')
        formData.append(key, value.toLocaleString());
      else
        formData.append(key, value);
    }

    return formData;
  }

  convertDate(dateAConvertir: string) {
    let dateArray = dateAConvertir.split("/").filter(x => x);
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }

  getControl(ctrl: string[]): FormControl {
    return this.raceForm.get(ctrl) as FormControl;
  }

  clearFileInput(fileUpload: FileUpload) {
    fileUpload.clear();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.filteredLocalities = this.localities.filter((l: Locality) => {
      const indexOfQuery = l.name.toLowerCase().indexOf(event.query.toLowerCase());
      return indexOfQuery == 0 || (indexOfQuery > 0 && l.name[indexOfQuery - 1] == '-')
    });
  }
}

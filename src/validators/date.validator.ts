import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function validDateValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if (!value) {
        return null;
    }

    //let dateInput = this.livreForm.value.dateParution; // DD/MM/YYYY format
    let dateArray = value.split("/");
    let newDate = new Date(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);

    return isNaN(newDate.getTime()) ? { dateInvalid: true, errorMessage: 'Date non valide' } : null;
  }
}
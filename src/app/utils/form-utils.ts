import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep (){
  return new Promise ((resolve) => {
    setTimeout(() =>{
      resolve(true);
    }, 2500)
  })
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {

    // console.log(errors);

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return `El email no es valido`;
        case 'emailTaken':
          return `El email esta siendo usado`;
        case 'nameTaken':
          return `El nombre de usuario esta siendo usado`;
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern)  {

            return `El valor ingresado no parece un email `;          
          }
          return `Error de patron contra expresion regular `;          
        default:
          return `Error de validación no controlado ${key}`
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  
  }
  static isValidFieldUpload(form: FormGroup, fieldName: string): boolean | null {
  
    return !!form.controls[fieldName].errors;
  }


  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    
    return FormUtils.getTextError(errors)
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorArray(
    formArray: FormArray,
    index: number
  ): string | null {
    // if (!formArray.controls[index]) return null;
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    // if(errors){
    //     return 'Este campo es requerido';

    // }

    return FormUtils.getTextError(errors)
  }



  static isFiledOneEqualTwo(field1: string, field2: string){
    return (formGroup: AbstractControl) =>{
      const field1Value = formGroup.get(field1)?.value
      const field2Value = formGroup.get(field2)?.value

     return field1Value === field2Value ? null: {passwordsNotEqual: true}

    }
  }

  static async checkingServerResponse(control : AbstractControl): Promise<ValidationErrors | null> {
    console.log("Validando...");
    
    await sleep() ; //pasa los 2 segundo o llamado al servidor

    const formValue = control.value;

    if (formValue === 'hola@mundo.com'){ // el Hola@mundo puede usasar como consulta a la BD 
      return { emailTaken: true,}
    }
    return null
  }

  static async chekinglName(controlName : AbstractControl): Promise<ValidationErrors | null>{
    //strider
    console.log("Valid...");

    await sleep()

    const inputNameValue = controlName.value; 

    // La forma más corta
    return inputNameValue === 'strider' ? { nameTaken: true} : null


  }


}

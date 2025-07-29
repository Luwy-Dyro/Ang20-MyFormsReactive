import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    // name: ['', /** Valida sincrono */, /**  validacion  asincrono */],
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: [0, [Validators.required, Validators.min(10) ] ],
    inStorage: [0, [Validators.required, Validators.min(0) ] ],
  });

    // isValidField(fieldName: string): boolean | null {
    //   // return !!this.myForm.controls[fieldName].errors 
    //   return (
    //     this.myForm.controls[fieldName].errors &&
    //     this.myForm.controls[fieldName].touched

    //   )

    // }


    // getFieldError(fieldName: string): string | null {
    //   if( !this.myForm.controls[fieldName]) return null;
      
    //   const errors = this.myForm.controls[fieldName].errors ?? {};

    //   for(const key of Object.keys(errors)) {
    //     switch (key) {
    //       case 'required':
    //         return 'Este campo es requerido';
    //       case 'minlength':
    //         return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    //       case 'min':
    //         return `El valor mínimo es ${errors['min'].min}`;
    //     }
    //   }
    //   return null;
    // }

    onSave(){
      if (this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      }

       console.log(this.myForm.value);
      this.myForm.reset()
      // Resetear el formulario con valores por defecto
      //  this.myForm.reset({
      //   price: 100,
      //   inStorage: 10,
      //   name: 'Producto 1'
      // });
    }
    
  //Antiguo
  // myForm = new FormGroup({

  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),

  // })

 }

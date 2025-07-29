import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { SendFormService } from './SendForm.service';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent { 
  formUtils = FormUtils

 private fb = inject(FormBuilder)
// private http = inject(HttpClient)
private serviceSend = inject(SendFormService)


myForm: FormGroup = this.fb.group({
  // gender: ['M', Validators.required],
  gender: [, Validators.required],
  wantNoti: [true],
  termCondi: [false, Validators.requiredTrue]
})

onSubmit(){

  console.log(this.myForm.value);
  
  this.myForm.markAllAsTouched()

  

  if (this.myForm.invalid) return;

    // Envía los datos al endpoint desde component
    // this.http.post('https://tuservidor.com/api/endpoint', this.myForm.value)
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Respuesta del servidor:', response);
    //     },
    //     error: (err) => {
    //       console.error('Error al enviar:', err);
    //     }
    //   });


  // Envía los datos al endpoint desde servicio
  this.serviceSend.sendForm(this.myForm.value)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
        },
        error: (err) => {
          console.error('Error al enviar:', err);
        }
      });
  }

}

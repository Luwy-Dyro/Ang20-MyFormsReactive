import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  formUtils = FormUtils;

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    // gender: ['M', Validators.required],
    name: [,
      [Validators.required, Validators.pattern(this.formUtils.namePattern)]
      
    ],
    // email: [, [Validators.required, Validators.email]],
    email: [, 
      [Validators.required,  Validators.pattern(this.formUtils.emailPattern)], //Valdación ASINCRONA
      [FormUtils.checkingServerResponse] //Valdación SINCRONA
    ],
    username: [,
      [Validators.required, Validators.minLength(6),  Validators.pattern(this.formUtils.notOnlySpacesPattern)],
      [FormUtils.chekinglName]
  
    ],
    password: [,[ Validators.required, Validators.minLength(6)]],
    password2: [, Validators.required],
  },{
    validators: [
      this.formUtils.isFiledOneEqualTwo('password', 'password2')

    ]
  });




  onSubmit(){

    this.myForm.markAllAsTouched()
    console.log(this.myForm.value);
    
  }


}

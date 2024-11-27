import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css'],
  standalone:true
})  
export class RegisterComponent {
  accountForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  onSubmit() {
    console.log(this.accountForm.value);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl('naruto@ninja.com', Validators.required),
    password: new FormControl('shinobi', Validators.required),
  });

  constructor(
    private loginService: LoginService,
    private router: Router
    ){}

  submit() {
    if (this.form.valid) {
      this.loginService.getJwtToken(this.form.value)
      .subscribe(resp => {
        if(resp.jwttoken !== '' && resp.jwttoken !== null && resp.jwttoken !== undefined){
          window.localStorage.setItem('jwtToken', resp.jwttoken)
          this.router.navigate(['/dashboard'])
        }
      })
    }
  }

}
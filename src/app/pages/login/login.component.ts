import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/sharvices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  submitted: boolean = false;
  getUserData: any;
  loginForm!: FormGroup;
  // userData:any
  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router) {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.buildForm();
  }
  siteKey: string = "6Ld77CApAAAAACkIoPblE4wGWgr6hWesoQd6g7bV";
  buildForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      recaptcha: new FormControl('', [Validators.required]),
      //checkOut: new FormControl('', [Validators.required])
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userSrv.getUserApi().subscribe((res) => {
        this.getUserData = res;
        let user = this.getUserData.filter((x: any) => x.email == this.loginForm.value.email && x.password == this.loginForm.value.password);
        if (user.length) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSrv.isUserLogin.next(JSON.stringify(user));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Invalid Credential')
        }
      });

    }

  }

}

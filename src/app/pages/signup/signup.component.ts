import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { userTypeModel } from 'src/app/shared/users.model';
import { Router } from '@angular/router';
import { lowerCase,numberCharacters,uppperCse,specialCharacter} from './validation';
import { UserService } from 'src/app/sharvices/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email_regx = /^([0-9a-zA-Z.]{1,63})@([0-9a-zA-Z-]{1,252})\.[a-z]{2,3}$/;
  submitted: boolean = false;
  getAllUserDetails: any;

  formValue!: FormGroup;
  formObjectModel: userTypeModel = new userTypeModel();
//   //maxDate = new Date();
//   //bsConfig = {showWeekNumbers: false, dateInputFormat: 'DD-MMM-YYYY'};

  constructor(private fb: FormBuilder,private router: Router,private userSrv: UserService,) { }

  ngOnInit(): void {
    this.formValue = this.fb.group(
      {
        fullname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required,Validators.pattern(this.email_regx)]),
        password: new FormControl('', [Validators.required,uppperCse,numberCharacters,lowerCase,specialCharacter]),
        phone: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        cPassword: new FormControl('', [Validators.required]),
        acceptTerms: new FormControl(['', [Validators.required]]),
        //isActive: this.fb.control(false),
        role:this.fb.control('')

      },
      {
        validators: this.checkPasswords
      },
    )
  }
  get input(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
   checkPasswords: ValidatorFn = (
    group: AbstractControl
   ):ValidationErrors | null => {
      let pass = group.get('password');
      let confirmPass = group.get('cPassword');
      if (pass?.value !== confirmPass?.value) {
       confirmPass?.setErrors({ error: 'Password do not match' });
     }
    else {
      //confirmPass?.setErrors(null);
    }
     return null;
   };

  submitForm() {
    this.submitted = true;
    // this.formObjectModel.fullname = this.formValue.value.fullname;
    // this.formObjectModel.email = this.formValue.value.email;
    // this.formObjectModel.password = this.formValue.value.password;
    // this.formObjectModel.phone = this.formValue.value.phone;
    // this.formObjectModel.dob = this.formValue.value.dob;
    // this.formObjectModel.city = this.formValue.value.city;
    // this.formObjectModel.state = this.formValue.value.state;

    // this.userSrv.postUserApi(this.formObjectModel).subscribe((res) => {
    //   //return res;
    //   alert("Record Added Successfull!")
    //   this.formValue.reset();
    //   this.router.navigate(['/profile']);
    // })
    if(this.formValue.valid){
      this.userSrv.postUserApi(this.formValue.value).subscribe((res) => {
        //return res;
       
        this.formValue.reset();
        localStorage.setItem('user', JSON.stringify(res));
        this.userSrv.isUserLogin.next(JSON.stringify(res));
        this.router.navigateByUrl('/login');
        console.log("Record Added Successfull!")
      })
    }
  }

 }

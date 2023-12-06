import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { userTypeModel } from 'src/app/shared/users.model';
import { UserService } from 'src/app/sharvices/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  getAllUserDetails:any;
  deleteDetails!:any;
 UpdateValue!:FormGroup;
 formObjectModel:userTypeModel = new userTypeModel();

 constructor(private fb:FormBuilder, private userSrv:UserService, private router: Router){}
 
 ngOnInit():void{
   this.UpdateValue = this.fb.group({
     fullname:(''),
     email:(''),
     phone:(''),
     dob:(''),
     city:(''),
     state:('')
   })
   this.getUserData();
 }
 getUserData(){
   this.userSrv.getProfileApi().subscribe((response) =>{
     //console.log("dfdgffgfg>>>>>>>",response)
     this.getAllUserDetails =response;
   })
 }
 onEdit(row:any){
   this.formObjectModel.id = row.id;
   this.UpdateValue.controls['fullname'].setValue(row.fullname);
   this.UpdateValue.controls['email'].setValue(row.email);
   this.UpdateValue.controls['phone'].setValue(row.phone);
   this.UpdateValue.controls['dob'].setValue(row.dob);
   this.UpdateValue.controls['city'].setValue(row.city);
   this.UpdateValue.controls['state'].setValue(row.state);
 }
 UpdateForm(){
   this.formObjectModel.fullname = this.UpdateValue.value.fullname;
   this.formObjectModel.email = this.UpdateValue.value.email;
   this.formObjectModel.password = this.UpdateValue.value.password;
   this.formObjectModel.phone = this.UpdateValue.value.phone;
   this.formObjectModel.dob = this.UpdateValue.value.dob;
   this.formObjectModel.city = this.UpdateValue.value.city;
   this.formObjectModel.state = this.UpdateValue.value.state;
   this.userSrv.updateUserApi(this.formObjectModel,this.formObjectModel.id).subscribe((response) =>{
     this.UpdateValue.reset();
     alert('Data is Updated!')
     this.getUserData();
     this.router.navigate(['/profile']);
   })
   // if(this.UpdateValue.invalid){
   //   this.userSrv.updateUserApi(this.UpdateValue.value,this.formObjectModel.id).subscribe((response) =>{
   //     this.UpdateValue.reset();
   //     alert('Data is Updated!')
   //     this.getUserData();
   //     this.router.navigate(['/profile']);
   //   })
   // }
 }
 deleteData(row:any){
   this.userSrv.deleteUserApi(row.id).subscribe((response) =>{
      this.deleteDetails=response;
      this.getUserData();
      //alert("your details has Delete!"+this.deleteDetails)
   })
 }

}

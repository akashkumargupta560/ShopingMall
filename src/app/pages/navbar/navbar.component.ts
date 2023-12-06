import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/sharvices/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenueRequired:boolean =false;
  isUserLoggedIn: boolean = false;
  constructor(private router:Router, private userServices: UserService){}
  ngOnInit(): void {
    let currentUrl = this.router.url;
    this.userServices.isUserLogin.subscribe( res => {
      let userData = localStorage.getItem('user');
      this.isUserLoggedIn = userData ? true : false;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
    this.userServices.isUserLogin.next("");
  } 
}

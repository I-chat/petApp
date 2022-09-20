import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from "../services/index";
import { UserCredential } from "../interfaces/index";

@Component({
  templateUrl: 'login.html',
  styleUrls:['shared.css', 'login.css']
})
export class LoginComponent implements OnInit {
  userCredential: UserCredential = {username: '', password: ''};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(){}

  login(){
    this.authService.login(this.userCredential.username, this.userCredential.password)
      .subscribe(()=>{
        this.router.navigate(['/pets']);
      })
  }
}

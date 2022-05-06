import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Date App';
  users:any;

  constructor(private accountService : AccountService){}

  ngOnInit() {

    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }





}

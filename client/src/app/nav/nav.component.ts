import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model :any = {};
  title = "OOO";

  constructor(public accountService : AccountService ,private route:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(response=>{
      console.log(response);
    })

  }

  login () {
    this.accountService.login(this.model).subscribe(response=> {
      console.log(response);
      this.route.navigateByUrl('members');
    }, error=>{
       console.log(error);
       this.toast.error(error.error);
    });

  }

  logout (){
    this.accountService.logout();
    this.model.username = "";
    this.model.password = "";
    this.route.navigateByUrl('/');
  }




}

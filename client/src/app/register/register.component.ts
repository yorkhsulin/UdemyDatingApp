import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter()
  model:any={};
  constructor(private account:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.account.register(this.model).subscribe(respone=>{
      console.log(respone);
      this.cancel();
    },error=>{
      console.log(error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}

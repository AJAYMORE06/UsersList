import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { UserDetailViewComponent } from '../user-detail-view/user-detail-view.component';
import {MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: any = [];
  pageno: number = 1;
  dialogRef: any;
  constructor(private userService: UserServiceService, public dialog: MatDialog,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.getUsers(this.pageno);
  }

  getUsers(pageNo) {
    this.userService.getUser(pageNo).subscribe(item => {
      this.users = item.body.data;
    })
  }

  addUser() {
    this.dialogRef = this.dialog.open(AddUserComponent,{
      width:'600px',
      height:'400px',
      hasBackdrop:true,
    })
    this.dialogRef.afterClosed().subscribe(result=>{
    })
  }

  viewDetails(user) {
    this.dialogRef = this.dialog.open(UserDetailViewComponent,{
      width:'600px',
      height:'400px',
      hasBackdrop:true,
      data:{
        'data':user,
      }
    })
    this.dialogRef.afterClosed().subscribe(result=>{
    })
  }

  logout(){
    this.authService.logout();
    window.location.href="/login"
  }

}

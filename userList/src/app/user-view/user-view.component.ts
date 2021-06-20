import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { UserDetailViewComponent } from '../user-detail-view/user-detail-view.component';
import {MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: any = [];
  pageno: number = 1;
  dialogRef: any;
  constructor(private userService: UserServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers(this.pageno);
  }

  getUsers(pageNo) {
    this.userService.getUser(pageNo).subscribe(item => {
      this.users = item.body.data;
      console.log(this.users)
    })
  }

  addUser() {
    
  }

  viewDetails(user) {
    console.log(user)
    this.dialogRef = this.dialog.open(UserDetailViewComponent,{
      width:'600px',
      height:'400px',
      hasBackdrop:true,
      data:{
        'data':user,
      }
    })
    this.dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
    })
  }

}

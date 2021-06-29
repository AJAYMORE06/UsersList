import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { UserDetailViewComponent } from '../user-detail-view/user-detail-view.component';
import { MatDialog } from '@angular/material/dialog';
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
    this.dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      height: '400px',
      hasBackdrop: true,
    })
    this.dialogRef.afterClosed().subscribe(result => {
      let user = { 'id': result.id, 'first_name': result.firstName, 'last_name': result.lastName, 'email': result.email,'avatar':'../../assets/img/userAvatar.png' }
      this.users.push(user);
    })
  }

  viewDetails(user) {
    this.dialogRef = this.dialog.open(UserDetailViewComponent, {
      width: '600px',
      height: '400px',
      hasBackdrop: true,
      data: {
        'data': user,
      }
    })
    this.dialogRef.afterClosed().subscribe(result => {
      if (result.status == "Update") {
        this.users.forEach(user => {
          if (user.id == result.id) {
            user.first_name = result.firstName;
            user.last_name = result.lastName;
            user.email = result.emailId;
          }
        })
      } else if (result.status == "Delete") {
        let userIndex = this.users.find(user => user.id == result.id);
        let index = this.users.indexOf(userIndex);
        this.users.splice(index, 1);
      }
    })
  }

  logout() {
    this.authService.logout();
    window.location.href = "/login"
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../Services/user-service.service';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-user-detail-view',
  templateUrl: './user-detail-view.component.html',
  styleUrls: ['./user-detail-view.component.css']
})
export class UserDetailViewComponent implements OnInit {
  userName: any = '';
  firstName: any = '';
  lastName: any = '';
  email: any = '';
  avatar: any;
  detailForm: FormGroup;
  submitted: boolean = false;
  showError: boolean = false;
  updateForm: boolean = false;
  status: string = '';
  updatedAt: any;
  showHeadSuccess: boolean = false;
  updatedObj: any = { 'id': '', 'firstName': '', 'lastName': '', 'emailId': '','status':'' };
  constructor(public dialogRef: MatDialogRef<UserViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private userServiceService: UserServiceService) { }

  ngOnInit(): void {
    this.userName = this.data.data.first_name + " " + this.data.data.last_name;
    this.detailForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      updatedAt: ['']
    });
    this.displayUserDetails();
  }

  get fval() {
    return this.detailForm.controls;
  }

  displayUserDetails() {
    this.firstName = this.data.data.first_name;
    this.lastName = this.data.data.last_name;
    this.email = this.data.data.email;
    this.avatar = this.data.data.avatar;
  }

  deleteData() {
    this.userServiceService.deleteData(this.data.data.id).subscribe(res => {
      this.status = "deleted";
      this.showError = true;
    })
  }

  enableUpdateData() {
    this.updateForm = true;
  }

  updateData() {
    this.submitted = true;
    if (this.detailForm.invalid) {
      return;
    }
    let userData = {
      'first_name': '', 'last_name': '', 'email': ''
    }
    userData.first_name = this.firstName;
    userData.last_name = this.lastName;
    userData.email = this.email;
    this.userServiceService.updateData(userData, this.data.data.id).subscribe(res => {
      this.updateForm = false;
      this.showHeadSuccess = true;
      this.firstName = res.body.first_name;
      this.lastName = res.body.last_name;
      this.email = res.body.email;
      this.updatedAt = res.body.updatedAt;
    })
  }

  close() {
    if (this.showHeadSuccess == true) {
      this.updatedObj.id = this.data.data.id;
      this.updatedObj.firstName = this.firstName;
      this.updatedObj.lastName = this.lastName;
      this.updatedObj.emailId = this.email;
      this.updatedObj.status="Update";
    }
    if (this.showError == true) {
      this.updatedObj.id=this.data.data.id;
      this.updatedObj.firstName = this.data.data.first_name;
      this.updatedObj.lastName = this.data.data.last_name;
      this.updatedObj.status="Delete";
    }
    this.dialogRef.close(this.updatedObj);
  }

}

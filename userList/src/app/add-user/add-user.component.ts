import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  createForm: FormGroup;
  submitted: boolean = false;
  firstName: any = '';
  lastName: any = '';
  email: any = '';
  id: any;
  createdOn: any;
  afterCreate: boolean = false;
  constructor(public dialogRef: MatDialogRef<UserViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private userServiceService: UserServiceService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      id:[''],
      createdOn:['']
    });
  }

  get fval() {
    return this.createForm.controls;
  }

  cancel() {
    this.dialogRef.close(this.createForm.value);
  }

  createUser() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    let userData = {
      'first_name': '', 'last_name': '', 'email': ''
    }
    userData.first_name = this.firstName;
    userData.last_name = this.lastName;
    userData.email = this.email;
    this.userServiceService.create(userData).subscribe(res => {
      this.firstName=res.body.first_name;
      this.lastName=res.body.last_name;
      this.email=res.body.email;
      this.id=res.body.id;
      this.createdOn=res.body.createdAt;
      this.afterCreate = true;
    })
  }

}

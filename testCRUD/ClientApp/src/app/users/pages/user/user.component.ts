import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserModel } from 'src/app/models/user.model';
import { UsersState } from '../../store/users.state';
import { CreateUser, UpdateUser } from '../../store/users.actions';
import { Router } from '@angular/router';
import { RolesState } from 'src/app/roles-store/store/roles.state';
import { UserRoleModel } from 'src/app/models/user-role.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
 
})
export class UserComponent implements OnInit {

  model: UserModel;
  form: FormGroup;
  userRoles = [];
  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    
  }
  ngOnInit(): void {
    this.model = this.store.selectSnapshot(UsersState.user);
    this.form = this.fb.group({
      name: [this.model.name || '', Validators.required],
      id: this.model.id,
      roleIds: [this.model.roleIds, Validators.required]
    });
    const roles = this.store.selectSnapshot(RolesState.roles);
    roles.forEach(x => {
      const roleModel = new UserRoleModel(x);
      roleModel.isChecked = this.model.roleIds?.includes(x.id);
      this.userRoles.push(roleModel);
    });
  }

  onChange(id: number): void {
    let ids = this.form.controls['roleIds'].value ? this.form.controls['roleIds'].value.map(x => x) : [];
    let newids = [];
    const index = ids.indexOf(id);
    if (index >= 0) {
      newids = ids.length === 1 ? [] : ids.splice(index - 1, 1);
      this.form.controls['roleIds'].setValue(newids);
    } else {
      ids.push(id);
      this.form.controls['roleIds'].setValue(ids);
    }
  }

  onCancel(): void {
    this.router.navigate(['users']);
  }

  onSave(): void {
    if(!this.form.valid){return}
    this.model = new UserModel(this.form.getRawValue());
    const action = this.model.id ? new UpdateUser(this.model) : new CreateUser(this.model);
    this.store.dispatch(action);
    this.onCancel();
  }
}


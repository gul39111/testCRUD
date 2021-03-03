import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RoleModel } from 'src/app/models/role.model';
import { RolesState } from '../../../roles-store/store/roles.state';
import { CreateRole, UpdateRole } from '../../../roles-store/store/roles.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
 
})
export class RoleComponent implements OnInit {

  model: RoleModel;
  form: FormGroup;
  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    
  }
  ngOnInit(): void {
    this.model = this.store.selectSnapshot(RolesState.role);
    this.form = this.fb.group({
      name: [this.model.name || '', Validators.required],
      id: this.model.id
    });
    
  }
  onCancel(): void {
    this.router.navigate(['']);
  }

  onSave(): void {
    if(!this.form.valid){return}
    this.model = new RoleModel(this.form.getRawValue());
    const action = this.model.id ? new UpdateRole(this.model) : new CreateRole(this.model);
    this.store.dispatch(action);
    this.onCancel();
  }
}


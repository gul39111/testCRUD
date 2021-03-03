import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RoleModel } from 'src/app/models/role.model';
import { DeleteRole } from '../../../roles-store/store/roles.actions';
import { RolesState } from '../../../roles-store/store/roles.state';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
 
})
export class RolesComponent implements OnInit,OnDestroy {

  @Select(RolesState.roles) roles$: Observable<RoleModel[]>;
  subscriptions: Subscription[] = [];
  displayedColumns= ['name','actions'];
  dataSource = new MatTableDataSource<RoleModel>();

  constructor(private store: Store, private router: Router) {
    
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.roles$.subscribe(x => this.dataSource.data=x)
    );
  }
  onDelete(id: number){
    this.store.dispatch(new DeleteRole(id));
  }
  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s && s.unsubscribe());
  }
  onAdd(): void{
    this.router.navigate([0]);
  }

  onEdit(id: number): void{
    this.router.navigate([id]);
  }
}


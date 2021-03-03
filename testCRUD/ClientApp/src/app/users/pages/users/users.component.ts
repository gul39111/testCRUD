import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserViewModel } from 'src/app/models/user-view.model';
import { DeleteUser } from '../../store/users.actions';
import { UsersState } from '../../store/users.state';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
 
})
export class UsersComponent implements OnInit,OnDestroy {

  @Select(UsersState.users) users$: Observable<UserViewModel[]>;
  subscriptions: Subscription[] = [];
  displayedColumns= ['name', 'rolesNames', 'actions'];
  dataSource = new MatTableDataSource<UserViewModel>();

  constructor(private store: Store, private router: Router) {
    
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.users$.subscribe(x => this.dataSource.data=x)
    );
  }
  onDelete(id: number){
    this.store.dispatch(new DeleteUser(id));
  }
  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s && s.unsubscribe());
  }
  onAdd(): void{
    this.router.navigate(['users', 0]);
  }

  onEdit(id: number): void{
    this.router.navigate(['users', id]);
  }
}


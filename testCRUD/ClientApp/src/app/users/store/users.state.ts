import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from "./users.actions";
import {
    append,
    patch,
    removeItem,
    updateItem
} from '@ngxs/store/operators';
import { UsersStateModel } from "./users.model";
import { UserModel } from "src/app/models/user.model";
import { UserApiService } from "../services/user-api.services";
import { UserViewModel } from "src/app/models/user-view.model";

@State<UsersStateModel>({
    name: 'usersState',
    defaults: {
        user: null,
        users: []
    }
})
@Injectable()
export class UsersState {
    @Selector()
    static users(state: UsersStateModel): UserViewModel[] {
        return state.users;
    }
    @Selector()
    static user(state: UsersStateModel): UserModel {
        return state.user;
    }

    constructor(
        private apiService: UserApiService
    ) { }

    @Action(GetAllUsers)
    onGetAllUsers({ patchState }: StateContext<UsersStateModel>): Observable<any> {
        const observable = this.apiService.getAll();
        return observable.pipe(
            tap((result: UserViewModel[]) => {
                patchState({
                    users: result
                })
            })
        );
    }

    @Action(GetUser)
    onGetUser({ patchState }: StateContext<UsersStateModel>, { payload }: GetUser): Observable<any> {
        const observable = !payload ? of(new UserModel({ id: null })) : this.apiService.get(payload);
        return observable.pipe(
            tap((result: UserModel) => {
                patchState({
                    user: result
                })
            })
        );
    }

    @Action(CreateUser)
    onCreateUser({ setState }: StateContext<UsersStateModel>, { payload }: CreateUser): Observable<any> {
        const observable = this.apiService.create(payload);
        return observable.pipe(
            tap(result => {
                setState(patch({
                    users: append([result])
                }));
            })
        );
    }

    @Action(UpdateUser)
    onUpdateUser({ setState }: StateContext<UsersStateModel>, { payload }: UpdateUser): Observable<any> {
        const observable = this.apiService.update(payload);
        return observable.pipe(
            tap(result => {
                setState(
                    patch({
                        users: updateItem<UserViewModel>(
                            x => x.id === result.id,
                            result
                        )
                    })
                );
            })
        );
    }

    @Action(DeleteUser)
    onDeleteUser({ setState }: StateContext<UsersStateModel>, { payload }: DeleteUser): Observable<any> {
        const observable = this.apiService.delete(payload);
        return observable.pipe(
            tap(() => setState(
                patch({
                    users: removeItem<UserViewModel>(
                        x => x.id === payload
                    )
                })
            ))
        );
    }
}
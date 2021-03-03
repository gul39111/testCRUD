import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';
import { RoleModel } from "src/app/models/role.model";
import { RoleApiService } from "../services/role-api.services";
import { CreateRole, DeleteRole, GetAllRoles, GetRole, UpdateRole } from "./roles.actions";
import { RolesStateModel } from "./roles.model";
import {
    append,
    patch,
    removeItem,
    updateItem
} from '@ngxs/store/operators';

@State<RolesStateModel>({
    name: 'rolesState',
    defaults: {
        role: null,
        roles: []
    }
})
@Injectable()
export class RolesState {
    @Selector()
    static roles(state: RolesStateModel): RoleModel[] {
        return state.roles;
    }
    @Selector()
    static role(state: RolesStateModel): RoleModel {
        return state.role;
    }

    constructor(
        private apiService: RoleApiService
    ) { }

    @Action(GetAllRoles)
    onGetAllRoles({ patchState }: StateContext<RolesStateModel>): Observable<any> {
        const observable = this.apiService.getAll();
        return observable.pipe(
            tap((result: RoleModel[]) => {
                patchState({
                    roles: result
                })
            })
        );
    }

    @Action(GetRole)
    onGetRole({ patchState }: StateContext<RolesStateModel>, { payload }: GetRole): Observable<any> {
        const observable = !payload ? of(new RoleModel({ id: null })) : this.apiService.get(payload);
        return observable.pipe(
            tap((result: RoleModel) => {
                patchState({
                    role: result
                })
            })
        );
    }

    @Action(CreateRole)
    onCreateRole({ setState }: StateContext<RolesStateModel>, { payload }: CreateRole): Observable<any> {
        const observable = this.apiService.create(payload);
        return observable.pipe(
            tap(result => {
                setState(patch({
                    roles: append([result])
                }));
            })
        );
    }

    @Action(UpdateRole)
    onUpdateRole({ setState }: StateContext<RolesStateModel>, { payload }: UpdateRole): Observable<any> {
        const observable = this.apiService.update(payload);
        return observable.pipe(
            tap(result => {
                setState(
                    patch({
                        roles: updateItem<RoleModel>(
                            x => x.id === result.id,
                            result
                        )
                    })
                );
            })
        );
    }

    @Action(DeleteRole)
    onDeleteRole({ setState }: StateContext<RolesStateModel>, { payload }: DeleteRole): Observable<any> {
        const observable = this.apiService.delete(payload);
        return observable.pipe(
            tap(() => setState(
                patch({
                    roles: removeItem<RoleModel>(
                        x => x.id === payload
                    )
                })
            ))
        );
    }
}
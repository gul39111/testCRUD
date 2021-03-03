import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RoleModel } from "src/app/models/role.model";
import { GetAllRoles } from "../store/roles.actions";

@Injectable()
export class RolesResolver implements Resolve<RoleModel> {
    constructor(private store: Store) {
    }

    resolve(): Observable<RoleModel> {
        return this.store.dispatch(new GetAllRoles());
    }
}
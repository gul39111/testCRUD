import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RoleModel } from "src/app/models/role.model";
import { GetRole } from "src/app/roles-store/store/roles.actions";

@Injectable()
export class RoleResolver implements Resolve<RoleModel> {
    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<RoleModel> {
        const id = +route.params['id'];
        return this.store.dispatch(new GetRole(id));
    }
}
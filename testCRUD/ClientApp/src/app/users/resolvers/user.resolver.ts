import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { GetAllRoles } from "src/app/roles-store/store/roles.actions";
import { GetUser } from "../store/users.actions";

@Injectable()
export class UserResolver implements Resolve<UserModel> {
    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
        const id = +route.params['id'];
        return this.store.dispatch([new GetAllRoles(), new GetUser(id)]);
    }
}
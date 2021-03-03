import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserViewModel } from "src/app/models/user-view.model";
import { GetAllUsers } from "../store/users.actions";

@Injectable()
export class UsersResolver implements Resolve<UserViewModel> {
    constructor(private store: Store) {
    }

    resolve(): Observable<UserViewModel> {
        return this.store.dispatch(new GetAllUsers());
    }
}
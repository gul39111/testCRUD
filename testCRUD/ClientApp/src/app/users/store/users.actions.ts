import { UserModel } from "src/app/models/user.model";

export class GetAllUsers {
    static readonly type = '[User] Get all';
}

export class CreateUser {
    static readonly type = '[User] Create user';

    constructor(public payload: UserModel) { }
}

export class UpdateUser {
    static readonly type = '[User] Update user';

    constructor(public payload: UserModel) { }
}

export class DeleteUser {
    static readonly type = '[User] Delete user';

    constructor(public payload: number) { }
}

export class GetUser {
    static readonly type = '[User] Get user';

    constructor(public payload: number) { }
}
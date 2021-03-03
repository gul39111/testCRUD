import { RoleModel } from "src/app/models/role.model";

export class GetAllRoles {
    static readonly type = '[Role] Get all';
}

export class CreateRole {
    static readonly type = '[Role] Create role';

    constructor(public payload: RoleModel) { }
}

export class UpdateRole {
    static readonly type = '[Role] Update role';

    constructor(public payload: RoleModel) { }
}

export class DeleteRole {
    static readonly type = '[Role] Delete role';

    constructor(public payload: number) { }
}

export class GetRole {
    static readonly type = '[Role] Get role';

    constructor(public payload: number) { }
}
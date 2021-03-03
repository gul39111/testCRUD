import { RoleModel } from "./role.model";

export class UserModel {
    public id: number;
    public name: string;
    public roleIds: number[];

    public constructor (fields?: Partial<UserModel>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
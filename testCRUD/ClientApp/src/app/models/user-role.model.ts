export class UserRoleModel {
    public id: number;
    public name: string;
    public isChecked: boolean;

    public constructor (fields?: Partial<UserRoleModel>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
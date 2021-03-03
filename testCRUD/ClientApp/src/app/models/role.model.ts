export class RoleModel {
    public id: number;
    public name: string;

    public constructor (fields?: Partial<RoleModel>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
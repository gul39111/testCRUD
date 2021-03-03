export class UserViewModel {
    public id: number;
    public name: string;
    public rolesNames: string[];

    public constructor (fields?: Partial<UserViewModel>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}
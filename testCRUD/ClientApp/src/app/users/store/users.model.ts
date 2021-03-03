import { UserViewModel } from "src/app/models/user-view.model";
import { UserModel } from "src/app/models/user.model";

export interface UsersStateModel { 
    user: UserModel;
    users: UserViewModel[];
}
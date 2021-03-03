import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Injectable()
export class UserApiService {
    protected path: string;
    constructor(
        protected http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.path = baseUrl;
    }

    public getAll() {
        return this.http.get(this.path + 'user');
    }

    public get(id: number) {
        return this.http.get(this.path + `user/${id}`);
    }

    public create(model: UserModel) {
        return this.http.post(this.path + 'user', model);
    }

    public update(model: UserModel) {
        return this.http.put(this.path + 'user', model);
    }

    public delete(id: number) {
        return this.http.delete(this.path + `user/${id}`);
    }
}
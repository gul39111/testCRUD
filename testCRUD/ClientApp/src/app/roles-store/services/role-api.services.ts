import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RoleModel } from 'src/app/models/role.model';

@Injectable()
export class RoleApiService {
    protected path: string;
    constructor(
        protected http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.path = baseUrl;
    }

    public getAll() {
        return this.http.get(this.path + 'role');
    }

    public get(id: number) {
        return this.http.get(this.path + `role/${id}`);
    }

    public create(model: RoleModel) {
        return this.http.post(this.path + 'role', model);
    }

    public update(model: RoleModel) {
        return this.http.put(this.path + 'role', model);
    }

    public delete(id: number) {
        return this.http.delete(this.path + `role/${id}`);
    }
}
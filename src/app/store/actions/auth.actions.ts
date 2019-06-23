import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';


export const LOGIN_USER = '[AUTH] Login'
export const LOGIN_SUCCESS = '[AUTH] Login Success'
export const LOGOUT_USER = '[AUTH] Logout'
export const LOGOUT_SUCCESS = '[AUTH] Logout Success'
export const REGISTER_USER = '[AUTH] Register'
export const REGISTER_SUCCESS = '[AUTH] Register Success'

export class LoginUser implements Action {
    readonly type = LOGIN_USER

    constructor(public payload: {email: string,password: string}) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS

    constructor(public payload: {email: string,password: string}) {}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER

    constructor(public payload: {email: string,password: string}) {}
}

export class RegisterUser implements Action {
    readonly type = REGISTER_USER

    constructor(public payload: {email: string,password: string,username: string, firstName: string, lastName: string}) {}
}
export type Actions = LoginUser | LoginSuccess | LogoutUser | RegisterUser

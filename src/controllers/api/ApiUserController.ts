import {Inject, Service} from "typedi";
import {JsonController, Get, Delete, Param, Post, Redirect, Render, QueryParam, HttpCode, Req, Res} from "routing-controllers";
import {UserService} from "../../services/UserService";
import {Request, Response} from "express";
import * as crypto from "crypto";
import { EntityFromParam } from 'typeorm-routing-controllers-extensions';

import { User } from '../../model/User';
/**
 * Sample web controller.
 */
@JsonController('/api/user')
export class ApiUserController {

    @Inject()
    private users: UserService;

    /**
     * Gets a resource: One User
     * @param {User} user
     * @returns {Promise<any>}
     */
    @Get('/:id')
    async getUserByID(@Param('id') userId: string): Promise<any> {
        let result: User;
        try {
            result = await this.users.getUserById(userId);
        } catch (err) {
            console.error(err);
        }
        return result;
    }

    /**
     * Gets a resource: One User Avatar
     * @param {User} user
     * @returns {Promise<any>}
     */
    @Get('/:id/avatar')
    async getUserAvatarByID(@Param('id') userId: string): Promise<any> {
        let result: string;
        try {
            result = await this.users.getAvatarByUserId(userId);
        } catch (err) {
            console.error(err);
        }
        return result;
    }

    /**
     * Gets a resource: One User Avatar
     * @param {User} user
     * @returns {Promise<any>}
     */
    @Delete('/:id/avatar')
    async deleteUserAvatarByID(@Param('id') userId: string): Promise<any> {
        let result: string;
        try {
            result = await this.users.deleteAvatarByUserId(userId);
        } catch (err) {
            console.error(err);
        }
        return result;
    }

}



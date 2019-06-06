"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("../../services/UserService");
/**
 * Sample web controller.
 */
let ApiUserController = class ApiUserController {
    /**
     * Gets a resource: One User
     * @param {User} user
     * @returns {Promise<any>}
     */
    getUserByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.users.getUserById(userId);
            }
            catch (err) {
                console.error(err);
            }
            return result;
        });
    }
    /**
     * Gets a resource: One User Avatar
     * @param {User} user
     * @returns {Promise<any>}
     */
    getUserAvatarByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.users.getAvatarByUserId(userId);
            }
            catch (err) {
                console.error(err);
            }
            return result;
        });
    }
    /**
     * Gets a resource: One User Avatar
     * @param {User} user
     * @returns {Promise<any>}
     */
    deleteUserAvatarByID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.users.deleteAvatarByUserId(userId);
            }
            catch (err) {
                console.error(err);
            }
            return result;
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", UserService_1.UserService)
], ApiUserController.prototype, "users", void 0);
__decorate([
    routing_controllers_1.Get('/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiUserController.prototype, "getUserByID", null);
__decorate([
    routing_controllers_1.Get('/:id/avatar'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiUserController.prototype, "getUserAvatarByID", null);
__decorate([
    routing_controllers_1.Delete('/:id/avatar'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiUserController.prototype, "deleteUserAvatarByID", null);
ApiUserController = __decorate([
    routing_controllers_1.JsonController('/api/user')
], ApiUserController);
exports.ApiUserController = ApiUserController;
//# sourceMappingURL=ApiUserController.js.map
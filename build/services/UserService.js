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
const rp = require("request-promise-native");
const ResourceProvider_1 = require("../services/ResourceProvider");
/**
 * Default service for the users.
 */
let UserService = class UserService {
    constructor(config) {
        this.config = config;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                const temp = yield rp(`${this.config.sample.apiUrl}/api/users/${userId}`);
                result = JSON.parse(temp).data;
            }
            catch (err) {
                throw new Error('User not found');
            }
            return result;
        });
    }
    getAvatarByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            const avatarUrl = user.avatar;
            return this.resource.getBase64Avatar(avatarUrl);
        });
    }
    deleteAvatarByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            const avatarUrl = user.avatar;
            return this.resource.deleteAvatar(avatarUrl);
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", ResourceProvider_1.ResourceProvider)
], UserService.prototype, "resource", void 0);
UserService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('config')),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map
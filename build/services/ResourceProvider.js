"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const fsP = require('fs').promises;
const fs = require("fs");
const request = require("request");
/**
 * Resource service for filesystem management
 */
let ResourceProvider = class ResourceProvider {
    tokenizeAvatar(avatarUrl) {
        return avatarUrl.replace('https://s3.amazonaws.com/', '').replace(/\//g, '.');
    }
    makePath(token) {
        return `${__dirname}/../../avatars/${token}`;
    }
    getFileFromFs(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let file;
            try {
                file = yield fsP.readFile(this.makePath(token), { encoding: 'base64' });
            }
            catch (err) {
                file = false;
            }
            return file;
        });
    }
    saveToFs(avatarUrl, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const stream = fs.createWriteStream(this.makePath(token));
                stream.on('close', resolve);
                stream.on('error', reject);
                request(avatarUrl).pipe(stream);
            });
        });
    }
    getBase64Avatar(avatarUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatarToken = this.tokenizeAvatar(avatarUrl);
            const data = yield this.getFileFromFs(avatarToken);
            if (data === false) {
                try {
                    yield this.saveToFs(avatarUrl, avatarToken);
                }
                catch (err) {
                    console.error(err);
                }
            }
            return this.getFileFromFs(avatarToken);
        });
    }
    deleteAvatar(avatarUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.tokenizeAvatar(avatarUrl);
            try {
                yield fsP.unlink(this.makePath(token));
            }
            catch (err) { }
            return 'Deleted file';
        });
    }
};
ResourceProvider = __decorate([
    typedi_1.Service()
], ResourceProvider);
exports.ResourceProvider = ResourceProvider;
//# sourceMappingURL=ResourceProvider.js.map
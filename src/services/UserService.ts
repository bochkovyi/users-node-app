import {User} from '../model/User';
import {OrmRepository} from 'typeorm-typedi-extensions';
import { Service, Inject } from 'typedi';
import * as rp from 'request-promise-native';
import { ResourceProvider } from '../services/ResourceProvider';
/**
 * Default service for the users.
 */
@Service()
export class UserService {

    @Inject()
    private resource: ResourceProvider;

    constructor (@Inject('config') private config: any) {}

    public async getUserById(userId: string) {
        let result: User;
        try {
            const temp = await rp(`${this.config.sample.apiUrl}/api/users/${userId}`);
            result = JSON.parse(temp).data;
        } catch (err) {
            throw new Error('User not found');
        }
        return result;
    }

    public async getAvatarByUserId(userId: string) {
        const user = await this.getUserById(userId);
        const avatarUrl = user.avatar;
        return this.resource.getBase64Avatar(avatarUrl);
    }

    public async deleteAvatarByUserId(userId: string) {
      const user = await this.getUserById(userId);
      const avatarUrl = user.avatar;
      return this.resource.deleteAvatar(avatarUrl);
  }

}

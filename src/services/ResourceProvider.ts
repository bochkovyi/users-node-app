import { Service, Inject } from 'typedi';
import * as path from 'path';
const fsP = require('fs').promises;
import * as fs from 'fs';
import * as request from 'request';

/**
 * Resource service for filesystem management
 */
@Service()
export class ResourceProvider {
    private tokenizeAvatar(avatarUrl: string) {
      return avatarUrl.replace('https://s3.amazonaws.com/', '').replace(/\//g, '.');
    }

    private makePath(token: string) {
      return `${__dirname}/../../avatars/${token}`;
    }

    private async getFileFromFs(token: string) {
      let file;
      try {
        file = await fsP.readFile(this.makePath(token), { encoding: 'base64' });
      } catch (err) {
        file = false;
      }
      return file;
    }

    private async saveToFs(avatarUrl: string, token: string) {
      return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(this.makePath(token));
        stream.on('close', resolve);
        stream.on('error', reject);
        request(avatarUrl).pipe(stream);
      })
    }

    async getBase64Avatar(avatarUrl: string) {
      const avatarToken = this.tokenizeAvatar(avatarUrl);
      const data = await this.getFileFromFs(avatarToken);
      if (data === false) {
        try {
          await this.saveToFs(avatarUrl, avatarToken);
        } catch (err) {
          console.error(err);
        }
      }
      return this.getFileFromFs(avatarToken);
    }

    async deleteAvatar(avatarUrl: string) {
      const token = this.tokenizeAvatar(avatarUrl);

      try {
        await fsP.unlink(this.makePath(token));
      } catch (err) { }
      return 'Deleted file';
    }
}

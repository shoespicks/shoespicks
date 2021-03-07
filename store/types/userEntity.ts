import UserCredential = firebase.auth.UserCredential;

// DBに保存するデータ型
export interface UserEntity {
  id: string;

  // 表示名
  displayName?: string | null;

  // アカウント名 twitterのアカウントId等
  accountName?: string | null;

  iconUrl?: string | null;

  // 認証先のサービス twitter | facebook | google
  provider?: string;

  prof?: string;
}

// フロントで扱うユーザ情報のデータ型
export class UserModel {
  id!: string;

  // 表示名
  displayName?: string | null;

  // アカウント名 twitterのアカウントId等
  accountName?: string | null;

  iconUrl?: string | null;

  // 認証先のサービス twitter | facebook | google
  provider?: string;

  prof?: string;

  constructor(entity: UserEntity);
  constructor(entity: Partial<UserModel>);
  constructor(entity: UserCredential);

  constructor(entity: any) {
    if (this.isUser(entity)) {
      console.log('ユーザー情報だよ');
      console.log(entity);
      Object.assign(this, entity);
    } else {
      this.id = entity.user?.uid || '';

      if (entity.user?.displayName) {
        this.displayName = entity.user?.displayName;
      }

      if (entity.additionalUserInfo?.username) {
        this.accountName = entity.additionalUserInfo?.username;
      }

      if (entity.additionalUserInfo?.profile.name) {
        this.prof = entity.additionalUserInfo?.profile.name;
      }

      // google.com,twitter.com
      if (
        entity.credential?.providerId == 'twitter.com' ||
        entity.credential?.providerId == 'google.com'
      ) {
        this.iconUrl = entity.user?.photoURL;
      }
      // facebook.com
      if (entity.credential?.providerId === 'facebook.com') {
        this.iconUrl = entity.additionalUserInfo?.profile.picture.data.url;
      }

      if (entity.credential?.providerId) {
        this.provider = entity.credential?.providerId;
      }
    }
  }

  private isUser(entity: any): entity is UserEntity | Partial<UserModel> {
    return entity !== null && typeof entity === 'object' && typeof entity?.id === 'string';
  }
}

import UserCredential = firebase.auth.UserCredential;

// DBに保存するデータ型
export interface UserEntity {
  id: string;

  // 表示名
  displayName?: string | null;

  // アカウント名 twitterのアカウントId等
  accountName?: string | null;

  iconUrl?: string | null;

  // 認証先のサービス twitter | google
  provider?: string;
}

// フロントで扱うユーザ情報のデータ型
export class UserModel {
  id!: string;

  // 表示名
  displayName?: string | null;

  // アカウント名 twitterのアカウントId等
  accountName?: string | null;

  iconUrl?: string | null;

  // 認証先のサービス twitter | google
  provider?: string;

  constructor(entity: UserEntity);
  constructor(entity: Partial<UserModel>);
  constructor(entity: UserCredential);

  constructor(entity: any) {
    if (this.isUser(entity)) {
      console.log(entity)
      Object.assign(this, entity);
    } else {
      this.id = entity.user?.uid || '';

      if (entity.user?.displayName) {
        this.displayName = entity.user?.displayName;
      }

      if (entity.additionalUserInfo?.username) {
        this.accountName = entity.additionalUserInfo?.username;
      }

      if (entity.user?.photoURL) {
        this.iconUrl = entity.user?.photoURL;
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

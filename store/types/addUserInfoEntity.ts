import { UserModel } from '~/store/types/userEntity';

export interface AddUserInfoEntity {
  body?: string | null;
  userId?: string | null;
  replies?: { [id: string]: AddUserInfoEntity } | null;
}

export class AddUserInfoModel {
  id?: string;
  body?: string;
  user?: UserModel;
  replies?: AddUserInfoModel[];

  constructor(init?: Partial<AddUserInfoModel>) {
    Object.assign(this, init);
  }

  getEntity(): AddUserInfoEntity {
    return {
      body: this.body || null,
      userId: this.user?.id || null,
      // repliesは一旦無視
    };
  }
}

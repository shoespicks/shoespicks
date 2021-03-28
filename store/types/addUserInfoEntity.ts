import { UserModel } from '~/store/types/userEntity';

export interface AddUserInfoEntity {
  body?: string | null;
  birthday?: string | null;
  sex?: string | null;
  liveArea?: string | null;
  TFHistory?: number | null;
  specialty?: string | null;
  bestRecord?: string | null;
  nowSpikeMaker?: string | null;
  nowSpikeName?: string | null;
  belongs?: string | null;
  userId?: string | null;
  replies?: { [id: string]: AddUserInfoEntity } | null;
}

export class AddUserInfoModel {
  id?: string;
  body?: string;
  birthday?: string;
  sex?: string;
  liveArea?: string;
  TFHistory?: number;
  specialty?: string;
  bestRecord?: string;
  nowSpikeMaker?: string;
  nowSpikeName?: string;
  belongs?: string;
  user?: UserModel;
  replies?: AddUserInfoModel[];

  constructor(init?: Partial<AddUserInfoModel>) {
    Object.assign(this, init);
  }

  getEntity(): AddUserInfoEntity {
    return {
      body: this.body || null
      // repliesは一旦無視
    };
  }
}

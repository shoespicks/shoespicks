import { UserModel } from '~/store/types/userEntity';

export interface CommentEntity {
  body?: string | null;
  userId?: string | null;
  date?: number | null;
  replies?: { [id: string]: CommentEntity } | null;
}

export class CommentModel {
  id?: string;
  body?: string;
  user?: UserModel;
  date?: Date;
  replies?: CommentModel[];

  constructor(init?: Partial<CommentModel>) {
    Object.assign(this, init);
  }

  getEntity(): CommentEntity {
    return {
      body: this.body || null,
      userId: this.user?.id || null,
      date: this.date?.getTime()
      // repliesは一旦無視
    };
  }
}

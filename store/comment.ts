import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { CommentModel, CommentEntity } from '~/store/types/commentEntity';
import { $commentRepository, $userRepository } from '~/plugins/repository';
import { authStore } from '~/store';
import { UserEntity, UserModel } from '~/store/types/userEntity';

@Module({
  name: 'comment',
  stateFactory: true,
  namespaced: true
})
export default class Comment extends VuexModule {
  private _comments: { spikeId: string; comments: CommentModel[] }[] = [];

  public get allSpikeComments() {
    return this._comments;
  }

  get spikeComments(): (spikeId: string) => CommentModel[] | undefined {
    return (spikeId: string) => {
      return this._comments.find((comment) => comment.spikeId === spikeId)?.comments;
    };
  }

  @Mutation setSpikeComments(val: { spikeId: string; comments: CommentModel[] }) {
    if (!val.spikeId) {
      return;
    }

    const comment = this._comments.find((comment) => comment.spikeId === val.spikeId);

    if (comment) {
      comment.comments = val.comments;
    }
    this._comments.push({ spikeId: val.spikeId, comments: val.comments });

    console.log(comment);
  }

  @Mutation addSpikeComment(val: { spikeId: string; comment: CommentModel }) {
    if (!val.spikeId) {
      return;
    }

    const comment = this._comments.find((comment) => comment.spikeId === val.spikeId);
    if (!comment?.comments) {
      return;
    }
    comment.comments.push(val.comment);
  }

  @Action({ rawError: true })
  public async postSpikeComment(args: {
    spikeId: string;
    commentBody: string;
    commentName: string;
    starRate: number;
  }) {
    console.log(args.spikeId);
    console.log(args.commentBody);
    console.log(args.commentName);
    console.log(args.starRate);

    return $commentRepository
      .createBySpikeId(args.spikeId, {
        body: args.commentBody || null,
        commentName: args.commentName || null,
        starRate: args.starRate || null,
        userId: authStore.user?.id || null,
        date: new Date().getTime(),
        replies: null
      })
      .then((result) => {
        this.fetchSpikeComments(args.spikeId);
        console.log('コメント投稿完了');
        console.log(result);
      });
  }

  @Action({ rawError: true })
  public async fetchSpikeComments(spikeId: string) {
    return $commentRepository
      .getBySpikeId(spikeId)
      .then((result: { [id: string]: CommentEntity }) => {
        if (!result) {
          return;
        }

        this.setSpikeComments({ spikeId, comments: [] });

        Object.entries(result).forEach(([entryId, entryComment]) => {
          console.log(this.addSpikeComment);
          if (!entryComment.userId) {
            this.addSpikeComment({
              spikeId,
              comment: new CommentModel({
                id: entryId,
                body: entryComment.body || undefined,
                commentName: entryComment.commentName || undefined,
                starRate: entryComment.starRate || undefined,
                user: undefined,
                date: !!entryComment.date ? new Date(entryComment.date) : undefined
              })
            });
          }

          // TODO Storeからとるようにする
          $userRepository.getById(entryComment.userId).then((user: UserEntity | null) => {
            this.addSpikeComment({
              spikeId,
              comment: new CommentModel({
                id: entryId,
                body: entryComment.body || undefined,
                commentName: entryComment.commentName || undefined,
                starRate: entryComment.starRate || undefined,
                user: user ? new UserModel(user) : undefined,
                date: !!entryComment.date ? new Date(entryComment.date) : undefined
              })
            });
          });
        });

        return result;
      });
  }
}

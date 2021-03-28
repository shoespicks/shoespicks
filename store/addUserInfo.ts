import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AddUserInfoModel, AddUserInfoEntity } from '~/store/types/addUserInfoEntity';
import { $addUserInfoRepository, $userRepository } from '~/plugins/repository';
import { authStore } from '~/store';
import { UserEntity, UserModel } from '~/store/types/userEntity';

@Module({
  name: 'addUserInfo',
  stateFactory: true,
  namespaced: true
})
export default class AddUserInfo extends VuexModule {
  private _addUserInfos: { userId: string; addUserInfos: AddUserInfoModel[] }[] = [];

  public get allUserAddUserInfos() {
    return this._addUserInfos;
  }

  get userAddUserInfos(): (userId: string) => AddUserInfoModel[] | undefined {
    return (userId: string) => {
      return this._addUserInfos.find((addUserInfo) => addUserInfo.userId === userId)?.addUserInfos;
    };
  }

  @Mutation setUserAddUserInfos(val: { userId: string; addUserInfos: AddUserInfoModel[] }) {
    if (!val.userId) {
      return;
    }

    const addUserInfo = this._addUserInfos.find((addUserInfo) => addUserInfo.userId === val.userId);

    if (addUserInfo) {
      addUserInfo.addUserInfos = val.addUserInfos;
    }
    this._addUserInfos.push({ userId: val.userId, addUserInfos: val.addUserInfos });

    console.log(addUserInfo);
  }

  @Mutation addUserAddUserInfo(val: { userId: string; addUserInfo: AddUserInfoModel }) {
    if (!val.userId) {
      return;
    }

    const addUserInfo = this._addUserInfos.find((addUserInfo) => addUserInfo.userId === val.userId);
    if (!addUserInfo?.addUserInfos) {
      return;
    }
    addUserInfo.addUserInfos.push(val.addUserInfo);
  }

  @Action({ rawError: true })
  public async postUserAddUserInfo(args: {
    userId: any;
    birthday: string;
    sex: string;
    liveArea: string;
    TFHistory: number;
    specialty: string;
    bestRecord: string;
    nowSpikeMaker: string;
    nowSpikeName: string;
    belongs: string;
  }) {
    // postUserAddUserInfo(args: { userId: string })　・・・本当はStringにしたい
    console.log(args.userId);

    return $addUserInfoRepository
      .createByUserId(args.userId, {
        birthday: args.birthday || null,
        sex: args.sex || null,
        liveArea: args.liveArea || null,
        TFHistory: args.TFHistory || null,
        specialty: args.specialty || null,
        bestRecord: args.bestRecord || null,
        nowSpikeMaker: args.nowSpikeMaker || null,
        nowSpikeName: args.nowSpikeName || null,
        belongs: args.belongs || null,
        userId: args.userId || null, // userId: authStore.user?.id || null,
        replies: null
      })
      .then((result) => {
        this.fetchUserAddUserInfos(args.userId);
        console.log('追加ユーザー情報収集完了');
        console.log(result);
      });
  }

  @Action({ rawError: true })
  public async fetchUserAddUserInfos(userId: string) {
    return $addUserInfoRepository
      .getByUserId(userId)
      .then((result: { [id: string]: AddUserInfoEntity }) => {
        if (!result) {
          return;
        }

        this.setUserAddUserInfos({ userId, addUserInfos: [] });

        Object.entries(result).forEach(([entryId, entryAddUserInfo]) => {
          console.log(this.addUserAddUserInfo);
          if (!entryAddUserInfo.userId) {
            this.addUserAddUserInfo({
              userId,
              addUserInfo: new AddUserInfoModel({
                id: entryId,
                birthday: entryAddUserInfo.birthday || undefined,
                sex: entryAddUserInfo.sex || undefined,
                liveArea: entryAddUserInfo.liveArea || undefined,
                TFHistory: entryAddUserInfo.TFHistory || undefined,
                specialty: entryAddUserInfo.specialty || undefined,
                bestRecord: entryAddUserInfo.bestRecord || undefined,
                nowSpikeMaker: entryAddUserInfo.nowSpikeMaker || undefined,
                nowSpikeName: entryAddUserInfo.nowSpikeName || undefined,
                belongs: entryAddUserInfo.belongs || undefined,
                user: undefined
              })
            });
          }

          // TODO Storeからとるようにする
          $userRepository.getById(entryAddUserInfo.userId).then((user: UserEntity | null) => {
            this.addUserAddUserInfo({
              userId,
              addUserInfo: new AddUserInfoModel({
                id: entryId,
                birthday: entryAddUserInfo.birthday || undefined,
                sex: entryAddUserInfo.sex || undefined,
                liveArea: entryAddUserInfo.liveArea || undefined,
                TFHistory: entryAddUserInfo.TFHistory || undefined,
                specialty: entryAddUserInfo.specialty || undefined,
                bestRecord: entryAddUserInfo.bestRecord || undefined,
                nowSpikeMaker: entryAddUserInfo.nowSpikeMaker || undefined,
                nowSpikeName: entryAddUserInfo.nowSpikeName || undefined,
                belongs: entryAddUserInfo.belongs || undefined,
                user: user ? new UserModel(user) : undefined
              })
            });
          });
        });

        return result;
      });
  }
}

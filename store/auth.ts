import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { UserModel } from '~/store/types/userEntity';
import { $authRepository, $userRepository } from '~/plugins/repository';

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private _user: UserModel | null = null;

  public get user() {
    return this._user;
  }

  @Mutation set(user: UserModel) {
    if (!user.id) {
      return;
    }
    this._user = user;
  }

  @Mutation
  private remove() {
    this._user = null;
  }

  /**
   * リロードや直リンクアクセス時、ログイン済みユーザをstoreにセットする
   * firebase認証のonAuthStateChangedから呼び出す
   */
  @Action({ rawError: true })
  public setAuthUserById(userId: string): void {
    if (!userId) {
      return;
    }

    $userRepository.getById(userId).then((user: any) => {
      if (!user) {
        return;
      }

      this.set(user);
      console.log(user);
    });
  }

  @Action({ rawError: true })
  public async loginWithTwitter(): Promise<UserModel | null> {
    return (
      $authRepository
        // Twitterから情報くる
        .signInWithTwitter()
        .then((result) => {
          console.log('⓪result');
          console.log(result);
          if (!result.user?.uid) {
            return null;
          }
          // firebaceのユーザー情報をとる（userData）
          const userData = $userRepository.getById(result.user?.uid);

          console.log('①userData');
          console.log(userData);

          // firebaseにあるデータとtwitter側で持っているデータを結合する（combinedResult）
          const combinedResult = Object.assign(userData, result);

          console.log('⓪+①=②combinedResult');
          console.log(combinedResult);

          // UserModelに当てはめる
          const user = new UserModel(combinedResult);

          console.log('③userだよーーーーー');
          console.log(user);

          // vuexの中にあるstore上書き
          this.set(user);

          // firebase(db)の上書き
          $userRepository.upsert(user).then();
          return user;
        })
        .catch((e) => {
          console.log('認証に失敗しました');
          console.log(e);
          return e;
        })
    );
  }

  @Action({ rawError: true })
  public async loginWithFacebook(): Promise<UserModel | null> {
    return $authRepository
      .signInWithFacebook()
      .then((result) => {
        console.log(result);
        if (!result.user?.uid) {
          return null;
        }

        const user = new UserModel(result);
        console.log('const user = new UserModel(result);');
        console.log(user);
        this.set(user);
        $userRepository.upsert(user).then();
        return user;
      })
      .catch((e) => {
        console.log('認証に失敗しました');
        console.log(e);
        return e;
      });
  }

  @Action({ rawError: true })
  public async loginWithGoogle(): Promise<UserModel | null> {
    return $authRepository
      .signInWithGoogle()
      .then((result) => {
        console.log(result);
        if (!result.user?.uid) {
          return null;
        }

        const user = new UserModel(result);
        console.log(user);
        this.set(user);
        $userRepository.upsert(user);
        return user;
      })
      .catch((e) => {
        console.log('認証に失敗しました');
        console.log(e);
        return e;
      });
  }

  @Action({ rawError: true })
  public async logout(): Promise<void> {
    return $authRepository.signOut().then((result) => {
      this.remove();
      return;
    });
  }
}

import firebase from '~/plugins/firebase';
import Auth = firebase.auth.Auth;
import { UserEntity, UserModel } from '~/store/types/userEntity';

export class UserRepository {
  private readonly firebaseAuthConnection: Auth;

  constructor() {
    this.firebaseAuthConnection = firebase.auth();
  }
  /**
   * id元にfirebaseからユーザー情報をとってくる
   * @param userId　ユーザーの一意なid
   * @returns firebaseからユーザー情報/firebaseに情報なければnull
   */
  getById(userId: string | null = ''): Promise<UserEntity | null> {
    if (!userId) {
      return Promise.resolve(null);
    }
    let Ref = firebase.database().ref(`/users/${userId}`);
    return Ref.once('value').then(function (snapshot) {
      return snapshot.val() as UserEntity;
    });
  }

  /**
   * socialLogin時に取得する値をfirebaceに上書きする
   * @param user
   * @returns
   */
  upsert(user: UserModel): Promise<any> {
    let Ref = firebase.database().ref(`/users/${user.id}`);
    // set：全体上書き｜update：あるものだけ上書き
    return Ref.update(user);
  }
}

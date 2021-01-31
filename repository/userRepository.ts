import firebase from '~/plugins/firebase';
import Auth = firebase.auth.Auth;
import {UserEntity, UserModel} from '~/store/types/userEntity';

export class UserRepository {
  private readonly firebaseAuthConnection: Auth;

  constructor() {
    this.firebaseAuthConnection = firebase.auth();
  }

  getById(userId: string | null = ''): Promise<UserEntity | null> {
    if (!userId) {
      return Promise.resolve(null);
    }
    let Ref = firebase.database().ref(`/users/${userId}`);
    return Ref.once('value').then(function (snapshot) {
      return snapshot.val() as UserEntity;
    });
  }

  upsert(user: UserModel): Promise<any> {
    let Ref = firebase.database().ref(`/users/${user.id}`);
    return Ref.set(user);
  }
}

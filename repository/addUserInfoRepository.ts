import firebase from '~/plugins/firebase';
import Auth = firebase.auth.Auth;
import { AddUserInfoEntity, AddUserInfoModel } from '~/store/types/addUserInfoEntity';
import {UserEntity, UserModel} from '~/store/types/userEntity';
import ThenableReference = firebase.database.ThenableReference;

export class AddUserInfoRepository {
  private readonly firebaseAuthConnection: Auth;

  constructor() {
    this.firebaseAuthConnection = firebase.auth();
  }

  getByUserId(userId: string): Promise<any> {
    let Ref = firebase.database().ref(`/addUserInfos/${userId}`);
    return Ref.once('value').then((snapshot) => {
      console.log(snapshot);
      return snapshot.val();
    });
  }

  createByUserId(user: UserModel, addUserInfo: AddUserInfoEntity): ThenableReference {
    console.log(addUserInfo);
    let Ref = firebase.database().ref(`/addUserInfos/${user.id}`);
    return Ref.push(addUserInfo);
  }
}

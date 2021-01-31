import firebase from '~/plugins/firebase';
import Auth = firebase.auth.Auth;
import { CommentEntity, CommentModel } from '~/store/types/commentEntity';
import ThenableReference = firebase.database.ThenableReference;

export class CommentRepository {
  private readonly firebaseAuthConnection: Auth;

  constructor() {
    this.firebaseAuthConnection = firebase.auth();
  }

  getBySpikeId(spikeId: string): Promise<any> {
    let Ref = firebase.database().ref(`/comments/${spikeId}`);
    return Ref.once('value').then((snapshot) => {
      console.log(snapshot);
      return snapshot.val();
    });
  }

  createBySpikeId(spikeId: string, comment: CommentEntity): ThenableReference {
    console.log(comment);
    let Ref = firebase.database().ref(`/comments/${spikeId}`);
    return Ref.push(comment);
  }
}

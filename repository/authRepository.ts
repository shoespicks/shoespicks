import firebase from '~/plugins/firebase';
import UserCredential = firebase.auth.UserCredential;
import Auth = firebase.auth.Auth;

export class AuthRepository {
  private readonly twitterAuthProvider: firebase.auth.TwitterAuthProvider;
  private readonly facebookAuthProvider: firebase.auth.FacebookAuthProvider;
  private readonly googleAuthProvider: firebase.auth.GoogleAuthProvider;
  private readonly firebaseAuthConnection: Auth;

  constructor() {
    this.firebaseAuthConnection = firebase.auth();
    this.twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
    this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  signInWithTwitter(): Promise<UserCredential> {
    return this.firebaseAuthConnection.signInWithPopup(this.twitterAuthProvider);
  }

  signInWithFacebook(): Promise<UserCredential> {
    return this.firebaseAuthConnection.signInWithPopup(this.facebookAuthProvider);
  }

  signInWithGoogle(): Promise<UserCredential> {
    return this.firebaseAuthConnection.signInWithPopup(this.googleAuthProvider);
  }

  signOut(): Promise<void> {
    return this.firebaseAuthConnection.signOut();
  }
}

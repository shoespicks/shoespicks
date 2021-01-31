import firebase from '~/plugins/firebase';
import { authStore } from '~/store';

export default () => {
  if (firebase) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then();
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');

      if (!user || authStore.user) {
        return;
      }

      authStore.setAuthUserById(user.uid);
    });
  }
};

import firebase from '@/plugins/firebase';

export default ({ store }) => {
  if (process.client) {
    if (!store.getters['user']) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          store.commit('getData', { uid: user.uid, email: user.email });
          store.commit('switchLogin');
        }
      });
      //   firebase.auth().onAuthStateChanged((user) => {
      //     if (user) {
      //       store.dispatch('login', user);
      //     }
      //   });
    }
  }
};

import firebase from '~/plugins/firebase';

export const state = () => ({
  user: {
    uid: '',
    email: ''
  }
});

export const getters = {
  user: (state) => {
    return state.user;
  }
};

export const actions = {
  login({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log('成功！');
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            commit('getData', { uid: user.uid, email: user.email });
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
};

export const mutations = {
  getData(state, payload) {
    state.user.uid = payload.uid;
    state.user.email = payload.email;
  }
};

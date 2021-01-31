import firebase from '~/plugins/firebase';

export const state = () => ({
  user: {
    uid: '',
    email: '',
    login: false
  }
});

export const getters = {
  user: (state) => {
    return state.user;
  }
};

export const actions = {
  login({ dispatch }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log('成功！');
        dispatch('permanentLogin');
        console.log('永続化！！');
        dispatch('checkLogin');
        console.log('ログイン保持！');
      })
      .catch((error) => {
        alert(error);
      });
  },
  permanentLogin() {
    // ログイン状態の永続化
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log('永続化してるよ！！');
        // return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
        return firebase.auth().signInWithRedirect(payload.email, payload.password);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  },
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { uid: user.uid, email: user.email });
        commit('switchLogin');
      }
    });
  },

  // 機能しない→mutationsの方で実装している
  // logout() {
  //   firebase.auth().signOut();
  // },

  loginWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      // .signInWithRedirect(provider)
      .then((result) => {
        console.log('resultだよ');
        console.log(result);
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = credential.accessToken;
        var secret = credential.secret;

        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  },

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      // .signInWithRedirect(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
};

export const mutations = {
  getData(state, payload) {
    state.user.uid = payload.uid;
    state.user.email = payload.email;
  },
  switchLogin(state) {
    state.user.login = true;
  },
  isLogout(state) {
    state.user.login = false;
  }
};

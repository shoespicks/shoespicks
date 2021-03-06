import { Store } from 'vuex';

import { getModule } from 'vuex-module-decorators';
import UserStore from '~/store/user';
import AuthStore from '~/store/auth';
import CommentStore from '~/store/comment';
import AddUserInfoStore from '~/store/addUserInfo';

/**
 * vuex-module-decorators用の設定
 * storeを増やすたびに追加する
 */

let userStore: UserStore;
let authStore: AuthStore;
let commentStore: CommentStore;
let addUserInfoStore: AddUserInfoStore;

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserStore, store);
  authStore = getModule(AuthStore, store);
  commentStore = getModule(CommentStore, store);
  addUserInfoStore = getModule(AddUserInfoStore, store);
}

export { authStore, userStore, commentStore, addUserInfoStore };

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

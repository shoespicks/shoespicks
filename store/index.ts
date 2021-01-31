import { Store } from 'vuex';

import { getModule } from 'vuex-module-decorators';
import UserStore from '~/store/user';
import AuthStore from '~/store/auth';
import CommentStore from '~/store/comment';

/**
 * vuex-module-decorators用の設定
 * storeを増やすたびに追加する
 */

let userStore: UserStore;
let authStore: AuthStore;
let commentStore: CommentStore;

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserStore, store);
  authStore = getModule(AuthStore, store);
  commentStore = getModule(CommentStore, store);
}

export { authStore, userStore, commentStore };

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

import { authStore } from '~/store';

export default function ({ route, Store, redirect }) {
  console.log('authCheck!!');
  console.log(authStore.user?.id);
  // !!はbooleanになるから"ture""false"になる
  // /loginにいない時　&&　ユーザーがsocialログインしてる時　&&　hogeが””の時
  if (!route.name == 'login' && !authStore.user?.id == null && authStore.user?.hoge == null) {
    console.log('if入りました〜');
    return redirect('/login');
  } else {
    return;
  }
}

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { UserModel } from '~/store/types/userEntity';

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private users: UserModel[] = [];

  public get getUsers() {
    return this.users;
  }

  public get getUser() {
    return (id: string) => this.users.find((todo) => todo.id === id);
  }

  @Mutation
  private add(todo: UserModel) {
    this.users.push(todo);
  }

  @Mutation
  private remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  @Mutation set(users: UserModel[]) {
    this.users = users;
  }

  @Action({ rawError: true })
  public async fetchUsers() {
    // const { data } = await $axios.get<UserInfoModel[]>('/api/todos');
    // this.set(data);
  }
}

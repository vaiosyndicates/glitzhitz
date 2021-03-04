import { action, observable } from 'mobx';

export default class SampleStore {

  @observable loading = false

  @action showLoading() {
    this.loading = true
  }

  @action hideLoading() {
    this.loading = false
  }
}

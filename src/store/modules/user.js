import { RESPONSE_TYPE, apiClientSetToken } from '@/services/api-request';
import UserService from '@/services/user-service';

const responseType = RESPONSE_TYPE;

export const namespaced = true;

export const state = {
  user: null,
  token: ''
};

export const mutations = {
  SET_USER_DATA(state, { user = null, token = '' }) {
    state.user = user;
    state.token = token;
    apiClientSetToken(token);
    localStorage.setItem('user', JSON.stringify(state));
  },
  UPDATE_USER_DATA(state, user) {
    state.user = { ...state.user, ...user };
    localStorage.setItem('user', JSON.stringify(state));
  },
  // Mutations Follow Vue's Reactivity Rules:
  // https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
  // When adding new properties to an Object, you should either:
  // Use Vue.set(obj, 'newProp', 123), or
  // Replace that Object with a fresh one.
  UPDATE_USER_AVATAR(state, avatar) {
    state.user = { ...state.user, avatar };
    localStorage.setItem('user', JSON.stringify(state));
  },
  REMOVE_USER_DATA(state) {
    localStorage.removeItem('user');
    // 雖然reload 可以一次清除所有state，但是視覺上不太好
    // location.reload();
    state.user = null;
    state.token = '';
    apiClientSetToken('');
  }
};

export const actions = {
  async signUpUser({ commit }, credentials) {
    // 呼叫 api
    const response = await UserService.signUpUser(credentials);
    if (response.type !== responseType.CONNECT_CORRECT) {
      // 傳達錯誤訊息: notification/add
      // ...
      return response;
    }
    // 沒有錯誤！繼續執行資料處理
    const {
      data: { user, token }
    } = response;
    commit('SET_USER_DATA', { user, token });
    // 傳達正確訊息: notification/add
    // ...
    return response;
  },
  async signInUser({ commit }, credentials) {
    // 呼叫 api
    const response = await UserService.signInUser(credentials);
    if (response.type !== responseType.CONNECT_CORRECT) {
      // 傳達錯誤訊息: notification/add
      return response;
    }
    // 沒有錯誤！繼續執行資料處理
    const {
      data: { user, token }
    } = response;
    commit('SET_USER_DATA', { user, token });
    // 傳達正確訊息: notification/add
    // ...
    return response;
  },
  async signOutUser({ commit }) {
    // 呼叫 api
    const response = await UserService.signOutUser();
    if (response.type !== responseType.CONNECT_CORRECT) {
      // 傳達錯誤訊息: notification/add
      return response;
    }
    // 沒有錯誤！繼續執行資料處理
    const { data: isSignOut } = response;
    if (isSignOut) commit('REMOVE_USER_DATA');
    // 傳達正確訊息: notification/add
    // ...
    return response;
  },
  async getUser({ commit }) {
    // 呼叫 api
    const response = await UserService.getUser();
    if (response.type !== responseType.CONNECT_CORRECT) {
      // 傳達錯誤訊息: notification/add
      // ...
      return response;
    }
    // 沒有錯誤！繼續執行資料處理
    commit('UPDATE_USER_DATA', response.data.user);
    // 傳達正確訊息: notification/add
    // ...
    return response;
  },
  async updateUser({ commit }, userData) {
    // 呼叫 api
    const response = await UserService.updateUser(userData);
    if (response.type !== responseType.CONNECT_CORRECT) {
      // 傳達錯誤訊息: notification/add
      // ...
      return response;
    }
    // 沒有錯誤！繼續執行資料處理
    commit('UPDATE_USER_DATA', response.data.user);
    // 傳達正確訊息: notification/add
    // ...
    return response;
  }
};

export const getters = {
  // 官方文件: https://vuex.vuejs.org/zh/guide/getters.html
  // 你也可以通過讓 getter 返回一個函數，來實現給 getter 傳參。在你對 store 裡的陣列進行查詢時非常有用。
};

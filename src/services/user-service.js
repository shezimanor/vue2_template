import { apiRequest } from './api-request';

export default {
  signUpUser(credentials) {
    return apiRequest({
      method: 'post',
      url: `/users`,
      data: credentials
    });
  },
  signInUser(credentials) {
    return apiRequest({
      method: 'post',
      url: `/users/login`,
      data: credentials
    });
  },
  signOutUser() {
    return apiRequest({
      method: 'post',
      url: `/users/logout`
    });
  },
  getUser() {
    return apiRequest({
      method: 'get',
      url: `/users/me`
    });
  },
  updateUser(userData) {
    return apiRequest({
      method: 'patch',
      url: `/users/me`,
      data: userData
    });
  }
};

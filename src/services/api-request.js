import axios from 'axios';
import NProgress from 'nprogress';
// 新增類型常數，目前僅用於辨識 api response 的類型
export const RESPONSE_TYPE = {
  CONNECT_CORRECT: 'CONNECT_CORRECT',
  CONNECT_ERROR: 'CONNECT_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
};
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_PATH
});

export function apiClientSetToken(token) {
  apiClient.defaults.headers.common['Authorization'] = token;
}

apiClient.interceptors.request.use(
  config => {
    // Called on request
    NProgress.start();
    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  response => {
    // Called on response
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// this encapsulation: to use async/await
export const apiRequest = ({ method, url, data = {}, config = {} }) => {
  switch (method) {
    case 'post':
    case 'put':
    case 'patch':
      return apiClient[method](url, data, config)
        .then(response => {
          // console.log('resolve: ', response);
          const { headers, status, data } = response;
          return {
            type: RESPONSE_TYPE.CONNECT_CORRECT,
            status,
            headers,
            data
          };
        })
        .catch(error => {
          // console.log('reject: ', message);
          if (error.response) {
            const { status, statusText, data } = error.response;
            return {
              type: RESPONSE_TYPE.CONNECT_ERROR,
              status,
              message: data.message || statusText || 'Error! 404'
            };
          } else {
            return {
              type: RESPONSE_TYPE.NETWORK_ERROR,
              message: error.message || 'Network Error!'
            };
          }
        });
    default:
      return apiClient[method](url, config)
        .then(response => {
          // console.log('resolve: ', message);
          const { headers, status, data } = response;
          return {
            type: RESPONSE_TYPE.CONNECT_CORRECT,
            status,
            headers,
            data
          };
        })
        .catch(error => {
          // console.log('reject: ', message);
          if (error.response) {
            const { status, statusText, data } = error.response;
            return {
              type: RESPONSE_TYPE.CONNECT_ERROR,
              status,
              message: data.message || statusText || 'Error! 404'
            };
          } else {
            return {
              type: RESPONSE_TYPE.NETWORK_ERROR,
              message: error.message || 'Network Error!'
            };
          }
        });
  }
};

import axios from "axios";
import router from "../router";
import store from "../store/index";
import { Message } from "element-ui";
/**
 * 提示
 * 加载页
 */

/**
 * 跳转登录页
 * 携带当前页面路由,以期在登录完成后返回当前页面
 */

const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandler = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401 未登录状态, 跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token 过期
    // 清除 token 跳转登录页
    case 403:
      Message.info("登录过期,重新登录 403");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404 请求不存在
    case 404:
      Message.info("请求的资源不存在 404");
      break;
    default:
      // 打印 拦截响应 的错误消息
      console.log(other);
  }
};

// 创建 axios 实例
let instance = axios.create({
  timeout: 1000 * 12
});

// 设置 post 请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * 请求拦截器
 *
 * 请求前如果存在 token 则在请求头中携带 token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

/**
 * 响应拦截器
 */

instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error;
    // 判断存在 response 的情况和 不存在(即断网,超时等状态)的情况
    if (response) {
      // 请求已发出, 但是不在2xx范围
      errorHandler(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      if (!window.navigator.onLine) {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        store.commit("changeNetWork", false); // 改变 store state 中的 network 状态
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;

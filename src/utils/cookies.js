/* 登录信息cookie的操作 */
import Cookies from 'js-cookie';

/* 存储cookie */
export function setCookie(userName) {
  const info = Object.entries(userName); // 二维数组
  for (let i = 0; i < info.length; i += 1) {
    Cookies.set(info[i][0], info[i][1]);
  }
  return true;
}

/* 读取cookie */
export function getCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

/* 删除cookie */
export function removeCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}

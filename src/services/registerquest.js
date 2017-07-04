import { Toast } from 'antd-mobile';
import request from '../utils/request';
import dataURL from '../serverconfig';
import { nTipDuration } from './requestconfig';

let headers = { 
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Accept-Language': 'en-US',
  'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
};


let body = {
  appid: '1003', 
  userid: localStorage.username ? localStorage.username : sessionStorage.username,
  buyername: localStorage.username ? localStorage.username : sessionStorage.username
};

// 请求验证码
// export function getcaptcha(values) {
//   // A-6BHksCzV-1492052088911
//   function randomString(len) {
//     let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var randomString = '';
//     for (var i = 0; i < len; i++) {
//      var randomPoz = Math.floor(Math.random() * charSet.length);
//      randomString += charSet.substring(randomPoz,randomPoz+1);
//     }
//     return randomString;
//   }
//   // 随机八位字符
//   let num = randomString(8);
//   // 当前时间戳
//   var timestamp = Date.parse(new Date()); 
//   let randomNum = 'M'+'-'+ num + '-'+ timestamp
//   let requestURL = dataURL.APISERVER + '/ots/common/captcha/require/'+ randomNum;
//   let requestData = {
//     method: 'GET',
//     headers: { ...headers , ...values.headers }
//   };
//   console.log(requestData)
//   return request( requestURL , requestData );
// }

// 检查验证码是否正确
// export function captchaVerify(values) {
//   const requestURL = dataURL.APISERVER + '/ots/common/captcha/verify';
//   let requestData = {
//     method: 'GET',
//     headers: { ...headers , ...values.headers }
//   };
//   return request( requestURL , requestData );
// }

// 检查邮箱是否被注册
export function checkEmailExist(values) {
  const requestURL = dataURL.APISERVER + '/ots/common/user/checkEmailExist/?email='+values.email;
  let requestData = {
    method: 'GET',
    headers: { ...headers , ...values.headers }
  };
  return request( requestURL , requestData );
}

// 注册提交
export function registerAccount(values) {
  const requestURL = dataURL.APISERVER + '/ots/common/user/registerAccount';
  let requestData = {
    method: 'POST',
    headers: { ...headers , ...values.headers },
    body: JSON.stringify({ ...body , ...values.body })
  };
  Toast.loading('Loading...' , nTipDuration);
  return request( requestURL , requestData );
}

export function test(){
  console.log(123)
}
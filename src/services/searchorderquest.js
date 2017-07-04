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

export function querySearchOrders(values) {
  let URL = values.url;
  const requestURL = dataURL.APISERVER + URL;
  let requestData = {
    method: 'POST',
    headers: { ...headers , ...values.headers },
    body: JSON.stringify({ ...body , ...values.body })
  };
  Toast.loading('Loading...' , nTipDuration);
  return request( requestURL , requestData );
}


import { Toast } from 'antd-mobile';
import request from '../utils/request';
import dataURL from '../serverconfig';
import { nTipDuration } from './requestconfig';

let headers = { 
	'Accept': 'application/json', 
	'Content-Type': 'application/json',
	'Accept-Language': 'en-US' 
};

let body = {
	appid: '1003', 
	userid: null,
	password: null	
};

export function login(values) {
	const requestURL = dataURL.APISERVER + '/order/login';
	let requestData = {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({ ...body , ...values })
	};
	Toast.loading('Loading...' , nTipDuration);
	return request( requestURL , requestData );
}
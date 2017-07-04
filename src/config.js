'use strict';
import React from 'react';


const GA_TRACKING_ID = 'UA-87479842-1'; //from ly
//const GA_TRACKING_ID = 'UA-92795665-1'; //from myself
const DOWNLOAD_APP_URL = 'https://mobile.okchem.com/orkerpage';
const OKCHEM_B2B_URL = 'https://mobile.okchem.com/orkerpage';
//const PDP_URL = 'http://192.168.1.76/productDetail';
const PDP_URL = 'http://192.168.1.96/ordproduct';
const APPNEWS_URL ="https://mobile.okchem.com/searchresult?=&showTab=false&tab=news";

export const RESPONSE_CODE = {

	SUCCESFULL: '0310520000',
	SUCCESFULL_OLD: '0000',

	NOTOKEN: '0310520081',
	NOTOKEN_OLD: '0001',

	TOKEN_INVALID: '0310520082',
	TOKEN_INVALID_OLD: '0002',

	PARAMS_ERROR: '0310520083',
	PARAMS_ERROR_OLD: '0005',

	REQUEST_ERROR: '0310520084',
	REQUEST_ERROR_OLD: '0004',

	NETWORK_ERROR: '0310520085',
	NETWORK_ERROR_OLD: '5000',

	PSW_ERROR: '0310520101',
	PSW_ERROR_OLD: '5001',

	AUTH_ERROR: '0310520102',
	AUTH_ERROR_OLD: '5002',

	SERVER_CRASH: '310520201',
	SERVER_CRASH_OLD: '5002',

	NO_ACCOUNT: '0310520103',
	NO_ACCOUNT_OLD: '5003',

	ACCOUNT_NOT_ACTIVE: '0310520104',
	ACCOUNT_NOT_ACTIVE_OLD: '5004',

	ORDER_NOT_EXIST: '0310520401',
	ORDER_NOT_EXIST_OLD: '1001',

	OLD_PASS_WRONG: '310520701',
	OLD_PASS_WRONG_OLD: '5001',

	REG_EMAIL_EXIST:'0310522402',	//邮箱已被注册
	REG_EMAIL_DISABLED:'0310522405', //邮箱格式不正确
	REG_PASSWORD_MISMATCH:'0310522401',	//两次密码不一致
	REG_CODE_OVERDUE:'0310522404',		//验证码失效
	REG_CODE_MISMATCH:'0310522403'		//验证码错误
}

// Google Analytics Events (regular)
let regularEvent = {
	showLoginScreen: { 
		hitType:'event' , 
		eventCategory:'showLoginScreen' , 
		eventAction:'Enter Login Page' , 
		eventLabel:'Login' , 
		transport:'beacon' 
	},
	showDisclaimerScreen: { 
		hitType:'event' , 
		eventCategory:'showDisclaimerScreen' , 
		eventAction:'Scan Disclaimer' , 
		eventLabel:'Disclaimer' , 
		transport:'beacon' 
	},
	showDashboardScreen: { 
		hitType:'event' , 
		eventCategory:'showDashboardScreen' , 
		eventAction:'Enter Dashboard Page' , 
		eventLabel:'Dashboard' , 
		transport:'beacon' 
	},
	showDashboardOrderList_arrivedin7days: { 
		hitType:'event' , 
		eventCategory:'showDashboardScreen' , 
		eventAction:'Enter orders page that arrived in 7 Days throw dashboard' , 
		eventLabel:'Dashboard_arrivedin7days' , 
		transport:'beacon' 
	},
	showDashboardOrderList_ordersbyday: { 
		hitType:'event' , 
		eventCategory:'showDashboardScreen' , 
		eventAction:'Enter orders page that assign by specified day throw dashboard' , 
		eventLabel:'Dashboard_ordersbyday' , 
		transport:'beacon' 
	},
	showDashboardOrderList_etdchanged: { 
		hitType:'event' , 
		eventCategory:'showDashboardScreen' , 
		eventAction:'Enter ETD changed orders page throw dashboard' , 
		eventLabel:'Dashboard_etdchanged' , 
		transport:'beacon' 
	},
	showDashboardOrderList_ordersbystatus: { 
		hitType:'event' , 
		eventCategory:'showDashboardScreen' , 
		eventAction:'Enter orders page that query by status throw dashboard' , 
		eventLabel:'Dashboard_ordersbystatus' , 
		transport:'beacon' 
	},
	showOrderListScreen: { 
		hitType:'event' , 
		eventCategory:'showOrderListScreen' , 
		eventAction:'Enter orders list page' , 
		eventLabel:'Orders List' , 
		transport:'beacon' 
	},
	showOrderStatusScreen: { 
		hitType:'event' , 
		eventCategory:'showOrderStatusScreen' , 
		eventAction:'Enter order status page' , 
		eventLabel:'Order Status' , 
		transport:'beacon' 
	},
	showOrderDetailsScreen: { 
		hitType:'event' , 
		eventCategory:'showOrderDetailsScreen' , 
		eventAction:'Enter order details page' , 
		eventLabel:'Order Detail' , 
		transport:'beacon' 
	},
	showNotificationListScreen: { 
		hitType:'event' , 
		eventCategory:'showNotificationListScreen' , 
		eventAction:'Enter notifications list page' , 
		eventLabel:'Notifications List' , 
		transport:'beacon' 
	},
	showPictureBrowseScreen: { 
		hitType:'event' , 
		eventCategory:'showPictureBrowseScreen' , 
		eventAction:'Scan loading images' , 
		eventLabel:'Loading image' , 
		transport:'beacon' 
	}
};

// Google Analytics Events (business)
let commonParams = { hitType:'event' , transport:'beacon' };
let businessEvent = {
	clickMainMenu_dashboard: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click dashboard' , eventLabel:'menu_dashboard' } },
	clickMainMenu_myorders: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click my orders' , eventLabel:'menu_myorders' } },
	clickMainMenu_notification: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click notification' , eventLabel:'menu_notification' } },
	clickMainMenu_sharedorders: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click sharedorders' , eventLabel:'menu_sharedorders' } },
	clickMainMenu_assisant: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click assisant' , eventLabel:'menu_assisant' } },
	clickMainMenu_changepsw: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click change password' , eventLabel:'menu_changepassword' } },
	clickMainMenu_logout: { ...commonParams , ...{ eventCategory:'clickMainMenu' , eventAction:'Click logout' , eventLabel:'menu_logout' } },
	hideOrderStatusScreen: { ...commonParams , ...{ eventCategory:'hideOrderStatusScreen' , eventAction:'Leave order status page' , eventLabel:'leave page' } },
	myorderClickOrderItem: { ...commonParams , ...{ eventCategory:'myorderClickOrderItem' , eventAction:'Click an order' , eventLabel:'order' } },
	orderStatusClickToViewOrder: { ...commonParams , ...{ eventCategory:'orderStatusClickToViewOrder' , eventAction:'Click to order detail' , eventLabel:'order detail' } },
	orderStatusClickAttachment: { ...commonParams , ...{ eventCategory:'orderStatusClickAttachment' , eventAction:'Download attachment' , eventLabel:'attachment' } },
	viewFullScreenPic: { ...commonParams , ...{ eventCategory:'viewFullScreenPic' , eventAction:'View hd image' , eventLabel:'tracking_loading_image' } },
	myMessageListClickMsg: { ...commonParams , ...{ eventCategory:'myMessageListClickMsg' , eventAction:'Click to detail' , eventLabel:'notifi_detail' } },
	clickDashboardSection_etdchanged: { ...commonParams , ...{ eventCategory:'clickDashboardSection' , eventAction:'Click to ETD Changed' , eventLabel:'dashboard_etcchanged' } },
	clickDashboardSection_willarrived: { ...commonParams , ...{ eventCategory:'clickDashboardSection' , eventAction:'Click to will arrived' , eventLabel:'dashboard_willarrived' } },
	clickDashboardSection_oneday: { ...commonParams , ...{ eventCategory:'clickDashboardSection' , eventAction:'Click to orderlist by day' , eventLabel:'dashboard_oneday' } },
	clickDashboardSection_bystatus: { ...commonParams , ...{ eventCategory:'clickDashboardSection' , eventAction:'Click to orderlist by status' , eventLabel:'dashboard_bystatus' } },
	viewOStatusItem_arrived: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: arrived' , eventLabel:'viewOStatusItem_arrived' } },
	viewOStatusItem_shippingDoc: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: shipping doc' , eventLabel:'viewOStatusItem_shippingDoc' } },
	viewOStatusItem_onboard: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: onboard' , eventLabel:'viewOStatusItem_onboard' } },
	viewOStatusItem_loading: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: loading' , eventLabel:'viewOStatusItem_loading' } },
	viewOStatusItem_shipping: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: shipping space' , eventLabel:'viewOStatusItem_shippingspace' } },
	viewOStatusItem_production: { ...commonParams , ...{ eventCategory:'viewOStatusItem' , eventAction:'View order status: production' , eventLabel:'viewOStatusItem_production' } },
	orderSearch: { ...commonParams , ...{ eventCategory:'orderSearch' , eventAction:'orderSearch' , eventLabel:'orderSearch' } },
	cancelSharedOrder: { ...commonParams , ...{ eventCategory:'cancelSharedOrder' , eventAction:'cancelSharedOrder' , eventLabel:'cancelSharedOrder' } },
	changePasswordSubmit: { ...commonParams , ...{ eventCategory:'changePasswordSubmit' , eventAction:'changePasswordSubmit' , eventLabel:'changePasswordSubmit' } },
	orkerNewsClick: { ...commonParams , ...{ eventCategory:'orkerNewsClick' , eventAction:'orkerNewsClick' , eventLabel:'orkerNewsClick' } },
	openLivechat: { ...commonParams , ...{ eventCategory:'openLivechat' , eventAction:'openLivechat' , eventLabel:'' } },
	livechatReceivedMsgInSession: { ...commonParams , ...{ eventCategory:'livechatReceivedMsgInSession' , eventAction:'livechatReceivedMsgInSession' , eventLabel:'' } },
	closeLivechat: { ...commonParams , ...{ eventCategory:'closeLivechat' , eventAction:'closeLivechat' , eventLabel:'' } },
	livechatStartSession: { ...commonParams , ...{ eventCategory:'livechatStartSession' , eventAction:'livechatStartSession' , eventLabel:'' } },
	registerSubmit:{ ...commonParams , ...{ eventCategory:'registerSubmit' , eventAction:'registerSubmit' , eventLabel:'registerSubmit' } }
};

export { 
	GA_TRACKING_ID,
  	DOWNLOAD_APP_URL,
  	OKCHEM_B2B_URL,
  	regularEvent,
  	businessEvent,
  	APPNEWS_URL,
  	PDP_URL
};
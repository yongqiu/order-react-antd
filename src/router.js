import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';
import { addLocaleData , IntlProvider } from 'react-intl';

import Login from './routes/login/login';
import OrderList from './routes/orderlist/orderlist';
import Notification from './routes/notification/notification';

import Dashboard from './routes/dashboard/dashboard';
import OrdersEtdChanged from './routes/dashboard/ordersbyetdchanged';
import OrdersByDay from './routes/dashboard/ordersbyday';
import OrdersWith7Days from './routes/dashboard/ordersarrivalwithindays';
import OrdersByStatus from './routes/dashboard/ordersbystatus';

import OrderStatus from './routes/orderstatus/orderstatus';
import OrderDetails from './routes/orderdetails/orderdetails';
//import ProductDescribe from './routes/productdescribe/productdescribe';

import ChangePassword from './routes/changepassword/changepassword';
import ShareOrderList from './routes/sharelist/sharelist';
import ResultOrderList from './routes/resultlist/resultlist';
import Settings from './routes/settings/settings';
import Register from './routes/register/register';

//import Assisant from './routes/assisant/assisant';

import zh from './locales/zh/zh.json';
import en from './locales/en/en.json';
import es from './locales/es/es.json';
import pt from './locales/pt/pt.json';

let langObj = {
    'en': en,
    'zh': zh,
    'es': es,
    'pt': pt
};

function chooseLocale(){
    let navLang = navigator.language.split('_')[0];
    switch(navLang.split('-')[0].toLowerCase()){
        case 'en':
            return langObj.en;
        case 'zh':
            return langObj.zh;
        case 'pt':
            return langObj.pt;
        case 'es':
            return langObj.es;
        default:
            return langObj.en;
    }
}

export default function({ history }) {
  return (
  	<IntlProvider locale={'en'} messages={chooseLocale()}>
        <Router history={history} >
            <Route path='/' component={Login} />
            <Route path='/orderlist' component={OrderList} />
            <Route path='/notifications' component={Notification} />

            <Route path='/dashboard' component={Dashboard} />
            <Route path='/dashboard/etdchanged' component={OrdersEtdChanged} />
            <Route path='/dashboard/ordersbyday' component={OrdersByDay} />
            <Route path='/dashboard/ordersindays' component={OrdersWith7Days} />
            <Route path='/dashboard/ordersbystatus' component={OrdersByStatus} />

            <Route path='/orderstatus' component={OrderStatus} />
            <Route path='/orderdetails' component={OrderDetails} />

            <Route path='/changepsw' component={ChangePassword} />
            <Route path='/register' component={Register} />
            <Route path='/sharelist' component={ShareOrderList} />
            <Route path='/share/:sl' component={ChangePassword} />
            <Route path='/resultlist' component={ResultOrderList} />
            <Route path='/settings' component={Settings} />
        </Router>
    </IntlProvider>
  );
};


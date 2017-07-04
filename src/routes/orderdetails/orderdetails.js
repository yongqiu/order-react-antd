import React, { Component, PropTypes } from 'react';
import { NavBar, Icon , ListView , Toast , RefreshControl  } from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';

import { getOrderDetail } from '../../services/datarequest';
import BasicInfo from './components/basicinfo/basicinfo';
import Products from './components/products/products';
import Payment from './components/payment/payment';
import Delivery from './components/delivery/delivery';
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';

// response code
import { RESPONSE_CODE } from '../../config';

class OrderDetails extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props, context) {
        super(props, context);

        this.dataSource = new ListView.DataSource({
            rowHasChanged: function(){return {}},
        });

        this.requestData = {
            headers: {
                'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
            },
            orderid: this.props.location.query.orderid
        };

        this.state = {
            dataSource: this.dataSource,
            refreshing: false
        }
    }

    componentDidMount() {
        this.requestServer();
        gaPageFilter.gaSetPage( '/orderdetails' , 'Order Detail' );
        loadLiveChat();
        ga( 'send' , regularEvent.showOrderDetailsScreen );
    }

    requestServer() {
        getOrderDetail(this.requestData).then(function(orderDetail){
            Toast.hide();
            switch( orderDetail.data.respcode ) {
                case RESPONSE_CODE.SUCCESFULL_OLD:
                case RESPONSE_CODE.SUCCESFULL : {
                    this.setState({
                        dataSource: this.dataSource.cloneWithRows([orderDetail.data]),
                        refreshing: false
                    }); 
                    return;
                }
                case RESPONSE_CODE.NOTOKEN:
                case RESPONSE_CODE.NOTOKEN_OLD:
                case RESPONSE_CODE.TOKEN_INVALID:
                case RESPONSE_CODE.TOKEN_INVALID_OLD:
                case RESPONSE_CODE.PARAMS_ERROR:
                case RESPONSE_CODE.PARAMS_ERROR_OLD:
                case RESPONSE_CODE.REQUEST_ERROR:
                case RESPONSE_CODE.REQUEST_ERROR_OLD: {
                    Toast.fail( this.props.intl.formatMessage( { id: 'request_tip_serviceError' } , { description: 'Serve Error' } , { defaultMessage: 'Serve Error' }) , 1.5 , () => {
                        delete localStorage.token ? localStorage.token : sessionStorage.token;
                        delete localStorage.username ? localStorage.username : sessionStorage.username;
                        this.context.router.replace('/'); 
                    });                   
                    return;
                }
                case NETWORK_ERROR:
                case NETWORK_ERROR_OLD:{
                    Toast.fail( this.props.intl.formatMessage( { id: 'request_tip_network_error' } , { description: 'Network Error' } , { defaultMessage: 'Network Error' }) , 1.5 );  
                    return;
                }
                default: {
                    break;
                }
            }
        }.bind(this));   
    }

    onNavbarLeftClick() {
        //let url = '/orderstatus?orderid=' + this.props.location.query.orderid;
        //this.context.router.replace(url); 
        this.context.router.goBack(); 
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.requestServer();
    }

    render() {
        const orderDetailItem = (rowData) => {
            const basicInfoProps = {
                basicInfo: {
                    orderNum: rowData.basicInfo.order_num,
                    orderid: rowData.basicInfo.order_id,
                    contractNo: rowData.basicInfo.contract_no,
                    ammount: rowData.basicInfo.order_amount,
                    unit: rowData.basicInfo.currency_desc
                }
            };

            const productsProps = {
                productsInfo: {
                    productsInfo: rowData.productList,
                    unit: rowData.basicInfo.currency_desc,
                    orderid: this.props.location.query.orderid
                }
            };

            const paymentProps = {
                paymentInfo: {
                    crrency: rowData.basicInfo.currency_desc,
                    payment: rowData.paymentTerms
                }
            };

            const deliveryProps = {
                deliveryInfo: {
                    deliveryTerm: rowData.basicInfo.delivery_term_desc,
                    address: rowData.basicInfo.buyer_compy_addr
                }
            };

            return (
                <div>
                    <BasicInfo { ...basicInfoProps } />
                    <Products { ...productsProps } />
                    <Payment { ...paymentProps } />
                    <Delivery { ...deliveryProps } />
                </div>
            );
        };

        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_arrow_left.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onNavbarLeftClick.bind(this)
        };

        return (
            <div className='etdOrdersWrap' style={{ height: '100%' }} id='orderdetailwrap'>
                <div style={{ height: '100%' }} id='orderdetailcontent'>
                    <NavBar { ...navbarProps }>
                        <FormattedMessage id='order_details' description='Order Details' defaultMessage='Order Details' />
                    </NavBar>

                    <ListView className="orderdetailswrap" 
                        dataSource={this.state.dataSource}
                        renderRow={orderDetailItem}
                        initialListSize={2}
                        pageSize={2}
                        scrollRenderAheadDistance={150}
                        style={{
                            height: document.body.clientHeight / 2,
                            border: '1px solid #ddd',
                            margin: '0.1rem 0',
                        }}
                        scrollerOptions={{ scrollbars: true }}
                        refreshControl={
                            <RefreshControl 
                                icon={[
                                    <div key="0" className="am-refresh-control-pull"><Icon type={require('../../assets/svgs/icon_arrow_down.svg')} size="md" /></div> , 
                                    <div key="1" className="am-refresh-control-release"><Icon type={require('../../assets/svgs/icon_arrow_up.svg')} size="md" /></div> 
                                ]} 
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)} 
                            />
                        }
                    />
                </div>

            </div>
        );
    }
}

OrderDetails.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default injectIntl(OrderDetails);

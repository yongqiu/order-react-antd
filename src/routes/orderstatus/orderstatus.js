import React, { Component, PropTypes } from 'react';
import { NavBar, Icon , ListView , Toast , RefreshControl  } from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';

import { getOrderDetail } from '../../services/datarequest';
import OrderSummary from './components/ordersummary/ordersummary';
import OrderPrice from './components/totalprice/totalprice';
import OrderTracking from './components/tracking/tracking';
import ShareButton from './components/sharebutton/sharebutton';
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent , businessEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';
import styles from './orderstatus.css';

// response code
import { RESPONSE_CODE } from '../../config';

class OrderStatus extends Component {
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
            refreshing: false,
            shareSource:{}
        };
    }

    componentDidMount() {
        this.requestServer();
        loadLiveChat();
        gaPageFilter.gaSetPage( '/orderstatus' , 'Order status' );
        ga( 'send' , regularEvent.showOrderStatusScreen );
    }

    componentWillUnmount() {
        ga( 'send' , businessEvent.hideOrderStatusScreen );
    }

    requestServer() {
        let intlGroup = this.props.intl;
        getOrderDetail(this.requestData).then(function(orderDetail){
            Toast.hide();
            switch( orderDetail.data.respcode ) {
                case RESPONSE_CODE.SUCCESFULL_OLD:
                case RESPONSE_CODE.SUCCESFULL : {
                    this.setState({
                        dataSource: this.dataSource.cloneWithRows([orderDetail.data]),
                        refreshing: false,
                        shareSource: orderDetail.data.basicInfo
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
                case RESPONSE_CODE.NETWORK_ERROR:
                case RESPONSE_CODE.NETWORK_ERROR_OLD:{
                    Toast.fail( this.props.intl.formatMessage( { id: 'request_tip_network_error' } , { description: 'Network Error' } , { defaultMessage: 'Network Error' }) , 1.5 );  
                    return;
                }
                case RESPONSE_CODE.ORDER_NOT_EXIST:
                case RESPONSE_CODE.ORDER_NOT_EXIST_OLD:{
                    Toast.fail( this.props.intl.formatMessage( { id: 'order_status_ordernotexist' } , { description: 'Order not exist' } , { defaultMessage: 'Order not exist' }) , 3 , () => {
                        this.backToLast();
                    });
                    return;
                }
                default: {
                    break;
                }
            }
        }.bind(this));  
    }

    onNavbarLeftClick() {
        this.context.router.goBack(); 
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.requestServer();
    }

    backToLast() {
        this.context.router.goBack(); 
    }

    render() {
        const orderDetailItem = (rowData) => {
            const orderSummaryProps = {
                orderSummaryInfo: {
                    status: !rowData.basicInfo ? '' : rowData.basicInfo.status,
                    orderNum: !rowData.basicInfo ? '' : rowData.basicInfo.order_num,
                    orderid: !rowData.basicInfo ? '' : rowData.basicInfo.order_id,
                    contractNo: !rowData.basicInfo ? '' : rowData.basicInfo.contract_no,
                    estimateTime: rowData.estimatedDateList,
                    createtime: !rowData.basicInfo ? '' : rowData.basicInfo.createtime
                }
            };

            const orderPriceProps = {
                orderPriceInfo: {
                    unit: !rowData.basicInfo ? '' : rowData.basicInfo.currency_desc,
                    price: !rowData.basicInfo ? '' : rowData.basicInfo.order_amount,
                    products: !rowData.basicInfo ? '' : rowData.basicInfo.prductShortTip,
                    orderid: !rowData.basicInfo ? '' : rowData.basicInfo.order_id
                }
            };

            const orderTrackingProps = {
                trackingInfo: {
                    etdchanged: !rowData.shipDeail.basicInfo ? '' : rowData.shipDeail.basicInfo.etdChangeTo,
                    startport: !rowData.basicInfo ? '' : rowData.basicInfo.shipFromPort,
                    aimport: !rowData.basicInfo ? '' : rowData.basicInfo.shipToPort,
                    status: !rowData.basicInfo ? '' : rowData.basicInfo.status,
                    fullInfo: rowData,
                    orderstatusparams: {
                        orderNum: !rowData.basicInfo ? '' : rowData.basicInfo.order_num,
                        orderID: !rowData.basicInfo ? '' : rowData.basicInfo.order_id,
                        contractNo: !rowData.basicInfo ? '' : rowData.basicInfo.contract_no,
                        prductShortTip: !rowData.basicInfo ? '' : rowData.basicInfo.prductShortTip,
                        status: !rowData.basicInfo ? '' : rowData.basicInfo.status,
                        arriveAta: !rowData.arriveInfo ? '' : rowData.arriveInfo.ata,
                        shipEtd: !rowData.shipDeail.basicInfo ? '' : rowData.shipDeail.basicInfo.etd ,
                        shipChangeToEtd: !rowData.shipDeail.basicInfo ? '' : rowData.shipDeail.basicInfo.etdChangeTo ,
                        shipEta: !rowData.shipDeail.basicInfo ? '' : rowData.shipDeail.basicInfo.eta
                    }
                }
            }

            return (
                <div>
                    <OrderSummary {...orderSummaryProps} />
                    <OrderPrice {...orderPriceProps} />
                    <OrderTracking {...orderTrackingProps} />
                </div>
            );
        };
        const ShareButtonProps = {
            sharebuttonInfo:this.state.shareSource
        };
        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_arrow_left.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onNavbarLeftClick.bind(this),
            rightContent:this.props.location.state.hideShowShare?'':<ShareButton {...ShareButtonProps}/>
        };

        return (
            <div className='etdOrdersWrap' style={{ height: '100%' }}>

                <NavBar { ...navbarProps } >
                    <FormattedMessage id='order_status' description='Order Status' defaultMessage='Order Status' />
                </NavBar>
                <ListView className="orderstatuswrap" 
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
        );
    }
}

OrderStatus.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default injectIntl(OrderStatus);

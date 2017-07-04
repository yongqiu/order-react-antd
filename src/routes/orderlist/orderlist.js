import React from 'react';
import { Drawer , NavBar , RefreshControl, ListView , Toast , Icon , SearchBar} from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';

import * as orderlistService from '../../services/datarequest';
import styles from './orderlist.css';
import Orders from '../../components/orders/orders';
import Sidebar from '../../components/sidebar/sidebar';
import Search from '../../components/searchbar/searchbar';
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';

// response code
import { RESPONSE_CODE } from '../../config';

class OrderList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.requestData = {
            headers: {
                'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
            },
            body: {
                page: 1,
                rows: 100,
                buyername: localStorage.username ? localStorage.username : sessionStorage.username
            }
        };
        this.state = {
            dataSource: this.dataSource,
            refreshing: false,
      			open: false,
      			position: 'left',
      			orderNum: 1
        }
	}

    requestServer() {
        orderlistService.getOrders(this.requestData).then(function(orders){
            Toast.hide();
            switch( orders.data.respcode ) {
                case RESPONSE_CODE.SUCCESFULL_OLD:
                case RESPONSE_CODE.SUCCESFULL : {
                    this.setState({
		                dataSource: this.dataSource.cloneWithRows(orders.data.rows),
		                refreshing: false,
		                orderNum: orders.data.rows.length
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

    componentDidMount() {
        this.requestServer();
        loadLiveChat();
    	gaPageFilter.gaSetPage( '/orderlist' , 'Orders list' );
        ga( 'send' , regularEvent.showOrderListScreen );
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.requestServer();
    }

    onScroll() {
        //console.log('sss');
    }

	onOpenChange() {
		this.setState({ open: !this.state.open });
	}

	render() {

		const orderBlank = () => {
			return (
				<div className='orderblank'>
					<div><img src={ require('../../assets/img_order_blank.png') } width='30%' alt=""/></div>
					<div className='orderblankContent'><FormattedMessage id='msg_empty_order_list' description='no order' defaultMessage='no order' /></div>
				</div>
			);
		};

		const orderBlocks = (rowData) => {
			const orderProps = {
				ordersInfo: {
					orderNum: rowData.order_num,
					orderID: rowData.order_id,
					contractNo: rowData.contract_no,
					prductShortTip: rowData.prductShortTip,
					status: rowData.status,
					arriveAta: rowData.arriveAta,
					shipEtd: rowData.shipEtd,
					shipChangeToEtd: rowData.shipChangeToEtd,
					shipEta: rowData.shipEta,
				}
			}
			return (
				<div>
					<Orders {...orderProps} />
				</div>
			);
		};

		const orderLists = () => {
			return (
	            <ListView className="orderlistwrap" 
	                dataSource={this.state.dataSource}
	                renderRow={orderBlocks}
	                initialListSize={3}
	                pageSize={1}
	                scrollRenderAheadDistance={200}
	                onScroll={this.onScroll.bind(this)}
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
			);
		};

        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange.bind(this),
            sidebar: <Sidebar listOn={true} />,
            touch: false,
            dragHandleStyle: { display: 'none' },
            style: {width:'100%'},
            contentStyle: { textAlign: 'center',overflow:'hidden'}
        };

        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_menu.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onOpenChange.bind(this)
        };
        let searchData ={
              "url":'/order/queryorders'
        };
		return (
	    	<div style={{ height: '100%' }}>
				<Drawer {...drawerProps} >
					<NavBar { ...navbarProps } >
						<FormattedMessage id='orderlist_myorders' description='Title of orderlist' defaultMessage='My Orders' />
					</NavBar>
					<Search {...searchData}/>	
					{ this.state.orderNum === 0 ? orderBlank() : orderLists() }
				</Drawer>
	    	</div>
		);
	}
}

OrderList.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default injectIntl(OrderList);

import React from 'react';
import { Drawer , NavBar , RefreshControl, ListView , Toast , Icon,SwipeAction, List } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import styles from './sharelist.css';
import Orders from './components/orders';
import Sidebar from '../../components/sidebar/sidebar';
import * as gaPageFilter from '../../utils/gafilter';
import * as queryShareOrder from '../../services/datarequest';
import * as orderlistService from '../../services/shareorderquest';
import { businessEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';

// response code
import { RESPONSE_CODE } from '../../config';

class ShareOrderList extends React.Component {
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
              "caller": "1",
              "page": 1,
              "rows": 50,
              "shareType": "1",
              "userId": localStorage.username ? localStorage.username : sessionStorage.username
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
        orderlistService.queryShareOrder(this.requestData).then(function(orders){
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
    };

    cancelButton(orderid){
        let cancelDate = {
            headers: {
                'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
            },
            body: {
              "shareOrderId": orderid
            }
        };
        orderlistService.cancelShareOrder(cancelDate).then(function(data){
            this.requestServer();
        }.bind(this));  
    };

    componentDidMount() {
    	loadLiveChat();
        this.requestServer();
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.requestServer();
    };

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
                    orderNum: rowData.orderNum,
					orderID: rowData.orderId,
					contractNo: rowData.contractNo,
					status: rowData.orderStatus,
                    openCnt:rowData.openCnt,
                    id:rowData.id,
                    hideShowShare:true
				}
			}
			return (
				<div>
                  <List>
                    <SwipeAction className="SwipeAction"
                      style={{ backgroundColor: 'gray' }}
                      autoClose
                      right={[
                        {
                          text: <FormattedMessage id='sharelist_del' description='Remove' defaultMessage='Remove' />,
                          onPress: () => {
                            let orderid = orderProps.ordersInfo.id;
                            this.cancelButton(orderid);
                            ga( 'send' , businessEvent.cancelSharedOrder );
                          },
                          style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                      ]}
                    >
                      <Orders {...orderProps} />  
                    </SwipeAction>
                  </List>
				</div>
			);
		};

		const orderLists = () => {
			return (
	            <ListView className="sharelistwrap" 
	                dataSource={this.state.dataSource}
	                renderRow={orderBlocks}
	                initialListSize={3}
	                pageSize={1}
	                scrollRenderAheadDistance={100}
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
            sidebar: <Sidebar shareOn={true} />,
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

		return (
	    	<div style={{ height: '100%' }}>
				<Drawer {...drawerProps} >
					<NavBar { ...navbarProps } >
						<FormattedMessage id='sharelist_nav' description='My Shared Orders' defaultMessage='My Shared Orders' />
					</NavBar>
					{ this.state.orderNum === 0 ? orderBlank() : orderLists() }
				</Drawer>
	    	</div>
		);
	}
}

ShareOrderList.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default ShareOrderList;

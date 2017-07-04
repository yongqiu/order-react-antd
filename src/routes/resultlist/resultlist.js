import React from 'react';
import { Drawer , NavBar , RefreshControl, ListView , Toast , Icon,List } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import * as orderlistService from '../../services/datarequest';
import styles from './resultlist.css';
import Orders from '../../components/orders/orders';
import Sidebar from '../../components/sidebar/sidebar';
import * as gaPageFilter from '../../utils/gafilter';
import { loadLiveChat } from '../../components/livechat/livechat';

class ResultOrderList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: this.dataSource,
            refreshing: false,
			      open: false,
			      position: 'left',
			      orderNum: 1
        }
	}

    requestServer() {
      	let orders = this.props.location.state.orders;
        this.setState({
            dataSource: this.dataSource.cloneWithRows(orders.data.rows),
            refreshing: false,
            orderNum: orders.data.rows.length
        });
    }

    componentDidMount() {
    	loadLiveChat();
        this.requestServer();
    }

    onRefresh() {
    	// gaPageFilter.gaSetPage( '/orderlist' , 'Orders list' );
        this.setState({ refreshing: true });
        this.requestServer();
    }

    onScroll() {
        //console.log('sss');
    }

    onNavbarLeftClick() {
      this.context.router.goBack();  
    }

	render() {

		const orderBlank = () => {
			return (
				<div className={styles.orderblank}>
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
                    showShare:false
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
	            <ListView className="dashboardwrap" 
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

        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_arrow_left.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onNavbarLeftClick.bind(this)
        };
		return (
	    	<div style={{ height: '100%' }}>
					<NavBar { ...navbarProps } >
						<FormattedMessage id='resultlist_nav' description='My Shared Orders' defaultMessage='My Shared Orders' />
					</NavBar>
					{ this.state.orderNum === 0 ? orderBlank() : orderLists() }
	    	</div>
		);
	}
}

ResultOrderList.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default ResultOrderList;

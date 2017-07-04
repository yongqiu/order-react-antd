import React from 'react';
import { Drawer , NavBar , RefreshControl, ListView , Toast , Icon } from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';

import styles from './notification.css';
import NotificationItem from './components/notifications/notificationitem';
import Sidebar from '../../components/sidebar/sidebar';
import * as notificationService from '../../services/notificationsrequest';
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';

// response code
import { RESPONSE_CODE } from '../../config';

class Notification extends React.Component {
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
                'Authorization': localStorage.token ? localStorage.token : sessionStorage.token,
                'Accept-Language': navigator.language.split('_')[0]
            },
            body: {
                page: 1,
                rows: 100,
                userid: localStorage.username ? localStorage.username : sessionStorage.username
            }
        };

        this.state = {
            dataSource: this.dataSource,
            refreshing: false,
			open: false,
			position: 'left',
			notificationNum: 1
        }
	}

    requestServer() {
        notificationService.getNotifications(this.requestData).then(function(notifications){
            Toast.hide();
            switch( notifications.data.respcode ) {
                case RESPONSE_CODE.SUCCESFULL_OLD:
                case RESPONSE_CODE.SUCCESFULL : {
                    this.setState({
                        dataSource: this.dataSource.cloneWithRows(notifications.data.rows), 
                        refreshing: false,
                        notificationNum: notifications.data.rows.length
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
    	gaPageFilter.gaSetPage( '/notifications' , 'Notifications List' ); 
        loadLiveChat();
        ga( 'send' , regularEvent.showNotificationListScreen );
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
		const notificationBlank = () => {
			return (
				<div className='orderblank'>
					<div><img src={ require('../../assets/img_notification_blank.png') } width='30%' alt=""/></div>
					<div className='orderblankContent'>You haven't received any <br /> notification</div>
				</div>
			);
		};

		const notificationBlocks = (rowData) => {
			const notificationProps = {
				notificationItemInfo: rowData
			}
			return (
				<div>
					<NotificationItem { ...notificationProps } />
				</div>
			);
		};

		const notificationList = () => {
			return (
	            <ListView className="notificationwrap" 
	                dataSource={this.state.dataSource}
	                renderRow={ notificationBlocks }
	                initialListSize={8}
	                pageSize={4}
	                scrollRenderAheadDistance={400}
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
            sidebar: <Sidebar notifyOn={true} />,
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
						<FormattedMessage id='notification_mynotification' description='Title of notification' defaultMessage='Notification' />
					</NavBar>

					{ this.state.notificationNum === 0 ? notificationBlank() : notificationList() }
				</Drawer>
	    	</div>
		);
	}
}

Notification.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default injectIntl(Notification);
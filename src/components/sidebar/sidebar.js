import React from 'react';
import { Flex , WhiteSpace } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import styles from './sidebar.css';
import { businessEvent,APPNEWS_URL} from '../../config';
import * as gaPageFilter from '../../utils/gafilter';


class Sidebar extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
	}

	replaceToDashboard() {
		this.context.router.replace('/dashboard');
		ga( 'send' , businessEvent.clickMainMenu_dashboard ); 
	}

	replaceToOrderList() {
		this.context.router.replace('/orderlist');
		ga( 'send' , businessEvent.clickMainMenu_myorders ); 
	}

	replaceToAssisant() {
		this.context.router.replace('/assisant');
		ga( 'send' , businessEvent.clickMainMenu_assisant ); 
	}

	replaceToNotification() {
		this.context.router.replace('/notifications');
		ga( 'send' , businessEvent.clickMainMenu_notification ); 
	}

	replaceToChangepassword() {
		this.context.router.replace('/changepsw');
		ga( 'send' , businessEvent.clickMainMenu_changepsw ); 
	}

	replaceToShareList() {
		this.context.router.replace('/sharelist');
		ga( 'send' , businessEvent.clickMainMenu_sharedorders ); 
	}

	replaceToSetting() {
		this.context.router.replace('/settings')
	}

	replaceToLogout() {
		delete localStorage.token ? localStorage.token : sessionStorage.token;
		delete localStorage.username ? localStorage.username : sessionStorage.username;
		this.context.router.replace('/');
		ga( 'send' , businessEvent.clickMainMenu_logout ); 
	}

	openNews(){
		ga( 'send' , businessEvent.orkerNewsClick ); 
		window.open(APPNEWS_URL, '_blank');
	}

	render() {
		let dashboardParams = {
			dashboardImgUrl: this.props.dashbordOn ? require('../../assets/icon_dashboard_active.png') : require('../../assets/icon_dashboard.png'),
			dashboardClass: this.props.dashbordOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap
		}

		let orderListParams = {
			orderListImgUrl: this.props.listOn ? require('../../assets/icon_order_active.png') : require('../../assets/icon_order.png'),
			orderListClass: this.props.listOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap
		};

		// let changepasswordParams = {
		// 	settingsImgUrl: this.props.changepswOn ? require('../../assets/icon_changepassword_active.png') : require('../../assets/icon_changepassword.png'),
		// 	notifyListClass: this.props.changepswOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap			
		// }

		let sharelistParams = {
			sharelistImgUrl: this.props.shareOn ? require('../../assets/ico_share_active.png') : require('../../assets/ico_share.png'),
			sharelistClass: this.props.shareOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap			
		}

		let opennewsParams = {
			opennewsImgUrl: require('../../assets/ico_news.png'),
			opennewsClass: styles.sidebarContentwrap			
		}

		let notifyListParams = {
			notifyListImgUrl: this.props.notifyOn ? require('../../assets/icon_notice_active.png') : require('../../assets/icon_notice.png'),
			notifyListClass: this.props.notifyOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap
		};

		let settingsParams = {
			settingsImgUrl: this.props.settingsOn ? require('../../assets/icon_setting_active.png') : require('../../assets/icon_setting.png'),
			settingsClass: this.props.settingsOn ? styles.sidebarContentonwrap : styles.sidebarContentwrap
		};

		return (
	    	<div className='sidebarwrap'>
	    		<Flex>	
	    			<div className={styles.sidebarheaderwrap}>
		    			<span className={styles.sidebarusername}>{localStorage.username ? localStorage.username : sessionStorage.username}</span>
		    			<img className={styles.sidebarheader} src={ require('../../assets/bg_sidebartop.png') } />
	    			</div>
	    		</Flex>

	    		<WhiteSpace style={{'height':'10px'}} />

	    		<Flex>
	    			<div className={dashboardParams.dashboardClass} onClick={this.replaceToDashboard.bind(this)} >
	    				<div>
		    				<img className={styles.sidebaritemicon} src={dashboardParams.dashboardImgUrl} />
		    				<span className={styles.sidebaritemtitle} >
		    					<FormattedMessage id='menu_dashboard' description='Dashboard' defaultMessage='Dashboard' />
		    				</span>
	    				</div>
	    			</div>
	    		</Flex>

	    		<Flex>
	    			<div className={orderListParams.orderListClass} onClick={this.replaceToOrderList.bind(this)} >
	    				<div>
		    				<img className={styles.sidebaritemicon} src={orderListParams.orderListImgUrl} />
		    				<span className={styles.sidebaritemtitle} >
		    					<FormattedMessage id='orderlist_myorders' description='orderlist of sidebar' defaultMessage='My Orders' />
		    				</span>
	    				</div>
	    			</div>
	    		</Flex>

	    		<Flex>
	    			<div className={sharelistParams.sharelistClass} onClick={this.replaceToShareList.bind(this)} >
	    				<div>
		    				<img className={styles.sidebaritemicon} src={sharelistParams.sharelistImgUrl} />
		    				<span className={styles.sidebaritemtitle} >
		    					<FormattedMessage id='sharelist_nav' description='My Shared Orders' defaultMessage='My Shared Orders' />
		    				</span>
	    				</div>
	    			</div>
	    		</Flex>
	    		<Flex>
	    			<div className={notifyListParams.notifyListClass} onClick={this.replaceToNotification.bind(this)} >
	    				<div>
		    				<img className={styles.sidebaritemicon} src={notifyListParams.notifyListImgUrl} />
		    				<span className={styles.sidebaritemtitle} >
		    					<FormattedMessage id='orderlist_notifications' description='notifications of sidebar' defaultMessage='Notifications' />
		    				</span>
	    				</div>
	    			</div>
	    		</Flex>

				<Flex>
	    			<div className={opennewsParams.opennewsClass} onClick={this.openNews.bind(this)} >
	    				<div>
		    				<img className={styles.sidebaritemicon} src={opennewsParams.opennewsImgUrl} />
		    				<span className={styles.sidebaritemtitle} >
		    					<FormattedMessage id='OrkerNews' description='OrkerNews' defaultMessage='Orker News' />
		    				</span>
	    				</div>
	    			</div>
	    		</Flex>

				<hr className={styles.devideline} />
				
				<Flex>
					<div className={settingsParams.settingsClass} onClick={this.replaceToSetting.bind(this)} >
						<img className={styles.sidebaritemicon} src={settingsParams.settingsImgUrl} />
						<span className={styles.sidebaritemtitle} >
							<FormattedMessage id='orderlist_setting' description='settings of sidebar' defaultMessage='Setting' />
						</span>
					</div>
				</Flex>

	    		<Flex>
	    			<div className={styles.sidebarContentwrap} onClick={this.replaceToLogout.bind(this)} >
	    				<img className={styles.sidebaritemicon} src={ require('../../assets/icon_logout.png') } />
	    				<span className={styles.sidebaritemtitle} >
	    					<FormattedMessage id='orderlist_logout' description='logout of sidebar' defaultMessage='Logout' />
	    				</span>
	    			</div>
	    		</Flex>

	    	</div>
		);
	}
}

Sidebar.contextTypes = {
	router: function contextType() {
		return React.PropTypes.Object;
	}
};

export default Sidebar;

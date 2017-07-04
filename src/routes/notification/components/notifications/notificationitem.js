import React, { Component, PropTypes } from 'react';
import { Flex , Toast } from 'antd-mobile';
import moment from 'moment';

import styles from './notificationitem.css';
import { updatePushinfoStatus } from '../../../../services/notificationsrequest';
import { businessEvent } from '../../../../config';

class NotificationItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        notificationItemInfo: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.headers = { 'Authorization': localStorage.token ? localStorage.token : sessionStorage.token };
    }

    replaceToOrderStatus() {
        let requestData = {
            headers: this.headers,
            body: {
                id: this.props.notificationItemInfo.id,
                status: 1
            }
        };
        let url = '/orderstatus';
        let querysteta = {
            orderid : this.orderid,
        }
        updatePushinfoStatus(requestData).then(function(updateResultInfo){
        Toast.hide();
        if( updateResultInfo.data.respcode !== '0000' ) {
            Toast.fail( 'Load error' , 1.5 );
        }
        this.context.router.push({ pathname: url, query:{...querysteta}, state: {hideShowShare: false}});
        }.bind(this));
        ga( 'send' , businessEvent.myMessageListClickMsg );
    }

    render() {
        const parseDate = (string) => {
            let splitStrs = string.split('&&');
            let parseStr = '';
            for( var i = 0 ; i < splitStrs.length ; i++ ) {
                if( splitStrs[i].indexOf('][') !== -1 ) {
                    let dateInfo = splitStrs[i].split('][');
                    dateInfo[0] = dateInfo[0].replace( '[' , '' );
                    dateInfo[1] = dateInfo[1].replace( ']' , '' );
                    splitStrs[i] = moment(parseInt(dateInfo[0])).format(dateInfo[1].toUpperCase());
                }
                parseStr += splitStrs[i];
            }
            return parseStr;
        };       

		const notificationBlock = () => {
			return (
                <Flex justify="center">
                    <div className={styles.notificationcontentwrap} onClick={ this.replaceToOrderStatus.bind({ ...this , ...{orderid:this.props.notificationItemInfo ? this.props.notificationItemInfo.orderid : ''} }) }>
                        <div className={styles.notificationimg}>
                            <img style={{width:'44px'}} 
                                 src={ this.props.notificationItemInfo.status === 0 ? require( '../../../../assets/icon_notice_on.png' ) : require( '../../../../assets/icon_notice_normal.png' ) } 
                            />
                        </div>
                        <ul className='notificationcontent'>
                            <li style={{wordBreak:'break-all'}}>
                                { parseDate(this.props.notificationItemInfo.content) }
                            </li>
                            <li className='nfcontentdate'>
                                {moment(this.props.notificationItemInfo.pushtime).format('YYYY-MM-DD HH:mm')}
                            </li>
                        </ul>
                    </div>
                </Flex>
			);
		}

        return (
            <div className={styles.notificationwrap}> 
            	{ notificationBlock() }
            </div>
        );
    }
}

NotificationItem.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default NotificationItem;

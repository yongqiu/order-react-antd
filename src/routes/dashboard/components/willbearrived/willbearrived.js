
import React, { Component, PropTypes } from 'react';
import { Flex } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import { businessEvent } from '../../../../config';
import styles from './willbearrived.css';

class Willarrived extends Component {
    static propTypes = {
        className: PropTypes.string,
        willBeArrivedAmount: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
    }

    replaceToList() {
        let clickedDay = new Date();
        let startDay = new Date( clickedDay.getFullYear() , clickedDay.getMonth() , clickedDay.getDate() ).getTime();
        let url = '/dashboard/ordersindays' + '?startday=' + startDay;
        this.context.router.push(url);
        ga( 'send' , businessEvent.clickDashboardSection_willarrived );
    }

    render() {
        if( this.props.willBeArrivedAmount === '0' ) {
            return <span></span>;
        }
        else {
            return (
                <div className={styles.willArrivedWrap} onClick={this.replaceToList.bind(this)} >
                    <div className={styles.willArrivedWord}>
                        <div className={styles.willArrivedTitle}>
                            <FormattedMessage id='dashboard_will_arrived_hint' description='Will Be Arrived' defaultMessage='Will Be Arrived' />
                        </div>
                        <div className={styles.willArrivedContent}>
                            <FormattedMessage id='dashboard_will_arrived' description='within 7 days' defaultMessage='within 7 days' />
                        </div>
                    </div>
                    <div className={styles.willArrivedImg}>
                        <img className={styles.etdchangedbg} src={require('../../assets/bg_orderNo.png')} width='50%' alt="ETD"/>
                        <span className={styles.etdchangedNum}>{this.props.willBeArrivedAmount}</span>
                    </div>
                    <div className={styles.blockbottom}></div>
                </div>
            ); 
        }
    }
}

Willarrived.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Willarrived;

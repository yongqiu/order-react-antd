
import React, { Component, PropTypes } from 'react';
import { Flex } from 'antd-mobile';

import styles from './status.css';
import { orderStatusFilter } from '../../../../utils/orderstatusfilter';
import { businessEvent } from '../../../../config';

class Status extends Component {
    static propTypes = {
        className: PropTypes.string,
        statusListAmount: PropTypes.array
    };

    constructor(props, context) {
        super(props, context);
    }

    onClick() {
        let url = '/dashboard/ordersbystatus' + '?status=' + this.status;
        this.context.router.push(url);
        ga( 'send' , businessEvent.clickDashboardSection_bystatus );
    }

    render() {

    	const imgGroup = [
            require('../../assets/icon_status_production_doing.png'),
            require('../../assets/icon_status_shipping_doing.png'),
            require('../../assets/icon_status_loading_doing.png'),
            require('../../assets/icon_status_board_doing.png'),
            require('../../assets/icon_status_negotiation_doing.png'),
            require('../../assets/icon_status_arrival_doing.png')
    	];

        const statusGroup = [ 'ODR_GOODS_PRODUCT' , 'ODR_BOOKS_UNDO' , 'ODR_LOADS_UNDO' , 'ODR_ONBOARD_DONE' , 'ODR_NEGODOC_UNDO' , 'ODR_ARRIVAL_DONE' ];

		const statusBlock = (i) => {
			if( this.props.statusListAmount[i] === 0 ) {
				return '';
			}
			else {
				return (
	            	<Flex className={styles.statusItem} onClick={this.onClick.bind({ ...this , ...{status: statusGroup[i]} })}>
	            		<Flex.Item className={styles.statusImg}>
	            			<img src={imgGroup[i]} width='72px' alt='P'/>
	            		</Flex.Item>
	            		<Flex.Item className={styles.statusName}>
							<span>{orderStatusFilter(statusGroup[i])}</span>
	            		</Flex.Item>
	            		<Flex.Item className={styles.statusAmmount}>
	            			<span>{this.props.statusListAmount[i]}</span>
	            		</Flex.Item>
	            	</Flex>
				);
			}
		}

        return (
            <div className='statusWrap'>
            	{ statusBlock(0) }
            	{ statusBlock(1) }
            	{ statusBlock(2) }
            	{ statusBlock(3) }
            	{ statusBlock(4) }
            	{ statusBlock(5) }
            </div>
        );
    }
}

Status.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Status;

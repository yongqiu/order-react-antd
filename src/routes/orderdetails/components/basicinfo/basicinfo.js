import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './basicinfo.css';
import commonStyles from '../../orderdetails.css';

class BasicInfo extends Component {
    static propTypes = {
        className: PropTypes.string,
        basicInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={commonStyles.blockwrap}>
            	<div className={styles.commonLine}>
            		<span>
            			<FormattedMessage id='orderlist_order_no' description='Order id' defaultMessage='Order id' />
            		</span>
            		<span className={ styles.ordersnos }>
            			{ this.props.basicInfo ? ( this.props.basicInfo.orderNum ? this.props.basicInfo.orderNum : this.props.basicInfo.orderid) : '' }
            		</span>
            	</div>

				<hr className={commonStyles.devideLine} /> 

            	<div className={styles.commonLine}>
            		<span>
            			<FormattedMessage id='orderlist_contract_no' description='Contract No' defaultMessage='Contract No' />
            		</span>
            		<span className={ styles.ordersnos }>
            			{ this.props.basicInfo.contractNo }
            		</span>
            	</div>

            	<hr className={commonStyles.devideLine} /> 
	
				<div className={ styles.totalprice + ' ' + styles.commonLine }>
					<FormattedMessage id='order_total_price' description='Total Price' defaultMessage='Total Price' />
				</div>

				<hr className={commonStyles.devideLineBold} />

				<div className={styles.price} style={{ marginBottom: '10px' }}> 	
					<span>{ this.props.basicInfo.unit }</span>&nbsp;
					<span>{ this.props.basicInfo.ammount.toFixed(2) }</span>
				</div>

            </div>
        );
    }
}

export default BasicInfo;

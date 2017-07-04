import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './delivery.css';
import commonStyles from '../../orderdetails.css';

class Delivery extends Component {
    static propTypes = {
        className: PropTypes.string,
        deliveryInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={commonStyles.blockwrap}>
                <div className={styles.blockTitle}>
                    <FormattedMessage id='order_details_delivery' description='Delivery' defaultMessage='Delivery' />
                </div>

                <hr className={commonStyles.devideLineBold} />

                <div className={styles.deliveryItem} >
                    <div className={styles.deliveryItemTitle}>
                        <FormattedMessage id='order_details_delivery_term' description='Payment Term' defaultMessage='Payment Term' />
                    </div>
                    <div className={styles.deliveryItemContent}>
                        { this.props.deliveryInfo.deliveryTerm }
                    </div>
                </div>

                <div className={styles.deliveryItem} style={{ marginBottom: '20px' }}>
                    <div className={styles.deliveryItemTitle}>
                        <FormattedMessage id='order_details_address' description='Currency' defaultMessage='Currency' />
                    </div>
                    <div className={styles.deliveryItemContent}>
                        { this.props.deliveryInfo.address }
                    </div>
                </div>

            </div>        
        );
    }
}

export default Delivery;

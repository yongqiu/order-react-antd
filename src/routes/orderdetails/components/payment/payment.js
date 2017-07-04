import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './payment.css';
import commonStyles from '../../orderdetails.css';

class Payment extends Component {
    static propTypes = {
        className: PropTypes.string,
        paymentInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const paymentdescgroup = (payInfo) => {
            let payments = [];
            payInfo.forEach( function(pay , i) {
                let paymentDom = <p className={styles.payType} key={i}> {pay.paymentdesc} </p>;
                payments.push(paymentDom);
            });
            return payments;
        };

        return (
            <div className={commonStyles.blockwrap}>
                <div className={styles.blockTitle}>
                    <FormattedMessage id='order_details_payment' description='Payment' defaultMessage='Payment' />
                </div>

                <hr className={commonStyles.devideLineBold} />

                <div className={styles.paymentItem} >
                    <div className={styles.paymentItemTitle}>
                        <FormattedMessage id='order_details_payment_term' description='Payment Term' defaultMessage='Payment Term' />
                    </div>
                    <div className={styles.paymentItemContent}>
                        { this.props.paymentInfo.payment.length === 0 ? '--' : paymentdescgroup( this.props.paymentInfo.payment ) }
                    </div>
                </div>

                <div className={styles.paymentItem} style={{ marginBottom: '20px' }}>
                    <div className={styles.paymentItemTitle}>
                        <FormattedMessage id='order_details_currency' description='Currency' defaultMessage='Currency' />
                    </div>
                    <div className={styles.paymentItemContent}>
                        { this.props.paymentInfo.crrency }
                    </div>
                </div>

            </div>         
        );
    }
}

export default Payment;

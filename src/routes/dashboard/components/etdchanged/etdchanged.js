
import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './etdchanged.css';
import { businessEvent } from '../../../../config';

class Etdchanged extends Component {
    static propTypes = {
        className: PropTypes.string,
        etdChangedAmount: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
    }

    replacetolist() {
        this.context.router.push('/dashboard/etdchanged');
        ga( 'send' , businessEvent.clickDashboardSection_etdchanged );
    }

    render() {

        return (
            <div className={styles.etdchangedWrap} onClick={this.replacetolist.bind(this)} >
                <div className={styles.etdchanged}>
                    <div className={styles.etdchangedTitle}>ETD</div>
                    <div className={styles.etdchangedContent}>
                        <FormattedMessage id='status_etd_changed' description='changed' defaultMessage='changed' />
                    </div>
                </div>
                <div className={styles.etdchangedImg}>
                    <img className={styles.etdchangedbg} src={require('../../assets/bg_orderNo.png')} width='50%' alt="ETD"/>
                    <span className={styles.etdchangedNum}>{this.props.etdChangedAmount}</span>
                </div>
                <div className={styles.blockbottom}></div>
            </div>
        );
    }
}

Etdchanged.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Etdchanged;

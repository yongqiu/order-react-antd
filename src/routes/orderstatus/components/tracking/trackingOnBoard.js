import React, { Component, PropTypes } from 'react';
import { Accordion , Icon } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingOnBoard.css';
import { businessEvent } from '../../../../config';

class TrackingOnBoard extends Component {
    static propTypes = {
        className: PropTypes.string,
        onboardInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.beOpen = false;
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_onboard );
        }
    }

    render() {
        const onboardItems = (onboard) => {
            if( !onboard.info ) {
                return '';
            }
            let onbooardItem =  <div className={styles.contentwrap}>
                                    <div className={styles.contentItem}>
                                        <span className={styles.onbooardTitle}>ATD :&nbsp;&nbsp;</span><br/>
                                        <span className={styles.onbooardTime}>
                                            { moment(parseInt(onboard.info.atd)).format('YYYY-MM-DD HH:mm') }
                                        </span>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <span className={styles.onbooardTitle}>ETA :&nbsp;&nbsp;</span><br/>
                                        <span className={styles.onbooardTime}>
                                            { moment(parseInt(onboard.info.eta)).format('YYYY-MM-DD') }
                                        </span>
                                    </div>
                                </div>;
            return (
                onbooardItem
            );
        };

        let accClass = onboardItems( this.props.onboardInfo ) === '' ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_ONBOARD_DONE' description='On Board' defaultMessage='On Board' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.onboardInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;

        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={ accClass } onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
                        <div className='statusContent'>
                            { onboardItems( this.props.onboardInfo ) }
                        </div>
					</Accordion.Panel>
				</Accordion>
			</div>  
        );
    }
}

export default TrackingOnBoard;

import React, { Component, PropTypes } from 'react';
import { Accordion , Icon } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingArrival.css';
import { businessEvent } from '../../../../config';

class TrackingArrival extends Component {
    static propTypes = {
        className: PropTypes.string,
        arrivedInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.beOpen = false;
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_arrived );
        }
    }

    render() {
        const arrivedItems = (arrInfo) => {
            if( !arrInfo.arriveInfo ) {
                return '';
            }
            let ataItem =   <div className={styles.contentwrap}>
                                <div className={styles.contentItem}>
                                    <span className={styles.ataTitle}>ATA :&nbsp;&nbsp;</span><br />
                                    <span className={styles.ataTime}>
                                        { moment(parseInt(arrInfo.arriveInfo.ata)).format('YYYY-MM-DD HH:mm') }
                                    </span>
                                </div>
                            </div>;
            return (
                ataItem
            );
        };

        let accClass = arrivedItems( this.props.arrivedInfo ) === '' ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_ARRIVAL_DONE' description='Arrived' defaultMessage='Arrived' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.arrivedInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;
        
        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={ accClass } onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
                        <div className='statusContent'>
                            { arrivedItems( this.props.arrivedInfo ) }
                        </div>
					</Accordion.Panel>
				</Accordion>
			</div>             
        );
    }
}

export default TrackingArrival;

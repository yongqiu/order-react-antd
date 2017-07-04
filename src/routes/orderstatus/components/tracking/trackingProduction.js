import React, { Component, PropTypes } from 'react';
import { Accordion , Icon } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingProduction.css';
import { businessEvent } from '../../../../config';

class TrinkingProduction extends Component {
    static propTypes = {
        className: PropTypes.string,
        productionInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.beOpen = false;
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_production );
        }
    }

    render() {
        const productionItems = (producInfo) => {
            if( !producInfo.info ) {
                return '';
            }
        };

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_GOODS_PRODUCT' description='Production' defaultMessage='Production' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.productionInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;

        let accClass = productionItems( this.props.productionInfo ) === '' ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={ accClass } onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
						<div className='statusContent'>
                            { productionItems( this.props.productionInfo ) }
						</div>
					</Accordion.Panel>
				</Accordion>
			</div>             
        );
    }
}

export default TrinkingProduction;

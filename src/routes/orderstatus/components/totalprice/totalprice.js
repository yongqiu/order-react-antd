import React, { Component, PropTypes } from 'react';
import { Icon , Flex } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import styles from './totalprice.css';
import { businessEvent } from '../../../../config';

class TotalPrice extends Component {
    static propTypes = {
        className: PropTypes.string,
        orderPriceInfo: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    clickedToOrderDetails(){
    	let url = '/orderdetails' + '?orderid=' + this.orderid;;
    	this.context.router.push(url);
        ga( 'send' , businessEvent.orderStatusClickToViewOrder );
    }

    render() {
        return (
           <div className={styles.totalPriceWrap} onClick={ this.clickedToOrderDetails.bind({ ...this , ...{orderid: this.props.orderPriceInfo.orderid} }) }>
            	<Flex className={styles.totalPriceTitle}>
            		<span>
            			<FormattedMessage id='order_total_price' description='Total Price' defaultMessage='Total Price' />
            		</span>
            	</Flex> 

            	<hr className={styles.devideLine} />     

				<Flex className={styles.totalPriceContentWrap}>
					<div className={styles.totalPriceContent}>
						<p className={styles.price}> 	
							<span>{ this.props.orderPriceInfo.unit }</span>&nbsp;
							<span>{ this.props.orderPriceInfo.price === '' ? '' : this.props.orderPriceInfo.price.toFixed(2) }</span>
						</p>
						<p className={styles.products}> 
							<span>{ !this.props.orderPriceInfo.products ? '' : this.props.orderPriceInfo.products.replace(/\//g,",") }</span> 
						</p>
					</div>
					<div className={styles.rightArrow}>
						<Icon type="right" />
					</div>
				</Flex>

           </div> 
        );
    }
}

TotalPrice.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default TotalPrice;

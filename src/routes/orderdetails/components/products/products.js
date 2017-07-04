import React, { Component, PropTypes } from 'react';
import { Accordion, List , Badge , Icon , NavBar } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import styles from './products.css';
import commonStyles from '../../orderdetails.css';
import PDP from '../../../../serverconfig';
import * as gaPageFilter from '../../../../utils/gafilter';

class Products extends Component {
    static propTypes = {
        className: PropTypes.string,
        productsInfo: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    viewMore() {
        let _this = this;
        event.preventDefault();
        var winRef = window.open('', '_blank');
        ga( 'send' , {
            hitType: 'event',
            transport: 'beacon',
            eventCategory: 'viewPDP',
            eventAction: `view PDP - id:${this._this.props.productsInfo.orderid}, production:${this.productname} `,
            eventLabel: 'view more',
            hitCallback: gaPageFilter.createFunctionWithTimeout( function(){
                winRef.location = PDP.PDPSERVER + '/' + _this.productcode;
            })
        });
    }

    render() {
        let arrayProducts = this.props.productsInfo.productsInfo;

        const accordionItem = ( product , index ) => {
            let hrefurl = '#/orderdetails/productdescribe?orderid=' + this.props.productsInfo.orderid + '&productioncode=' + product.productcode;
            let productnameWithBadge =  <div className='pBadge'>
                                            <Badge text={index+1} />&nbsp;&nbsp;&nbsp;
                                            <span className='pName'>{product.productname}</span>
                                        </div>;
            let item =  <Accordion.Panel header={productnameWithBadge} key={index}>
                            <List>
                                <List.Item extra={product.brand}>
                                    <FormattedMessage id='order_details_brand' description='Brand' defaultMessage='Brand' />
                                </List.Item>
                                <List.Item extra={ this.props.productsInfo.unit + ' ' + product.price }>
                                    <FormattedMessage id='order_details_unitprice' description='Unit Price' defaultMessage='Unit Price' />
                                </List.Item>
                                <List.Item extra={ product.quantity + ' ' + product.productunit }>
                                    <FormattedMessage id='order_details_quantity' description='Quantity' defaultMessage='Quantity' />
                                </List.Item>
                                <List.Item extra={ this.props.productsInfo.unit + ' ' + product.amount } className='totalPrice'>
                                    <FormattedMessage id='order_details_amount' description='Amount' defaultMessage='Amount' />
                                </List.Item>
                                <div className='detail_viewmore' onClick={this.viewMore.bind({_this:this,productcode:product.productcode,productname:product.productname})}>
                                    <FormattedMessage id='order_details_viewmore' description='View More' defaultMessage='View More' />
                                </div>
                            </List>
                        </Accordion.Panel>
            return item;
        };

        const productsList = () => {
            let itemContent = new Array();
            arrayProducts.forEach( function( item , index ) {
                itemContent.push( accordionItem( item , index ) );
            });
            return (
                <Accordion className='orderdeails_productList' style={{ paddingBottom: '30px' }}>
                    {itemContent}
                </Accordion>
            );
        };

        return (
            <div className={commonStyles.blockwrap}>

            	<div className={styles.blockTitle}>
                    <FormattedMessage id='order_details_products' description='Products' defaultMessage='Products' />
                </div>

                <hr className={commonStyles.devideLineBold} />

                { productsList() }

            </div>
        );
    }
}

Products.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Products;

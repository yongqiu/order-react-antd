import React from 'react';
import { Icon , Flex } from 'antd-mobile';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import * as filter from '../../../utils/orderstatusfilter';
import styles from './orders.css';
import statusViewFilter from '../../../utils/statusviewfilter';

class Orders extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        ordersInfo: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    replaceToOrderStatus() {
        let url = '/orderstatus';
        let querysteta = {
            orderid : this.orderid,
        }

        this.context.router.push({ pathname: url, query:{...querysteta}, state: {hideShowShare: this.props.ordersInfo.hideShowShare}});
    }

    render() {
        const orderDate = (orderInfo) => {
            if( !orderInfo ) {
                return;
            }

            let today = new Date().getTime();
            if( orderInfo.status === 'ODR_ARRIVAL_DONE' ) {
                if( orderInfo.arriveAta ) {
                    return (
                        <div><span><FormattedMessage id='order_status_arrive_ata' description='ATA' defaultMessage='ATA' /></span><br/>
                        <span>{moment(orderInfo.arriveAta).format('YYYY-MM-DD')}</span></div>
                    );
                }
            }

            if( orderInfo.shipEtd ) {
                if( orderInfo.shipChangeToEtd && orderInfo.shipChangeToEtd < today + 1 ) {
                    return (
                        <div>
                            <span>
                                <FormattedMessage id='status_etd' description='ETD' defaultMessage='ETD' />&nbsp;
                                <FormattedMessage id='status_etd_changed' description='Changed' defaultMessage='Changed' />
                            </span><br/>
                            <span>{moment(orderInfo.shipChangeToEtd).format('YYYY-MM-DD')}</span>
                        </div>
                    );
                }
            }
            else {
                return (
                    <div style={{lineHeight:'32px'}}>--</div>
                );
            }

            if( orderInfo.shipEtd <  today + 1 ) {
                return (
                    <div><span><FormattedMessage id='status_etd' description='ETD' defaultMessage='ETD' /></span><br/>
                    <span>{moment(orderInfo.shipEtd).format('YYYY-MM-DD')}</span></div>
                );
            }

            if( orderInfo.arriveEta ) {
                return (
                    <div><span><FormattedMessage id='status_eta' description='ETA' defaultMessage='ETA' /></span><br/>
                    <span>{moment(orderInfo.arriveEta).format('YYYY-MM-DD')}</span></div>
                );
            }

            if( orderInfo.shipEta ) {
                return (
                    <div><span><FormattedMessage id='status_eta' description='ETA' defaultMessage='ETA' /></span><br/>
                    <span>{moment(orderInfo.shipEta).format('YYYY-MM-DD')}</span></div>
                );
            }
            else {
                return (
                    <div style={{lineHeight:'32px'}}>--</div>
                );
            }
        }

        const ordersGroup = () => {
            return (
                <div onClick={ this.replaceToOrderStatus.bind({ ...this , ...{orderid:this.props.ordersInfo ? this.props.ordersInfo.orderID : ''} }) }>
                    <div className='orderwrapitem'>
                        <ul className='orderheader'>
                            <li className='orderheaderleft'>
                                <img width="72px" src={ require('../../../assets/icon_order_blue.png') } />
                            </li>
                            <li className='orderheadermiddle'>
                                <span>
                                    <FormattedMessage id='orderlist_order_no' description='Order No' defaultMessage='Order No' />
                                    <span>{ this.props.ordersInfo ? ( this.props.ordersInfo.orderNum ? this.props.ordersInfo.orderNum : this.props.ordersInfo.orderID) : '' }</span>
                                </span>
                            </li>
                            <li className='orderheaderright'>
                                <Icon type="right" />
                            </li>
                        </ul>
                    </div>

                    <div className='orderwrapitem' style={{ display: '-webkit-box', display: 'flex' }}>
                        <div className='ordercontent'>
                            <p className='contractNo'>
                                <FormattedMessage id='orderlist_contract_no' description='Contract No' defaultMessage='Contract No' />
                                <span>{ this.props.ordersInfo ? this.props.ordersInfo.contractNo : '' }</span>
                            </p>        
                        </div>
                    </div>
                    <div className='orderwrapitem' style={{ display: '-webkit-box', display: 'flex' }}>
                        <ul className='orderdatewrap'>
                            <li className='orderdate'>
                            </li>
                            <li className='orderstatus'>
                                <div style={{lineHeight:'32px'}}>{ filter.orderStatusFilter(this.props.ordersInfo.status) }</div>
                            </li>
                        </ul>
                    </div>
                    <div className='orderwrapitem' style={{ display: '-webkit-box', display: 'flex'}}>
                        <Flex  className='orderstatusview'> 
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[0] }  alt='P'/>
                            </Flex.Item>
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[1] }  alt='S' />
                            </Flex.Item>
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[2] }  alt='L' />
                            </Flex.Item>
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[3] }  alt='B' />
                            </Flex.Item>
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[4] }  alt='N' />
                            </Flex.Item>
                            <Flex.Item>
                                <img src={ statusViewFilter(this.props.ordersInfo.status)[5] }  alt='A' />
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className='orderwrapitem' style={{ display: '-webkit-box', display: 'flex' , border: 'none'  }}>
                        <p className='opendtimes'><FormattedMessage id='orderlist_opend' description='Opend' defaultMessage='Opend：' />  {this.props.ordersInfo.openCnt}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className='orderwrap'> 
                { ordersGroup() }
            </div>
        );
    }
}

Orders.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Orders;

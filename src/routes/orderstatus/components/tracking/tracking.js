import React, { Component, PropTypes } from 'react';
import { Steps , Icon , Flex } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './tracking.css';

import Production from './trackingProduction';
import ShippingSpace from './trackingShipping';
import Loading from './trackingLoading';
import Onboard from './trackingOnBoard';
import ShippingDocuments from './trackingShippingDoc';
import Arrived from './trackingArrival';

class OrderTracking extends Component {
    static propTypes = {
        className: PropTypes.string,
        trackingInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
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
                        <div>
                        	<span><FormattedMessage id='order_status_arrive_ata' description='ATA' defaultMessage='ATA' /></span>&nbsp;&nbsp;
                        	<span style={{color:'#3e89b3'}}>{moment(orderInfo.arriveAta).format('YYYY-MM-DD')}</span>
                        </div>
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
                            </span>&nbsp;&nbsp;
                            <span style={{color:'#3e89b3'}}>{moment(orderInfo.shipChangeToEtd).format('YYYY-MM-DD')}</span>
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
                    <div>
                    	<span><FormattedMessage id='status_etd' description='ETD' defaultMessage='ETD' /></span>&nbsp;&nbsp;
                    	<span style={{color:'#3e89b3'}}>{moment(orderInfo.shipEtd).format('YYYY-MM-DD')}</span>
                    </div>
                );
            }

            if( orderInfo.arriveEta ) {
                return (
                    <div>
                    	<span><FormattedMessage id='status_eta' description='ETA' defaultMessage='ETA' /></span>&nbsp;&nbsp;
                    	<span style={{color:'#3e89b3'}}>{moment(orderInfo.arriveEta).format('YYYY-MM-DD')}</span>
                    </div>
                );
            }

            if( orderInfo.shipEta ) {
                return (
                    <div>
                    	<span><FormattedMessage id='status_eta' description='ETA' defaultMessage='ETA' /></span>&nbsp;&nbsp;
                    	<span style={{color:'#3e89b3'}}>{moment(orderInfo.shipEta).format('YYYY-MM-DD')}</span>
                    </div>
                );
            }
            else {
                return (
                    <div style={{lineHeight:'32px'}}>--</div>
                );
            }
        }

		let statusGroup = [ 'ODR_GOODS_PRODUCT' , 'ODR_BOOKS_UNDO' , 'ODR_LOADS_UNDO' , 'ODR_ONBOARD_DONE' , 'ODR_NEGODOC_UNDO' , 'ODR_ARRIVAL_DONE' ];

		let getUpdateTime = (status) => {
			let tempTime = 0;
			this.props.trackingInfo.fullInfo.estimatedDateList.forEach( function( item ) {
				if( status === item.status ) {
					tempTime = item.updatetime
				}
			});
			return tempTime;
		};

		const productionProps = {
			productionInfo: {
				updatetime: !!getUpdateTime('ODR_GOODS_PRODUCT') ? getUpdateTime('ODR_GOODS_PRODUCT') : this.props.trackingInfo.fullInfo.basicInfo.createtime,
				info: null
			}
		};

		const shippingSpaceProps = {
			shippingSpaceInfo: {
				updatetime: getUpdateTime('ODR_BOOKS_UNDO'),
				info: this.props.trackingInfo.fullInfo.shipDeail
			}
		};

		const loadingProps = {
			loadingInfo: {
				updatetime: getUpdateTime('ODR_LOADS_UNDO'),
				info: this.props.trackingInfo.fullInfo.loadingList
			}
		};

		const onboardProps = {
			onboardInfo: {
				updatetime: getUpdateTime('ODR_ONBOARD_DONE'),
				info: this.props.trackingInfo.fullInfo.onboardInfo
			}
		};

		const shippingDocumentsProps = {
			shippingDocumentsInfo: {
				updatetime: getUpdateTime('ODR_NEGODOC_UNDO'),
				info: this.props.trackingInfo.fullInfo.negdocInfo
			}
		};

		const arrivedProps = {
			arrivedInfo: {
				updatetime: getUpdateTime('ODR_ARRIVAL_DONE'),
				arriveInfo: this.props.trackingInfo.fullInfo.arriveInfo
			}
		};

		let descriptionGroup = [ 
			<Production { ...productionProps } />, 
			<ShippingSpace { ...shippingSpaceProps } />, 
			<Loading { ...loadingProps } />, 
			<Onboard { ...onboardProps } />, 
			<ShippingDocuments { ...shippingDocumentsProps } />, 
			<Arrived { ...arrivedProps } /> 
		];

		let setpGroup = [];
		
		const orderTrackingBlock = () => {
			let _this = this;
            let currentStatusViaIndex;
            statusGroup.forEach(function( e , i ){
				if( e === _this.props.trackingInfo.status ) {
					currentStatusViaIndex = i;
				}
            });
            for( var i = currentStatusViaIndex ; i > -1 ; i-- ) {
				if( i === currentStatusViaIndex ) {
					if( i === 5 ) {
						setpGroup.push( <Steps.Step icon={ <Icon type="check-circle" /> } description={ descriptionGroup[i] } key={i} /> );
					}
					else {
						setpGroup.push( <Steps.Step icon={ <Icon type={require('../../../../assets/svgs/icon_doing.svg')} /> } description={ descriptionGroup[i] } key={i} /> );
					}
				}
				else {
					setpGroup.push( <Steps.Step icon={ <Icon type="check-circle" /> } description={ descriptionGroup[i] } key={i} /> );
				}
            }
			return (	
				setpGroup
			);
		}

        return (
            <div className={styles.trackingwrap} >
            	<Flex className={styles.trackingTitle}>
            		<span>
            			<FormattedMessage id='order_tracking' description='Tracing' defaultMessage='Tracing' />
            		</span>
            	</Flex> 

            	<hr className={styles.devideLine} /> 

				<Flex>
					<div className={styles.etdChanged}>
						{ orderDate(this.props.trackingInfo.orderstatusparams) }
					</div>
				</Flex>

				<Flex className={styles.portwrap}>
					<Flex.Item className={styles.ports} style={{ textAlign:'left' }}>
						<span>{ this.props.trackingInfo.startport }</span>
					</Flex.Item>
					<Flex.Item className={styles.ports} style={{ textAlign:'center' }}>
						<img src={ require('../../assets/ico-towards.png') } alt="To" style={{ width:'70%' , verticalAlign:'middle' }} />
					</Flex.Item>
					<Flex.Item className={styles.ports} style={{ textAlign:'right' }}>
						<span>{ this.props.trackingInfo.aimport }</span>
					</Flex.Item>
				</Flex>

				<Flex className='orderStatus'>
					<Steps size="small" current={6}>
						{ orderTrackingBlock() }
					</Steps>
				</Flex>

            </div>
        );
    }
}

export default OrderTracking;


import React, { Component, PropTypes } from 'react';
import { Flex , WhiteSpace , Modal } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './ordersummary.css';
import * as filter from '../../../../utils/orderstatusfilter';
import statusViewFilter from '../../../../utils/statusviewfilter';
import { statusIconTipGroup as statusTipIcons } from '../../../../components/imagesrequire/statusiconrequires';

class OrderSummary extends Component {
    static propTypes = {
        className: PropTypes.string,
        orderSummaryInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
		this.state = {
			visible: false
		}
    }

    showIconTip( e ) {
		e.preventDefault();
		this.setState({
			visible: true
		});
    }

    onClose() {
        this.setState({
            visible: false
        });
    }

    render() {
        let statusGroup = [ 'ODR_GOODS_PRODUCT' , 'ODR_BOOKS_UNDO' , 'ODR_LOADS_UNDO' , 'ODR_ONBOARD_DONE' , 'ODR_NEGODOC_UNDO' , 'ODR_ARRIVAL_DONE' ];

        const timeFilter = (status) => {
            let _this = this;
            let currentStatusViaIndex;
            let judgeStatusViaIndex;
            statusGroup.forEach(function( e , i ){
                if( e === _this.props.orderSummaryInfo.status ) {
                    currentStatusViaIndex = i;
                }
                if( e === status ) {
                    judgeStatusViaIndex = i
                }
            });

            // let currentStatusViaIndex = statusGroup.findIndex( ( value, index, arr ) => {
            //     return value == this.props.orderSummaryInfo.status;
            // });
            // let judgeStatusViaIndex = statusGroup.findIndex( ( value, index, arr ) => {
            //     return value == status;
            // });
        	let timeGroup = this.props.orderSummaryInfo.estimateTime;
        	let gotTime = '-';
        	timeGroup.forEach( function( item ){
				if( item.status === status ) {
                    if ( judgeStatusViaIndex > currentStatusViaIndex ) {
                        gotTime = !!item.estimated_date ? item.estimated_date : gotTime;
                    }
                    else {
                        gotTime = item.updatetime;
                    }
				}
        	});
            if( status === 'ODR_GOODS_PRODUCT' && gotTime === '-' ) {
                gotTime = !!this.props.orderSummaryInfo.createtime ? this.props.orderSummaryInfo.createtime : gotTime;
            }
        	return gotTime;
        }

        const statusIconTipItem = ( index ) => {
        	let tipContentId = [ 
        		'orderlist_ODR_GOODS_PRODUCT', 
        		'orderlist_ODR_BOOKS_UNDO', 
        		'orderlist_ODR_LOADS_UNDO', 
        		'orderlist_ODR_ONBOARD_DONE',
        		'orderlist_ODR_NEGODOC_UNDO',
        		'orderlist_ODR_ARRIVAL_DONE'
        	];
            const divideArow = () => {
                if( index === 5 ) {
                    return '';
                }
                return(
                    <Flex>
                        <Flex.Item style={{ width:'15%' }}></Flex.Item>
                        <Flex.Item style={{ width:'15%' , margin:'0px' , padding:'5px 0px' }}>
                            <img src={ require(('../../assets/icon_dialog_status.png')) } width='100%' />
                        </Flex.Item>
                        <Flex.Item></Flex.Item>
                    </Flex>                  
                );
            };
        	return (
                <div className='statusWrap'>
                    <Flex>
                        <Flex.Item style={{ width:'15%' }}>
                            <div className={ styles.iconTipIndexCircle }>{ index + 1 }</div>
                        </Flex.Item>
                        <Flex.Item style={{ width:'15%' }}>
                            <img src={ statusTipIcons[index] } className={ styles.iconTipIcon } />
                        </Flex.Item>
                        <Flex.Item>
                            <div className={ styles.iconTipContent }>
                                <FormattedMessage id={ tipContentId[index] } description={ tipContentId[index] } defaultMessage={ tipContentId[index] } />
                            </div>
                        </Flex.Item>
                    </Flex>
                    { divideArow() }
                </div>
        	);
        }

        const imgModal = () => {
        	let modalProps = {
				className: 'termmodal',
				closable: false,
				onClose: this.onClose.bind(this),
				transparent: true,
				maskClosable: false,
				visible: this.state.visible,
				footer: [{ 
					text: 'OK', 
					onPress: () => { this.onClose(); } 
				}]
        	};
            return (
                <Modal { ...modalProps } >
                    <div className="modal-demo-content statusIconTipModalContent">
                        { statusIconTipItem(0) }
                        { statusIconTipItem(1) }
                        { statusIconTipItem(2) }
                        { statusIconTipItem(3) }
                        { statusIconTipItem(4) }
                        { statusIconTipItem(5) }
                    </div>
                </Modal>
            );
        };

		const dateBlock = ( status ) => {
			let nTime = timeFilter(status);
			if( nTime === '-' ) {
				return (
					<div>-</div>
				);
			}
			else {
				return (
					<div>
						<div>{ moment(parseInt(nTime)).format('MM.DD') }</div>
						<div>{ moment(parseInt(nTime)).format('YYYY')  }</div>
					</div>
				);
			}
		}	

        return (

            <div className={styles.orderSummaryWrap}>

            	<div className={styles.orderSummaryStatus}>
            		<span>{ filter.orderStatusFilter(this.props.orderSummaryInfo.status) }</span>
            	</div>

            	<hr className={styles.devideLine} />

				<div className={styles.orderSummaryInf}>
					<p className='ordernos'>
						<FormattedMessage id='orderlist_order_no' description='Order No' defaultMessage='Order No' />
						<span>{ this.props.orderSummaryInfo ? ( this.props.orderSummaryInfo.orderNum ? this.props.orderSummaryInfo.orderNum : this.props.orderSummaryInfo.orderid) : '' }</span>
					</p>
					<p className='ordernos'>
						<FormattedMessage id='orderlist_contract_no' description='Contract No' defaultMessage='Contract No' />
						<span>{this.props.orderSummaryInfo.contractNo}</span>
					</p>
				</div>

				<hr className={styles.devideLine} />

				<Flex className={styles.orderSummaryView} onClick={ this.showIconTip.bind(this) }> 
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[0] } width='100%' alt='P'/>
						{ dateBlock('ODR_GOODS_PRODUCT') }
					</Flex.Item>
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[1] } width='100%' alt='S' />
						{ dateBlock('ODR_BOOKS_UNDO') }
					</Flex.Item>
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[2] } width='100%' alt='L' />
						{ dateBlock('ODR_LOADS_UNDO') }
					</Flex.Item>
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[3] } width='100%' alt='B' />
						{ dateBlock('ODR_ONBOARD_DONE') }
					</Flex.Item>
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[4] } width='100%' alt='N' />
						{ dateBlock('ODR_NEGODOC_UNDO') }
					</Flex.Item>
					<Flex.Item>
						<img src={ statusViewFilter(this.props.orderSummaryInfo.status)[5] } width='100%' alt='A' />
						{ dateBlock('ODR_ARRIVAL_DONE') }
					</Flex.Item>
				</Flex>
				{ imgModal() }
            </div>
        );
    }
}

export default OrderSummary;

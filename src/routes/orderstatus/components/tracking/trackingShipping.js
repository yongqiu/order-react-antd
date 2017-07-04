import React, { Component, PropTypes } from 'react';
import { Accordion } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingShipping.css';
import { businessEvent } from '../../../../config';

class TrackingShipping extends Component {
    static propTypes = {
        className: PropTypes.string,
        shippingSpaceInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.beOpen = false;
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_shipping );
        }
    }

    render() {
        let nBlockNum = 0;

        let blockProps = {
            id: null,
            description: null
        };

        const optionalBlock = ( content , type ) => {
            if( !content || ( isNaN(content) && !content.length ) || (content==='Invalid date') ) {
                return ''
            }
            nBlockNum += 1;

            let unit = '';
            let styleTitle = styles.shipTitle;
            let styleContent = styles.shipContent;

            if( type === 'freeDetention' ) {
                blockProps.id = 'order_tracking_freeDetention';
                blockProps.description = 'Free Detention';
                styleTitle = styles.shipTitleFreeDetention;
                styleContent = styles.shipContentFreeDetention;
                unit = 'day(s)';
                unit = parseInt(content) === 1 ? <FormattedMessage id='numberOfDayAvailable_one' description='day' defaultMessage='day' />
                                               : <FormattedMessage id='numberOfDayAvailable_other' description='days' defaultMessage='days' />;
            }
            else if ( type === 'freeDemurrage' ) {
                blockProps.id = 'order_tracking_freeDumurrage';
                blockProps.description = 'Free Dumurrage';
                styleTitle = styles.shipTitleFreeDetention;
                styleContent = styles.shipContentFreeDetention;
                unit = parseInt(content) === 1 ? <FormattedMessage id='numberOfDayAvailable_one' description='day' defaultMessage='day' />
                                               : <FormattedMessage id='numberOfDayAvailable_other' description='days' defaultMessage='days' />;
            }
            else if ( type === 'blNo' ) {
                blockProps.id = 'order_tracking_blno';
                blockProps.description = 'B/L No.';
                unit = '';                
            }
            else if ( type === 'voyage' ) {
                blockProps.id = 'order_tracking_voyage';
                blockProps.description = 'Voyage';
                unit = '';                   
            }
            else if ( type === 'vessel' ) {
                blockProps.id = 'order_tracking_vessel';
                blockProps.description = 'Vessel';
                unit = '';                    
            }
            else if ( type === 'shippingCompany' ) {
                blockProps.id = 'order_tracking_shippingCompany';
                blockProps.description = 'Shipping Company';
                unit = '';                     
            }
            else if ( type === 'shippingDays' ) {
                blockProps.id = 'order_tracking_shippingdays';
                blockProps.description = 'Shipping Days';
                styleTitle = styles.shipTitleFreeDetention;
                styleContent = styles.shipContentFreeDetention;
                unit = parseInt(content) === 1 ? <FormattedMessage id='numberOfDayAvailable_one' description='day' defaultMessage='day' />
                                               : <FormattedMessage id='numberOfDayAvailable_other' description='days' defaultMessage='days' />;                   
            }
            else if ( type === 'etd' ) {
                blockProps.id = 'status_etd';
                blockProps.description = 'ETD';
                unit = '';                
            }
            else if ( type === 'etdChangeTo' ) {
                blockProps.id = 'status_etdChangeTo';
                blockProps.description = 'ETD Change To';
                styleTitle = styles.shipTitleEtdChangeTo;
                styleContent = styles.shipContentEtdChangeTo;
                unit = '';                 
            }
            else if (  type === 'etdChangedReason') {
                blockProps.id = 'status_etdChangedReason';
                blockProps.description = 'ETD Change Reason';
                unit = '';               
            }
            else if ( type === 'eta' ) {
                blockProps.id = 'status_eta';
                blockProps.description = 'ETA';
                unit = '';                     
            }
            else if ( type === 'shipPort' ) {
                blockProps.id = 'order_tracking_transport';
                blockProps.description = 'Transhipment Port';
                unit = '';                
            }
            else{}

            return (
                <div className={styles.contentItem}>
                    <span className={styleTitle}>
                        <FormattedMessage id={blockProps.id} description={blockProps.description} defaultMessage={blockProps.description} /> :&nbsp;&nbsp;
                    </span><br />
                    <pre className={styleContent} style={{margin:'5px 0px' , whiteSpace:'pre-wrap' , wordWrap:'break-word'}} >
                        { content } &nbsp;{ unit }
                    </pre>
                </div>  
            );
        };

        const containerBlock = ( fcl , lcl ) => {
            let fclBlock;
            let fclItems = [];
            let lclBlock;
            let lclItems = [];

            if( fcl.length === 0 && lcl.length === 0 ) {
                return '';
            }

            nBlockNum += 1;

            if( fcl.length === 0 ) {
                fclBlock = '';
            }
            else {
                fcl.forEach( function( item , index ) {
                    fclItems.push(
                        <span style={{ paddingLeft:'15px' , display:'block' }} key={index}>
                            { item.quantity }&nbsp;*&nbsp;
                            { item.boxsize === 'string' || !item.boxsize ? '' : item.boxsize }&nbsp;
                            { item.boxtype }&nbsp;{ item.comments === 'string' || !item.comments ? '' : '(' + item.comments + ')'}
                        </span>
                    );
                });
                fclBlock = <div className={styles.shipContent}>FCL<br/>{ fclItems }</div>;
            }

            if( lcl.length === 0 ) {
                lclBlock = '';
            }
            else {
                lcl.forEach( function( item , index ) {
                    lclItems.push(
                        <pre style={{margin:'5px 0px' , paddingLeft:'15px' , whiteSpace:'pre-wrap' , wordWrap:'break-word'}} key={index}>
                            { item.comments }
                        </pre>
                    );
                });
                lclBlock = <div className={styles.shipContent}>LCL<br/>{ lclItems }</div>;
            }

            return(
                <div className={styles.contentItem}>
                    <span className={styles.shipTitle}>
                        <FormattedMessage id='order_tracking_containers' description='Containers' defaultMessage='Containers' /> :&nbsp;&nbsp;
                    </span><br />
                    { fclBlock }
                    { lclBlock }
                </div>
            );
        };

        const shippingSpaceItems = (shipInfo) => {
            if( !shipInfo.info ) {
                return '';
            }
            let transhipmentPortGroup = [];
            shipInfo.info.shipPortList.forEach( function( item , index ) {
                var _tmpPort = <span key={index}><span>{item.countryname} , {item.portname}</span><br/></span>;
                transhipmentPortGroup.push( _tmpPort );
            });
            let shippingItem =  <div className={styles.contentwrap}>
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.shippingCompany , 'shippingCompany' ) }  
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.vessel , 'vessel' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.voyage , 'voyage' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.blNo , 'blNo' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.freeDetention , 'freeDetention' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.freeDemurrage , 'freeDemurrage' ) }
                                    { containerBlock( shipInfo.info.shipFclList , shipInfo.info.shipLclList ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.shippingDays , 'shippingDays' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : moment(parseInt(shipInfo.info.basicInfo.etd)).format('YYYY-MM-DD') , 'etd' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : moment(parseInt(shipInfo.info.basicInfo.etdChangeTo)).format('YYYY-MM-DD') , 'etdChangeTo' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : shipInfo.info.basicInfo.etdChangedReason , 'etdChangedReason' ) }
                                    { optionalBlock( !shipInfo.info.basicInfo ? '' : moment(parseInt(shipInfo.info.basicInfo.eta)).format('YYYY-MM-DD') , 'eta' ) }
                                    { optionalBlock( !transhipmentPortGroup.length ? '' : transhipmentPortGroup , 'shipPort' ) }
                                </div>;
            return (
                shippingItem
            );
        };

        let bHasBlock = false;
        shippingSpaceItems( this.props.shippingSpaceInfo ).props.children.forEach(function(i){
            if( i !== '' ) {
                bHasBlock = true;
                return;
            }
        });
        let accClass = !bHasBlock ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_BOOKS_UNDO' description='Shipping Space' defaultMessage='Shipping Space' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.shippingSpaceInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;

        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={ accClass } onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
                        <div className='statusContent'>
                            { shippingSpaceItems( this.props.shippingSpaceInfo ) }
                        </div>
					</Accordion.Panel>
				</Accordion>
			</div>                
        );
    }
}

export default TrackingShipping;

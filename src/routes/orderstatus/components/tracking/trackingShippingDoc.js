import React, { Component, PropTypes } from 'react';
import { Accordion , Icon } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingShippingDoc.css';
import { businessEvent } from '../../../../config';

class TrackingShippingDocuments extends Component {
    static propTypes = {
        className: PropTypes.string,
        shippingDocumentsInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            sortedData: {}
        };
        this.beOpen = false;
        this.docGroup = {};
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_shippingDoc );
        }
    }

    componentDidMount() {
        this.sortData(this.props.shippingDocumentsInfo.info.negdocAttach);
    }

    componentWillReceiveProps(nextProps){ 
        this.sortData(nextProps.shippingDocumentsInfo.info.negdocAttach);
    }

    clickToDownloadAttachment() {
        ga( 'send' , businessEvent.orderStatusClickAttachment );
    }

    sortData(data) {
        let docAttaches = data;
        let commercialInvoiceGroup = [];
        let packingListGroup = [];
        let billOfLadingGroup = [];
        let coGroup = [];
        let insuranceGroup = [];
        let coaGroup = [];
        let otherGroup = [];
        docAttaches.forEach( function( item ) {
            if( item.grouptype === 'ODR_COMMERCIAL_INVOICE' ) {
                commercialInvoiceGroup.push(item);
            }
            else if ( item.grouptype === 'ODR_PACKING_LIST' ) {
                packingListGroup.push(item);
            }
            else if ( item.grouptype === 'ODR_BILL_OF_LOADING' ) {
                billOfLadingGroup.push(item);
            }
            else if ( item.grouptype === 'ODR_CO' ) {
                coGroup.push(item);
            }
            else if ( item.grouptype === 'ODR_INSURANCE' ) {
                insuranceGroup.push(item);
            }
            else if ( item.grouptype === 'ODR_COA' ) {
                coaGroup.push(item);
            }
            else if (  item.grouptype === 'ODR_OTHER'  ) {
                otherGroup.push(item);
            }
            else{}
        });
        this.setState({
            sortedData: {
                commercialInvoiceGroup: commercialInvoiceGroup,
                packingListGroup: packingListGroup,
                billOfLadingGroup: billOfLadingGroup,
                coGroup: coGroup,
                insuranceGroup: insuranceGroup,
                coaGroup: coaGroup,
                otherGroup: otherGroup
            }
        });
    }

    render() {  
        let _this = this;
        let blockProps = {
            id: null,
            description: null
        };  

        const optionalBlock = ( content , type ) => {
            if( content === '' || content === 'Invalid date' ) {
                return '';
            }

            if( type === 'courierTrackingNo' ) {
                blockProps.id = 'order_tracking_courierTrackingNo';
                blockProps.description = 'Courier Tracking No';
            }
            else if ( type === 'courierTrackingDate' ) {
                blockProps.id = 'order_tracking_courierTrackingDate';
                blockProps.description = 'Courier Tracking Date';
            }
            else{}

            return (
                <div className={styles.contentItem}>
                    <span className={styles.shipTitle}>
                        <FormattedMessage id={blockProps.id} description={blockProps.description} defaultMessage={blockProps.description} /> :&nbsp;&nbsp;
                    </span><br />
                    <span className={styles.shipContent}>
                        { content }
                    </span>
                </div>  
            );
        };

        const docsBlock = ( content , type ) => {
            if( !content ) {
                return;
            }
            
            if( content.length === 0 ) {
                return ''
            }

            if( type === 'commercialInvoice' ) {
                blockProps.id = 'order_tracking_commercialInvoice';
                blockProps.description = 'Commercial Invoice';                  
            }
            else if( type === 'packingListGroup' ) {
                blockProps.id = 'order_tracking_packingList';
                blockProps.description = 'Packing List'; 
            }
            else if( type === 'billOfLadingGroup' ) {
                blockProps.id = 'order_tracking_billOfLoading';
                blockProps.description = 'Bill of Loading';                 
            }
            else if ( type === 'insuranceGroup' ) {
                blockProps.id = 'order_tracking_insurance';
                blockProps.description = 'Insurance';                  
            }
            else if ( type === 'coaGroup' ) {
                blockProps.id = 'order_tracking_coa';
                blockProps.description = 'COA';                 
            }
            else if ( type === 'otherGroup' ) {
                blockProps.id = 'order_tracking_other';
                blockProps.description = 'Other';                 
            }
            else {}
            let docsDOM = [];
            content.forEach( function( item , index ) {
                let dom = <span key={index} onClick={_this.clickToDownloadAttachment.bind(_this)}><a href={ item.docurl } target="_blank">{ item.docname }</a><br/></span>;
                docsDOM.push( dom );
            })
            return (
                <div className={styles.contentItem}>
                    <span className={styles.shipTitle}>
                        <FormattedMessage id={blockProps.id} description={blockProps.description} defaultMessage={blockProps.description} /> :&nbsp;&nbsp;
                    </span><br /> 
                    <span className={styles.shipContent}>
                        { docsDOM }
                    </span>
                </div>
            );
        };

        const shippingDocItems = ( docInfo ) => {            
            let docItem =   <div className={styles.contentwrap}>
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.commercialInvoiceGroup , 'commercialInvoice' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.packingListGroup , 'packingListGroup' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.billOfLadingGroup , 'billOfLadingGroup' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.coGroup , 'coGroup' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.insuranceGroup , 'insuranceGroup' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.coaGroup , 'coaGroup' ) }
                                { docsBlock( !this.state.sortedData ? '' : this.state.sortedData.otherGroup , 'otherGroup' ) }
                                { optionalBlock( !docInfo.info.negdoc ? '' : docInfo.info.negdoc.expressno , 'courierTrackingNo' ) }
                                { optionalBlock( !docInfo.info.negdoc ? '' :  moment(parseInt( docInfo.info.negdoc.expressdate )).format('YYYY-MM-DD') , 'courierTrackingDate' ) }
                            </div>
            return (
                docItem
            );
        };
        
        let accClass = ( !this.props.shippingDocumentsInfo.info.negdoc &&  this.props.shippingDocumentsInfo.info.negdocAttach.length === 0 ) ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_NEGODOC_UNDO' description='Shipping Documents' defaultMessage='Shipping Documents' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.shippingDocumentsInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;

        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={accClass} onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
                        <div className='statusContent'>
                            { shippingDocItems( this.props.shippingDocumentsInfo ) }
                        </div>
					</Accordion.Panel>
				</Accordion>
			</div>              
        );
    }
}

export default TrackingShippingDocuments;

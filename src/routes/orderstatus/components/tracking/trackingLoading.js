import React, { Component, PropTypes } from 'react';
import { Accordion , Icon , Modal } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './trackingLoading.css';
import { regularEvent , businessEvent } from '../../../../config';

class TrackingLoading extends Component {
    static propTypes = {
        className: PropTypes.string,
        loadingInfo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            modalImgUrl: '',
            visible: false
        }
        this.beOpen = false;
    }

    accordionAction() {
        this.beOpen = !this.beOpen;
        if( this.beOpen ) {
            ga( 'send' , businessEvent.viewOStatusItem_loading );
        }
    }

    showModal(e) {
        e.preventDefault();
        this._this.setState({
            modalImgUrl: this.modalImg,
            visible: true
        });
        ga( 'send' , regularEvent.showPictureBrowseScreen );
        ga( 'send' , businessEvent.viewFullScreenPic );
    }

    onClose() {
        this.setState({
            visible: false
        });
    }

    render() {
        const loadingStatusItems = () => {
            if( this.props.loadingInfo.info.length === 0 ) {
                return '';
            }
            let imgGroup = [];
            this.props.loadingInfo.info.forEach( function( item , index ) {
                let _img =  <div className={ styles.imgItem } key={index} onClick={ this.showModal.bind( { ...{_this:this} , ...{ modalImg: item.url } } ) } >
                                <div>{ item.containercode }</div>
                                <img src={item.url} width='100%' alt="Loading Image" />
                            </div>;
                imgGroup.push( _img );
            }.bind( this ));
            return imgGroup;
        };

        const imgModal = ( imgUrl ) => {
            return (
                <Modal
                    className='termmodal' 
                    closable={false}
                    onClose={this.onClose.bind(this)} 
                    transparent 
                    maskClosable={this.onClose.bind(this)} 
                    visible={this.state.visible} 
                    footer={[{ text: 'OK', onPress: () => { this.onClose(); } }]}
                >
                    <div className="modal-demo-content">
                        <img src={ imgUrl } width='300%' alt="Loading Image" />
                    </div>
                </Modal>
            );
        };

        let accClass = loadingStatusItems() === '' ? 'accordionInTracking trackingEmpty' : 'accordionInTracking';

        const header =  <div>
                            <span>
                                <FormattedMessage id='orderlist_ODR_LOADS_UNDO' description='Loading' defaultMessage='Loading' />
                            </span>
                            <span className='statusUpdateTime'>
                                &nbsp;&nbsp;&nbsp;{ moment(parseInt(this.props.loadingInfo.updatetime)).format('YYYY-MM-DD') }
                            </span>
                        </div>;

        return (
 			<div className='statusBlockInTracking'>
				<Accordion className={ accClass } onChange={this.accordionAction.bind(this)}>
					<Accordion.Panel header={ header }>
                        <div className='statusContent'>
                            { loadingStatusItems() }
                            { imgModal( this.state.modalImgUrl ) }
                        </div>
					</Accordion.Panel>
				</Accordion>
			</div>               
        );
    }
}

export default TrackingLoading;

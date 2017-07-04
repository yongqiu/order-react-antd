import React, { Component, PropTypes } from 'react';
import { Flex, NoticeBar, Icon,Button,NavBar} from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import styles from './downloadBar.css';
import {DOWNLOAD_APP_URL} from '../../../../config';
import * as gaPageFilter from '../../../../utils/gafilter';

class Download extends Component {
    static propTypes = {
        downloadStyle: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    };

    onClick(event) {
        event.preventDefault();
        var winRef = window.open('', '_blank');
        ga( 'send' , {
            hitType: 'event',
            eventCategory: 'clickDownloadbar',
            eventAction: 'Go to download app page',
            eventLabel: '',
            transport: 'beacon',
            hitCallback: gaPageFilter.createFunctionWithTimeout( function(){
                winRef.location = DOWNLOAD_APP_URL;
            })
        });
    }


    render() {  
        return (
            <div style = {this.props.downloadStyle}>
                <Flex className='downloadBar'>
                    <Flex.Item className={styles.logo}>
                        <img src={require('../../assets/logo.png')}  width='100%' alt='P'/>
                    </Flex.Item>
                    <Flex.Item className={styles.title}>
                        <FormattedMessage id='menu_dashboard_downbar' description='Get Orker APP Now!' defaultMessage='Get Orker APP Now!' />
                    </Flex.Item>
                    <Flex.Item className={styles.button}>
                        <Button onClick={ this.onClick.bind(this) } type="ghost" inline size="small">Download</Button>
                    </Flex.Item>
                </Flex>
            </div>
        );
    }
}

Download.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Download;

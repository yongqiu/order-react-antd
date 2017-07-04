import React from 'react';
import { Drawer , NavBar , RefreshControl , ListView , Toast , Icon } from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';

import * as dashboardService from '../../services/dashboardrequest'
import styles from './dashboard.css';
import Sidebar from '../../components/sidebar/sidebar';
import EtdChanged from './components/etdchanged/etdchanged';
import Calendar from './components/calendar/calendar';
import Willbearrived from './components/willbearrived/willbearrived';
import Status from './components/status/status';
import Download from './components/downloadBar/downloadBar';
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent , businessEvent } from '../../config';
import { loadLiveChat } from '../../components/livechat/livechat';

// response code
import { RESPONSE_CODE } from '../../config';

class Dashboard extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
    };

    constructor(props, context) {
        super(props, context);

        this.dataSource = new ListView.DataSource({
            rowHasChanged: function(){return {}},
        });

        this.today = new Date();

        this.requestData = {
            headers: {
                'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
            },
            body: {
                buyername: localStorage.username ? localStorage.username : sessionStorage.username,
                startDate: new Date( this.today.getFullYear() , this.today.getMonth() ,  this.today.getDate() ).getTime(),
                endDate: new Date( this.today.getFullYear() , this.today.getMonth() ,  this.today.getDate() + 1 ).getTime() - 1
            }
        };

        this.state = {
            dataSource: this.dataSource,
            open: false,
            position: 'left',
            dashboard: {},
            refreshing: false,
            showDownloadBar:true
        }

        this.bAddTouchStart = false;
        this.bAddTouchEnd = false;
    }

    componentDidMount() {
        this.requestServer();
        //416733052@qq.com
        window.addEventListener("orientationchange", function() {
            this.setState({ refreshing: true });
        }.bind(this), false);

        this.onScroll();

        loadLiveChat();

        this.livechatEvent();

        gaPageFilter.gaSetPage( 'dashboard' , 'Dashboard' );
        ga( 'send' , regularEvent.showDashboardScreen );
    }

    livechatEvent() {
        var LC_API = window.LC_API || {};
        window.__lc.visitor = {
            name: localStorage.username ? localStorage.username : sessionStorage.username,
            email: localStorage.username ? localStorage.username : sessionStorage.username
        };
        LC_API.minimize_chat_window();
    }


    requestServer() {
        dashboardService.queryOrderDashboard(this.requestData).then(function(dashboardInfo){
            Toast.hide();
            switch( dashboardInfo.data.respcode ) {
                case RESPONSE_CODE.SUCCESFULL_OLD:
                case RESPONSE_CODE.SUCCESFULL : {
                    this.setState({
                        dataSource: this.dataSource.cloneWithRows([dashboardInfo.data]),
                        dashboard: dashboardInfo.data,
                        refreshing: false
                    }); 
                    return;
                }
                case RESPONSE_CODE.NOTOKEN:
                case RESPONSE_CODE.NOTOKEN_OLD:
                case RESPONSE_CODE.TOKEN_INVALID:
                case RESPONSE_CODE.TOKEN_INVALID_OLD:
                case RESPONSE_CODE.PARAMS_ERROR:
                case RESPONSE_CODE.PARAMS_ERROR_OLD:
                case RESPONSE_CODE.REQUEST_ERROR:
                case RESPONSE_CODE.REQUEST_ERROR_OLD: {
                    Toast.fail( this.props.intl.formatMessage( { id: 'request_tip_serviceError' } , { description: 'Serve Error' } , { defaultMessage: 'Serve Error' }) , 1.5 , () => {
                        delete localStorage.token ? localStorage.token : sessionStorage.token;
                        delete localStorage.username ? localStorage.username : sessionStorage.username;
                        this.context.router.replace('/'); 
                    });                   
                    return;
                }
                case NETWORK_ERROR:
                case NETWORK_ERROR_OLD:{
                    Toast.fail( this.props.intl.formatMessage( { id: 'request_tip_network_error' } , { description: 'Network Error' } , { defaultMessage: 'Network Error' }) , 1.5 );  
                    return;
                }
                default: {
                    break;
                }
            }
        }.bind(this));   
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.requestServer();
    }

    onOpenChange() {
        this.setState({ open: !this.state.open });
        if( !!document.getElementById('livechat-compact-container') ) {
            document.getElementById('livechat-compact-container').style.zIndex = 30;
        }
    }

    GetSlideDirection( startY , endY ) {  
        var dy = startY - endY;   
        var result = 0;  

        if ( dy > 40 && this.state.showDownloadBar ) {  
            result = 1;  
        }
        else if ( dy < -40 && !this.state.showDownloadBar ) {  
            result = 2;  
        }   
        else {}
        return result;  
    }  

    onScroll() {  
        let _this = this;
        let orkerDoadhboard = document.getElementsByClassName('orkerDoadhboard');  
   
        //滑动处理  
        var startX, startY;  
        if( !_this.bAddTouchStart ) {
            orkerDoadhboard[0].addEventListener('touchstart',function (ev) {  
                startY = ev.touches[0].pageY;    
            }, false);  
            _this.bAddTouchStart = true;
        }
        if( !_this.bAddTouchEnd ) {
            orkerDoadhboard[0].addEventListener('touchend',function (ev) {  
                var endY;  
                endY = ev.changedTouches[0].pageY;  
                var direction = _this.GetSlideDirection( startY , endY );  
                switch( direction ) {  
                    case 1: {
                        if( _this.state.showDownloadBar ) {
                            _this.setState({showDownloadBar: false})
                        }
                        break;  
                    }
                    case 2:  {
                        if( !_this.state.showDownloadBar ) {
                            _this.setState({showDownloadBar: true})
                        }
                        break;  
                    }
                    default:             
                }  
            }, false);   
            _this.bAddTouchEnd = true;           
        }

    }

    render() {

        const contentBlocks = (rowData) => {
            const etdChangedProps = {
                etdChangedAmount: rowData.etdChanged.toString()
            };
            let etdBlock = rowData.etdChanged === 0 ? <span></span> : <EtdChanged {...etdChangedProps} />

            let hasEtaGroup = [ rowData.eta0 , rowData.eta1 , rowData.eta2 , rowData.eta3 , rowData.eta4 , rowData.eta5 , rowData.eta6 ];
            const calendarProps = {
                hasEtaGroup: hasEtaGroup
            };

            const etaWithinSevenDaysProps = {
                willBeArrivedAmount: (rowData.eta0 + rowData.eta1 + rowData.eta2 + rowData.eta3 + rowData.eta4 + rowData.eta5 + rowData.eta6).toString()
            };

            let statusAmountFroup = [ rowData.productionTotal , rowData.shippingTotal , rowData.loadingTotal , rowData.onBoardTotal , rowData.negDocTotal , rowData.arrivedTotal ];
            const statusProps = {
                statusListAmount: statusAmountFroup
            };

            return (
                <div>
                    {etdBlock}
                    <div><Calendar {...calendarProps} /></div>
                    <div><Willbearrived {...etaWithinSevenDaysProps} /></div>
                    <div><Status {...statusProps} /></div>
                </div>
            );
        };
        
        let downloadProps ={
            downloadStyle: {
                display:this.state.showDownloadBar ? 'block' : 'none'
            }
        };

        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange.bind(this),
            sidebar: <Sidebar dashbordOn={true}/>,
            touch: false,
            dragHandleStyle: { display: 'none' },
            style: {width:'100%'},
            contentStyle: { textAlign: 'center',overflow:'hidden'}
        };

        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_menu.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onOpenChange.bind(this)
        };

        return (
            <div style={{ height: '100%' }}>
                <Drawer className="dashboardDrawer" {...drawerProps}  >
                    <div>
                        <Download {...downloadProps}/>
                        <NavBar { ...navbarProps }  >
                            <FormattedMessage id='menu_dashboard' description='Title of Dashboard' defaultMessage='Dashboard' />
                        </NavBar>
                    </div>
                    <ListView className="dashboardwrap orkerDoadhboard" 
                        dataSource={this.state.dataSource}
                        renderRow={contentBlocks}
                        initialListSize={2}
                        pageSize={2}
                        scrollRenderAheadDistance={150}
                        style={{
                            height: document.body.clientHeight / 2,
                            border: '1px solid #ddd',
                            margin: '0.1rem 0',
                        }}
                        scrollerOptions={{ scrollbars: true }} 
                        onScroll={
                            this.onScroll.bind(this)
                        }
                        refreshControl={
                            <RefreshControl
                                icon={[
                                    <div key="0" className="am-refresh-control-pull"><Icon type={require('../../assets/svgs/icon_arrow_down.svg')} size="md" /></div> , 
                                    <div key="1" className="am-refresh-control-release"><Icon type={require('../../assets/svgs/icon_arrow_up.svg')} size="md" /></div> 
                                ]} 
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </Drawer>

            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default injectIntl(Dashboard);

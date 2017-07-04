import React, { Component, PropTypes } from 'react';
import { List,NavBar,Icon,Drawer, WhiteSpace } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './settings.css';
import { loadLiveChat } from '../../components/livechat/livechat';

const Item = List.Item;
const Brief = Item.Brief;
class Settings extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props,context) {
        super(props,context);
        this.state = {
          open: false,
          position: 'left',
          changed:false
        };
    }
  
    componentDidMount() {
        loadLiveChat();
    }

    onOpenChange() {
      this.setState({ open: !this.state.open });
    }

    repalceToCpw(){
      this.context.router.push({pathname:'/changepsw'})
    }

    render() {
        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange.bind(this),
            sidebar: <Sidebar settingsOn={true} />,
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
            <div>
              <Drawer {...drawerProps} >
                <NavBar { ...navbarProps } >
                    <FormattedMessage id='orderlist_setting' description='settings of sidebar' defaultMessage='Setting' />
                </NavBar>
                <WhiteSpace size="lg" />
                <List className="settings-list">
                    <Item extra={''} onClick={this.repalceToCpw.bind(this)}><FormattedMessage id='menu_change_password' description='Change Password' defaultMessage='Change Password' /></Item>
                </List>
            </Drawer> 
            </div>
        );
    }
}
Settings.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};
export default Settings;

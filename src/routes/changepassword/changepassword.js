import React, { Component, PropTypes } from 'react';
import { Drawer , NavBar , Icon, Button, Toast } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../../components/sidebar/sidebar';
import ChangePswForm from './components/changepswform/changepswform';
import SuccessPage from './components/successPage/successPage';
import * as gaPageFilter from '../../utils/gafilter';
import { loadLiveChat } from '../../components/livechat/livechat';

class ChangePassword extends Component {
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
        if(localStorage.token == null){
            Toast.hide();
            Toast.fail('error' , 1.5 , () => {
                delete localStorage.token ? localStorage.token : sessionStorage.token;
                delete localStorage.username ? localStorage.username : sessionStorage.username;
                this.context.router.replace('/'); 
            }); 
        }
    }

    onChangeSubmit(changed){
        this.setState(changed)

    }

	onNavbarLeftClick() {
      this.context.router.goBack();  
    }

    componentDidMount() {
        gaPageFilter.gaSetPage( '/changepsw' , 'Change Password' );
        loadLiveChat();
    }

    render() {

        let PasswordBlock = this.state.changed ? <SuccessPage /> : <ChangePswForm Submit={this.onChangeSubmit.bind(this)} />;


        let navbarProps = {
            iconName: false,
            leftContent: <Icon type={require('../../assets/svgs/icon_arrow_left.svg')} size="md" style={{color:'#fff'}} />,
            onLeftClick: this.onNavbarLeftClick.bind(this)
        };

        return (
            <div style={{ height: '100%' }}>
				<NavBar { ...navbarProps } >
					<FormattedMessage id='menu_change_password' description='Change Password' defaultMessage='Change Password' />
				</NavBar>
                {PasswordBlock}         	
            </div>
        );
    }
}
ChangePassword.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default ChangePassword;

import React, { Component, PropTypes } from 'react';
import { Drawer , NavBar , Icon, Button, Toast } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../../components/sidebar/sidebar';
import ChangePswForm from './components/registerform/registerform';
import SuccessPage from './components/successPage/successPage';
import * as gaPageFilter from '../../utils/gafilter';

class Register extends Component {
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
        // if(localStorage.token == null){
        //    console.log(localStorage)
        //     Toast.hide();
        //     Toast.fail('error' , 1.5 , () => {
        //         delete localStorage.token ? localStorage.token : sessionStorage.token;
        //         delete localStorage.username ? localStorage.username : sessionStorage.username;
        //         this.context.router.replace('/'); 
        //     }); 
        // }
    }
    onChangeSubmit(changed){
        this.setState(changed)

    }

	onNavbarLeftClick() {
      this.context.router.replace('/'); 
    }

    componentDidMount() {
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
					<FormattedMessage id='menu_register' description='Change Password' defaultMessage='Register' />
				</NavBar>
                {PasswordBlock}         	
            </div>
        );
    }
}
Register.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Register;

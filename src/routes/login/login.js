import React from 'react';
import { Flex, WhiteSpace , Button , Toast } from 'antd-mobile';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';
import styles from './login.css';
import Topicrow from './components/topic/topicrow';
import Loginform from './components/loginform/loginform'; 
import * as gaPageFilter from '../../utils/gafilter';
import { regularEvent } from '../../config';

class Login extends React.Component {

	static propTypes = {
		name: React.PropTypes.string
	};

	constructor(props, context) {
		super(props, context);
	}

    componentDidMount() {
    	var LC_API = window.LC_API || {};
    	gaPageFilter.gaSetPage( 'login' , 'Login' );
        ga( 'send' , regularEvent.showLoginScreen );
        if( !!LC_API.hide_chat_window ) {
        	LC_API.hide_chat_window();
	        LC_API.close_chat();
        }
    }

	replaceToregister(){
		this.context.router.push('/register');
	}

	render() {
		const PlaceHolder = props => (
		  <div style={{
		    backgroundColor: 'rgba(179,179,179,1)',
		    height: '1px',
		    lineHeight: '0.6rem',
		    width: '100%',
		  }} {...props}
		  >Item</div>
		);
		return (
			<div className="login" >
		        <WhiteSpace style={{'height':'140px'}} />

		        <Flex>
		        	<Topicrow />
		        </Flex>

		        <WhiteSpace style={{'height':'100px'}} />

		        <Flex>
		        	<Loginform />
		        </Flex>
		        <Flex className={styles.fengexian}>
				      <Flex.Item><PlaceHolder /></Flex.Item>
				      <span className={styles.or}>or</span>
				      <Flex.Item><PlaceHolder /></Flex.Item>
				    </Flex>
						<Button type="primary" className={styles.regbutton} onClick={this.replaceToregister.bind(this)}>
							<FormattedMessage id='menu_register' description='Register' defaultMessage='Register' />
						</Button>
		        <WhiteSpace style={{'height':'280px'}} />

			</div>
		);
	}
}
Login.contextTypes = {
	router: function contextType() {
		return React.PropTypes.Object;
	}
};
export default Login;
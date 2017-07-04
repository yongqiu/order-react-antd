'use strict';
import React from 'react';
import { List , InputItem , WhiteSpace , Button , Toast , WingBlank , Flex , Checkbox , Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { FormattedMessage , injectIntl , intlShape } from 'react-intl';
import styles from './loginform.css';
import * as loginservice from '../../../../services/authrequest';
import encode from '../../../../utils/des';
import deskeys from './deskeys';
import Terms_en from './terms_en';
import Terms_zh from './terms_zh';
import Terms_es from './terms_es';
import Terms_pt from './terms_pt';
import * as messages from './intl.js';
import { language } from '../../../../components/getlanguagecontext/getlanguagecontext';

// response code
import { RESPONSE_CODE } from '../../../../config';

const AgreeItem = Checkbox.AgreeItem;

class Loginform extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			visible: false
		};
	}

	showModal(e) {
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

	onSubmit() {
		let submitContext = this.context;
		let loginForm = this.props.form;
		let intlGroup = this.props.intl;
		if( loginForm.getFieldsValue().terms === false ) {
			Toast.fail( this.props.intl.formatMessage( { id: 'hint_term' } , { description: 'Term' } , { defaultMessage: 'Term' }) , 1.5 );
			return;
		}
		loginForm.validateFields({ force: true }, (error) => {
			if (!error) {
				let hashPassword = encode( loginForm.getFieldsValue().password , deskeys.key1, deskeys.key2, deskeys.key3 );
				let requestData = {
					userid: loginForm.getFieldsValue().account,
					password: hashPassword
				};
				loginservice.login(requestData).then(function(data){
					Toast.hide();
		            switch( data.data.respcode ) {
		                case RESPONSE_CODE.SUCCESFULL_OLD:
		                case RESPONSE_CODE.SUCCESFULL : {
							if( loginForm.getFieldsValue().remember ) {
								localStorage.token = data.data.token;
								localStorage.username = data.data.buyername.toLowerCase();
							}
							else {
								sessionStorage.token = data.data.token;
								sessionStorage.username = data.data.buyername.toLowerCase();
							}
							submitContext.router.replace('/dashboard');
		                    return;
		                }
		                case RESPONSE_CODE.NOTOKEN:
		                case RESPONSE_CODE.NOTOKEN_OLD:
		                case RESPONSE_CODE.SERVER_CRASH:
		                case RESPONSE_CODE.SERVER_CRASH_OLD:
		                case RESPONSE_CODE.TOKEN_INVALID:
		                case RESPONSE_CODE.TOKEN_INVALID_OLD:
		                case RESPONSE_CODE.PARAMS_ERROR:
		                case RESPONSE_CODE.PARAMS_ERROR_OLD:
		                case RESPONSE_CODE.REQUEST_ERROR:
		                case RESPONSE_CODE.REQUEST_ERROR_OLD: {
		                    Toast.fail( intlGroup.formatMessage( { id: 'request_tip_serviceError' } , { description: 'Serve Error' } , { defaultMessage: 'Serve Error' }) , 1.5 );                   
		                    return;
		                }
		                case RESPONSE_CODE.NETWORK_ERROR:
		                case RESPONSE_CODE.NETWORK_ERROR_OLD:{
		                    Toast.fail( intlGroup.formatMessage( { id: 'request_tip_network_error' } , { description: 'Network Error' } , { defaultMessage: 'Network Error' }) , 1.5 );  
		                    return;
		                }
		                case RESPONSE_CODE.PSW_ERROR:
		                case RESPONSE_CODE.PSW_ERROR_OLD: {
		                	Toast.fail( intlGroup.formatMessage( { id: 'request_tip_psw_error' } , { description: 'Password Error' } , { defaultMessage: 'Password Error' }) , 1.5 );  
		                	return;
		                }
		                case RESPONSE_CODE.NO_ACCOUNT:
		                case RESPONSE_CODE.NO_ACCOUNT_OLD: {
		                	Toast.fail( intlGroup.formatMessage( { id: 'request_tip_user_not_exist' } , { description: 'User does not exist.' } , { defaultMessage: 'User does not exist.' }) , 1.5 );  
		                	return;
		                }
		                case RESPONSE_CODE.ACCOUNT_NOT_ACTIVE:
		                case RESPONSE_CODE.ACCOUNT_NOT_ACTIVE_OLD: {
		                	Toast.fail( intlGroup.formatMessage( { id: 'request_tip_account_not_active' } , { description: 'Account not active' } , { defaultMessage: 'Account not active' }) , 1.5 );  
		                	return;
		                }
		                default: {
		                    break;
		                }
		            }
				});
			} 
			else {
				let message = '';
				if( error['account'] && !error['password'] ) {
					message = messages.validInfo().usernameNull;
				}
				else if ( !error['account'] && error['password'] ) {
					message = messages.validInfo().passwordNull;
				}
				else if ( error['account'] && error['password'] ) {
					message = messages.validInfo().userAndPwdNull;
				}
				else {}
				Toast.fail(message, 1.5);
			}
		});
	}

    componentDidMount() {
        if( !!localStorage.token ) {
        	this.context.router.replace('/dashboard');
        }
    }

	render() {
		const { getFieldProps } = this.props.form;

		const chooseLocale = () => {
		    let navLang = language();
		    switch(navLang){
		        case 'en': {
		        	return Terms_en;
		        }
		        case 'zh': {
		            return Terms_zh;
		        }
		        case 'es': {
		            return Terms_es;
		        }
		        case 'pt': {
		            return Terms_pt;		        	
		        }
		        default: {
		            return Terms_en;
		        }
		    }
		}

		let Term = chooseLocale();

	    const hasInput = (type) => {
	    	let loginForm = this.props.form;
	    	let inputValid = !!loginForm.getFieldsValue().account && !!loginForm.getFieldsValue().password && loginForm.getFieldsValue().terms;
	    }

		return (
			<form className={styles.divwrap}>
				<List className='loginForm'>
					<InputItem className={ styles.inputwrap }  
						{ ...getFieldProps( 'account' , { rules: [ { required: true , message: '请输入帐号' } ] } ) } 
						clear placeholder={ this.props.intl.formatMessage( { id: 'hint_username' } , { description: 'User Name' } , { defaultMessage: 'User Name' } ) }
					>
						<div className={ styles.accpswinput }></div>
					</InputItem>

					<WhiteSpace size="xl"/>

					<InputItem className={ styles.inputwrap } 
						{ ...getFieldProps( 'password' , { rules: [ { required: true , message: '请输入密码' } ] } ) } 
						clear placeholder={ this.props.intl.formatMessage( { id: 'hint_pwd' } , { description: 'Password' } , { defaultMessage: 'Password' } ) } type="password"
					>
						<div className={ styles.pswinput }></div>
					</InputItem>
				</List>

				<WhiteSpace size="xl"/>

				<Flex>
					<Flex.Item className='license'>
						<AgreeItem data-seed='logId' checked={true} { ...getFieldProps('terms', { initialValue: true, valuePropName: 'checked' }) }>
							<a onClick={this.showModal.bind(this)}>
								<FormattedMessage id='accept_agreement' description='accept_agreement' defaultMessage='accept_agreement' />
							</a>
							<Modal
								className='termmodal' 
	            				onClose={this.onClose.bind(this)}
	            				transparent
	            				visible={this.state.visible}
	            				footer={[
	            					{ text: 'OK', onPress: () => { console.log('okk'); this.onClose(); } }
	            				]}>

	            				<div className="modal-demo-content">
	            					<div className="demo-title">
	            						<h3>
	            							<FormattedMessage id='agreement' description='Agreement' defaultMessage='Agreement' />
	            						</h3>
	            					</div>
	            					<div className="demo-content">
	            						<Term />
	            					</div>
	            				</div>
							</Modal>
						</AgreeItem>
					</Flex.Item>
					<Flex.Item className='rememberme'>
						<Checkbox checked={true} { ...getFieldProps('remember', { initialValue: true, valuePropName: 'checked' }) }>
							<FormattedMessage id='login_remember' description='Remember Me' defaultMessage='Remember Me' />
						</Checkbox>
					</Flex.Item>
				</Flex>

				<WhiteSpace style={{'height':'80px'}} />

				<div>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>
						<FormattedMessage id='btn_login' description='Login' defaultMessage='Login' />
					</Button>
				</div>
			</form>
		);
	}
}

Loginform.contextTypes = {
	router: function contextType() {
		return React.PropTypes.Object;
	}
};

export default injectIntl(createForm()(Loginform));


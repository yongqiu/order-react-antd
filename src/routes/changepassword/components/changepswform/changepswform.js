import React, { Component, PropTypes } from 'react';
import { ActionSheet , List , InputItem , WhiteSpace , Button , Toast } from 'antd-mobile';
import { injectIntl,FormattedMessage,intlShape } from 'react-intl';
import { createForm } from 'rc-form';
import styles from './changepswform.css';
import * as changepassService from '../../../../services/changepassquest';
import encode from '../../../../utils/des';
import deskeys from './deskeys';
import * as gaPageFilter from '../../../../utils/gafilter';
import { regularEvent , businessEvent ,RESPONSE_CODE} from '../../../../config';

class ChangePswForm extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.intl = injectIntl(ChangePswForm);
        this.state={
          star1:'*',
          star2:'*',
          star3:'*'
        }      
    }
   
    onSubmit(){
        ga( 'send' , businessEvent.changePasswordSubmit );
        const {formatMessage} = this.props.intl;
        let oldpassNull = formatMessage({id: 'password_invalid'},{description: 'password_invalid'},{defaultMessage:'Password must be consist of letters or characters'})
        let oldpassError = formatMessage({id: 'password_error_current'},{description: 'password_error_current'},{defaultMessage:'Current password is wrong, please enter the correct data'})
        let renewpassError = formatMessage({id: 'password_match_tip'},{description: 'password_match_tip'},{defaultMessage:'Passwords must match'})
        let newpassNull = formatMessage({id: 'password_invalid'},{description: 'password_invalid'},{defaultMessage:'Password must be consist of letters or characters'})
        let changeSuccess = formatMessage({id: 'password_updated_successfully'},{description: 'Update password successful'},{defaultMessage:'Update password successful'})
        let changeFailed = formatMessage({id: 'password_updated_failed'},{description: 'password_updated_failed'},{defaultMessage:'Update password failed'})

        let messages = {
          oldpassNull :oldpassNull,
          oldpassError : oldpassError,
          newpassNull : newpassNull,
          renewpassError : renewpassError,
          changeSuccess : changeSuccess,
          changeFailed : changeFailed,
        };
        
        let changeForm = this.props.form;
        changeForm.validateFields({ force: true }, (error) => {
          let pass = changeForm.getFieldsValue().pass;
          let newpass = changeForm.getFieldsValue().newpass;
          let renewpass = changeForm.getFieldsValue().renewpass;
          var pattern= /^[0-9a-zA-z_]+$/; 
          var checknewpass = pattern.test(newpass); 
          let message = '';
          if (!error) {
            console.log(pass.length)
            if(newpass.length<6 || newpass.length>12){
              message = messages.newpassNull;
              Toast.fail(message, 1.5);
              return;
            }
            if (newpass !== renewpass) {
              message = messages.renewpassError;
              Toast.fail(message, 1.5);
              return;
            }
            if (!checknewpass) {
              message = messages.newpassNull;
              Toast.fail(message, 1.5);
              return;
            }
            this.requestData = {
              headers: {
                  'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
              },
              body: {
                  currentPassword: encode(changeForm.getFieldsValue().pass,deskeys.key1, deskeys.key2, deskeys.key3),
                  language: 'en-US',
                  newPassword: encode(changeForm.getFieldsValue().newpass,deskeys.key1, deskeys.key2, deskeys.key3),
                  newPasswordVerify:encode(changeForm.getFieldsValue().renewpass,deskeys.key1, deskeys.key2, deskeys.key3)
              }
            };
              changepassService.changPass(this.requestData).then(function(data){
                if (data.data.respcode == RESPONSE_CODE.SUCCESFULL || data.data.respcode == RESPONSE_CODE.SUCCESFULL_OLD) {
                  Toast.loading('loading...', 1, () => {                 
                      this.props.Submit({changed:true})
                  });  
                }else if(data.data.respcode == RESPONSE_CODE.OLD_PASS_WRONG || data.data.respcode == RESPONSE_CODE.OLD_PASS_WRONG_OLD){
                  message = messages.oldpassError;
                  Toast.fail(message, 1);
                }else{
                  message = messages.changeFailed;
                  Toast.fail(message, 1);
                }
              }.bind(this)); 
          }
          else {
            if(error['pass']) {
              message = messages.oldpassNull;
            }
            else if (error['newpass'] ) {
              message = messages.newpassNull;
            }
            else if (error['renewpass'] ) {
              message = messages.newpassNull;
            }
            else {}
            Toast.fail(message, 1.5);
          }
        });
    };
    render() {
    		const { getFieldProps } = this.props.form;
        const {formatMessage} = this.props.intl;
        const placeholder = formatMessage({id: 'password_hint'},{description: '6–12 Characters'},{defaultMessage:'6–12 Characters'});

        return (
            <div>
              <form action=""  className='changepswform'>
                <WhiteSpace size="xl"/>
                <List>
                  <InputItem 
                    { ...getFieldProps( 'pass',{ rules: [ { required: true } ] })} 
                    clear maxLength="12" type="password" placeholder={placeholder}  onFocus={()=>{this.setState({star1:''})}}
                  >
                    <FormattedMessage id='password_current' description='Current Password' defaultMessage='Current Password:' />
                  </InputItem>
                  <InputItem 
                      { ...getFieldProps( 'newpass',{ rules: [ { required: true } ] }) } 
                      clear maxLength="12" placeholder={placeholder}  type="password" onFocus={()=>{this.setState({star2:''})}}
                  >
                      <FormattedMessage id='password_new' description='New Password:' defaultMessage='New Password:' />
                  </InputItem>  
                  <InputItem 
                      { ...getFieldProps( 'renewpass',{ rules: [ { required: true } ] }) } 
                      clear maxLength="12" placeholder={placeholder}  type="password" onFocus={()=>{this.setState({star3:''})}}
                  >
                      <FormattedMessage id='password_reenter' description='Re-enter New Password:' defaultMessage='Re-enter New Password:' />
                  </InputItem>            
                </List>
                  <Button className={styles.saveButton} type="primary" onClick={this.onSubmit.bind(this)}>
                    <FormattedMessage id='password_save' description='Save' defaultMessage='Save' />
                  </Button>
              </form>
            </div>
        );
    }
}

ChangePswForm.propTypes = {
  intl: intlShape
}
export default injectIntl(createForm()(ChangePswForm));

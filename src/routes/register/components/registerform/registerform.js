import React, { Component, PropTypes } from 'react';
import { ActionSheet , List , InputItem , WhiteSpace , Button , Toast ,WingBlank , Flex , Checkbox , Modal } from 'antd-mobile';
import { injectIntl,FormattedMessage,intlShape } from 'react-intl';
import { createForm } from 'rc-form';
import styles from './registerform.css';
import * as registerService from '../../../../services/registerquest';
import encode from '../../../../utils/des';
import * as gaPageFilter from '../../../../utils/gafilter';
import { regularEvent , businessEvent,RESPONSE_CODE} from '../../../../config';
import Terms_en from '../../../login/components/loginform/terms_en';
import Terms_zh from '../../../login/components/loginform/terms_zh';
import Terms_es from '../../../login/components/loginform/terms_es';
import Terms_pt from '../../../login/components/loginform/terms_pt';
import * as messages from '../../../login/components/loginform/intl.js';
import { language } from '../../../../components/getlanguagecontext/getlanguagecontext';
import dataURL from '../../../../serverconfig';
const AgreeItem = Checkbox.AgreeItem;

class ChangePswForm extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.intl = injectIntl(ChangePswForm); 
        this.state = {
          visible: false,
          reqNum:'',
          imgurl:''
        };
        this.reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        // this.reg = /^([a-zA-Z0-9_\\-\\.]+)*\@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$/;
        const {formatMessage} = this.props.intl;
        let emailNull = formatMessage({id: 'reg_email_null'},{description: 'reg_email_null'},{defaultMessage:'Please enter a valid email address'})
        let emailExist = formatMessage({id: 'reg_email_exist'},{description: 'reg_email_exist'},{defaultMessage:'This email is already registered'})
        let password_invalid = formatMessage({id: 'password_invalid'},{description: 'password_invalid'},{defaultMessage:'Password must consist of 6-12 numbers or letters'})
        let password_no_match = formatMessage({id: 'password_no_match'},{description: 'password_invalid'},{defaultMessage:'Password must consist of 6-12 numbers or letters'})
        let failed_to_match = formatMessage({id: 'failed_to_match'},{description: 'password_invalid'},{defaultMessage:'Incorrect verification code'})
        let content_empty = formatMessage({id: 'content_empty'},{description: 'content_empty'},{defaultMessage:'Content cannot be empty'})
        let terms_false = formatMessage( { id: 'hint_term' } , { description: 'Term' } , { defaultMessage: 'Term' })
        this.messages = {
          emailNull :emailNull,
          emailExist:emailExist,
          password_invalid : password_invalid,
          password_no_match:password_no_match,
          failed_to_match:failed_to_match,
          content_empty:content_empty,
          terms_false:terms_false
        };
    };
    componentDidMount(){
      this.updateCaptchaImg()
      // this.setState({
      //   reqNum:'M-zE7FBnXj-1492398409000',
      //   imgurl:dataURL.APISERVER + '/ots/common/captcha/require/'+ 'M-zE7FBnXj-1492398409000'
      // });
    }
    
    randomNum = () =>{
      function randomString(len) {
        let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
         var randomPoz = Math.floor(Math.random() * charSet.length);
         randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
      }
      // 随机八位字符
      let num = randomString(8);
      // 当前时间戳
      var timestamp = Date.parse(new Date()); 
      let randomNum = 'M'+'-'+ num + '-'+ '1492398409000';

      return randomNum;
    }

    updateCaptchaImg(){
      const openKey = this.randomNum();
      let that = this;
      Toast.loading('Loading...' , 300);
      setTimeout(function(){
        that.setState({
          reqNum:openKey,
          imgurl:dataURL.APISERVER + '/ots/common/captcha/require/'+ openKey
        });
        Toast.hide()
      },300);
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
   
    onSubmit(){
        ga( 'send' , businessEvent.registerSubmit ); 
        let registerform = this.props.form;
        registerform.validateFields({ force: true }, (error) => {
          let email = registerform.getFieldsValue().email;
          let password = registerform.getFieldsValue().password;
          let repassword = registerform.getFieldsValue().repassword;
          let firstname = registerform.getFieldsValue().firstname;
          let lastname = registerform.getFieldsValue().lastname;
          let companyname = registerform.getFieldsValue().companyname;
          let VerificationCode = registerform.getFieldsValue().VerificationCode; 
          // 内容不能为空
          if( registerform.getFieldsValue().terms === false ) {
            let message = this.messages.terms_false;
            Toast.fail( message, 1.5 );
            return;
          }

          if (error) {
            let message = this.messages.content_empty;
            Toast.fail(message,1.5);
          }else{
            let requestData = {
              headers: {
                  'Accept-Language':'en-US'
              },
              email:email
            }
            registerService.checkEmailExist(requestData).then(function(data){
              var pattern= /^[0-9a-zA-z_]+$/; 
              var flag = pattern.test(password); 
              if(data.data.respcode === RESPONSE_CODE.REG_EMAIL_DISABLED){
                // 邮箱格式错误
                let message = this.messages.emailNull;
                Toast.fail(message,1.5); 
                return;
              }
              if (data.data.respcode === RESPONSE_CODE.REG_EMAIL_EXIST) {
                // 邮箱被占用
                let message = this.messages.emailExist;
                Toast.fail(message,1.5);
                return;
              }
              if(password.length<6 || repassword.length>12){
                // 密码小于6位
                Toast.fail(this.messages.password_invalid,1.5);
                return;
              }
              if(!flag){
                // 密码小于6位
                Toast.fail(this.messages.password_invalid,1.5);
                return;
              }
              if(password !== repassword){
                // 两次密码不一致
                Toast.fail(this.messages.password_no_match,1.5);
                return;
              }
              let requestData = {
                body:{
                  "captcha": VerificationCode,
                  "companyName": companyname,
                  "country": "CHN",
                  "confirmPassword": repassword,
                  "email": email,
                  "firstName": firstname,
                  "lastName": lastname,
                  "password": password,
                  "randomNum": this.state.reqNum,
                  "receiveEmail": true
                },
                headers: {
                  'Accept-Language': 'en-US',
                },
              }
              registerService.registerAccount(requestData).then(function(data){
                if (data.data.respcode === RESPONSE_CODE.REG_CODE_MISMATCH) {
                  // 验证码错误
                  Toast.hide();
                  let message = this.messages.failed_to_match;
                  Toast.fail(message,1.5);
                }else if (data.data.respcode === RESPONSE_CODE.REG_CODE_OVERDUE) {
                  // 验证码过期
                  Toast.hide();
                  let message = this.messages.failed_to_match;
                  Toast.fail(message,1.5);
                }else if(data.data.respcode === RESPONSE_CODE.SUCCESFULL){
                  // 验证码正确
                  Toast.hide();
                  this.props.Submit({changed:true});
                }
              }.bind(this));
              // else {
              //   if(password.length<6 || repassword.length>12){
              //     // 密码小于6位
              //     Toast.fail(this.messages.password_invalid,1.5);
              //   }else if(flag){
              //     // 密码小于6位
              //     Toast.fail(this.messages.password_invalid,1.5);
              //   }else if(password !== repassword){
              //     // 两次密码不一致
              //     Toast.fail(this.messages.password_no_match,1.5);
              //   }else{
              //     // let requestData = {
              //     //   body:{
              //     //     "captcha": VerificationCode,
              //     //     "companyName": companyname,
              //     //     "country": "CHN",
              //     //     "confirmPassword": repassword,
              //     //     "email": email,
              //     //     "firstName": firstname,
              //     //     "lastName": lastname,
              //     //     "password": password,
              //     //     "randomNum": this.state.reqNum,
              //     //     "receiveEmail": true
              //     //   },
              //     //   headers: {
              //     //     'Accept-Language': 'en-US',
              //     //   },
              //     // }
              //     // registerService.registerAccount(requestData).then(function(data){
              //     //   if (data.data.respcode === RESPONSE_CODE.REG_CODE_MISMATCH) {
              //     //     // 验证码错误
              //     //     Toast.hide();
              //     //     let message = this.messages.failed_to_match;
              //     //     Toast.fail(message,1.5);
              //     //   }else if (data.data.respcode === RESPONSE_CODE.REG_CODE_OVERDUE) {
              //     //     // 验证码过期
              //     //     Toast.hide();
              //     //     let message = this.messages.failed_to_match;
              //     //     Toast.fail(message,1.5);
              //     //   }else if(data.data.respcode === RESPONSE_CODE.SUCCESFULL){
              //     //     // 验证码正确
              //     //     Toast.hide();
              //     //     this.props.Submit({changed:true});
              //     //   }
              //     // }.bind(this));
              //   }
              // }
            }.bind(this));
          }
          // 跳转到成功页面
          // this.props.Submit({changed:true});
        });
    };
    emailerror= (value) =>{
      let requestData = {
        headers: {
            'Accept-Language':'en-US'
        },
        email:value
      }
      registerService.checkEmailExist(requestData).then(function(data){
        if(data.data.respcode === RESPONSE_CODE.REG_EMAIL_DISABLED){
          // 邮箱格式错误
          let message = this.messages.emailNull;
          Toast.fail(message,1.5); 
        }else if (data.data.respcode === RESPONSE_CODE.REG_EMAIL_EXIST) {
          // 邮箱被占用
          let message = this.messages.emailExist;
          Toast.fail(message,1.5);
        }
      }.bind(this));
    }

    render() {
        const { getFieldProps } = this.props.form;
        const {formatMessage} = this.props.intl;
        const PlaceHolder = () => (
          <div style={{width: '100%',}}></div>
        );
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
        const email = formatMessage({id: 'pleacehold_email'},{description: 'Email'},{defaultMessage:'Email'});
        const pass = formatMessage({id: 'pleacehold_pass'},{description: 'Password'},{defaultMessage:'Password'});
        const repass = formatMessage({id: 'pleacehold_repass'},{description: 'Re-Password'},{defaultMessage:'Re-Password'});
        const firstname = formatMessage({id: 'pleacehold_first'},{description: 'First Name'},{defaultMessage:'First Name'});
        const lastname = formatMessage({id: 'pleacehold_last'},{description: 'Last Name'},{defaultMessage:'Last Name'});
        const company = formatMessage({id: 'pleacehold_company'},{description: 'Company Name'},{defaultMessage:'Company Name'});
        const code = formatMessage({id: 'pleacehold_code'},{description: 'Verification Code'},{defaultMessage:'Verification Code'});
        const password_hint = formatMessage({id: 'password_hint'},{description: '6–12 Characters'},{defaultMessage:'6–12 Characters'});

        return (
            <div className={styles.formbox}>
              <form action=""  className='registerform'>
              <List>
                <item>
                  <label htmlFor=""><FormattedMessage id='pleacehold_email' description='Current Password' defaultMessage='Email' /></label>
                  <InputItem 
                    { ...getFieldProps( 'email',{ rules: [ { required: true } ] })} 
                    clear extra="*" placeholder={email} maxLength="50"
                    onBlur={(value) => {
                      this.emailerror(value);
                    }}
                  >                  
                  </InputItem>
                  <WhiteSpace size="lg" />                 
                </item>
                <item>
                  <label htmlFor=""><FormattedMessage id='pleacehold_pass' description='New Password:' defaultMessage='Password' /></label>
                  <InputItem 
                      { ...getFieldProps( 'password',{ rules: [ { required: true } ] }) } 
                      clear extra="*" placeholder={password_hint}  type="password" maxLength="12"
                  >
                  </InputItem> 
                  <WhiteSpace size="lg" />                  
                </item>
                <item>
                  <label htmlFor=""><FormattedMessage id='pleacehold_repass' description='Re-enter New Password:' defaultMessage='Re-enter New Password' /></label> 
                  <InputItem 
                      { ...getFieldProps( 'repassword',{ rules: [ { required: true } ] }) } 
                      clear extra="*" placeholder={password_hint}  type="password" maxLength="12"
                  >                      
                  </InputItem> 
                  <WhiteSpace size="lg" />                   
                </item>
                <item>
                  <label htmlFor=""><FormattedMessage id='pleacehold_name' description='Re-enter New Password:' defaultMessage='Name' /></label> 
                  <InputItem 
                      { ...getFieldProps( 'firstname',{ rules: [ { required: true } ] }) } 
                      clear extra="*" placeholder={firstname} maxLength="20"
                  >                      
                  </InputItem>
                  <InputItem 
                      { ...getFieldProps( 'lastname',{ rules: [ { required: true } ] }) } 
                      clear extra="*" placeholder={lastname} maxLength="20"
                  >                      
                  </InputItem>  
                  <WhiteSpace size="lg" />                   
                </item>
                <item>
                  <label htmlFor=""><FormattedMessage id='pleacehold_company' description='Re-enter New Password:' defaultMessage='Company Name' /></label> 
                  <InputItem 
                      { ...getFieldProps( 'companyname',{ rules: [ { required: true } ] }) } 
                      clear extra="*" placeholder={company} maxLength="100"
                  >                      
                  </InputItem> 
                  <WhiteSpace size="lg" />                   
                </item>
                <item className="vercode">
                  <label htmlFor=""><FormattedMessage id='pleacehold_code' description='Re-enter New Password:' defaultMessage='Verification Code' /></label> 
                  <Flex>
                    <Flex.Item>
                      <InputItem
                          { ...getFieldProps( 'VerificationCode',{ rules: [ { required: true } ] }) } 
                          clear extra="*" maxLength="4"
                      >                      
                      </InputItem>
                    </Flex.Item>
                    <Flex.Item style={{textAlign: 'center'}}><img src={this.state.imgurl} alt=""/></Flex.Item>
                  </Flex>                  
                </item>
                <item className="refresh">
                  <Flex>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><Button onClick={this.updateCaptchaImg.bind(this)} className="refreshbtn" icon={require("../../../../assets/svgs/refresh.svg")}><FormattedMessage id='refresh_button' description='Refresh' defaultMessage='Refresh' /></Button></Flex.Item>
                  </Flex>                  
                </item>
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
                                { text: 'OK', onPress: () => {this.onClose(); } }
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
                  </Flex.Item>
                </Flex>
              </List>
                <Button className={styles.saveButton} type="primary" onClick={this.onSubmit.bind(this)}>
                  <FormattedMessage id='password_save' description='Save' defaultMessage='Save' />
                </Button>
                <WhiteSpace size="lg" /> 
              </form>
            </div>
        );
    }
}

ChangePswForm.propTypes = {
  intl: intlShape
}
export default injectIntl(createForm()(ChangePswForm));

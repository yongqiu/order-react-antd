import React, { Component, PropTypes } from 'react';
import { ActionSheet , List , InputItem , WhiteSpace , Icon , Toast , SearchBar, WingBlank, Popup,Button,TextareaItem } from 'antd-mobile';
import { injectIntl,FormattedMessage,intlShape } from 'react-intl';
import styles from './sharebutton.css';
import * as shareOrder from '../../../../services/shareorderquest';
import {OKCHEM_B2B_URL} from '../../../../config';
import {language} from '../../../../components/getlanguagecontext/getlanguagecontext';
import * as gaPageFilter from '../../../../utils/gafilter';
import { businessEvent } from '../../../../config';


const iconList = [
  { icon: <img src= {require('../../assets/sms.png')} />, title: 'SMS' },
  { icon: <img src= {require('../../assets/email.png')} />, title: 'E-MAIL' },
  { icon: <img src= {require('../../assets/clipboard.png')} />, title: 'COPY' }
];

class ShareButton extends Component {
    static propTypes = {
        intl: intlShape,
        sharebuttonInfo: PropTypes.object
    };
    constructor(props) {
        super(props);
        const {formatMessage} = this.props.intl; 
        this.state={
          author:'',
          orderNO:'',
          shortUrl:'',
          password:'',
          orkerUrl:''
        }    
        this.description = {
          share_title:formatMessage({id: 'share_title'},{description: 'Share'},{defaultMessage:'Share'}),
          description1:formatMessage({id: 'description1'},{description: 'Shared an Order No.'},{defaultMessage:'Shared an Order No.'}),
          description2:formatMessage({id: 'description2'},{description: ' to you，click the URL to check the Order details '},{defaultMessage:' to you，click the URL to check the Order details '}),
          description3:formatMessage({id: 'description3'},{description: ' Password:'},{defaultMessage:' Password:'}),
          description4:formatMessage({id: 'description4'},{description: ' Know more about Orker'},{defaultMessage:'Shared an Order No.'}),
        };

    };
    showShareActionSheet = () => {
      const icons = [...iconList];
      icons.length = 3;
      ActionSheet.showShareActionSheetWithOptions({
        options: icons,
        message: this.description.share_title,
        className: 'my-action-sheet',
      },
      (buttonIndex) => {
        this.setState({ clicked1: buttonIndex > -1 ? icons[buttonIndex].title : 'cancel' });
        let sites = ['sms','email','copy']
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (language() == 'zh') {
          var subject = '来自Orker的订单跟踪信息';;
        }else if(language() == 'en'){
          var subject = `Order Details ${this.state.orderNO} Shared By ${this.state.author}`
        }else if(language() == 'es'){
          var subject = 'La información sobre seguimiento de su pedido desde Orker'
        }else if(language() == 'pt'){
          var subject = `Nº de pedido ${this.state.orderNO} partilha de Orker`
        }

        if (isAndroid) {
          let enUrl = encodeURIComponent(this.state.shortUrl);
          let orderNO = encodeURIComponent(this.state.orderNO);
          var hrefgroup = {
            sms: `sms:?body=${this.state.author}${this.description.description1}${orderNO}${this.description.description2}${enUrl}${this.description.description3}${this.state.password},${this.description.description4}${this.state.orkerUrl}.`,
            email: `mailto:?subject=${subject}&body=${this.state.author}${this.description.description1}${this.state.orderNO}${this.description.description2}${this.state.shortUrl}${this.description.description3}${this.state.password},${this.description.description4}${this.state.orkerUrl}.`,
            copy: ``,
          };
        }else{
          var hrefgroup = {
            sms: `sms:&body=${this.state.author}${this.description.description1}${this.state.orderNO}${this.description.description2}${this.state.shortUrl}${this.description.description3}${this.state.password},${this.description.description4}${this.state.orkerUrl}.`,
            email: `mailto:?subject=${subject}&body=${this.state.author}${this.description.description1}${this.state.orderNO}${this.description.description2}${this.state.shortUrl}${this.description.description3}${this.state.password},${this.description.description4}${this.state.orkerUrl}.`,
            copy: ``,
          }; 
        };
        if (buttonIndex > -1 && buttonIndex < 2) {
          if (buttonIndex == 0) {
            ga( 'send' , {
                hitType: 'event',
                eventCategory: 'createSharedOrder',
                eventAction: 'shareBySMS',
                eventLabel: 'createSharedOrder',
                transport: 'beacon'
            });
          }else{
            ga( 'send' , {
                hitType: 'event',
                eventCategory: 'createSharedOrder',
                eventAction: 'shareByEMAIL',
                eventLabel: 'createSharedOrder',
                transport: 'beacon'
            });
          }
          let _url = hrefgroup[sites[buttonIndex]];
          window.location.href = _url;          
        }else if(buttonIndex == 2){
          ga( 'send' , {
              hitType: 'event',
              eventCategory: 'createSharedOrder',
              eventAction: 'shareByCOPY',
              eventLabel: 'createSharedOrder',
              transport: 'beacon'
          });
          this.copyClick()
        };        
      });
    };
    requestServer = () =>{
      let nextProps = this.props;
      let data = nextProps.sharebuttonInfo;
      this.requestData = {
        headers: {
            'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
        },
        body: {
          "orderId": data.order_id,
          "shareType": "1",
          "userId": data.from_user_email
        }
      };
      if (!navigator.onLine) {
        const {formatMessage} = this.props.intl; 
        let toast = formatMessage({id: 'share_no_network'},{description: 'share failed'},{defaultMessage:'No internet connection, please check your network settings'});
        Toast.fail(toast, 1.5);
      }else{
        shareOrder.CreateShareInfo(this.requestData).then(function(result){
          Toast.hide();
          if (result.data.respcode === '0000') {
            let requestData = result.data.rows[0];
            let data = this.props.sharebuttonInfo;
            this.setState({
              author: data.from_user_email,
              orderNO: data.order_num ? data.order_num : data.contract_no ? data.contract_no : data.order_id,
              shortUrl:requestData.urlCode,
              password:requestData.pwd,
              orkerUrl:OKCHEM_B2B_URL          
            });
          } 
        }.bind(this)).then(function(){
          this.showShareActionSheet();
        }.bind(this));        
      }

    };

    copyClick = () => {
      const {formatMessage} = this.props.intl; 
      let toast = formatMessage({id: 'Copied_to_Clipboard'},{description: 'Copied to Clipboard'},{defaultMessage:'Copied to Clipboard'});
      Toast.success(toast, 1.5);
      copyToClipboard(document.getElementById("copyTarget"));
      function copyToClipboard(elem) {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          let text = select(elem);
          var save = function(e){
            e.clipboardData.setData('text/plain', text);
            e.preventDefault();
          }
          document.addEventListener('copy', save);
          document.execCommand('copy');
          document.removeEventListener('copy',save); 
          return;         
        }
        if (isiOS) {
            select(elem);
            document.execCommand("copy");   
            return;         
        }
      };
      function select(element) {
          var selectedText;
          if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
              element.focus();
              element.setSelectionRange(0, element.value.length);
              selectedText = element.value;
          }
          else {
              if (element.hasAttribute('contenteditable')) {
                  element.focus();
              }
              var selection = window.getSelection();
              var range = document.createRange();

              range.selectNodeContents(element);
              selection.removeAllRanges();
              selection.addRange(range);

              selectedText = selection.toString();
          }

          return selectedText;
      }
    }
    
    
    render() {
        const CopyContainer = () => {
          let orderNO = this.state.orderNO;
          let defaultValue = `${this.state.author}${this.description.description1}${orderNO}${this.description.description2}${this.state.shortUrl}${this.description.description3}${this.state.password},${this.description.description4}${this.state.orkerUrl}.`;
          // let defaultValue = "102312";
          return(
            <div className={styles.copycontent}>
              <textarea cols="40" id="copyTarget" disabled="disabled" className={styles.copyTarget} value={defaultValue}></textarea> 
            </div>
          )
        }
        return (
            <div className='ShareButton' onClick={this.requestServer}>
              <Icon key="1" type="ellipsis"/>
              <CopyContainer/>
            </div>
        );
    }
}
export default injectIntl(ShareButton);
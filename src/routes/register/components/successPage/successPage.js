import React, { Component, PropTypes } from 'react';
import { Result, Button } from 'antd-mobile';
import styles from './successPage.css';
import { injectIntl,FormattedMessage,intlShape } from 'react-intl';
class SuccessPage extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props, context) {
        super(props, context);
    }
    onNavbarLeftClick() {
      this.context.router.replace('/'); 
    }
    render() {
        return (
            <div className="registerSuccess">
                <p className={styles.row_img}><img className={styles.img} src={require('../../../../assets/ico_success.png')} alt=""/></p>
                <p className={styles.title}><FormattedMessage id='reg_success_tips1' description='reg_success_tips1' defaultMessage='Thank you for signing up!' /></p>
                <p><FormattedMessage id='reg_success_tips2' description='reg_success_tips2' defaultMessage='We sent an activation email to you,please' /></p>
                <p><FormattedMessage id='reg_success_tips3' description='reg_success_tips3' defaultMessage='click the active link before login.' /></p>
                <Button className={styles.button} type="primary" onClick={this.onNavbarLeftClick.bind(this)}><FormattedMessage id='back_to_login' description='Back to Login' defaultMessage='Back to Login' /></Button>
            </div>
        );
    }
}
SuccessPage.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};
export default SuccessPage;

import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile';
import styles from './successPage.css';

class SuccessPage extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Result
              className='successPage'
              imgUrl= {require('../../../../assets/ico_success.png')}
              title="密码修改成功"
            />
        );
    }
}

export default SuccessPage;

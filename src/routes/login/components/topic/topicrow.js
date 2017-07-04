'use strict';

import React from 'react';
import styles from './topicrow.css';
import TopicPic from '../../assets/topic.png'


export default class Topicrow extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.topic} {...this.props}>
				<img className={styles.topicImg} src={TopicPic} alt="OKCHEM" {...this.props} />
			</div>
		);
	}

}


import React, { Component, PropTypes } from 'react';
import { Carousel , Flex } from 'antd-mobile';
import { FormattedMessage } from 'react-intl';

import styles from './calendar.css';
import { getMonth , getWeek } from '../../../../utils/orkerdatefilter';
import { businessEvent } from '../../../../config';

class Calendar extends Component {
    static propTypes = {
        className: PropTypes.string,
        hasEtaGroup: PropTypes.array
    };

    constructor(props, context) {
        super(props, context);
    }

    onClick() {
    	let clickedDay = new Date( this.date );
    	let startDay = new Date( clickedDay.getFullYear() , clickedDay.getMonth() , clickedDay.getDate() ).getTime();
    	let url = '/dashboard/ordersbyday' + '?startday=' + startDay;
		this.context.router.push(url);
		ga( 'send' , businessEvent.clickDashboardSection_oneday );
    }

    render() {

		let today = new Date().getTime();
		let sevenDays = [];
		for( var i = 0 ; i < 7 ; i++ ) {
			sevenDays.push( today + i * 24 * 3600 * 1000 );
		}

		const calendarGroup = ( i , nDate ) => {
			let styleClass = !this.props.hasEtaGroup[i] ? 'calendarItem calendarItemDisable' : 'calendarItem';
			let formatDay = new Date(nDate).getDay();
			let dayStyle = formatDay === 0 || formatDay === 6 ? 'weekend' : 'day';
			let monthStyle = formatDay === 0 || formatDay === 6 ? 'monthonweekday' : 'month';

			return (
				<Flex.Item className={styleClass} onClick={ !!this.props.hasEtaGroup[i] ? this.onClick.bind({ ...this , ...{ date: sevenDays[i] } }) : ''}>
					<div className='calendarweekday'>{ getWeek(new Date(nDate).getDay()) }</div>
					<div className={dayStyle}>{new Date(nDate).getDate()}</div>
					<div className={monthStyle}>{getMonth(new Date(nDate).getMonth())}</div>
					<div className={styles.status}>
						{ !!this.props.hasEtaGroup[i] ? <img src={ require('../../assets/icon_status_arrival_doing.png') } alt="o" width='40px' /> : '' }					
					</div>
				</Flex.Item>
			);
		}
 		   	
        return (
        	<div>
        		<div className={styles.tip}>
					<hr className={styles.devideLine} />
					<p className={styles.devideTip}>
						<FormattedMessage id='dashboard_nextdays' description='Calendar' defaultMessage='Calendar' />
					</p>
        		</div>

	            <Carousel className='ncarousel' style={{width:document.body.clientWidth}}>
					<div className='carouselContent'>
						<Flex className='calendarItemsWrap'>
							{ calendarGroup( 0 , sevenDays[0] ) }
							{ calendarGroup( 1 , sevenDays[1] ) }
							{ calendarGroup( 2 , sevenDays[2] ) }
							{ calendarGroup( 3 , sevenDays[3] ) }
						</Flex>
					</div>
					<div className='carouselContent'>
						<Flex className='calendarItemsWrap'>
							{ calendarGroup( 4 , sevenDays[4] ) }
							{ calendarGroup( 5 , sevenDays[5] ) }
							{ calendarGroup( 6 , sevenDays[6] ) }
							<Flex.Item className='calendarItem' style={{visibility: 'hidden'}}>8</Flex.Item>
						</Flex>
					</div>
	            </Carousel>
			</div>
        );
    }
}

Calendar.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};

export default Calendar;

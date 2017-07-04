import React from 'react';
import { FormattedMessage } from 'react-intl';

function getMonth(month) {
    switch( month) {
        case 0: {
            return <FormattedMessage id='month_jan' description='January' defaultMessage='January' />;
        }
        case 1: {
            return <FormattedMessage id='month_feb' description='February' defaultMessage='February' />;
        }
        case 2: {
            return <FormattedMessage id='month_mar' description='March' defaultMessage='March' />;
        }
        case 3: {
            return <FormattedMessage id='month_apr' description='April' defaultMessage='April' />;
        }
        case 4: {
            return <FormattedMessage id='month_may' description='May' defaultMessage='May' />;
        }
        case 5: {
            return <FormattedMessage id='month_jun' description='June' defaultMessage='June' />;
        }
        case 6: {
            return <FormattedMessage id='month_jul' description='July' defaultMessage='July' />;
        }
        case 7: {
            return <FormattedMessage id='month_aug' description='August' defaultMessage='August' />;
        }
        case 8: {
            return <FormattedMessage id='month_sep' description='September' defaultMessage='September' />;
        }
        case 9: {
            return <FormattedMessage id='month_oct' description='October' defaultMessage='October' />;
        }
        case 10: {
            return <FormattedMessage id='month_nov' description='November' defaultMessage='November' />;
        }
        case 11: {
            return <FormattedMessage id='month_dec' description='December' defaultMessage='December' />;
        }
        default: {
            return <span></span>;
        }
    }
}

function getWeek( week ) {
    switch( week ) {
        case 0 : {
            return <FormattedMessage id='week_Sun' description='Sun.' defaultMessage='Sun.' />;
        }
        case 1 : {
            return <FormattedMessage id='week_Mon' description='Mon.' defaultMessage='Mon.' />;
        }
        case 2 : {
            return <FormattedMessage id='week_Tue' description='Tue.' defaultMessage='Tue.' />;
        }
        case 3 : {
            return <FormattedMessage id='week_Wed' description='Wed.' defaultMessage='Wed.' />;
        }
        case 4 : {
            return <FormattedMessage id='week_Thu' description='Thu.' defaultMessage='Thu.' />;
        }
        case 5 : {
            return <FormattedMessage id='week_Fri' description='Fri.' defaultMessage='Fri.' />;
        }
        case 6 : {
            return <FormattedMessage id='week_Sat' description='Sat.' defaultMessage='Sat.' />;
        }
    }
}

export { getMonth , getWeek };
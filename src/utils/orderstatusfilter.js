import React from 'react';
import { FormattedMessage } from 'react-intl';

export function orderStatusFilter(status) {
    switch( status) {
        case 'ODR_GOODS_PRODUCT': {
            return <FormattedMessage id='orderlist_ODR_GOODS_PRODUCT' description='Production' defaultMessage='Production' />;
        }
        case 'ODR_BOOKS_UNDO': {
            return <FormattedMessage id='orderlist_ODR_BOOKS_UNDO' description='Shipping space' defaultMessage='Shipping space' />;
        }
        case 'ODR_LOADS_UNDO': {
            return <FormattedMessage id='orderlist_ODR_LOADS_UNDO' description='Loading' defaultMessage='Loading' />;
        }
        case 'ODR_ONBOARD_DONE': {
            return <FormattedMessage id='orderlist_ODR_ONBOARD_DONE' description='On board' defaultMessage='On board' />;
        }
        case 'ODR_NEGODOC_UNDO': {
            return <FormattedMessage id='orderlist_ODR_NEGODOC_UNDO' description='Negotiation document' defaultMessage='Negotiation document' />;
        }
        case 'ODR_ARRIVAL_DONE': {
            return <FormattedMessage id='orderlist_ODR_ARRIVAL_DONE' description='Arrival' defaultMessage='Arrival' />;
        }
        default: {
            return <span></span>;
        }
    }
}
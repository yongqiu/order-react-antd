import React from 'react';

let statusIconSourceGroup = [
    [ require('../../assets/icon_status_production_undo.png') , require('../../assets/icon_status_production_doing.png') , require('../../assets/icon_status_production_done.png') ],
    [ require('../../assets/icon_status_shipping_undo.png') , require('../../assets/icon_status_shipping_doing.png') , require('../../assets/icon_status_shipping_done.png') ],
    [ require('../../assets/icon_status_loading_undo.png') , require('../../assets/icon_status_loading_doing.png') , require('../../assets/icon_status_loading_done.png') ],
    [ require('../../assets/icon_status_board_undo.png') , require('../../assets/icon_status_board_doing.png') , require('../../assets/icon_status_board_done.png') ],
    [ require('../../assets/icon_status_negotiation_undo.png') , require('../../assets/icon_status_negotiation_doing.png') , require('../../assets/icon_status_negotiation_done.png') ],
    [ require('../../assets/icon_status_arrival_undo.png') , require('../../assets/icon_status_arrival_doing.png') , require('../../assets/icon_status_arrival_doing.png') ]
];

let statusIconTipGroup = [
	require('../../assets/icon_production_tip.png'),
	require('../../assets/icon_shipping_tip.png'),
	require('../../assets/icon_loading_tip.png'),
	require('../../assets/icon_board_tip.png'),
	require('../../assets/icon_shippingdoc_tip.png'),
	require('../../assets/icon_arrival_tip.png'),
];

export { statusIconSourceGroup , statusIconTipGroup };
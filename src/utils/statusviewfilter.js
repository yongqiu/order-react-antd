import React from 'react';
import { statusIconSourceGroup } from '../components/imagesrequire/statusiconrequires';

const statusViewFilter = (status) => {
    let realImggroup = [];
    let iconSourceGroup = statusIconSourceGroup;
    let statusGroup = [ 'ODR_GOODS_PRODUCT' , 'ODR_BOOKS_UNDO' , 'ODR_LOADS_UNDO' , 'ODR_ONBOARD_DONE' , 'ODR_NEGODOC_UNDO' , 'ODR_ARRIVAL_DONE' ];
    let index;
    statusGroup.forEach( function( e , i ){
        if( e === status ) {
            index = i;
        }
    });
    let nLength = iconSourceGroup.length;
    if( index === 0 ) {
        realImggroup.push( iconSourceGroup[index][1] );
        for( var i = index + 1 ; i < nLength ; i++ ) {
            realImggroup.push( iconSourceGroup[i][0] );
        }
        return realImggroup;
    }
    else if( index === nLength - 1 ) {
        for( var i = 0 ; i < nLength ; i++ ) {
            realImggroup.push( iconSourceGroup[i][2] );
        }
        return realImggroup;
    }
    else {
        for( var i = 0 ; i < index ; i++ ) {
            realImggroup.push( iconSourceGroup[i][2] );
        }
        realImggroup.push( iconSourceGroup[index][1] );
        for( var i = index + 1 ; i < nLength ; i++ ) {
            realImggroup.push( iconSourceGroup[i][0] );
        }
        return realImggroup;
    }
}

export default statusViewFilter;
import React from 'react';

export function gaSetPage( strPage , strTitle ) {
	ga( 'set' , {
		page: strPage,		
		title: strTitle
	});

	ga( 'send' , {
		hitType: 'pageview'
	});

	//ga( 'set' , 'userId' , 'userID Tester 001' );
}

export function createFunctionWithTimeout( callback , opt_timeout ) {
	var called = false;
	function fn() {
		if( !called ) {
			called = true;
			callback();
		}
	}
	setTimeout( fn , opt_timeout || 1000 );
	return fn;
}
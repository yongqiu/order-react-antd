// 获取浏览器语言环境

import React from 'react';

function chooseLocale(){
    let navLang = navigator.language.split('_')[0];
    switch(navLang.split('-')[0].toLowerCase()){
        case 'en':
            return 'en';
        case 'zh':
            return 'zh';
        case 'pt':
            return 'pt';
        case 'es':
            return 'es';
        default:
            return 'en';
    }
}

export function language() {
	return (
		chooseLocale()
	);
}
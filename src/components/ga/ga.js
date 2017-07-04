import React from 'react';
import '../../utils/autotrack.js';
import { GA_TRACKING_ID } from '../../config.js';
import desktop from '../../assets/icon_desktop.png';

function setGA() {
	window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

	ga( 'create' , {
		trackingId: GA_TRACKING_ID,
		cookieDomain: 'auto'
	});

	//ga('require', 'eventTracker');
}

function setDesktopIcon() {
	let desktopIconLink = document.createElement('link');
	desktopIconLink.rel = 'apple-touch-icon-precomposed';
	desktopIconLink.href = desktop;
	document.getElementsByTagName('head')[0].appendChild(desktopIconLink);

	let shortcutIconLink = document.createElement('link');
	shortcutIconLink.rel = 'shortcut icon';
	shortcutIconLink.href = desktop;
	document.getElementsByTagName('head')[0].appendChild(shortcutIconLink);
}

export { setGA , setDesktopIcon };
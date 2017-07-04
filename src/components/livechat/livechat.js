'use strict';

import { businessEvent } from '../../config';

function loadLiveChat() {
    ga( 'send' , businessEvent.openLivechat );

    if( !window.__lc ) {
        window.__lc = window.__lc || {};
        window.__lc.license = 8738836;
        // window.__lc.visitor = {
        //     name: localStorage.username ? localStorage.username : sessionStorage.username,
        //     email: localStorage.username ? localStorage.username : sessionStorage.username
        // };

        (function() {
            var lc = document.createElement('script'); 
            lc.type = 'text/javascript'; 
            lc.async = true;
            lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
            var s = document.getElementsByTagName('script')[0]; 
            s.parentNode.insertBefore(lc, s);
        })(); 
    }
    else {
        if( !!document.getElementById('livechat-compact-container') ) {
            document.getElementById('livechat-compact-container').style.display = 'block';
        }
    }

    var LC_API = window.LC_API || {};
    LC_API.on_chat_started = function(data)
    {
        ga( 'send' , businessEvent.livechatStartSession );
    };
    LC_API.on_chat_ended = function(){
        ga( 'send' , businessEvent.closeLivechat );
    };
    LC_API.on_message = function(data){
        if( data.user_type === 'agent' ) {
            ga( 'send' , businessEvent.livechatReceivedMsgInSession );
        }
    };
    LC_API.on_ticket_created = function(data){
        console.log('Ticket '+ data.ticket_id + ' created by ' + data.visitor_name + ', subject ' + data.ticket_subject + ', ' + data.text);
    };
}

export { loadLiveChat };
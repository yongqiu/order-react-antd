// react-intl无法实现的国际话内容

import React from 'react';
import * as Language from '../../../../components/getlanguagecontext/getlanguagecontext';

let lan = Language.language();
let messages = {};

export function validInfo(){
	if( lan === 'en' ) {
		messages.account = 'Account';
		messages.password = 'Password';
		messages.termsValidInfo = 'Please agree the terms.';
		messages.userOrPwdError = 'Usernname or Password is not correct.';
		messages.usernameNull = 'Please input usename.';
		messages.passwordNull = 'Please input password.';
		messages.userAndPwdNull = 'Please input usename and password.';
	}
	else if( lan === 'zh' ) {
		messages.account = '用户名';
		messages.password = '密码';
		messages.termsValidInfo = '请同意用户协议';
		messages.userOrPwdError = '用户名或密码错误';
		messages.usernameNull = '请输入用户名';
		messages.passwordNull = '请输入密码';
		messages.userAndPwdNull = '请输入用户名和密码';
	}
	else if( lan === 'pt' ) {
		messages.account = 'Nombre de usuario';
		messages.password = 'Contraseña';
		messages.termsValidInfo = 'Please agree the terms.';
		messages.userOrPwdError = 'Nome de usário ou senha não estão corretos.';
		messages.usernameNull = 'Please input usename.';
		messages.passwordNull = 'Please input password.';
		messages.userAndPwdNull = 'Please input usename and password.';
	}
	else if( lan === 'es' ) {
		messages.account = 'Nome do usuário';
		messages.password = 'Senha';
		messages.termsValidInfo = 'Please agree the terms.';
		messages.userOrPwdError = 'El nombre de usuario o la contraseña no es correcto.';
		messages.usernameNull = 'Please input usename.';
		messages.passwordNull = 'Please input password.';
		messages.userAndPwdNull = 'Please input usename and password.';
	}
	else{}
	return messages;
}
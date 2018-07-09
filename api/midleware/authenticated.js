'use strict'

exports.checkPass = function (pass1, pass2) {
	if (pass1 == pass2) {
		return true;
	} else {
		return false;
	}
};
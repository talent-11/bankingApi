const configs = require('../configs/general.config');

const generateRandomString = (digits, needChar = false) => {
	let result = '';
  let char_set = `${needChar ? configs.lowerChars : ''}${configs.numbers}`;

  const char_set_len = char_set.length;
	for(let i = 0; i < digits; i++){
		result += char_set.charAt(Math.floor(Math.random() * char_set_len));
	}
	return result;
}

const generateId = (countryCode) => {
	return `${countryCode}${generateRandomString(1)}-${generateRandomString(2, true)}-${generateRandomString(3, true)}`;
}

const generateInvitationCode = () => {
	return generateRandomString(6, true);
}

module.exports = {
  generateRandomString,
	generateId,
	generateInvitationCode,
};

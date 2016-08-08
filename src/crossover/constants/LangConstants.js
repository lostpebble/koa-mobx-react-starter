import { CTabs } from './UIConstants';

// Basic support for different languages
// testing out with English and Afrikaans

function createEmptyLangObjectFromValues(object) {
	const keys = {};

	Object.values(object).forEach(value => {
		keys[value] = "LANG UNSET";
	});

	return keys;
}

const supportedLanguages = {
	en: "en",
	af: "af",
};

const UILang = Object.assign({}, supportedLanguages);

Object.keys(UILang).forEach(key => {
	UILang[key] = {
		... createEmptyLangObjectFromValues(CTabs),
	};
});

// ENGLISH
UILang.en[CTabs.USER] = "User Profile";
UILang.en[CTabs.COUNTER] = "Pointless Counter";

// AFRIKAANS
UILang.af[CTabs.USER] = "Profiel";
UILang.af[CTabs.COUNTER] = "Nutteloos Tel";

export { UILang };

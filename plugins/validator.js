import {Form, Field, ErrorMessage} from 'vee-validate';
import { defineRule, configure} from 'vee-validate';
import rules from '@vee-validate/rules/dist/vee-validate-rules.js';
import { localize } from '@vee-validate/i18n';
import {required} from "@vee-validate/rules";


defineRule('required', (value) => {
	if (!value) {
		return 'This field is required';
	}
	return true;
});

defineRule('trimSpaces', (value) => {
	if (value.keyCode == 32) {
		return 'This field is required';
	}
	return true;
});
defineRule('integer', (value) => {
	if (
		!isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10))
	) {
		return true;
	} else {
		return 'This field must be integer value';
	}
});

defineRule('min', (value, limit) => {
	if (limit.length > 1) {
		if (!value) {
			return true;
		}
		if (Number(value) < Number(limit[ 0 ])) {
			return `This field must be greater than ${ limit[ 0 ] }`;
		}
		if (Number(value) < Number(limit[ 1 ])) {
			return `This field must be greater than ${ limit[ 1 ] }`;
		}
	}
	return true;
});

defineRule('max', (value, limit) => {
	if (limit.length > 1) {
		if (!value) {
			return true;
		}
		if (Number(value) > Number(limit[ 0 ])) {
			return `This field must be less than ${ limit[ 0 ] }`;
		}
		if (Number(value) > Number(limit[ 1 ])) {
			return `This field must be less than ${ limit[ 1 ] }`;
		}
	}
	return true;
});

defineRule('in', (value, limit) => {
	if (limit.length > 1) {
		if (!value) {
			return true;
		}
		if (
			Number(value) != Number(limit[ 0 ]) ||
			Number(value) != Number(limit[ 1 ])
		) {
			return `This field must be  ${ limit[ 0 ] } or ${ limit[ 1 ] }`;
		}
	}
	return true;
});
defineRule('password', (value) => {
	// must be start with 0 and 10 digits after 0
	if (!value) {
		return 'This field is required';
	}
	if (value.length < 8) {
		return 'This field mustn\'t be less than 8 characters';
	}
	return true;

});
defineRule('phone', (value) => {
	// must be start with 0 and 10 digits after 0
	if (!value) {
		return 'This field is required';
	}
	if (value.length != 8) {
		return 'This field must be 8 digits';
	}
	return true;

});


export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('ValidationForm', Form);
	nuxtApp.vueApp.component('Field', Field);
	nuxtApp.vueApp.component('ErrorMessage', ErrorMessage);
	const lang = useNuxtApp().$i18n.locale.value
	defineRule('required', required);
	configure({
		generateMessage: localize({
			en: {
				messages: {
					required:  lang == 'en' ? 'This field is required' : 'هذا الحقل مطلوب'
				},
			},
			ar: {
				messages: {
					required:  lang == 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'
				},
			},
		}),
	});
	Object.keys(rules)
		.filter((k) => k !== "default")
		.forEach((rule) => {
			defineRule(rule, rules[rule]);
		});
});
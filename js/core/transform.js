am.transform = (function(styles, transition, undefined) {
	"use strict";

	function parse(words) {
		var attrs = {},
			param,
			ignoreNext;

		words.forEach(function (word, i) {
			if (ignoreNext) {
				ignoreNext = false;
				return;
			}
			param = words[i+1];
			switch (word) {
				case "twist":
					if (param === 'left') {
						attrs.skewx = words[i+2];
					} else if (param === 'right') {
						attrs.skewx = '-' + words[i+2];
					}
					ignoreNext = true;
					return;
				case "move":
					if (param === 'left') {
						attrs.translatex = '-' + words[i+2];
					} else if (param === 'right') {
						attrs.translatex = words[i+2];
					} else if (param === 'bottom') {
						attrs.translatey = words[i+2];
					} else if (param === 'top') {
						attrs.translatey = '-' + words[i+2];
					}
					ignoreNext = true;
					return;
				default:
					return;
			}
		});
		return attrs;
	}

	return function(lang) {

		var attrs = parse(lang),
			skewx = attrs.skewx,
			translatex = attrs.translatex,
			translatey = attrs.translatey,
			over = attrs.over || '1.0s',
			after = attrs.after || '0s',
			easing = attrs.easing || 'ease-in-out',
			key = '',
			tmp = '';
		
		//console.log(attrs);

		if (skewx) {
			tmp = 'skewx(' + skewx + ') ';
			key = 'skewx' + skewx;
		}
		
		if (translatex) {
			tmp += 'translatex(' + translatex + ')';
			key += 'translatex' + translatex;
		}

		if (translatey) {
			tmp += 'translatey(' + translatey + ')';
			key += 'translatey' + translatey;
		}
		var css =  '-webkit-transform: ' 	+ tmp +
					     '; transform: '	+ tmp;
	
		key = key.replace(/-/g, 'm');

		//console.log(css);

		return {
			target: styles(key, css),
			transition: transition(over, easing, after)
		};
	}

})(am.styles, am.transition);
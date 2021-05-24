//import { differenceInSeconds } from "date-fns";

export const dateDiff = (date) =>{
  var install_date = new Date(date);
  var now = new Date(Date.now());
  console.log(new Date(now-install_date));
  
}

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition(elm) {
  if (!window && !elm) {
    return;
  }
  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

// export function getTimeDifference(date) {
//   let difference = differenceInSeconds(new Date(), date);

//   if (difference < 60) return `${Math.floor(difference)} sec`;
//   else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
//   else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
//   else if (difference < 86400 * 30)
//     return `${Math.floor(difference / 86400)} d`;
//   else if (difference < 86400 * 30 * 12)
//     return `${Math.floor(difference / 86400 / 30)} mon`;
//   else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
// }

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(" ");
}

// Returns if a value is a string
export function isString (value) {
	return typeof value === 'string' || value instanceof String;
}

// Returns if a value is really a number
export function isNumber (value) {
	return typeof value === 'number' && isFinite(value);
}

// Returns if a value is an array
export function isArray (value) {
	return value && typeof value === 'object' && value.constructor === Array;
}

// Returns if a value is a function
export function isFunction (value) {
	return typeof value === 'function';
}

// Returns if a value is an object
export function isObject (value) {
	return value && typeof value === 'object' && value.constructor === Object;
}

// Returns if a value is null
export function isNull (value) {
	return value === null;
}

// Returns if a value is undefined
export function isUndefined (value) {
	return typeof value === 'undefined';
}

// Returns if a value is a boolean
export function isBoolean (value) {
	return typeof value === 'boolean';
}

// Returns if a value is a regexp
export function isRegExp (value) {
	return value && typeof value === 'object' && value.constructor === RegExp;
}

// Returns if value is an error object
export function isError (value) {
	return value instanceof Error && typeof value.message !== 'undefined';
}

// Returns if value is a date object
export function isDate (value) {
	return value instanceof Date;
}

// Returns if a Symbol
export function isSymbol (value) {
	return typeof value === 'symbol';
}

export function isOwnProperty(_obj, _property){
	return _obj.hasOwnProperty(_property) 
		&& !isNull(_obj[_property])
		&& !isUndefined(_obj[_property]);
}
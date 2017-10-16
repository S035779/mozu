/**
 * encodeFormData
 *
 * @param data {object}
 * @returns {string}
 */
var encodeFormData = function(data) {
  if (!data) return ""
  var pairs = [];
  for(var name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === "function") continue;
    var value = data[name].toString();
    name = encodeURIComponent(name.replace(" ", "+"));
    value = encodeURIComponent(value.replace(" ", "+"));
    pairs.push(name + "=" + value);
  }
  return pairs.join('&');
};

/**
 * JSONP.request
 *
 * @param url {string}
 * @param data {object}
 * @param callback {string}
 */
var JSONP = {
  index: 0,
  callbacks: {},
  request: function(url, data, callback) {
    var idx = '_' + JSONP.index++;
    var elm = document.createElement('script');
    elm.type = 'text/javascript';
    elm.charset = 'utf-8';
    elm.src = url
      + "?" + (data ? encodeFormData(data) + '&' : '')
      + 'callback=JSONP.callbacks.' + idx;
    JSONP.callbacks[idx] = function(res) {
      elm.parentNode.removeChild(elm);
      delete JSONP.callbacks[idx];
      callback(res);
    };
    document.getElementsByTagName('head')[0].appendChild(elm);
  },
};

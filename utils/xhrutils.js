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
 * get
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var get = function(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("xml") !== -1
        && request.responseXML) {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };
  request.send(null);
};
module.exports.get = get;

/**
 * getData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var getData = function(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));
  request.onreadystatechange = function() {
    if (request.readyState === 4
      && callback) callback(request);
  };
  request.send(null);
};
module.exports.getData = getData;

/**
 * postData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var postData = function(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && callback)
        callback(request);
  };
  request.setRequestHeader("Content-Type"
    , "application/x-www-form-urlencoded");
  request.send(encodeFormData(data));
};
module.exports.postData = postData;

/**
 * postXML
 *
 * @param url {string}
 * @param head {object}
 * @param data {object}
 * @param callback {function}
 */
var postXML = function(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type === "text/xml; charset=utf-8") {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };
  request.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
  for(var key in data.head) {
    request.setRequestHeader(key, data.head[key]);
  }
  request.send(data.body);
};
module.exports.postXML = postXML;

/**
 * postJSON
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var postJSON = function(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && callback)
        callback(request);
  };
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
};
module.exports.postJSON = postJSON;

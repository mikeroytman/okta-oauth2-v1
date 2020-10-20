'use strict';

var Url = function() {
    this.parse = function(url) {
        var protocol = null;
        var host = null;
        var port = null;
        var path = '/';
        var fragment = null;
        var querystring = null;
        var queryparams = {};


        var index = 0;
        var begin = 0;

        if (url.length > 0) {
            if (url.indexOf('https://') === 0) {
                protocol = 'https';
                begin = 8;
                port = 443;
            } else if (url.indexOf('http://') === 0) {
                protocol = 'http';
                begin = 7;
                port = 80;
            }

            if (url.length > 0) {
                if (url.charAt(begin) !== '/') {
                    index = begin;
                    while (url.charAt(index) !== ':' && url.charAt(index) !== '/' && index < url.length) {
                        index++;
                    }
                    host = url.substring(begin, index);
                    if (host.length === 0) {
                        throw 'Invalid host';
                    }
                    begin = index++;

                    if (url.charAt(begin) === ':') {
                        while ( index < url.length && !isNaN(url.charAt(index))) {
                            index++;
                        }
                        port = url.substring(begin + 1, index);
                        if (port.length === 0) {
                            throw 'Invalid host port';
                        }
                        begin = index;
                    }
                }

                while (index < url.length && url.charAt(index) !== '?' && url.charAt(index) !== '#' && index < url.length) {
                    index++;
                }
                if (index > 0) {
                    path = url.substring(begin, index);
                    begin = index;
                }

                if (index < url.length && url.charAt(index) === '?') {
                    while (index < url.length && url.charAt(index) !== '#') {
                        index++;
                    }
                    querystring = url.substring(begin + 1, index);
                    if (querystring.length > 0) {
                        var params = querystring.split('&');
                        params.forEach(function (paramItem) {
                            var queryparam = paramItem.split('=');
                            if (queryparam.length !== 2) {
                                throw 'Invalid query parameter';
                            }
                            if (queryparams[queryparam[0]]) {
                                if (!Array.isArray(queryparams[queryparam[0]])) {
                                    queryparams[queryparam[0]] = [ queryparams[queryparam[0]] ];
                                }
                                queryparams[queryparam[0]].push(decodeURIComponent(queryparam[1]));
                            } else {
                                queryparams[queryparam[0]] = decodeURIComponent(queryparam[1]);
                            }
                        });

                    }
                }

                if ( index < url.length && url.charAt(index) === '#') {
                    if ( ( index + 1 ) < url.length ) {
                        fragment = url.substring(index + 1);
                    } else {
                        fragment = '';
                    }
                }
            }
        } else {
            throw 'Empty URL';
        }

        return {
            protocol: protocol,
            host: host,
            port: port,
            path: path,
            querystring: querystring,
            queryparams: queryparams,
            fragment: fragment,
            path_segments: path.replace(/^\/|\/$/g, '').split('/'),
            url: url,
        };
    };

    this.build = function(def, param_coma_separated) {
        var url = '';
        if (def.protocol) {
            url += def.protocol + '://';
        }
        if (def.host) {
            url += def.host;
        }
        if (def.port) {
            url += ':' + def.port;
        }
        if (def.path) {
            url += def.path;
        } else if (def.path_segments){
            url += '/' + def.path_segments.join('/');
        }
        if (def.queryparams) {
            var querystring = '';
            for (var param in def.queryparams) {
                if (Array.isArray(def.queryparams[param])) {
                    if (param_coma_separated) {
                        querystring += '&' + param + '=';
                        def.queryparams[param].forEach(function (value) {
                            querystring += encodeURIComponent(value) + ',';
                        });
                        querystring = querystring.replace(/[,]$/g, '');
                    } else {
                        def.queryparams[param].forEach(function (value) {
                            querystring += '&' + param + '=' + encodeURIComponent(value);
                        });
                    }
                } else {
                    querystring += '&' + param + '=' + encodeURIComponent(def.queryparams[param]);
                }
            }
            if (querystring.length > 0) {
                url += querystring.replace(/^&/, '?');
            }
        }
        if (def.fragment) {
            url += '#' + def.fragment;
        }
        return url;
    }
};
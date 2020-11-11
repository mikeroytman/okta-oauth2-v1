var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;


        input = Base64._utf8_encode(input);


        while (i < input.length) {


            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);


            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;


            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }


            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);


        }


        return output;
    },


    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;


        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");


        while (i < input.length) {


            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));


            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;


            output = output + String.fromCharCode(chr1);


            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }


        }


        output = Base64._utf8_decode(output);


        return output;


    },


    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";


        for (var n = 0; n < string.length; n++) {


            var c = string.charCodeAt(n);


            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }


        }


        return utftext;
    },


    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;


        while (i < utftext.length) {


            c = utftext.charCodeAt(i);


            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }


        }


        return string;
    }


}

function en(c){var x='charCodeAt',b,e={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}

function de(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("")}

var at="eyJraWQiOiJwMWZ5ZnR4QTN4SXlqa3hyeGdadWVEcFJ1bzFVdlFLa0xic1pLeVpIZVVNIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJ1aWQiOiIwMHU1OTNjdWF5Z2F5aFZjbDR4NiIsInNjcCI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwic3ViIjoiaWFyZWxsYW5vQG5lYXJicG8uY29tIiwiYXVkIjoidXJuOlwvXC9pYXJlbGxhbm8tZXZhbC10ZXN0LmFwaWdlZS5uZXRcLyIsInZlciI6MSwiYXNzaWduX3RvIjoiRXZlcnlvbmUsIFRlc3RHcm91cCIsImlkX3Rva2VuIjoiZXlKcmFXUWlPaUp3TVdaNVpuUjRRVE40U1hscWEzaHllR2RhZFdWRWNGSjFiekZWZGxGTGEweGljMXBMZVZwSVpWVk5JaXdpZEhsd0lqb2lTbGRVSWl3aVlXeG5Jam9pVWxNeU5UWWlmUS5leUp6ZFdJaU9pSXdNSFUxT1ROamRXRjVaMkY1YUZaamJEUjROaUlzSW5abGNpSTZNU3dpWVhOemFXZHVYM1J2SWpvaVJYWmxjbmx2Ym1Vc0lGUmxjM1JIY205MWNDSXNJbUZ0Y2lJNld5SndkMlFpWFN3aWFYTnpJam9pYUhSMGNITTZYQzljTDJSbGRpMHlPVFl6TkRZdWIydDBZUzVqYjIxY0wyOWhkWFJvTWx3dlpHVm1ZWFZzZENJc0luQnlaV1psY25KbFpGOTFjMlZ5Ym1GdFpTSTZJbWxoY21Wc2JHRnViMEJ1WldGeVluQnZMbU52YlNJc0ltNXZibU5sSWpvaVYzSklWRkZ4WlhsSk5qVmpaRk5KVEVwS2VqRjVPRXhKWjNNM1pISTRZbEp1Y2t4cE5sWjFkR0l6VlhSVVZUTTBTVUZHVDFoTlExaDRja0Y2ZWxSTlpTSXNJbUYxWkNJNklsUXhRWHBOWVVjellreFJZM0phTkhOQlNGZHBXRE50ZGxaaGJrVldRMVptSWl3aWFXUndJam9pTURCdk5Ua3pZM0Y2VTIwelRYTjZSVmMwZURZaUxDSmhkWFJvWDNScGJXVWlPakUyTURRNU5ESTVNVEVzSW01aGJXVWlPaUpKYzJGcFlYTWdRWEpsYkd4aGJtOGlMQ0psZUhBaU9qRTJNRFV4TlRrMk1UZ3NJbWxoZENJNk1UWXdORGswTXpZeE9Dd2laVzFoYVd3aU9pSnBZWEpsYkd4aGJtOUFibVZoY21Kd2J5NWpiMjBpTENKcWRHa2lPaUpKUkM1bFRFWmtTRlk1YVhWM2RqWnRhWFZNUldWcGFVOUpZV1ZpZHpKeVVrZEVjR0p2WW5SM1NVSjFha3RSSW4wLnZZN1M1ZzhNREJZLXhVTDBEYlhBenVQRHVocUhUMUFQYS11VC1KRW5pNHVWTldDYU5aa1dMNE1FOERlVmxCY19hMHVIemlLRzlINW9UQkRDT3VaeHY2d2J2bG1IUXAwYjNrekl3QURaTUtCc3dEVldJekZZLUQ2QURFeExsTUxTMXdvd3ppWFpFejVOM2hjNjZJWHVPOWd3Tzh1STVEcXZDU0ZjdWozUndIMHVMRkpXeVdaRjBGSkxiNFpMdHBjY3NkcV9zU3V2XzViSXo3TERqTU9HZm51dzNKZzl5bGgtdTdxemdZbnZkVkpiY21JRFQ2X3gzdC1FS3g1Nm83SThrMVByWE1tS3FQMl9scEF5a0d0cWpWRFo5Z21iVS1hcVRVeFNYdkdob1oxanh5SVc1eWYzd1RzakJlbWhaOVBLTFMxLTJlOU5KSFNzYXR6V3BNbmNtS1JSY3hfLW1aRXlEZUJWcXlER3UwS21LaUVxY0VZRnB5WmdDeEVHT2pxem1udnBsX3J1b3NTT1J5clBDRjMtR3FoT3BoU2F1R2l2YjJBYW90el9TYTE2V255bmUtazJ2WlhXd2RYSjJ0WktxSTBCd0pNbkYzYzJuM2tGdkl5ZFpBVjZSRVBLLWY4R0NNaHlmN2FjQzF2WThCc0FUWWxaeUdTaVZFYzFWQUJOQUtaZUNScTczbWh0NFQtanoyOUhjRFdNVm13elA3MnltUVpnekQ0aW8xZlZzV3B6dVpBZ09GeV85eGZvVkh3NWllMm8zN3lmQ2JNaVFBSEIzN2F0UDNvLVlxTTFDLU9kTlB5OUhwZGVuTnJMME16dEZBeE9yNGl6R0dWM3VQTV9sLURTQ2ZTR3VoR1k2aDZCeVZRUk83Z2hWSmNJS3d2OG1QS0UwMWhvLWk4IiwiaXNzIjoiaHR0cHM6XC9cL2Rldi0yOTYzNDYub2t0YS5jb21cL29hdXRoMlwvZGVmYXVsdCIsImV4cCI6MTYwNTE1OTYxOCwiaWF0IjoxNjA0OTQzNjE4LCJqdGkiOiJBVC51VUUweWd5UUFMbWVjX1duUDZ2TEhPYUcyQndvZUQtbG1EQ0lvS3UtZ3VFIiwiY2lkIjoiMG9hNWhlc2RyTENMakpHUVA0eDYifQ.Nw9bHNs77m_VXMklqlCPBxMzUm6QuCNQzySEpjhvE7KlAHMiyO9ADJWiFAjElJGD94Zc0iTagNHgwxvAJTOJ2klLoxI4rNt9Eo05pg8Nc5tnm3KWermEaHJlqwPcZ_8tyc9tYsku7bSUEOO_7um8pBgVjKQ1lDi-RaGO2FzSG1TbjmTzn3vfmRYrlpLx7RgDjRpenxPEAGNKUymSpSBdDFfRNTJF_W6XX84mvPzYi8DP80hTSqKxcX3TvlI7h_ENWaRb4SJ_LdkDo1AILuYIsDoPLsABCQSKxaYXFl4ISR3OnmhdbGInanDO1GbndZBdXHPI-n7L9G_FahjURlmirNmdm3yBKNVa-c36xbUFmtZY4kiDiZD2ysmBo2cKr8fhj5QKN1M9LSZHrjtuVSp-L6NbZ8YUEGbUfBgi_1FME4_FnW4_S1uh4CPsmXW3j0fRsHLxiaL5uDIRvRj3h3UHWD9VlEYwUg7aXxJ9PA_pvd6HgNtbATf95sBTFG-0zs3Q_yUijSnrKJHKCAsAyTs18d5uAHuMAJnbVbRC0y50g5fiFeC3mdvptXaK_4MVdaezhq1LJNcYzq-kTlND_Jt9SukHEi1Q3suUL4URhT9qmOQtKmBWXI5dCNpix3yLZa90ym_FTLG7IQtM02Vc0awJOfRiQegCo0DxiKQ_bR9Pu7k";

function stringCompression (str) {
    if (str.length ==0) {
        console.log('Please enter valid string.');
        return;
    }
    var output = '';
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        count++;
        if (str[i] != str[i+1]) {
            output += str[i] + count;
            count = 0;
        }
    }
    console.log(output + '');
    console.log(output.length);
}
stringCompression(at)
// var compressed=Base64.encode(en(at));
// console.log(compressed);
// console.log(compressed.length);
// var decompressed=de(compressed);


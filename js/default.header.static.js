/* Built on 2019-07-03 18:58:40 */ !function () {
    "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || (document.documentElement.className += " notouch"), "undefined" == typeof window.console && (window.console = {});
    var e = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++) {
            var o = arguments[n],
                    i = typeof o;
            if ("string" === i)
                t.push(o);
            else if (null === o)
                t.push("null");
            else if ("undefined" === i)
                t.push("undefined");
            else if ("function" === i) {
                var a = o.toString();
                t.push(a.substr(a, a.indexOf("{") + 1) + " ... }")
            } else
                "function" == typeof o.toString ? t.push(o.toString()) : t.push(i)
        }
        document.body ? "function" == typeof document.body.appendChild && document.body.appendChild(document.createComment(e + " / " + t.join(", "))) : document.write("\x3c!--" + e + " / " + t.join(", ") + "--\x3e")
    },
            t = ["error", "warn", "info", "debug", "log"];
    for (var n in t)
        !function (t) {
            "undefined" == typeof window.console[t] && (window.console[t] = function () {
                for (var n = [t.toUpperCase()], o = 0; o < arguments.length; o++)
                    n.push(arguments[o]);
                e.apply(null, n)
            })
        }(t[n])
}(),
        function () {
            var e, t = {};
            t.getRootDomain = function () {
                if ("string" == typeof e)
                    return e;
                var t = window.location.hostname.split(".");
                if (t.length >= 2) {
                    e = "";
                    for (var n = t.length - 2; n < t.length; n++)
                        e += "." + t[n]
                }
                return e
            };
            var n = {},
                    o = function (e, t) {
                        var n = e.indexOf(";", t);
                        return -1 === n && (n = e.length), unescape(e.substring(t, n))
                    };
            n.set = function (e, t, n, o, i, a) {
                var r = [];
                if (r.push(e + "=" + encodeURIComponent(t)), n) {
                    var s = new Date;
                    s.setTime(s.getTime());
                    var d = new Date(s.getTime() + n);
                    r.push("expires=" + d.toGMTString())
                }
                o && r.push("path=" + o), i && r.push("domain=" + i), a && r.push("secure"), document.cookie = r.join(";")
            }, n.setLocal = function (e, o, i, a, r) {
                n.set(e, o, i, a, t.getRootDomain(), r)
            }, n.get = function (e) {
                for (var t = e + "=", n = t.length, i = document.cookie, a = i.length, r = 0; r < a; ) {
                    var s = r + n;
                    if (i.substring(r, s) === t)
                        return o(i, s);
                    if (0 === (r = i.indexOf(" ", r) + 1))
                        break
                }
                return null
            }, window.xv || (window.xv = {}), window.xv.utils = t, window.xv.cookies = n
        }(),
        function () {
            var e = function () {
                this.s = window.localStorage
            };
            e.prototype = {
                type: "local",
                get: function (e, t) {
                    "string" == typeof t && t.length > 0 && (e = t + "." + e);
                    try {
                        return JSON.parse(this.s.getItem(e))
                    } catch (n) {
                        return console.log(n), null
                    }
                },
                set: function (e, t, n) {
                    "string" == typeof n && n.length > 0 && (e = n + "." + e), this.s.setItem(e, JSON.stringify(t))
                },
                remove: function (e, t) {
                    "string" == typeof t && t.length > 0 && (e = t + "." + e), this.s.removeItem(e)
                },
                clear: function () {
                    this.s.clear()
                }
            };
            var t = "_globalns_",
                    n = window.xv.cookies,
                    o = function () {
                        this.data = {}
                    };
            o.prototype = {
                type: "cookie",
                _loadNs: function (e) {
                    if ("string" == typeof e && 0 !== e.length || (e = t), "object" != typeof this.data[e]) {
                        this.data[e] = {};
                        var o = n.get("hexavid_storage_" + e);
                        if ("string" == typeof o && o.length > 0)
                            try {
                                o = JSON.parse(o), "object" == typeof o && (this.data[e] = o)
                            } catch (i) {
                                console.error(i)
                            }
                    }
                },
                _write: function (e) {
                    "string" == typeof e && 0 !== e.length || (e = t);
                    try {
                        var o = JSON.stringify(this.data[e]);
                        n.setLocal("hexavid_storage_" + e, o, 31536e6, "/")
                    } catch (i) {
                        console.error(i)
                    }
                },
                get: function (e, n) {
                    return this._loadNs(n), "undefined" == typeof this.data[n || t][e] ? null : this.data[n || t][e]
                },
                set: function (e, n, o) {
                    this._loadNs(o), this.data[o || t][e] = n, this._write(o)
                },
                remove: function (e, n) {
                    this._loadNs(n), "undefined" != typeof this.data[n || t][e] && (delete this.data[n || t][e], this._write(n))
                },
                clear: function () {
                    this._loadNs(ns), this.data[ns || t] = {}, this._write(ns)
                }
            }, window.xv || (window.xv = {});
            try {
                if ("object" == typeof window.localStorage) {
                    var i = window.localStorage,
                            a = "__storage_test__";
                    i.setItem(a, a), i.removeItem(a), window.xv.storage = new e
                }
            } catch (r) {
            }
            window.xv.storage || (window.xv.storage = new o)
        }(),
        function () {
            var e = window.xv.storage,
                    t = function (e, t, n, o, i) {
                        var a = document.createElement(e);
                        t && (a.className = t);
                        for (var r in n)
                            n.hasOwnProperty(r) && (a.style[r] = n[r]);
                        return o && (a.innerHTML = o), i && (a.innerText ? a.innerText = i : a.textContent = i), a
                    },
                    n = function (e, t) {
                        var n = !1;
                        for (var o in e.childNodes)
                            if (1 === e.childNodes[o].nodeType) {
                                n = e.childNodes[o];
                                break
                            }
                        n ? e.insertBefore(t, n) : e.appendChild(t)
                    },
                    o = function () {
                        if (-1 !== window.location.href.indexOf("debugjs=1") ? (this.is_debug = !0, e.set("enabled", !0, "debugconsole")) : e.get("enabled", "debugconsole") && (this.is_debug = !0), this.node, this.logs, "object" == typeof window.onerror) {
                            var t = this;
                            window.onerror = function (e, n, o, i, a) {
                                var r = {};
                                return r.u = n + ":" + o, "number" == typeof i && (r.u += ":" + i), /*console.error('ERROR: "' + e + '" in ' + r.u),*/ "object" == typeof a && null !== a && "string" == typeof a.stack && (console.error(a.stack), r.s = a.stack.split(window.location.protocol + "//" + window.location.hostname).join("")), t.log(e, "Global error", null, r), !0
                            }
                        }
                    };
            o.prototype = {
                _read: function () {
                    if ("object" != typeof this.logs) {
                        this.logsize = 0, this.logs = e.get("logs", "debugconsole"), this.logs && "object" == typeof this.logs || (this.logs = []);
                        for (var t in this.logs)
                            this.logsize += this.logs[t].s
                    }
                },
                _cleanLogs: function () {
                    for (; this.logsize > 1e5; ) {
                        var e = this.logs.pop();
                        this.logsize -= e.s
                    }
                },
                getHistory: function () {
                    return e.get("logs", "debugconsole") || []
                },
                displayHistory: function () {
                    var e = this.getHistory();
                    if (0 === e.length)
                        return void console.info("No history");
                    for (var t = e.length - 1; t >= 0; t--) {
                        var n = e[t],
                                o = new Date(n.t),
                                i = o.toUTCString() + ": " + n.a + " - " + n.x;
                        n.eu && (i += " IN " + n.eu), console.info(i), "undefined" != typeof n.js && (console.info("Status: " + n.js + " / State: " + n.jr), console.info("Response headers:", n.jh), console.info("Response text:", n.jt)), n.rjsm && console.info("RJS MODULES: " + n.rjsm), n.rjsp && console.info("RJS MAP: " + n.rjsp), n.es && console.info("STACK: " + n.es)
                    }
                },
                getHtmlHistory: function () {
                    var e = t("div", "debug-js-console", {
                        margin: "10px 0",
                        border: "2px solid #000",
                        background: "#ddd",
                        padding: "5px 10px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        lineHeight: 1.3,
                        color: "#000"
                    }),
                            n = this.getHistory();
                    if (0 === n.length)
                        return e;
                    for (var o = 0; o < n.length; o++)
                        log = n[o], this._addHtml(e, new Date(log.t), log.x, log.a, "undefined" != typeof log.js && log, ("undefined" != typeof log.eu || "undefined" != typeof log.rjsp || "undefined" != typeof log.rjsm) && log);
                    return e
                },
                logRJS: function (e) {
                    var t = {};
                    t.u = (e.fileName || "Unknown file") + (e.lineNumber ? ":" + e.lineNumber : ""), "number" == typeof e.columnNumber ? t.u += ":" + e.columnNumber : "number" == typeof e.colNumber && (t.u += ":" + e.colNumber);
                    var n = e.message || "Unknow error";
                    if (console.error("RJS " + e.requireType.toUpperCase() + ' ERROR: "' + n + '" in ' + t.u), "undefined" != typeof e.requireMap) {
                        try {
                            t.rjsp = JSON.stringify(e.requireMap)
                        } catch (o) {
                        }
                        console.info(e.requireMap)
                    }
                    null !== e.requireModules && "object" == typeof e.requireModules && (t.rjsm = e.requireModules.join("\n"), console.info(t.rjsm)), "string" == typeof e.stack && (t.s = e.stack.split(window.location.protocol + "//" + window.location.hostname).join(""), console.error(e.stack)), this.log(n, "RJS " + e.requireType + " error", null, t)
                },
                log: function (t, n, o, i) {
                    if ("cookie" !== e.type || this.is_debug) {
                        this._read();
                        var a = {};
                        a.t = (new Date).getTime(), a.x = t, a.a = n, o && (a.js = o.status, a.jr = o.readyState, a.jh = o.getAllResponseHeaders(), a.jt = o.responseText.substr(0, 1e3)), i && (a.eu = i.u, i.s && (a.es = i.s), i.rjsm && (a.rjsm = i.rjsm), i.rjsp && (a.rjsp = i.rjsp)), a.s = 1e4;
                        try {
                            a.s = JSON.stringify(a).length
                        } catch (r) {
                        }
                        this.logs.unshift(a), this._cleanLogs(), e.set("logs", this.logs, "debugconsole")
                    }
                },
                print: function (e, t, n, o) {
                    if (this.log(e, t, n, o), this.is_debug) {
                        this._getNode();
                        var i = !1;
                        n && (i.js = n.status, i.jr = n.readyState, i.jh = n.getAllResponseHeaders(), i.jt = n.responseText);
                        var a = !1;
                        o && (a.eu = a.u, o.s && (a.es = o.s), o.rjsm && (a.rjsm = o.rjsm), o.rjsp && (a.rjsp = o.rjsp)), this._addHtml(this.node, new Date, e, t, i, a)
                    }
                },
                _addHtml: function (e, n, o, i, a, r) {
                    var s = "<i>" + n.toUTCString() + ":</i> <strong>" + i + "</strong> - ";
                    r && (s += "<strong>"), s += o.replace(/\n/gi, "<br>"), r && (s += "</strong> IN " + r.eu), e.appendChild(t("p", null, {
                        padding: "0",
                        margin: "2px 0"
                    }, s)), a && (e.appendChild(t("p", null, {
                        padding: "0",
                        margin: "2px 0"
                    }, "<strong>Status: " + a.js + "</strong> / State: " + a.jr)), e.appendChild(t("p", null, {
                        padding: "0",
                        margin: "2px 0"
                    }, '<strong>Response headers:</strong><br><small style="font-size:10px">' + a.jh.replace("\n", "<br>") + "</small>")), e.appendChild(t("p", null, {
                        padding: "0",
                        margin: "2px 0"
                    }, "<strong>Response text:</strong>")), e.appendChild(t("pre", null, {
                        fontSize: "10px",
                        margin: "2px 0",
                        padding: "0",
                        border: "none",
                        maxHeight: "100px",
                        overflowX: "hidden",
                        overflowY: "auto"
                    }, null, a.jt))), r && (r.rjsm && (e.appendChild(t("p", null, {
                        fontSize: "10px",
                        padding: "0",
                        margin: "2px 0"
                    }, "<strong>RJS Modules:</strong>")), e.appendChild(t("pre", null, {
                        fontSize: "10px",
                        margin: "2px 0",
                        padding: "0",
                        border: "none"
                    }, null, r.rjsm))), r.rjsp && (e.appendChild(t("p", null, {
                        fontSize: "10px",
                        padding: "0",
                        margin: "2px 0"
                    }, "<strong>RJS Map:</strong>")), e.appendChild(t("pre", null, {
                        fontSize: "10px",
                        margin: "2px 0",
                        padding: "0",
                        border: "none"
                    }, null, r.rjsp))), r.es && ((r.rjsm || r.rjsp) && e.appendChild(t("p", null, {
                        fontSize: "10px",
                        padding: "0",
                        margin: "2px 0"
                    }, "<strong>Stack trace:</strong>")), e.appendChild(t("pre", null, {
                        fontSize: "10px",
                        margin: "2px 0",
                        padding: "0",
                        border: "none"
                    }, null, r.es))))
                },
                _getNode: function () {
                    if (this.node)
                        return this.node;
                    var o, i = ["main", "content", "page"],
                            a = 0;
                    do {
                        o = document.getElementById(i[a]), a++
                    } while (!o && a < i.length);
                    o || (o = document.getElementsByTagName("body")[0]);
                    var r = t("div", "debug-js-console", {
                        margin: "10px 0",
                        border: "2px solid #000",
                        background: "#ddd",
                        padding: "5px 10px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        lineHeight: 1.3,
                        color: "#000"
                    }, '<h4 style="font-weight:bold;font-size:15px;font-family:sans-serif;padding:0;text-decoration:underline;margin:0 0 10px" id="debug-js-console-title">Console</h4>\n<div class="debug-content"></div>\n<div style="font-size:12px;font-weight:bold;font-family:sans-serif;padding:0;margin:10px 0 0;text-align:right;text-decoration:underline"><a href="#" id="debug-js-console-close">Close console</a></div>\n');
                    n(o, r);
                    var s;
                    for (var d in r.childNodes)
                        1 === r.childNodes[d].nodeType && ("debug-content" === r.childNodes[d].className && (this.node = r.childNodes[d]), s = r.childNodes[d]);
                    for (var d in s.childNodes)
                        1 === s.childNodes[d].nodeType && "A" === s.childNodes[d].nodeName && (s.childNodes[d].onclick = function (t) {
                            t.preventDefault(), r.remove(), e.set("enabled", !1, "debugconsole")
                        });
                    return window.xv && xv.i18n && xv.i18n.getCatalog("front", function () {
                        var e = document.getElementById("debug-js-console-title");
                        e && (e.innerHTML = xv.i18n.__("debug.console"));
                        var t = document.getElementById("debug-js-console-close");
                        t && (t.innerHTML = xv.i18n.__("debug.close_console"))
                    }), this.node
                }
            }, window.xv || (window.xv = {}), window.xv.console = new o
        }(),
        function () {
            window.xv || (window.xv = {});
            var e = {};
            "object" == typeof window.xv.utils && (e = window.xv.utils), e.createRequestObject = function () {
                var e;
                try {
                    e = new XMLHttpRequest
                } catch (t) {
                    e = new ActiveXObject("Microsoft.XMLHTTP")
                }
                return e
            }, e.loadScript = function (e, t, n) {
                var o, i = document.getElementsByTagName("head")[0];
                "string" == typeof e && (e = [e]);
                for (var a in e) {
                    if (o = document.createElement("script"), o.type = "text/javascript", "object" == typeof t)
                        for (var r in t)
                            t.hasOwnProperty(r) && (o[r] = t[r]);
                    if ("object" == typeof n)
                        for (var s in n)
                            n.hasOwnProperty(s) && xv.dom.addEventListener(o, s, n[s]);
                    i.appendChild(o), o.src = e[a]
                }
            };
            var t;
            e.getStaticDomain = function () {
                if ("string" == typeof t)
                    return t;
                if ("object" == typeof xv && "object" == typeof xv.conf && xv.conf.domains && xv.conf.domains["static"])
                    t = xv.conf.domains["static"].replace(/^https?:\/\//i, "");
                else {
                    var e = "ss",
                            n = (" " + document.cookie).indexOf(" hexavid_static=");
                    -1 !== n && (e = (" " + document.cookie).substr(n + 16, 2)), t = "static-" + e + ".xvideos-cdn.com"
                }
                return t
            }, e.escape = function (e, t) {
                var n = document.createElement("div");
                return n.appendChild(document.createTextNode(e)), t ? n.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&apos;") : n.innerHTML
            }, e.unescape = function (e) {
                var t = document.createElement("div");
                return t.innerHTML = e, 0 === t.childNodes.length ? "" : t.childNodes[0].nodeValue
            }, e.indexOf = function (e, t, n) {
                if (Array.prototype.indexOf)
                    return e.indexOf(t, n || 0);
                for (var o = n || 0, i = e.length; o < i; o++)
                    if (e[o] === t)
                        return o;
                return -1
            }, e.inArray = function (e, t) {
                for (var n = 0, o = e.length; n < o; n++)
                    if (e[n] === t)
                        return !0;
                return !1
            }, e.arraySum = function (e) {
                for (var t = 0, n = 0, o = e.length; n < o; n++)
                    t += e[n];
                return t
            }, e.objLength = function (e) {
                var t = 0;
                for (var n in e)
                    "undefined" != typeof e[n] && t++;
                return t
            };
            var n = window.xv.storage,
                    o = n.get("nb_tabs_opened", "xvutils") <= 0;
            window.addEventListener && (n.set("nb_tabs_opened", n.get("nb_tabs_opened", "xvutils") + 1, "xvutils"), window.addEventListener("beforeunload", function () {
                n.set("nb_tabs_opened", Math.max(n.get("nb_tabs_opened", "xvutils") - 1, 0), "xvutils")
            })), e.getNbTabsOpened = function () {
                return n.get("nb_tabs_opened", "xvutils") + 0
            }, e.isFirstPage = function () {
                return o
            }, window.xv.utils = e
        }(),
        function () {
            var e = {};
            e.getChildren = function (e, t) {
                var n = [];
                for (var o in e.childNodes)
                    1 !== e.childNodes[o].nodeType || !t && "SCRIPT" === e.childNodes[o].nodeName || n.push(e.childNodes[o]);
                return n
            }, e.getChildrenRecursive = function (e) {
                var t = [];
                for (var n in e.childNodes)
                    if (1 === e.childNodes[n].nodeType) {
                        var o = this.getChildrenRecursive(e.childNodes[n]);
                        for (var i in o)
                            t.push(o[i]);
                        t.push(e.childNodes[n])
                    }
                return t
            }, e.getFirstChild = function (e) {
                for (var t in e.childNodes)
                    if (1 === e.childNodes[t].nodeType)
                        return e.childNodes[t]
            }, e.getPreviousSibling = function (e) {
                if (e.previousElementSibling)
                    return e.previousElementSibling;
                do {
                    e = e.previousSibling
                } while (e && 1 !== e.nodeType);
                return e
            }, e.getNextSibling = function (e) {
                if (e.nextElementSibling)
                    return e.nextElementSibling;
                do {
                    e = e.nextSibling
                } while (e && 1 !== e.nodeType);
                return null
            }, e.hasClass = function (e, t) {
                return -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
            }, e.addClass = function (e, t) {
                if (-1 === (" " + e.className + " ").indexOf(" " + t + " "))
                    return e.className = e.className + " " + t, e
            }, e.removeClass = function (e, t) {
                if (void 0 === t || 0 === t.length)
                    return e.className = "", e;
                for (var n = " " + e.className + " ", o = t.split(" "), i = 0; i < o.length; i++)
                    t = o[i], 0 !== t.length && (n = n.replace(" " + t + " ", " "));
                return e.className = n.substring(1, n.length), e
            }, e.addEventListener = function (e, t, n) {
                return e.addEventListener ? (e.addEventListener(t, n, !1), !0) : e.attachEvent ? e.attachEvent("on" + t, n) : (t = "on" + t, "function" == typeof e[t] && (n = function (e, t) {
                    return function () {
                        e.apply(this, arguments), t.apply(this, arguments)
                    }
                }(e[t], n)), e[t] = n, !0)
            };
            var t;
            e.getViewportWidth = function () {
                return "inner" === t || "undefined" != typeof window.innerWidth ? (t = "inner", window.innerWidth) : "documentElement" === t || "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? (t = "documentElement", document.documentElement.clientWidth) : document.getElementsByTagName("body")[0].clientWidth
            }, e.getViewportHeight = function () {
                return "inner" === t || "undefined" != typeof window.innerWidth ? (t = "inner", window.innerHeight) : "documentElement" === t || "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? (t = "documentElement", document.documentElement.clientHeight) : document.getElementsByTagName("body")[0].clientHeight
            }, e.scrollToTop = function (e) {
                void 0 === e && (e = 0), window.jQuery ? $("html, body").animate({
                    scrollTop: e
                }, "slow") : (document.getElementsByTagName("body")[0].scrollTop = e, document.getElementsByTagName("html")[0].scrollTop = e)
            }, e.getScrollTop = function () {
                return window.jQuery ? $(window).scrollTop() : "undefined" != typeof document.getElementsByTagName("body")[0] ? document.getElementsByTagName("body")[0].scrollTop : 0
            }, e.getElementOffset = function (e, t) {
                var n = 0,
                        o = 0;
                for ("boolean" != typeof t && (t = !1); e; ) {
                    if ("BODY" == e.tagName) {
                        var i = t ? e.scrollLeft || document.documentElement.scrollLeft : 0,
                                a = t ? e.scrollTop || document.documentElement.scrollTop : 0;
                        n += e.offsetLeft - i + e.clientLeft, o += e.offsetTop - a + e.clientTop
                    } else
                        n += e.offsetLeft - e.scrollLeft + e.clientLeft, o += e.offsetTop - e.scrollTop + e.clientTop;
                    e = e.offsetParent
                }
                return {
                    left: n,
                    top: o
                }
            }, e.isElementInView = function (t, n, o) {
                if (scroll_marge = void 0 !== o && "number" == typeof o.scroll_marge ? o.scroll_marge : 0, no_zero = void 0 !== o && "boolean" == typeof o.no_zero && o.no_zero, "object" != typeof t || "undefined" == typeof t.offsetTop || "undefined" == typeof t.offsetHeight)
                    return !0;
                if ("function" == typeof window.getComputedStyle) {
                    if ("none" === window.getComputedStyle(t).display)
                        return !1
                }
                var i = e.getScrollTop(),
                        a = i + e.getViewportHeight(),
                        r = e.getElementOffset(t).top,
                        s = r + t.offsetHeight;
                return (!0 !== no_zero || 0 !== r || 0 !== s) && (!0 === n ? i - scroll_marge < r && a + scroll_marge > s : r <= a + scroll_marge && s >= i - scroll_marge)
            }, window.xv || (window.xv = {}), window.xv.dom = e
        }(),
        function () {
            var var_regexp = /%\w+%/g,
                    is_IE_lte_9 = /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10,
                    load_handlers = {},
                    clean_loc = function (e) {
                        return e = e.replace(/\s+/, ""), (2 === e.length || 5 === e.length) && (!!e.match(/^[a-z]{2}(-[A-Z]{2})?$/g) && e)
                    },
                    get_locale = function () {
                        if ("object" == typeof xv && "object" == typeof xv.conf && "object" == typeof xv.conf.dyn && "string" == typeof xv.conf.dyn.locale) {
                            var e = clean_loc(xv.conf.dyn.locale);
                            if (e)
                                return e
                        }
                        if (document.documentElement && document.documentElement.lang && "string" == typeof document.documentElement.lang) {
                            var e = clean_loc(document.documentElement.lang);
                            if (e)
                                return e
                        }
                        return "en"
                    },
                    jsonParse = function (text) {
                        return "undefined" != typeof JSON && "function" == typeof JSON.parse ? JSON.parse(text) : eval("(" + text + ")")
                    },
                    get_version_path = function (e, t) {
                        return "object" != typeof xv || "object" != typeof xv.conf || "object" != typeof xv.conf.dyn || "object" != typeof xv.conf.dyn.i18nvers ? "" : "object" != typeof xv.conf.dyn.i18nvers[e] || "string" != typeof xv.conf.dyn.i18nvers[e][t] ? "" : "/v-" + xv.conf.dyn.i18nvers[e][t]
                    },
                    load_translations = function (e, t, n) {
                        var o = !1,
                                i = get_version_path(t, e);
                        load_handlers[e + "_" + t] = n;
                        try {
                            if (is_IE_lte_9)
                                xv.utils.loadScript(window.location.protocol + "//" + xv.utils.getStaticDomain() + i + "/v3/js/i18n/" + t + "/" + ("en" === e ? "english" : e) + ".js");
                            else {
                                var a = xv.utils.createRequestObject();
                                a.open("GET", window.location.protocol + "//" + xv.utils.getStaticDomain() + i + "/v3/js/i18n/" + t + "/" + ("en" === e ? "english" : e) + ".json"), a.onreadystatechange = function (e) {
                                    4 == a.readyState && (200 == a.status && "string" == typeof (o = a.responseText) && (o = jsonParse(o)), n(o))
                                }, a.send(null)
                            }
                            return
                        } catch (r) {
                            if (console.error(r.toString()), !is_IE_lte_9)
                                try {
                                    xv.utils.loadScript(window.location.protocol + "//" + xv.utils.getStaticDomain() + i + "/v3/js/i18n/" + t + "/" + ("en" === e ? "english" : e) + ".js")
                                } catch (r) {
                                    console.error(r.toString())
                                }
                        }
                        n(o)
                    },
                    strtr_val = function (e, t, n, o) {
                        if (!t) {
                            if (!n)
                                return e.split("_").join(" ");
                            t = n
                        }
                        return "object" == typeof o && (t = t.replace(var_regexp, function (e) {
                            return "string" == typeof o[e] ? o[e] : e
                        })), t
                    },
                    flatten_val = function (e, t) {
                        var n = null,
                                o = {},
                                i = !1;
                        for (var a in e)
                            e.hasOwnProperty(a) && ("$0" === a ? n = strtr_val(a, e[a], null, t) : "object" == typeof e[a] ? (o[a] = flatten_val(e[a], t), i = !0) : (o[a] = strtr_val(a, e[a], null, t), i = !0));
                        return i ? o : n
                    },
                    i18n_catalog = function (e, t) {
                        this.trs = {}, this.catalog = e, this.locale = t, this.status = "not_loaded", this._on_loaded = []
                    };
            i18n_catalog.prototype = {
                getCatalog: function () {
                    return this.catalog
                },
                getLocale: function () {
                    return this.locale
                },
                getStatus: function () {
                    return this.status
                },
                isLoaded: function () {
                    this.status
                },
                load: function (e) {
                    if ("loaded" === this.status)
                        return "function" == typeof e && e(this), !0;
                    if ("#" === this.catalog)
                        return this.status = "loaded", "function" == typeof e && e(this), !0;
                    if ("function" == typeof e && this._on_loaded.push(e), "loading" === this.status)
                        return -1;
                    this.status = "loading";
                    var t = this;
                    return load_translations(this.locale, this.catalog, function (e) {
                        if ("object" != typeof e) {
                            console.log("i18n: Cannot load " + t.locale + " translations for catalog " + t.catalog + "."), "en" !== t.locale && load_translations("en", t.catalog, function (e) {
                                "object" == typeof e ? (console.log("i18n: Loaded en translations either."), t.trs = e) : console.log("i18n: Cannot load en translations either."), t.status = "loaded";
                                for (var n in t._on_loaded)
                                    t._on_loaded[n](t)
                            }), t.status = "loaded";
                            for (var n in t._on_loaded)
                                t._on_loaded[n](t)
                        } else {
                            t.status = "loaded", t.trs = e;
                            for (var n in t._on_loaded)
                                t._on_loaded[n](t)
                        }
                    }), -1
                },
                __: function (e, t, n) {
                    if ("loaded" !== this.status)
                        return this.load(), strtr_val(e.split(".").pop(), !1, n, t);
                    var o = e.split("."),
                            i = this.trs;
                    for (var a in o) {
                        if ("*" === o[a])
                            return flatten_val(i, t);
                        if ("object" != typeof i[o[a]])
                            return strtr_val(o.pop(), !1, n, t);
                        i = i[o[a]]
                    }
                    return "string" != typeof i.$0 ? strtr_val(o.pop(), !1, n, t) : strtr_val(e, i.$0, n, t)
                },
                ___: function (e) {
                    var t = {};
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = this.__(n, e[n]));
                    return t
                }
            };
            var i18n = function () {
                this.catalogs = {}, this.locale = !1, this.default_catalog = !1
            };
            i18n.prototype = {
                getLocale: function () {
                    return this.locale || (this.locale = get_locale()), this.locale
                },
                setDefaultCatalog: function (e, t) {
                    this.default_catalog = e, (void 0 === t || t) && this.getCatalog(e)
                },
                getCatalog: function (e, t) {
                    return void 0 !== e && e || (this.default_catalog || (console.error("i18n: No default catalog defined"), this.default_catalog = "#"), e = this.default_catalog), this.getLocale(), "undefined" == typeof this.catalogs[e] && (this.catalogs[e] = new i18n_catalog(e, this.locale)), this.catalogs[e].load(t), this.catalogs[e]
                },
                __: function (e, t, n, o) {
                    return this.getCatalog(n).__(e, t, o)
                },
                ___: function (e, t) {
                    return this.getCatalog(t).__(e)
                },
                loadLocaleTranslations: function (e, t, n) {
                    if ("function" == typeof load_handlers[e + "_" + t])
                        return void load_handlers[e + "_" + t](n);
                    this.getLocale(), "undefined" == typeof this.catalogs[t] && (this.catalogs[t] = new i18n_catalog(t, this.locale)), "not_loaded" !== this.catalogs[t].getStatus() && console.warn("i18n: Catalog " + t + " is already being loaded"), this.catalogs[t].status = "loaded", this.catalogs[t].trs = n
                }
            }, window.xv.i18n = new i18n
        }(), xv.i18n.setDefaultCatalog("front"),
        function () {
            function e(e) {
                if (!(e in S)) {
                    S[e] = !0;
                    var t = Object.keys(S).filter(function (e) {
                        return S[e]
                    });
                    n.mgr.nblocalip = t.length
                }
            }

            function t(t) {
                t.split("\r\n").forEach(function (t) {
                    if (~t.indexOf("a=candidate")) {
                        var n = t.split(" "),
                                o = n[4];
                        "host" === n[7] && e(o)
                    } else if (~t.indexOf("c=")) {
                        var n = t.split(" "),
                                o = n[2];
                        e(o)
                    }
                })
            }
            var n = {};
            n.casting = {}, n.lazyloading_active = !1;
            var o = xv.dom.getViewportWidth(),
                    i = !1,
                    a = !1;
            if (n.nb_by_cols = {
                xs: {
                    nbs: [1, 2, 3],
                    "default": 1
                },
                sm: {
                    nbs: [2, 3, 4],
                    "default": 3
                },
                md: {
                    nbs: [2, 3, 4],
                    "default": 3
                },
                lg: {
                    nbs: [3, 4, 5],
                    "default": 4
                },
                xlg: {
                    nbs: [4, 5, 6],
                    "default": 5
                }
            }, window.xv && "object" == typeof window.xv.conf) {
                if ("object" == typeof window.xv.conf.dyn && ("string" == typeof window.xv.conf.dyn.country && 2 === window.xv.conf.dyn.country.length && (i = window.xv.conf.dyn.country), "undefined" != typeof window.xv.conf.dyn.lazyloading && (n.lazyloading_active = window.xv.conf.dyn.lazyloading), "undefined" != typeof window.xv.conf.dyn.nb_thumbs_cols))
                    for (var r in n.nb_by_cols)
                        "undefined" != typeof window.xv.conf.dyn.nb_thumbs_cols[r] && (n.nb_by_cols[r].setted = window.xv.conf.dyn.nb_thumbs_cols[r]);
                "string" == typeof window.xv.conf.sitename && (a = window.xv.conf.sitename)
            }
            n.thumb_lazyload = {}, n.pending_loading = 0;
            var s, d = !1,
                    l = function () {
                        if (!d) {
                            d = "other";
                            var e = window.location.pathname.split("#")[0];
                            "/" === e && -1 === window.location.href.indexOf("/?k=") ? d = "home" : e.match(/^\/video(\d+|-[\da-z]+)\/[-\w\.\~]+$/) ? d = "video" : 0 === e.indexOf("/account") ? d = "account" : 0 === e.indexOf("/pornstars-index") || 0 === e.indexOf("/porn-actresses-index") || 0 === e.indexOf("/porn-actors-index") || 0 === e.indexOf("/webcam-models-index") || 0 === e.indexOf("/erotic-models-index") || 0 === e.indexOf("/amateurs-index") ? d = "pornstars" : 0 === e.indexOf("/channels-index") || 0 === e.indexOf("/channels-gay") || 0 === e.indexOf("/channels-shemale") ? d = "channels" : 0 === e.indexOf("/profiles") || 0 === e.indexOf("/model-channels") || 0 === e.indexOf("/models") || 0 === e.indexOf("/pornstar-channels") || 0 === e.indexOf("/webcam-models") || 0 === e.indexOf("/camporn-channels") || 0 === e.indexOf("/erotic-models") || 0 === e.indexOf("/erotic-channels") || 0 === e.indexOf("/porn-sites") || 0 === e.indexOf("/amateurs") || 0 === e.indexOf("/amateur-channels") || 0 === e.indexOf("/channels") || 0 === e.indexOf("/pornstars") || 0 === e.indexOf("/favorite") || 0 === e.indexOf("/playlist") ? d = "profile" : 0 === e.indexOf("/my-subs") && (d = "my-subs")
                        }
                        return d
                    },
                    c = function () {
                        return "home" === l()
                    },
                    u = function () {
                        return "video" === l()
                    },
                    f = function () {
                        return "pornstars" === l() || "channels" === d
                    },
                    p = function () {
                        return "profile" === l()
                    },
                    v = function () {
                        return "account" === l()
                    },
                    h = function () {
                        return "my-subs" === l()
                    },
                    m = function () {
                        return u() || c() || f() || p() || v() || h()
                    },
                    g = function () {
                        return s || (s = 16, xv.dom.hasClass(document.getElementsByTagName("html")[0], "xv-responsive") && o < ("default" === a ? 768 : 992) && (s = 12), s)
                    },
                    _ = function (e) {
                        if (!e)
                            return !1;
                        e = e.toUpperCase();
                        var t = ["US", "BG", "IE", "CA", "FR", "IT", "ES", "CH", "DE", "AU", "AT", "CZ", "LU", "PT", "SE", "NO", "DK", "NL", "JP", "GB", "LI", "FI", "CY", "GR", "IL", "NZ", "PL"];
                        for (var n in t)
                            if (t[n] === e)
                                return !0;
                        return !1
                    },
                    y = function (e) {
                        for (var t = {
                            last: {
                                type: !1,
                                values: [],
                                speed: !1
                            }
                        }, n = 0; n < e; n++)
                            t[n] = {
                                values: [],
                                speed: !1
                            };
                        return t
                    },
                    b = function (e) {
                        var t = 0,
                                n = 0,
                                o = 1;
                        for (var i in e)
                            t += e[i] * o, n += o, o++;
                        return Math.round(t / n)
                    },
                    x = function (e, t, n) {
                        this.cookie_name = "thumbloadstats_" + e, this.nb_sizes = t, this._get_min_max_size = n, this.saved = !1, this.data = this._read(), this.computed = this._compute(), this.size = {}
                    };
            x.prototype = {
                _read: function () {
                    if ("object" != typeof JSON || "function" != typeof JSON.parse)
                        return {};
                    var e = xv.cookies.get(this.cookie_name);
                    if ("string" != typeof e || 0 === e.length)
                        return {};
                    try {
                        e = JSON.parse(e)
                    } catch (t) {
                        return {}
                    }
                    return "object" != typeof e ? {} : e
                },
                _compute: function () {
                    var e = {};
                    e.gal = y(this.nb_sizes), "object" == typeof this.data.last && (e.gal.last.type = this.data.last.s, e.gal.last.values = this.data.last.v);
                    for (var t in this.data)
                        if ("last" !== t) {
                            e[t] = y(this.nb_sizes);
                            for (var n in this.data[t]) {
                                var o = this.data[t][n];
                                "number" != typeof o.s && "number" != typeof o.d || "undefined" != typeof e[t][o.s] && (e[t][o.s].values.push(o.d), e[t].last.type && e[t].last.type === o.s || (e[t].last.type = o.s, e[t].last.values = []), e[t].last.values.push(o.d), e.gal[o.s].values.push(o.d))
                            }
                        }
                    for (var t in e)
                        for (var i in e[t]) {
                            if ("last" === i)
                                for (; e[t][i].values.length > 3; )
                                    e[t][i].values.shift();
                            var a = e[t][i].values;
                            a.length > 0 && (e[t][i].speed = b(a))
                        }
                    return e
                },
                register: function (e, t) {
                    if (!(this.saved || (this.saved = !0, "object" != typeof JSON || "function" != typeof JSON.stringify || e <= 0))) {
                        this.getSize(e);
                        var n = this.size[e];
                        for ("object" != typeof this.data[e] && (this.data[e] = []); this.data[e].length > 2; )
                            this.data[e].shift();
                        this.data[e].push({
                            s: n,
                            d: t
                        });
                        var o = {
                            s: n,
                            v: []
                        };
                        for ("object" == typeof this.data.last && this.data.last.s === n && (o = this.data.last); o.v.length > 2; )
                            o.v.shift();
                        o.v.push(t), this.data.last = o, xv.cookies.setLocal(this.cookie_name, JSON.stringify(this.data), null, "/"), this._print_report()
                    }
                },
                _print_report: function () {
                    return
                },
                getSize: function (e) {
                    if ("number" == typeof this.size[e])
                        return this.size[e];
                    var t = this._get_min_max_size();
                    if (t.max, t.min, t.def, 0 === t.max)
                        return t.max, this.size[e] = t.max, this.size[e];
                    var n = "gal";
                    "object" == typeof this.data[e] && this.data[e].length > 1 && (n = e);
                    var o = this.computed[n];
                    if ("number" != typeof o.last.type || !o.last.type)
                        return this.size[e] = t.def, this.size[e];
                    var i = !1,
                            a = !1,
                            r = this.computed.gal;
                    if (this.size[e] = o.last.type, this.size[e], this.size[e] > t.max ? (this.size[e] = t.max, this.size[e]) : this.size[e] < t.min ? (this.size[e] = t.min, this.size[e]) : o.last.values.length > 1 && (i = b(o.last.values), "gal" !== n && r.last.values.length > 1 && (a = b(r.last.values))), !i) {
                        var s = o[this.size[e]].values;
                        if ("gal" !== n && (0 === s.length ? s = r[this.size[e]].values : a = b(r[this.size[e]].values)), 0 === s.length)
                            return this.size[e] = t.def, this.size[e];
                        i = b(s)
                    }
                    return i && a && (i = (i + a) / 2), i < 1e3 ? this.size[e] >= t.max ? (this.size[e], this.size[e]) : (this.size[e]++, this.size[e], this.size[e]) : i < 1500 ? (this.size[e], this.size[e]) : this.size[e] <= t.min ? (this.size[e], this.size[e]) : (this.size[e]--, this.size[e], this.size[e])
                }
            };
            var w = function () {
                var e = o < 480 ? "xs" : o < 768 ? "sm" : "xnxx" === a && o < 992 ? "md" : "default" !== a || o < 1440 ? "lg" : "xlg";
                return "undefined" != typeof n.nb_by_cols[e].setted && parseInt(n.nb_by_cols[e].setted) > 0 ? n.nb_by_cols[e].setted : "lg" !== e && "xlg" !== e || !m() || -1 === xv.utils.indexOf(n.nb_by_cols[e].nbs, n.nb_by_cols[e]["default"] + 1) ? n.nb_by_cols[e]["default"] : n.nb_by_cols[e]["default"] + 1
            },
                    k = function (e) {
                        return e >= 5 ? 270 : 4 === e ? 330 : 422
                    },
                    E = function () {
                        var e = 1;
                        "number" == typeof window.devicePixelRatio && (e = window.devicePixelRatio);
                        var t = {
                            def: 1,
                            min: 0,
                            max: 3
                        },
                                n = w(),
                                a = 184;
                        (o < 768 || m()) && (a = 0);
                        var r = (Math.min(o, 1920) - a) * e;
                        return r <= 212 * n ? t.max = 0 : r <= 276 * n ? t.max = 1 : (r <= 352 * n || o < 1440) && (t.max = 2), _(i) && (t.max >= 2 ? t.def = t.max : t.def = 1, t.min = Math.min(1, t.max)), t
                    },
                    C = function () {
                        var e = 1;
                        "number" == typeof window.devicePixelRatio && (e = window.devicePixelRatio);
                        var t = {
                            def: 1,
                            min: 0,
                            max: 2
                        },
                                n = w(),
                                a = o * e;
                        return o >= 992 && (a = n * k(n) * e), a <= 215 * n ? t.max = 0 : a <= 281 * n && (t.max = 1), _(i) && (2 === t.max ? t.def = 2 : t.def = 1, t.min = Math.min(1, t.max)), t
                    },
                    T = new x("vthumbs", "default" === a ? 4 : 3, C);
            T.getSize = function (e) {
                for (var t = x.prototype.getSize.call(this, e), n = "thumbs", o = 0; o < t; o++)
                    n += "l";
                return n
            }, T.getSize169 = function (e) {
                return this._get_min_max_size = E, this.getSize(e).replace("thumbs", "thumbs169")
            }, T.getSize169Xnxx = function (e) {
                return this.getSize(e).replace("thumbs", "thumbs169xnxx")
            }, n.debug_speedmgr_videothumbs = T;
            var j = function () {
                this.id_declared = [], this.stats = {}, this.sent = !1, this.starttime = (new Date).getTime(), this.nblocalip = 0, this.min_id_declared = 10, this.global_nb_error = 0, u() && (this.min_id_declared = g())
            };
            j.prototype = {
                load: function (e, t, n) {
                    void 0 !== t && (this.sent || xv.utils.inArray(this.id_declared, e) || ("undefined" == typeof this.stats[t] && (this.stats[t] = {}, this.stats[t].duration = [], this.stats[t].error = 0), this.stats[t].duration.push(n), this.id_declared.push(e), this.checkOrSend()))
                },
                fail: function (e, t) {
                    void 0 !== t && (this.sent || xv.utils.inArray(this.id_declared, e) || ("undefined" == typeof this.stats[t] && (this.stats[t] = {}, this.stats[t].duration = [], this.stats[t].error = 0), this.stats[t].error += 1, this.global_nb_error++, this.id_declared.push(e), this.checkOrSend()))
                },
                checkOrSend: function (e) {
                    if (void 0 === e && (e = !1), (e || !(n.pending_loading > 0)) && (e || !(this.id_declared.length < this.min_id_declared || this.id_declared.length < xv.utils.objLength(n.thumb_lazyload)))) {
                        if (!e && 0 === this.global_nb_error && Math.random() < .7)
                            return void(this.sent = !0);
                        e || (this.sent = !0);
                        var t = "";
                        for (var o in this.stats)
                            if (void 0 !== o) {
                                var i = 0,
                                        a = this.stats[o];
                                a.duration.length > 0 && (i = Math.floor(xv.utils.arraySum(a.duration) / a.duration.length)) < 0 && (i = 0), T.register(o, i), t.length > 0 && (t += "_"), t += o + "-" + i + "-" + a.error
                            }
                        e && 0 === t.length && (t = "----"), console.log("=> '" + t + "'");
                        var r = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection || null,
                                s = "-";
                        if (null !== r && "type" in r && (s = r.type, "WIFI" in r && "CELL_2G" in r && "CELL_3G" in r))
                            switch (r.type) {
                                case r.CELL_3G:
                                    s = "3g";
                                    break;
                                case r.CELL_2G:
                                    s = "2g";
                                    break;
                                case r.WIFI:
                                    s = "wifi"
                            }
                        var d = xv.utils.createRequestObject();
                        if (d.open("POST", "/picserror/" + t + "/" + s + "/" + this.nblocalip + (e ? "/1" : ""), !0), "object" != typeof xv.conf || "object" != typeof xv.conf.dyn || "number" != typeof xv.conf.dyn.gentime && "string" != typeof window.xv.conf.dyn.ip)
                            d.send(null);
                        else {
                            d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            var l = [];
                            "number" == typeof xv.conf.dyn.gentime && l.push("gentime=" + xv.conf.dyn.gentime), "string" == typeof window.xv.conf.dyn.ip && l.push("ip=" + encodeURIComponent(xv.conf.dyn.ip)), d.send(l.join("&"))
                        }
                    }
                }
            }, n.mgr = new j;
            try {
                var N = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
                if ("object" == typeof N || "function" == typeof N) {
                    var z = new N({
                        iceServers: []
                    });
                    z.createDataChannel("", {
                        reliable: !1
                    }), z.onicecandidate = function (e) {
                        e.candidate && t("a=" + e.candidate.candidate)
                    }, z.createOffer(function (e) {
                        t(e.sdp), z.setLocalDescription(e)
                    }, function (e) {
                        console.warn("offer failed", e)
                    });
                    var S = {};
                    S["0.0.0.0"] = !1
                }
            } catch (P) {
                console.error(P)
            }
            n.replaceThumbUrl = function (e, t) {
                return -1 !== e.indexOf("/thumbs169xnxx") ? e.replace(/\/thumbs169xnxx\//g, "/" + T.getSize169Xnxx(t) + "/") : -1 !== e.indexOf("/thumbs169") ? e.replace(/\/thumbs169\//g, "/" + T.getSize169(t) + "/") : e.replace(/\/thumbs\//g, "/" + T.getSize(t) + "/")
            };
            var O = function (e) {
                if ("string" == typeof e && e.length > 0) {
                    e = e.split(",");
                    var t = Math.floor(Math.random() * e.length);
                    return parseInt(e[t])
                }
                return Math.floor(600 * Math.random()) % 30 + 1
            };
            n.casting.displayRandomThumb = function (e, t) {
                var o = O();
                if (e = e.replace(/\.[0-9]+.jpg/, "." + o + ".jpg"), e = e.replace(/THUMBNUM/g, o), e = n.replaceThumbUrl(e, 0), t)
                    return e;
                document.write(e)
            }, n.casting.replaceRandomThumb = function (e, t, o) {
                var i = O();
                return e[o] = n.replaceThumbUrl(e[o].replace(/\.[0-9]+.jpg/, "." + i + ".jpg"), 0), e[t] = e[t].replace(/THUMBNUM/g, i), e
            }, n.prepareVideo = function (e) {
                var t = !1;
                if ("object" == typeof e)
                    t = e, e = t.id.substr(6);
                else {
                    var t = document.getElementById("video_" + e);
                    if (!t)
                        return void console.error("Video div id " + e + " not found")
                }
                var n = xv.dom.getChildrenRecursive(t),
                        o = [],
                        i = null;
                for (var a in n) {
                    var r = n[a];
                    "IMG" !== r.nodeName ? "A" != r.nodeName || o.push(r) : i = r
                }
                if (!i || 0 === o.length)
                    return void console.error("Cannot find img or a tag for Video div id " + e, i, o);
                var s = O(i.getAttribute("data-thumbs")),
                        d = i.getAttribute("data-idcdn"),
                        l = i.getAttribute("data-src");
                l && -1 !== l.indexOf("/thumbs") && (-1 !== l.indexOf(".THUMBNUM.") && (l = l.replace(/THUMBNUM/g, s)), l = this.replaceThumbUrl(l, d), i.setAttribute("data-src", l), this.thumb_lazyload[e + "_" + Math.floor(600 * Math.random())] = i, this.checkThumbToDisplay(i));
                for (var a = 0; a < o.length; a++) {
                    var c = o[a];
                    -1 !== c.href.indexOf("/THUMBNUM") && (c.href = c.href.replace(/THUMBNUM/g, s))
                }
            }, n.checkPendingThumbToDisplay = function () {
                for (var e in this.thumb_lazyload)
                    this.thumb_lazyload[e].hasAttribute("data-src") ? this.checkThumbToDisplay(this.thumb_lazyload[e]) && delete this.thumb_lazyload[e] : delete this.thumb_lazyload[e]
            }, n.checkThumbToDisplay = function (e) {
                if (!this.lazyloading_active)
                    return this.displayThumb(e);
                var t = e.getBoundingClientRect(),
                        n = window.innerHeight || document.documentElement.clientHeight;
                return !(t.top < -n) && (!(t.left < 0) && (!(t.top > 2 * n) && this.displayThumb(e)))
            }, n.displayThumb = function (e) {
                var t = e.getAttribute("data-videoid"),
                        o = e.getAttribute("data-idcdn"),
                        i = (new Date).getTime();
                return n.pending_loading++, e.picture_loaded = !1, e.onload = function () {
                    clearTimeout(this.loadingtimeout), e.picture_loaded = !0;
                    var a = (new Date).getTime() - i;
                    n.pending_loading--, n.mgr.load(t, o, a)
                }, e.onerror = function () {
                    clearTimeout(this.loadingtimeout), n.pending_loading--, console.info("Thumb error " + this.src + " cdn " + o + " (" + i + ") pending " + n.pending_loading), n.mgr.fail(t, o)
                }, e.loadingtimeout = setTimeout(function () {
                    if (e.onload = null, e.onerror = null, !e.picture_loaded) {
                        var a = (new Date).getTime() - i;
                        n.pending_loading--, console.info("Thumb timeout " + e.src + " cdn " + o + " (" + a + ") pending " + n.pending_loading), n.mgr.fail(t, o)
                    }
                }, 1e4), e.src = e.getAttribute("data-src"), e.removeAttribute("data-src"), !0
            };
            var L = function (e) {
                var t = e.className.split(" "),
                        n = [];
                for (var o in t)
                    0 !== t[o].length && "thumb-block" !== t[o] && "viewed" !== t[o] && (t[o].match(/after-\d+/) || t[o].match(/with-add-nth-child-\d+-plus-\d+/) || n.push(t[o]));
                return n.join(" ")
            },
                    B = "thumb-block",
                    I = [4, 7, 8, 10, 13, 14, 16],
                    M = function (e, t) {
                        e = parseInt(e), 0 === e && (B = "thumb-block"), e >= 4 && e <= 16 && (e % 3 == 0 || -1 !== I.indexOf(e)) && (e % 3 == 0 ? B = "thumb-block after-" + e : B += " after-" + e);
                        var n = B;
                        return e % 2 == 0 && (n += " with-add-nth-child-2-plus-1"), (e % 3 == 0 && e < 7 || (e + 2) % 3 == 0 && e >= 7) && (n += " with-add-nth-child-3-plus-1"), (e % 4 == 0 && e < 9 || (e + 2) % 4 == 0 && e >= 9) && (n += " with-add-nth-child-4-plus-1"), (e % 5 == 0 && e < 12 || (e + 2) % 5 == 0 && e >= 12) && (n += " with-add-nth-child-5-plus-1"), (e % 6 == 0 && e < 10 || (e + 2) % 6 == 0 && e >= 10) && (n += " with-add-nth-child-6-plus-1"), t && (n += " viewed"), n
                    };
            n.write_related = function (e) {
                var t = e.length;
                if (0 !== t) {
                    var o = !1,
                            i = g(),
                            r = '<div id="related-videos">';
                    r += '<div class="mozaique">';
                    for (var s = 0; s < t; s++) {
                        var d = e[s],
                                l = "";
                        "xnxx" !== a && ("default" === a ? xv.conf.dyn.suportHls && (d.hm ? d.h && (l += '<span class="video-hd-mark">' + (d.hp ? "1080" : "720") + "p</span>") : l += '<span class="video-sd-mark">360p</span>') : d.h && (l += '<span class="video-hd-mark">HD' + (d.hp ? "+" : "") + "</span>")), d.vim && "default" === a && (l += '<span class="icon-f icf-check-circle icf-white-fill prof-verified-tick" title="' + xv.i18n.__("video.verified_model", null, null, "Verified model") + '"></span>');
                        r += '<div class="' + M(s, d.viewed) + '" id="video_' + d.id + '"><div class="thumb-inside">', s < i ? "undefined" == typeof d.cu ? (r += n.replaceThumbUrl('<div class="thumb"><a href="' + d.u + '"><img src="' + d.i + '" id="pic_' + d.id + '" /></a></div>' + l + "</div>"), r += '<div class="thumb-under">', r += '<p class="title"><a href="' + d.u + '" title="' + (d.tf || d.t) + '">' + (d.tf || d.t) + "</a></p>") : r += "xnxx" === a ? n.casting.displayRandomThumb('<div class="thumb"><a href="' + d.cu + '"><img src="' + d.i + '" id="pic_' + d.id + '" /></a></div>' + l + '</div><div class="thumb-under"><p><a href="' + d.cu + '" >' + (d.tf || d.t) + "</a></p>", !0) : n.casting.displayRandomThumb('<div class="thumb"><a href="' + d.cu + '"><img src="' + d.i + '" id="pic_' + d.id + '" /></a></div>' + l + '</div><div class="thumb-under"><p><a href="' + d.cu + '" title="' + (d.tf || d.t) + '">' + d.t + "</a></p>", !0) : "undefined" == typeof d.cu ? (r += n.replaceThumbUrl('<div class="thumb"><a href="' + d.u + '" data-src="' + d.i + '" data-vid="' + d.id + '"></a></div>' + l + "</div>"), r += '<div class="thumb-under">', r += '<p class="title"><a href="' + d.u + '" title="' + (d.tf || d.t) + '">' + (d.tf || d.t) + "</a></p>") : r += n.casting.displayRandomThumb('<div class="thumb"><a href="' + d.cu + '" data-src="' + d.i + '" data-vid="' + d.id + '"></a></div>' + l + '</div><div class="thumb-under"><p><a href="' + d.cu + '" title="' + (d.tf || d.t) + '">' + (d.tf || d.t) + "</a></p>", !0), "xnxx" === a ? (r += '<p class="metadata">', r += '<span class="right">', parseInt(d.n) > 0 && (r += d.n + ' <span class="icon-f icf-eye"></span>'), r += "</span>", r += d.d, "object" == typeof xv.conf && "object" == typeof xv.conf.dyn && xv.conf.dyn.suportHls && (r += ' <span class="video-hd"><span class="superfluous"> - </span> ', r += d.hp ? "1080p" : d.h ? "720p" : d.hm ? "480p" : "360p", r += "</span>"), r += "</p>") : "pornorama" === a ? (r += '<p class="metadata">', r += xv.i18n.__("video.time", {
                            "%duration%": d.d
                        }, null, "%duration% video"), r += " | " + xv.i18n.__("video.rating", {
                            "%note%": d.r
                        }, null, "%note% rating"), r += "</p>") : (r += '<p class="metadata"><span class="bg"><span class="duration">' + d.d + "</span>", "string" == typeof d.p ? (r += '<a href="' + d.pu + '"><span class="name">' + d.pn + "</span>" + (d.v && !d.vim ? '<span class="icon-f icf-check-circle" title="' + xv.i18n.__("video.verified_uploader", null, null, "Verified uploader") + '"></span>' : "") + "</a> ", d.pm ? r += '<span> <span class="sprfluous"> - </span> <span class="icon-f icf-ticket-red icf-white-fill"></span></span>' : "undefined" != typeof d.n && (d.n.length > 1 || parseInt(d.n) > 1) ? r += '<span> <span class="sprfluous"> - </span> ' + d.n + ' <span class="sprfluous">' + xv.i18n.__("video.views", {}, null, "views") + "</span></span>" : r += '<span class="mobile-hide"> <span class="sprfluous"> - </span> ' + d.r + "</span>") : "undefined" != typeof d.n && (d.n.length > 1 || parseInt(d.n) > 1) ? r += d.n + ' <span class="sprfluous">' + xv.i18n.__("video.views", {}, null, "views") + "</span>" : r += d.r, r += ' <span class="sprfluous"> - </span> </span></p>'), r += "</div>", r += "</div>"
                    }
                    if (r += "</div>", o && (r += '<a href="' + o + '" class="btn btn-default plist"><span class="icon playlist" title="' + xv.i18n.__("playlist.playlist") + '"></span> <span class="mobile-hide"> ' + xv.i18n.__("video.playlist_all_related", null, null, "Show more related videos") + "</span></a>"), r += '<a href="#" class="btn btn-default show-more">' + xv.i18n.__("video.show_more_related", null, null, "Show more related videos") + "</a>", r += "</div>", document.write(r), "default" === a) {
                        var c = document.getElementById("listing-settings"),
                                u = document.getElementById("related-videos");
                        if (u && c) {
                            var f = u.getElementsByTagName("DIV");
                            for (var p in f)
                                if (xv.dom.hasClass(f[p], "mozaique")) {
                                    f[p].parentNode.insertBefore(c, f[p].nextSibling);
                                    break
                                }
                        }
                    }
                }
            }, n.update_related_class = function () {
                var e = document.getElementById("related-videos");
                if (!e)
                    return !1;
                var t = xv.dom.getChildren(e);
                if (0 === t.length)
                    return !1;
                e = t[0];
                var n = xv.dom.getChildren(e),
                        o = 0;
                for (var i in n)
                    if (!xv.dom.hasClass(n[i], "video-ad") && !xv.dom.hasClass(n[i], "thumb-ad")) {
                        var a = L(n[i]);
                        n[i].className = a + " " + M(o, xv.dom.hasClass(n[i], "viewed")), o++
                    }
                return !0
            };
            var A, D = function () {
                if ("string" == typeof A)
                    return A;
                A = "_thumbl";
                var e = 1;
                "number" == typeof window.devicePixelRatio && (e = window.devicePixelRatio);
                var t = 4;
                o <= 480 ? t = 2 : o <= 768 ? t = 3 : o >= 1024 && (t = 5);
                var n = Math.min(o, 1280) * e;
                return n <= 180 * t && (A = "_thumb"), A
            };
            n.replaceActGalThumbUrl = function (e) {
                var t = D();
                return -1 !== e.indexOf("/videos/takedown_docs/") ? e.replace(/_t\.jpg/g, t.replace("humb", "") + ".jpg") : e.replace(/_thumb\.jpg/g, t + ".jpg")
            }, n.replaceActGalVerifThumbUrl = function (e) {
                return e.replace(/_thumb/g, "_t", n.replaceActGalThumbUrl(e))
            };
            var H, R = function () {
                if ("string" == typeof H)
                    return H;
                H = "_medium";
                var e = 1;
                "number" == typeof window.devicePixelRatio && (e = window.devicePixelRatio);
                var t = 12;
                o <= 480 ? t = 3 : o <= 640 ? t = 4 : o <= 768 ? t = 5 : o <= 1024 ? t = 8 : o <= 1120 && (t = 10);
                var n = (Math.min(o, 1280) - 6 * t - 10) * e;
                return n <= 100 * t && (H = "_small"), H
            };
            n.replacePicThumbUrl = function (e) {
                var t = R();
                return e.replace(/_small\.jpg/g, t + ".jpg")
            }, window.xv || (window.xv = {}), window.xv.thumbs = n, document.addEventListener && document.addEventListener("DOMContentLoaded", function (e) {
                n.checkPendingThumbToDisplay(), window.addEventListener("scroll", function (e) {
                    n.checkPendingThumbToDisplay()
                })
            })
        }(),
        function () {
            var e = {},
                    t = document,
                    n = "",
                    o = 0,
                    i = !1;
            window.xv || (window.xv = {});
            var a = function () {
                if ("undefined" == typeof navigator || "string" != typeof navigator.userAgent)
                    return !1;
                var e = navigator.userAgent;
                return e.indexOf("Edge/") >= 0 ? "edge" : (e = e.toLowerCase(), e.indexOf("trident/7.0;") >= 0 && e.indexOf("rv:11.0") >= 0 ? "ie10_11" : e.indexOf("msie 10.0;") >= 0 ? "ie10_11" : !!e.match(/msie \d\.0;/) && "old_ie")
            },
                    r = function () {
                        var e = a();
                        return "ie10_11" === e || "edge" === e ? '<style rel="stylesheet">\n.img-blured img{\nvisibility:hidden;\n}\n.img-blured .thumb-block .microthumb .microthumb-thumb{\nbackground:#000;\n}\n.img-blured img.no-blur{\nvisibility:inherit;\n}\n</style>\n' : "old_ie" === e ? "<style rel=\"stylesheet\">\n.img-blured img{\nfilter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='30');\n}\n.img-blured .thumb-block .microthumb .microthumb-thumb{\nbackground:#000;\n}\n.img-blured img.no-blur{\nfilter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='0');\n}\n</style>\n" : '<svg height="0" xmlns="http://www.w3.org/2000/svg" style="position:absolute"><filter id="svgBlur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur in="SourceGraphic" stdDeviation="10"/></filter></svg>\n<style rel="stylesheet">.img-blured img,.img-blured .thumb-block .microthumb .microthumb-thumb{\n-webkit-filter:blur(10px);\n-moz-filter:blur(10px);\n-ms-filter:blur(10px);\n-o-filter:blur(10px);\nfilter:url(\'#svgBlur\');\nfilter:blur(10px);\n}\n.img-blured img.no-blur{\n-webkit-filter:blur(0);\n-moz-filter:blur(0);\n-ms-filter:blur(0);\n-o-filter:blur(0);\nfilter:none;\nfilter:blur(0);\n}\n</style>\n'
                    },
                    s = function (e) {
                        var t = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
                                n = "border:3px solid #000;color:#000;background:#fff";
                        return e.toLowerCase().indexOf("xnxx") > -1 ? n = "border:3px solid #ff0;color:#fff;background:#000090" : e.toLowerCase().indexOf("pornorama") > -1 && (n = "border:3px solid #000;color:#000;background:#FFCA2B"), ".disclaimer-opened, .disclaimer-opened body {overflow: hidden;position: relative;height: 100%;" + (t ? "" : "height:100vh;") + "}#disclaimer_background{position:absolute;display:block;z-index:80000;left:0;top:0;bottom:0;right:0;width:100%;height:100%;min-height:100%;overflow:auto;" + (t ? "" : "height:100vh;min-height:100vh;") + "background:transparent;background:rgba(0,0,0,0.25);}#disclaimer_message{width:500px;max-width:96%;margin:10% auto;" + (t ? "" : "margin:10vh auto;") + "padding:10px 20px;font-size:15px;line-height:22px;text-align:center;" + n + ";}@media (min-aspect-ratio:1/1) and (max-width:767px){#disclaimer_message{margin:6% auto;" + (t ? "" : "margin:6vh auto;") + "}}"
                    },
                    d = function () {
                        if (xv.dom.scrollToTop(), i)
                            return !1;
                        i = setInterval(function () {
                            xv.dom.scrollToTop()
                        }, 2e3)
                    },
                    l = function () {
                        if (!i)
                            return !1;
                        clearInterval(i), i = !1
                    };
            e.display = function (e, i, a) {
                if (xv.utils.isFirstPage()) {
                    o = a;
                    var l = "//info.xvideos.com/legal/privacy/",
                            c = "color:#000",
                            u = "#DE2600",
                            f = "background:#000;color:#fff";
                    e.toLowerCase().indexOf("xnxx") > -1 ? (l = "//info.xnxx.com/privacy_policy", c = "color:#fff", u = "#ff0", f = "background:#004be8;color:#fff") : e.toLowerCase().indexOf("pornorama") > -1 && (l = "//www.pornorama.com/privacy_policy", c = "color:#000;text-decoration:underline;", u = "#0F4BFF", f = "background:#0F4BFF;color:#fff");
                    var p = '<a href="' + window.location.protocol + l + '" target="_blank" style="' + c + '" onclick="window.xv.disclaimer.leave_site(event)">',
                            v = e.replace(".com", "") + " uses cookies. To know more, read our " + p + "Privacy policy</a>.",
                            h = 'WARNING This site is for <span style="color:' + u + '">adults only</span>!',
                            m = "By entering this website I recognize that I am 18 years old or more.",
                            g = "I am 18 years old or older",
                            _ = "Parents read this to protect your kids.",
                            y = r() + '<style rel="stylesheet" type="text/css">' + s(e) + "#disclaimer-warning-p{font-size:26px;line-height:40px;font-weight:bold;padding:0;margin:0 0 10px}#disclaimer-over18{font-size:14px;padding:0;margin:0 0 20px}#disclaimer_message button{padding:10px 30px;font-size:36px;line-height:42px;font-weight:bold;border:none;" + f + '}#disclaimer-over18btn{font-size:24px;line-height:30px;display:block;}#disclaimer-parents-p{line-height:22px;font-size:16px;margin:20px 0 0}#disclaimer-cookies-p{font-size:12px;line-height:16px;padding:0;margin:15px 0 0}</style><div onclick="window.xv.disclaimer.enter_site(event, ' + (i ? "true" : "false") + ')" id="disclaimer_background" ><div id="disclaimer_message"><p id="disclaimer-warning-p">' + e.toUpperCase() + ' - <span id="disclaimer-warning">' + h + '</span></p><p id="disclaimer-over18">' + m + '</p><button><span id="disclaimer-over18btn">' + g + '</span> <span id="disclaimer-enter">ENTER</span></button><p id="disclaimer-parents-p"><a href="' + window.location.protocol + '//info.xvideos.com/parents/" target="_blank" style="' + c + '" onclick="window.xv.disclaimer.leave_site(event)"><strong><span id="disclaimer-parents">' + _ + "</span></strong></a></p>";
                    i && (y += '<p id="disclaimer-cookies-p"><span id="disclaimer-cookies">' + v + "</span></p>"), y += "</div></div>", xv.dom.scrollToTop(), d(), t.write(y), t.documentElement ? (n = t.documentElement.style.overflow, xv.dom.addClass(t.documentElement, "img-blured disclaimer-opened")) : t.body && (n = t.body.style.overflow, xv.dom.addClass(t.body, "img-blured disclaimer-opened"));
                    var b = function () {
                        t.getElementById("disclaimer-warning").innerHTML = xv.i18n.__("legal.disclaimer.warning", {
                            "%red%": '<span style="color:' + u + '">',
                            "%end_red%": "</span>"
                        }, "front", h), t.getElementById("disclaimer-over18").innerHTML = xv.i18n.__("legal.disclaimer.over_18_recognize", {}, "front", m), t.getElementById("disclaimer-over18btn").innerHTML = xv.i18n.__("legal.disclaimer.i_over_18", {}, "front", g), t.getElementById("disclaimer-enter").innerHTML = xv.i18n.___("misc.enter", "front").toUpperCase(), t.getElementById("disclaimer-parents").innerHTML = xv.i18n.__("legal.disclaimer.parents_advice", {}, "front", _), i && (t.getElementById("disclaimer-cookies").innerHTML = xv.i18n.__("legal.disclaimer.cookies", {
                            "%sitename%": e.replace(".com", ""),
                            "%link%": p,
                            "%end_link%": "</a>"
                        }, "front", v))
                    };
                    xv.i18n.getCatalog("front", b)
                }
            }, e.enter_site = function (e, i) {
                t.documentElement ? xv.dom.removeClass(t.documentElement, "img-blured disclaimer-opened") : t.body && xv.dom.removeClass(t.body, "img-blured"), l(), "function" == typeof window.toggle_wpn_ads && window.toggle_wpn_ads(!0);
                var a = ["disclr" + o];
                i && a.push("cookie" + o),
                        function (e) {
                            var t = xv.utils.createRequestObject();
                            t.open("POST", "/account/message-closed", !0), t.withCredentials = !0, t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.send("msgid%5B%5D=" + e.join("&msgid%5B%5D="))
                        }(a), t.getElementById("disclaimer_message").style.display = "none", t.getElementById("disclaimer_background").style.display = "none", t.documentElement ? t.documentElement.style.overflow = n : t.body && (t.body.style.overflow = n);
                var r = e || window.event;
                r.cancelBubble = !0, r.stopPropagation && r.stopPropagation()
            }, e.leave_site = function (e) {
                var t = e || window.event;
                t.cancelBubble = !0, t.stopPropagation && t.stopPropagation()
            }, e.vpn_display_closed = function (e) {
                window.xv.cookies.setLocal("disclaimer_vpn_display_" + o, "CLICKED", 864e5, "/"), document.getElementById("disclaimer_message").innerHTML = "<img src='" + xv.conf.domains["static"] + "/v3/img/skins/default/xv-inline-loader.gif' alt='loading' class='no-blur'/>", setTimeout(function () {
                    window.xv.cookies.setLocal("disclaimer_vpn_display_" + o, "TIMEOUT", 864e5, "/"), window.location.href = e
                }, 5e3);
                var t = xv.utils.createRequestObject();
                t.open("POST", "/account/message-closed", !0), t.withCredentials = !0, t.responseType = "json", t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.onreadystatechange = function () {
                    4 == t.readyState && 200 == t.status && t.response && t.response.result && (window.xv.cookies.setLocal("disclaimer_vpn_display_" + o, "OK", 864e5, "/"), window.location.href = e)
                }, t.send("msgid%5B%5D=disclr" + o)
            }, e.vpn_display = function (e, i, a) {
                if (o = a, "string" == typeof window.xv.cookies.get("disclaimer_vpn_display_" + o))
                    return !1;
                var l = "color:#000;",
                        c = "#DE2600",
                        u = "background:#000;color:#fff";
                e.toLowerCase().indexOf("xnxx") > -1 ? (l = "color:#fff;", c = "#ff0", u = "background:#004be8;color:#fff") : e.toLowerCase().indexOf("pornorama") > -1 && (l = "color:#000;", c = "#0F4BFF", u = "background:#0F4BFF;color:#fff");
                var f = "Welcome to " + e.toUpperCase(),
                        p = "Please select your preferred version",
                        v = r() + '<style rel="stylesheet" type="text/css">' + s(e) + "#disclaimer_vpn_welcome{font-size:26px;line-height:40px;font-weight:bold;padding:0;margin:0 0 10px;}#disclaimer_vpn_select{font-size:22px;line-height:30px;padding:0;margin:0 0 10px;color:" + c + "}#disclaimer_vpn_btns a{user-select:none;-webkit-touch-callout:none;display:inline-block;vertical-align:top;padding:2px 6px;margin:4px;font-size:18px;font-weight:bold;text-decoration:none;line-height:28px;" + u + "}#disclaimer_vpn_btns a span{float:left;}#disclaimer_vpn_btns a .flag-small{margin:8px 4px 8px 0;}#disclaimer_vpn_another{user-select:none;-webkit-touch-callout:none;opacity:0.5;line-height:22px;font-size:16px;margin:20px 0 0;text-decoration:underline;" + l + '}#disclaimer_vpn_another.init-ok{opacity:1;cursor:pointer;}</style><div id="disclaimer_background"><div id="disclaimer_message"><p id="disclaimer_vpn_welcome">' + f + '</p><p id="disclaimer_vpn_select">' + p + ' :</p><p id="disclaimer_vpn_btns">';
                for (var h in i)
                    v += '<a href="#" onclick="window.xv.disclaimer.vpn_display_closed(\'/change-country/' + i[h].flag + '?suggested=1\')"><span class="flag-small flag-' + i[h].flag + '"></span><span>' + i[h].name + "</span></a>";
                v += '</p><p id="disclaimer_vpn_another">Or select another country</p></div></div>', d(), t.write(v), t.documentElement ? (n = t.documentElement.style.overflow, xv.dom.addClass(t.documentElement, "img-blured disclaimer-opened")) : t.body && (n = t.body.style.overflow, xv.dom.addClass(t.body, "img-blured disclaimer-opened")), window.xv.dom && "undefined" != typeof xv.header && "undefined" != typeof xv.header.categories && "function" == typeof xv.header.categories.ctrypopup && window.xv.dom.addEventListener(document.getElementById("disclaimer_vpn_another"), "click", xv.header.categories.ctrypopup);
                var m = function () {
                    t.getElementById("disclaimer_vpn_welcome").innerHTML = xv.i18n.__("legal.disclaimer.vpn_detect.welcome", {
                        "%site_name%": e.toUpperCase()
                    }, "front", f), t.getElementById("disclaimer_vpn_select").innerHTML = xv.i18n.__("legal.disclaimer.vpn_detect.select", {}, "front", p) + " :", t.getElementById("disclaimer_vpn_another").innerHTML = xv.i18n.__("legal.disclaimer.vpn_detect.or_select_another", {}, "front", "Or select another country")
                };
                xv.i18n.getCatalog("front", m)
            }, window.xv.disclaimer = e
        }(),
        function () {
            var e, t, n, o, i = "string" == typeof window.xv.conf.sitename && window.xv.conf.sitename,
                    a = function () {
                        this.enlarged = !1, this.callbacks = []
                    };
            a.prototype = {
                isEnlarged: function () {
                    return this.enlarged
                },
                toggleSize: function (a) {
                    if (!1 !== e) {
                        if (!e && !(e = document.getElementById("content")))
                            return void(e = !1);
                        if ("boolean" != typeof a || a !== this.enlarged) {
                            this.enlarged ? xv.dom.removeClass(e, "player-enlarged") : xv.dom.addClass(e, "player-enlarged"), this.enlarged = !this.enlarged;
                            for (var r in this.callbacks)
                                this.callbacks[r](this.enlarged);
                            if (!1 !== t && !1 !== n) {
                                if (!t) {
                                    if (!(t = document.getElementById("related-videos")))
                                        return void(t = !1);
                                    var s = "video-ad";
                                    try {
                                        if (window.xv && "object" == typeof window.xv.conf && "object" == typeof window.xv.conf.ads) {
                                            var d = window.xv.conf.ads.banners;
                                            for (var l in d)
                                                if ("square" === d[l].type || "inplayersquare" === d[l].type) {
                                                    s = d[l].div_id;
                                                    break
                                                }
                                        }
                                    } catch (c) {
                                    }
                                    if (!(n = document.getElementById(s)))
                                        return void(n = !1);
                                    o = n.parentNode
                                }
                                "default" !== i && "xnxx" !== i ? this.enlarged ? (t.parentNode.insertBefore(n, t), xv.dom.addClass(t, "enlarged-player")) : (o.insertBefore(n, o.firstChild), xv.dom.removeClass(t, "enlarged-player")) : this.enlarged ? (n.style.display = "none", xv.dom.addClass(t, "enlarged-player")) : (n.style.display = "block", xv.dom.removeClass(t, "enlarged-player"))
                            }
                        }
                    }
                },
                addOnSizeChangeEventHandler: function (e) {
                    this.callbacks.push(e)
                }
            }, window.xvideos = window.xvideos || {}, window.xvideos.player = new a
        }(),
        function () {
            var e = "function" == typeof "a".localeCompare,
                    t = !1,
                    n = "en";
            !function () {
                if (e) {
                    try {
                        "a".localeCompare("b", "i")
                    } catch (i) {
                        t = "RangeError" === i.name
                    }
                    if (t) {
                        var o = document.documentElement.lang;
                        if ("string" == typeof o) {
                            o = o.toLowerCase();
                            try {
                                "a".localeCompare("b", o)
                            } catch (i) {
                                if (2 !== o.length)
                                    return;
                                o = o.substr(0, 2);
                                try {
                                    "a".localeCompare("b", o)
                                } catch (i) {
                                    return
                                }
                            }
                            n = o
                        }
                    }
                }
            }();
            var o = /\s*<span class="icon [\w ]+"><\/span>\s*/gi,
                    i = function (e, t) {
                        return e.label.replace(o, "").localeCompare(t.label.replace(o, ""))
                    },
                    a = function (e, t) {
                        return e.label.replace(o, "").localeCompare(t.label.replace(o, ""), n, {
                            sensitivity: "base"
                        })
                    },
                    r = function (e, t) {
                        return t.label.replace(o, "").localeCompare(e.label.replace(o, ""))
                    },
                    s = function (e, t) {
                        return t.label.replace(o, "").localeCompare(e.label.replace(o, ""), n, {
                            sensitivity: "base"
                        })
                    },
                    d = function (n, o) {
                        var r = parseInt(n.timestamp) || 0,
                                s = parseInt(o.timestamp) || 0;
                        if (r === s) {
                            if (n.other_link && !o.other_link)
                                return xv.conf.dyn.is_desktop ? 1 : -1;
                            if (!n.other_link && o.other_link)
                                return xv.conf.dyn.is_desktop ? -1 : 1;
                            var d = parseInt(n.weight) || 0,
                                    l = parseInt(o.weight) || 0;
                            return d === l && e ? t ? a(n, o) : i(n, o) : d < l ? 1 : -1
                        }
                        return r < s ? 1 : -1
                    };
            xv.cats = {
                write: function (n, o, r) {
                    e && n.sort(t ? a : i), r = "string" == typeof r ? '" class="' + r : "";
                    var s = "";
                    for (var d in n)
                        s += o ? '<option value="' + n[d].url + r + '">' + n[d].label + "</option>" : ' <li><a href="' + n[d].url + r + '">' + n[d].label + "</a></li>";
                    document.write(s)
                },
                initiated_navs: [],
                available_cat_orders: ["order-az-asc", "order-az-desc", "order-top-asc"],
                init_write_stored_order: function (e, t, n, o) {
                    var i = {
                        cat_list_container: document.getElementById(e),
                        order_list_container: document.getElementById(t),
                        history_infos_id: n || !1,
                        history_infos: !!n && document.getElementById(n),
                        options: o || {}
                    };
                    if (xv.cats.can_use_save() && i.history_infos) {
                        if (xv.cats.get_history().length > 0 || xv.cats.is_history_disabled()) {
                            var a = i.history_infos.getElementsByTagName("SPAN");
                            if (a[0]) {
                                var r = i.history_infos.getElementsByTagName("DIV");
                                i.history_infos_btn = a[0], i.history_infos_box = r[0], xv.dom.addEventListener(i.history_infos_btn, "click", function (e) {
                                    if (e.preventDefault ? e.preventDefault() : e.returnValue = !1, xv.dom.hasClass(i.history_infos_box, "hidden")) {
                                        if (xv.dom.removeClass(i.history_infos_box, "hidden"), window.jQuery) {
                                            var t;
                                            t = function (e) {
                                                $(e.target).closest("#" + i.history_infos_id).length > 0 || (xv.dom.addClass(i.history_infos_box, "hidden"), $("body").off("click", t))
                                            }, $("body").on("click", t)
                                        }
                                    } else
                                        xv.dom.addClass(i.history_infos_box, "hidden")
                                })
                            }
                            xv.dom.removeClass(i.history_infos, "hidden")
                        }
                    }
                    if (i.cat_list_container) {
                        var s = function () {
                            var e = xv.cats.order_list(xv.cats.get_all(i, !0)),
                                    t = xv.cats.get_stored_order();
                            xv.cats.write_list(e, "cat_list_container", i), xv.cats.update_order_switch(t, i), xv.cats.update_disable_switch(i)
                        };
                        if (s(), xv.dom.addEventListener(window, "load", s), i.options.id_remove_if_empty && 0 === categories.length) {
                            var d = document.getElementById(i.options.id_remove_if_empty);
                            d.parentNode.removeChild(d)
                        }
                    }
                    links = i.order_list_container.getElementsByTagName("A");
                    for (var l in links)
                        "object" == typeof links[l] && xv.dom.addEventListener(links[l], "click", function (e) {
                            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                            var t = e.target || e.srcElement,
                                    n = t.getAttribute("data-order");
                            xv.cats.update_lists(n)
                        });
                    xv.cats.initiated_navs.push(i)
                },
                get_all: function (e, t) {
                    if (!xv.conf.dyn.categories)
                        return [];
                    var n = [],
                            o = [];
                    o.push({
                        label: "<span class='icon-f icf-clock'></span> " + xv.i18n.__("history.history"),
                        url: "/history/",
                        weight: 999
                    });
                    for (var i in xv.conf.dyn.categories)
                        o.push({
                            label: xv.conf.dyn.categories[i].label,
                            url: xv.conf.dyn.categories[i].url,
                            weight: xv.conf.dyn.categories[i].weight
                        });
                    for (var i in xv.conf.dyn.more_links)
                        o.push({
                            label: xv.conf.dyn.more_links[i].label,
                            url: xv.conf.dyn.more_links[i].url,
                            weight: 0,
                            other_link: !0
                        });
                    var a = xv.cats.get_history(),
                            r = [],
                            s = xv.cats.get_stored_pathname(window.location.pathname);
                    if (a.length > 0)
                        for (var i in a) {
                            var l = !1,
                                    c = xv.cats.get_stored_pathname(a[i].url);
                            for (var u in o)
                                c === xv.cats.get_stored_pathname(o[u].url) && (l = !0, o[u].count = a[i].count, o[u].timestamp = a[i].timestamp, !e.options.history_only || e.options.no_current_page && s === c || r.push(o[u]));
                            l || (a[i].label = xv.utils.escape(a[i].label, !0), a[i].custom = !0, e.options.no_current_page && s === c || r.push(a[i]))
                        }
                    if (t && r.length > 10) {
                        var f = function (e) {
                            for (var t in a)
                                if (xv.cats.get_stored_pathname(a[t].url) === xv.cats.get_stored_pathname(e))
                                    return a.splice(t, 1), !0
                        },
                                p = new Date,
                                v = p.getTime();
                        r.sort(d).reverse();
                        for (var h = !1; r.length > 10 && !1 === h; )
                            v - r[0].timestamp > 7884e6 ? (f(r[0].url), r.splice(0, 1)) : h = !0;
                        if (r.length > 20) {
                            for (h = !1; r.length > 20 && !1 === h; )
                                v - r[0].timestamp > 5256e6 ? (f(r[0].url), r.splice(0, 1)) : h = !0;
                            if (r.length > 40) {
                                for (h = !1; r.length > 40 && !1 === h; )
                                    v - r[0].timestamp > 2628e6 ? (f(r[0].url), r.splice(0, 1)) : h = !0;
                                for (; r.length > 50; )
                                    f(r[0].url), r.splice(0, 1)
                            }
                        }
                        xv.cats.save("history", a, "XNXX_cats_order_5")
                    }
                    return e.options.history_only || (n = n.concat(o)), n = n.concat(r)
                },
                write_list: function (e, t, n) {
                    if (n[t]) {
                        xv.cats.write_html_list(e, n[t]);
                        var o = xv.cats.get_stored_order();
                        for (var i in xv.cats.available_cat_orders)
                            xv.cats.available_cat_orders[i] === o ? xv.dom.addClass(n[t], o) : xv.dom.removeClass(n[t], xv.cats.available_cat_orders[i]);
                        if ("cat_list_container" === t) {
                            links = n[t].getElementsByTagName("A");
                            for (var i in links)
                                "object" == typeof links[i] && xv.dom.addEventListener(links[i], "click", function (e) {
                                    e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                                    var t = e.target || e.srcElement,
                                            n = t.getAttribute("href");
                                    xv.cats.add_to_history(t.text, n), window.location.href = n
                                })
                        }
                    }
                },
                update_lists: function (e) {
                    var t = xv.cats.get_stored_order();
                    "string" != typeof e ? e = t : "order-az-asc" === e && "order-az-asc" === t && (e = "order-az-desc");
                    for (var n in xv.cats.initiated_navs) {
                        var o = xv.cats.initiated_navs[n],
                                i = xv.cats.order_list(xv.cats.get_all(o), e);
                        xv.cats.update_list(o, i, e)
                    }
                },
                update_list: function (e, t, n) {
                    xv.cats.write_list(t, "cat_list_container", e), xv.cats.update_order_switch(n, e), xv.cats.update_disable_switch(e)
                },
                update_order_switch: function (e, t) {
                    var n = t.order_list_container.getElementsByTagName("A");
                    for (var o in n)
                        if ("object" == typeof n[o]) {
                            var i = n[o].getAttribute("data-order");
                            i === e || "order-az-desc" === e && "order-az-asc" === i ? (xv.dom.hasClass(n[o], "current_order") || xv.dom.addClass(n[o], "current_order"), "order-az-asc" !== e && "order-az-desc" !== e || (n[o].getElementsByTagName("SPAN")[0].innerHTML = "order-az-asc" === e ? "↓" : "↑")) : xv.dom.hasClass(n[o], "current_order") && ("order-az-asc" === i && (n[o].getElementsByTagName("SPAN")[0].innerHTML = ""), xv.dom.removeClass(n[o], "current_order"))
                        }
                },
                update_disable_switch: function (e) {
                    if (!e.history_infos)
                        return !1;
                    var t = xv.cats.is_history_disabled() ? "categories.clear_and_enable_history" : "categories.clear_and_disable_history",
                            n = {
                                "%clear_link%": '&lt;a href="#" data-follow="nofollow" data-action="clear-history"&gt;',
                                "%disable_link%": '&lt;a href="#" data-follow="nofollow" data-action="disable-history"&gt;',
                                "%end_link%": "&lt;/a&gt;"
                            };
                    e.history_infos.getElementsByTagName("P")[0].innerHTML = xv.utils.unescape(xv.i18n.__(t, n));
                    var o = e.history_infos.getElementsByTagName("A");
                    for (var i in o)
                        "object" == typeof o[i] && ("clear-history" === o[i].getAttribute("data-action") ? (e.clear_history = o[i], xv.dom.addEventListener(e.clear_history, "click", function (t) {
                            t.preventDefault ? t.preventDefault() : t.returnValue = !1, xv.cats.clear_history(), e.history_infos_box && xv.dom.addClass(e.history_infos_box, "hidden")
                        }), xv.dom.removeClass(e.clear_history, "hidden")) : "disable-history" === o[i].getAttribute("data-action") && (e.disable_history = o[i], xv.dom.addEventListener(e.disable_history, "click", function (t) {
                            t.preventDefault ? t.preventDefault() : t.returnValue = !1, xv.cats.disable_history_toggle(), e.history_infos_box && xv.dom.addClass(e.history_infos_box, "hidden")
                        }), xv.dom.removeClass(e.disable_history, "hidden")))
                },
                get_stored_pathname: function (e) {
                    var t = document.createElement("a");
                    return t.href = e, (t.origin ? t.origin.toLowerCase() : "") + t.pathname.toLowerCase()
                },
                is_history_disabled: function () {
                    return !!xv.cats.get_save("history_disabled", "XNXX_cats_order_5")
                },
                disable_history_toggle: function (e) {
                    var t = "boolean" == typeof e ? e : !xv.cats.is_history_disabled();
                    if (t) {
                        if (!xv.cats.clear_history())
                            return !1
                    } else
                        xv.cats.get_stored_order("order-top-asc");
                    return xv.cats.save("history_disabled", t, "XNXX_cats_order_5"), xv.cats.update_lists(), !0
                },
                clear_history: function () {
                    return confirm(xv.utils.unescape(xv.i18n.__("categories.confirm_clear_history", null, null, "Are you sure you want to clear your navigation history ?"))) ? (xv.cats.del_save("history", "XNXX_cats_order_5"), xv.cats.update_lists(), !0) : 0 === xv.cats.get_history().length
                },
                get_history: function () {
                    return xv.cats.get_save("history", "XNXX_cats_order_5") || []
                },
                add_to_history: function (e, t) {
                    if (xv.cats.is_history_disabled())
                        return !1;
                    t = xv.cats.get_stored_pathname(t);
                    var n = xv.cats.get_history();
                    0 === n.length && xv.cats.get_stored_order("order-top-asc");
                    var o = !1,
                            i = new Date,
                            a = i.getTime();
                    e = xv.utils.escape(e), e = e.slice(0, 1).toUpperCase() + e.slice(1);
                    for (var r in n)
                        n[r].url === t && (a - n[r].timestamp > 1e4 && n[r].count++, n[r].timestamp = a, o = !0);
                    o || n.push({
                        count: 1,
                        timestamp: a,
                        label: e,
                        url: t
                    }), xv.cats.save("history", n, "XNXX_cats_order_5")
                },
                write_html_list: function (e, t) {
                    var n = "";
                    for (var o in e)
                        n += "<li" + (e[o].count ? ' class="in-history"' : "") + '><a href="' + e[o].url + '" title="' + e[o].label + '">' + (e[o].custom ? '<span class="icon search-small"></span>' : "") + e[o].label + "</a></li>";
                    t.innerHTML = n
                },
                get_stored_order: function (e) {
                    stored_order = xv.cats.get_save("order", "XNXX_cats_order_5");
                    var t = e || stored_order || "order-top-asc";
                    return e && xv.cats.save("order", t, "XNXX_cats_order_5"), t
                },
                order_list: function (n, o) {
                    switch (order = xv.cats.get_stored_order(o), order) {
                        case "order-az-asc":
                            e ? n.sort(t ? a : i) : n.sort();
                            break;
                        case "order-az-desc":
                            e ? n.sort(t ? s : r) : n.sort();
                            break;
                        case "order-top-asc":
                        default:
                            n.sort(d)
                    }
                    return n
                },
                can_use_save: function () {
                    return "object" == typeof JSON
                },
                save: function (e, t) {
                    if (!xv.cats.can_use_save())
                        return !1;
                    window.xv.storage.set(e, t, "XNXX_cats_order_5")
                },
                get_save: function (e) {
                    return !!xv.cats.can_use_save() && window.xv.storage.get(e, "XNXX_cats_order_5")
                },
                del_save: function (e) {
                    if (!xv.cats.can_use_save())
                        return !1;
                    window.xv.storage.remove(e, "XNXX_cats_order_5")
                }
            }
        }(), window.fuckAdBlock = !1,
        function (e) {
            var t = function (t) {
                this._options = {
                    checkOnLoad: !1,
                    resetOnEnd: !1,
                    loopCheckTime: 50,
                    loopMaxNumber: 5,
                    baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
                    baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
                    debug: !1
                }, this._var = {
                    version: "3.2.1",
                    bait: null,
                    checking: !1,
                    loop: null,
                    loopNumber: 0,
                    event: {
                        detected: [],
                        notDetected: []
                    }
                }, t !== undefined && this.setOption(t);
                var n = this,
                        o = function () {
                            setTimeout(function () {
                                !0 === n._options.checkOnLoad && (!0 === n._options.debug && n._log("onload->eventCallback", "A check loading is launched"), null === n._var.bait && n._creatBait(), setTimeout(function () {
                                    n.check()
                                }, 1))
                            }, 1)
                        };
                e.addEventListener !== undefined ? e.addEventListener("load", o, !1) : e.attachEvent("onload", o)
            };
            t.prototype._options = null, t.prototype._var = null, t.prototype._bait = null, t.prototype._log = function (e, t) {
                console.log("[FuckAdBlock][" + e + "] " + t)
            }, t.prototype.setOption = function (e, t) {
                if (t !== undefined) {
                    var n = e;
                    e = {}, e[n] = t
                }
                for (var o in e)
                    this._options[o] = e[o], !0 === this._options.debug && this._log("setOption", 'The option "' + o + '" he was assigned to "' + e[o] + '"');
                return this
            }, t.prototype._creatBait = function () {
                var t = document.createElement("div");
                t.setAttribute("class", this._options.baitClass), t.setAttribute("style", this._options.baitStyle), this._var.bait = e.document.body.appendChild(t), this._var.bait.offsetParent, this._var.bait.offsetHeight, this._var.bait.offsetLeft, this._var.bait.offsetTop, this._var.bait.offsetWidth, this._var.bait.clientHeight, this._var.bait.clientWidth, !0 === this._options.debug && this._log("_creatBait", "Bait has been created")
            }, t.prototype._destroyBait = function () {
                e.document.body.removeChild(this._var.bait), this._var.bait = null, !0 === this._options.debug && this._log("_destroyBait", "Bait has been removed")
            }, t.prototype.check = function (e) {
                if (e === undefined && (e = !0), !0 === this._options.debug && this._log("check", "An audit was requested " + (!0 === e ? "with a" : "without") + " loop"), !0 === this._var.checking)
                    return !0 === this._options.debug && this._log("check", "A check was canceled because there is already an ongoing"), !1;
                this._var.checking = !0, null === this._var.bait && this._creatBait();
                var t = this;
                return this._var.loopNumber = 0,
                        !0 === e && (this._var.loop = setInterval(function () {
                            t._checkBait(e)
                        }, this._options.loopCheckTime)), setTimeout(function () {
                    t._checkBait(e)
                }, 1), !0 === this._options.debug && this._log("check", "A check is in progress ..."), !0
            }, t.prototype._checkBait = function (t) {
                var n = !1;
                if (null === this._var.bait && this._creatBait(), null === e.document.body.getAttribute("abp") && null !== this._var.bait.offsetParent && 0 != this._var.bait.offsetHeight && 0 != this._var.bait.offsetLeft && 0 != this._var.bait.offsetTop && 0 != this._var.bait.offsetWidth && 0 != this._var.bait.clientHeight && 0 != this._var.bait.clientWidth || (n = !0), e.getComputedStyle !== undefined) {
                    var o = e.getComputedStyle(this._var.bait, null);
                    !o || "none" != o.getPropertyValue("display") && "hidden" != o.getPropertyValue("visibility") || (n = !0)
                }
                !0 === this._options.debug && this._log("_checkBait", "A check (" + (this._var.loopNumber + 1) + "/" + this._options.loopMaxNumber + " ~" + (1 + this._var.loopNumber * this._options.loopCheckTime) + "ms) was conducted and detection is " + (!0 === n ? "positive" : "negative")), !0 === t && ++this._var.loopNumber >= this._options.loopMaxNumber && this._stopLoop(), !0 === n ? (this._stopLoop(), this._destroyBait(), this.emitEvent(!0), !0 === t && (this._var.checking = !1)) : null !== this._var.loop && !1 !== t || (this._destroyBait(), this.emitEvent(!1), !0 === t && (this._var.checking = !1))
            }, t.prototype._stopLoop = function (e) {
                clearInterval(this._var.loop), this._var.loop = null, this._var.loopNumber = 0, !0 === this._options.debug && this._log("_stopLoop", "A loop has been stopped")
            }, t.prototype.emitEvent = function (e) {
                !0 === this._options.debug && this._log("emitEvent", "An event with a " + (!0 === e ? "positive" : "negative") + " detection was called");
                var t = this._var.event[!0 === e ? "detected" : "notDetected"];
                for (var n in t)
                    !0 === this._options.debug && this._log("emitEvent", "Call function " + (parseInt(n) + 1) + "/" + t.length), t.hasOwnProperty(n) && t[n]();
                return !0 === this._options.resetOnEnd && this.clearEvent(), this
            }, t.prototype.clearEvent = function () {
                this._var.event.detected = [], this._var.event.notDetected = [], !0 === this._options.debug && this._log("clearEvent", "The event list has been cleared")
            }, t.prototype.on = function (e, t) {
                return this._var.event[!0 === e ? "detected" : "notDetected"].push(t), !0 === this._options.debug && this._log("on", 'A type of event "' + (!0 === e ? "detected" : "notDetected") + '" was added'), this
            }, t.prototype.onDetected = function (e) {
                return this.on(!0, e)
            }, t.prototype.onNotDetected = function (e) {
                return this.on(!1, e)
            }, e.FuckAdBlock = t, e.fuckAdBlock === undefined && (e.fuckAdBlock = new t({
                checkOnLoad: !0,
                resetOnEnd: !0
            }))
        }(window),
        function () {
            if ("object" == typeof xv && "object" == typeof xv.conf && "object" == typeof xv.conf.dyn && "object" == typeof xv.conf.dyn.ads && "undefined" != typeof xv.conf.dyn.ads.banners && 0 !== xv.conf.dyn.ads.banners.length) {
                "undefined" != typeof JSON && "undefined" != typeof JSON.parse || xv.utils.loadScript(xv.utils.getStaticDomain() + "/v3/js/json3.js", {
                    async: "async"
                });
                var e = function () {
                    var e = 0;
                    if ("undefined" != typeof window.innerWidth)
                        e = window.innerWidth;
                    else if ("undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && document.documentElement.clientWidth > 0)
                        e = document.documentElement.clientWidth;
                    else if ("undefined" != typeof document.getElementsByTagName) {
                        var t = document.getElementsByTagName("body");
                        t.length > 0 && "undefined" != typeof t[0].clientWidth && t[0].clientWidth > 0 && (e = t[0].clientWidth)
                    }
                    return e > 0 ? e : 1024
                },
                        t = function () {
                            var e = 0;
                            if ("undefined" != typeof window.innerHeight)
                                e = window.innerHeight;
                            else if ("undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientHeight && document.documentElement.clientHeight > 0)
                                e = document.documentElement.clientHeight;
                            else if ("undefined" != typeof document.getElementsByTagName) {
                                var t = document.getElementsByTagName("body");
                                t.length > 0 && "undefined" != typeof t[0].clientHeight && t[0].clientHeight > 0 && (e = t[0].clientHeight)
                            }
                            return e > 0 ? e : 768
                        },
                        n = xv.conf.dyn.ads,
                        o = "string" == typeof xv.conf.sitename && window.xv.conf.sitename,
                        i = !1,
                        a = window.location.pathname.split("#")[0].match(/^\/video(\d+|-[\da-z]+)\/[-\w\.\~]*$/);
                window.wpn_categories = n.categories;
                for (var r = function (e, t) {
                    if ("function" != typeof document.querySelectorAll)
                        return console.warn("Native: document.querySelectorAll is not supported in not supported in this browser"), !1;
                    if (!i)
                        return !!t && e.div_id;
                    var n = document.querySelectorAll(e.div_id);
                    if (0 === n.length)
                        return !!t && e.div_id;
                    n.length > 1 && console.warn("Native: Found more that 1 node"), n = n[0];
                    var o = xv.dom.getChildren(n),
                            r = [];
                    for (var s in o)
                        xv.dom.hasClass(o[s], "video-ad") || xv.dom.hasClass(o[s], "thumb-ad") || r.push(o[s]);
                    return !(r.length < 16) && (e.mozthumbs = r, "/" === window.location.pathname ? e.insert_pos = Math.max(1, Math.floor(2 * r.length / 3)) : e.insert_pos = a ? 16 + Math.floor(9.99 * Math.random()) : Math.max(1, Math.floor(2 * r.length / 3) + 4 + Math.floor(3.99 * Math.random())), n)
                }, s = [], d = {}, l = [], c = [], u = [], f = !0, p = function (e, t) {
                    return "number" == typeof t.min_ratio && t.min_ratio > 0 && (e += "_minr_" + t.min_ratio.toFixed(2)), "number" == typeof t.max_ratio && t.max_ratio > 0 && (e += "_maxr_" + t.max_ratio.toFixed(2)), "native" === t.type && a && (e += "_native_related"), e
                }, v = function (e, t) {
                    var n = {};
                    return n.type = t.type, n.device = e, "number" == typeof t.min_ratio && t.min_ratio > 0 && (n.minr = Math.round(100 * t.min_ratio) / 100), "number" == typeof t.max_ratio && t.max_ratio > 0 && (n.maxr = Math.round(100 * t.max_ratio) / 100), n
                }, h = 0; h < n.banners.length; h++) {
                    var m = n.banners[h],
                            g = function (e) {
                                if (!e.div_id)
                                    return console.error("Invalid banner: ", e), !1;
                                if ("native" === e.type)
                                    return r(e, !0);
                                var t = document.getElementById(e.div_id);
                                return t ? (t.innerHTML = "", t) : e.div_id
                            }(m);
                    if (!1 !== g && !(m.nb_ban <= 0)) {
                        m.div = g, m.mobile || m.mobilehoriz || m.desktop || m.largescr || (m.mobile = !0, m.desktop = !0), m.is_loaded = !1, m.to_load = {};
                        var _ = !1,
                                y = ["mobile", "mobilehoriz", "desktop"];
                        for (var b in y)
                            if (m[y[b]]) {
                                _ = !0;
                                var x = p(y[b], m);
                                m.to_load[x] = !0, d[x] = v(y[b], m)
                            }
                        if (!_ && m.largescr) {
                            var x = p("largescr", m);
                            m.to_load[x] = !0, d[x] = v("largescr", m)
                        }
                        s.push(m)
                    }
                }
                if (0 !== s.length) {
                    var w = xv.cookies.get("wpn_ad_cookie"),
                            k = n.site,
                            E = "",
                            C = "",
                            T = !1,
                            j = "",
                            N = !1,
                            z = !1,
                            S = xv.conf.dyn.is_tablet ? "tablet" : xv.conf.dyn.is_mobile ? "mobile" : "desktop",
                            O = 0,
                            L = [2, 3, 4, 5, 6],
                            B = [4, 5, 8, 11, 14],
                            I = [5, 8, 11, 14],
                            M = [],
                            A = {
                                pos0: []
                            },
                            D = !1,
                            H = null,
                            R = {};
                    w || (w = ""), "string" == typeof n.categories && n.categories.length > 0 && (E = n.categories), "string" == typeof n.tracker && n.tracker.length > 0 && (C = n.tracker), "string" == typeof xv.conf.dyn.forcedcountry && xv.conf.dyn.forcedcountry.length > 0 && (j = xv.conf.dyn.forcedcountry);
                    var P, U, X = function (e, t) {
                        t && "object" != typeof R[e] && (R[e] = {
                            cleared: !1,
                            callback: t,
                            time: (new Date).getTime(),
                            timeout: window.setTimeout(function () {
                                var e = xv.utils.createRequestObject();
                                e.open("GET", t.replace("_TYPE_", "TIMEOUT").replace("_DURATION_", "10000"), !0), e.send(null)
                            }, 1e4)
                        })
                    },
                            F = function (e, t) {
                                if ("object" == typeof R[e]) {
                                    var n = R[e];
                                    if (!n.cleared && (we(!0), n.timeout && (window.clearTimeout(n.timeout), n.timeout = !1), n.cleared = !0, t)) {
                                        var o = (new Date).getTime() - n.time,
                                                i = xv.utils.createRequestObject();
                                        i.open("GET", n.callback.replace("_TYPE_", "ERROR").replace("_DURATION_", o.toFixed(0)), !0);
                                        try {
                                            i.send(null)
                                        } catch (a) {
                                            console.error(a)
                                        }
                                    }
                                }
                            },
                            q = function (e, t, n, o, i) {
                                var a = e.substr(-3);
                                return "jpg" === a ? G(e, t, n, o, i) : "gif" === a ? W() ? $(e.substr(0, e.length - 3) + "mp4", t, n, o, i) : G(e, t, n, o, i) : "mp4" === a && (W() ? $(e, t, n, o, i) : G(e.substr(0, e.length - 3) + "gif", t, n, o, i))
                            },
                            W = function () {
                                if (null !== H)
                                    return H;
                                if (navigator.connection && navigator.connection.saveData)
                                    return !1;
                                H = !1;
                                try {
                                    var e = document.createElement("video");
                                    if ("undefined" != typeof e.canPlayType && "" === e.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'))
                                        return !1;
                                    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
                                        return !/OS [1-9]_/.test(navigator.userAgent) && (H = !0);
                                    if ("Firefox" === xv.conf.dyn.browser)
                                        return H = !0;
                                    if ("Edge" === xv.conf.dyn.browser)
                                        return H = !0;
                                    if ("Chrome" !== xv.conf.dyn.browser)
                                        return !1;
                                    var t = navigator.userAgent.match(/Chrome\/([0-9]+)\./);
                                    if (t && t[1] > 50)
                                        return H = !0
                                } catch (n) {
                                    return !1
                                }
                                return !1
                            },
                            V = function (e, t, n, o) {
                                var i = document.createElement("a");
                                return i.href = t, i.target = "_blank", i.rel = "noopener", i.onclick = function (e) {
                                    e = e || window.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                                }, o.length > 0 && (i.className = o), "headermobile" === n ? [e, i] : (i.appendChild(e), [i])
                            },
                            J = function (e, t, n) {
                                var o = document.createElement("img");
                                return o.is_img_loaded = !1, o.banner_type = t, o.onload = function () {
                                    o.is_img_loaded = !0, F(t, !1)
                                }, o.onerror = function () {
                                    F(t, !0)
                                }, o.src = e, n.length > 0 && (o.className = n), o
                            },
                            G = function (e, t, n, o, i) {
                                X(n, i);
                                var a = J(e, n, o);
                                return V(a, t, n, o)
                            },
                            $ = function (e, t, n, o, i) {
                                var a = document.createElement("video");
                                if (a.setAttribute("playsinline", ""), a.muted = !0, a.loop = "loop", a.controls = !1, a.disableRemotePlayback = !0, a.autoplay = "autoplay", a.is_playing = !1, o.length > 0 && (a.className = o), a.addEventListener("loadstart", function () {
                                    console.log("videoads", e, "loadstart")
                                }), a.addEventListener("play", function () {
                                    console.log("videoads", e, "play")
                                }), a.addEventListener("waiting", function () {}), a.addEventListener("suspend", function () {}), a.addEventListener("canplaythrough", function () {}), a.addEventListener("canplay", function () {}), a.addEventListener("playing", function () {
                                    a.is_playing = !0, F(n, !1)
                                }), a.addEventListener("error", function () {
                                    console.log("videoads", e, "error"), F(n, !0)
                                }), a.addEventListener("ended", function () {}), a.addEventListener("abort", function () {
                                    console.log("videoads", e, "abort")
                                }), a.addEventListener("durationchange", function () {
                                    console.log("videoads", e, "durationchange")
                                }), a.addEventListener("loadeddata", function () {
                                    console.log("videoads", e, "loadeddata"), F(n, !1)
                                }), a.addEventListener("loadedmetadata", function () {
                                    console.log("videoads", e, "loadedmetadata")
                                }), navigator.connection && navigator.connection.saveData) {
                                    var r = xv.utils.createRequestObject();
                                    r.open("GET", e, !0), r.responseType = "arraybuffer", r.onreadystatechange = function (t) {
                                        if (X(n, i), 4 == r.readyState && 200 == r.status) {
                                            if (!r.response)
                                                return void(a.src = e);
                                            a.src = "data:video/mp4;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(r.response))), console.log("videoads", e, "xhr : loaded")
                                        }
                                        4 == r.readyState && 0 == r.status && console.log("videoads", e, "xhr : load error")
                                    }, r.send(null)
                                } else
                                    X(n, i), a.src = e;
                                return V(a, t, n, o)
                            },
                            K = function (e, t, n, i, a, r) {
                                X("native", r);
                                var s = 3e7 + Math.round(7e7 * Math.random());
                                g = document.createElement("div"), g.id = "video_" + s, g.className = "thumb-block thumb-ad", a || (g.className += " no-rotate"), g.innerHTML = "xnxx" === o ? '<div class="thumb-inside"><div class="thumb"><a href="' + t + '" target="_blank" rel="noopener"></a></div></div><div class="thumb-under"><p><a href="' + t + '" title="' + n + '" target="_blank" rel="noopener">' + n + '</a></p><p class="metadata"><span class="duration">' + xv.i18n.__("misc.ad", {}, null, "AD") + '</span> <a href="' + t + '" target="_blank" rel="noopener">' + i + "</a></p></div>" : '<div class="thumb-inside"><div class="thumb"><a href="' + t + '" target="_blank" rel="noopener"></a></div></div><div class="thumb-under"><p><a href="' + t + '" title="' + n + '" target="_blank" rel="noopener">' + n + '</a></p><p class="metadata"><span class="bg"><span class="duration">' + xv.i18n.__("misc.ad", {}, null, "AD") + '</span><a href="' + t + '" target="_blank" rel="noopener">' + i + "</a></span></p></div>";
                                var d = document.createElement("img");
                                d.dataset.idcdn = 0, d.dataset.videoid = s, d.dataset.isad = !0, d.id = "pic_" + s, d.is_img_loaded = !1, d.onload = function () {
                                    d.is_img_loaded = !0, F("native", !1)
                                }, d.onerror = function () {
                                    F("native", !0)
                                }, d.src = e;
                                var l = xv.dom.getFirstChild(g);
                                return l = xv.dom.getFirstChild(l), l = xv.dom.getFirstChild(l), l.appendChild(d), g
                            },
                            Y = function () {
                                var t = e();
                                return t < 480 ? "desktop" === S ? 2 : 5 : t < 768 ? "desktop" === S ? 3 : 8 : t < 992 ? "desktop" === S ? 4 : 11 : t < 1440 || "xnxx" === o ? "desktop" === S ? 5 : 14 : "desktop" === S ? 6 : 11
                            },
                            Z = function (e, t) {
                                var n, o = xv.dom.getChildren(e);
                                n = "IMG" === e.nodeName ? J(e.src, e.banner_type, e.className) : e.cloneNode(!1);
                                for (var i in o)
                                    if ("VIDEO" !== o[i].nodeName) {
                                        var a = Z(o[i], t);
                                        n.appendChild(a)
                                    } else
                                        A["pos" + t].push(n);
                                return n
                            },
                            Q = function (e) {
                                var t = [];
                                for (var n in e) {
                                    var o = xv.dom.getChildrenRecursive(e[n]);
                                    for (var i in o)
                                        "VIDEO" === o[i].nodeName && t.push(o[i])
                                }
                                return t
                            },
                            ee = function (e) {
                                if ("number" != typeof e && (e = Y()), e !== D && (D = e, "undefined" != typeof A["pos" + e])) {
                                    var t = A["pos" + e];
                                    for (var n in t)
                                        t[n].appendChild(M[n]), M[n].play()
                                }
                            },
                            te = function (e, t) {
                                if (0 !== e.length) {
                                    M = Q(e), A.pos0 = [];
                                    for (var n in M)
                                        A.pos0.push(M[n].parentNode);
                                    D = !1;
                                    var i = document.getElementById("related-videos");
                                    if (i && (i = xv.dom.getFirstChild(i)), !i)
                                        return void(t ? c = c.concat(e) : ee(0));
                                    var a = [],
                                            r = xv.dom.getChildren(i);
                                    for (var s in r)
                                        xv.dom.hasClass(r[s], "thumb-block") && !xv.dom.hasClass(r[s], "video-ad") && a.push(r[s]);
                                    var d = xv.dom.getNextSibling(document.getElementById("ad-footer")),
                                            l = "desktop" === S ? L : "xnxx" === o ? I : B;
                                    for (var u in e) {
                                        O++;
                                        for (var f in l) {
                                            var p = l[f];
                                            if ("undefined" == typeof A["pos" + p] && (A["pos" + p] = []), "undefined" != typeof a[p * O - 1 - O]) {
                                                var v = document.createElement("div");
                                                v.className = "thumb-block video-ad video-ad-pos-" + p + " video-ad-support-" + S;
                                                var h = a[p * O - 1 - O],
                                                        m = h.parentNode;
                                                h.nextSibling === m.lastChild ? m.appendChild(v) : m.insertBefore(v, h.nextSibling);
                                                var g = document.createElement("div");
                                                if (g.className = "thumb-inside", v.appendChild(g), g.appendChild(Z(e[u], p)), "undefined" != typeof e[u].view_callback_obj && e[u].view_callback_obj.elems.push(v), "desktop" !== S) {
                                                    var _ = d.cloneNode(!0);
                                                    g.appendChild(_)
                                                }
                                            }
                                        }
                                    }
                                    "desktop" !== S && (xv.dom.addClass(document.getElementById("ad-footer"), "with-related-ad"), xv.dom.addClass(document.getElementById("related-videos"), "with-footer-ad")), xv.dom.addClass(document.getElementById("related-videos"), "with-ad");
                                    var y;
                                    if ("desktop" === S) {
                                        var b = "object" == typeof window.xvideos && "object" == typeof window.xvideos.player ? window.xvideos.player : null;
                                        if (b && b.isEnlarged() || ee(0), b) {
                                            var x = !1;
                                            y = function () {
                                                x ? ee() : ee(0)
                                            }, b.addOnSizeChangeEventHandler(function (e) {
                                                x = e, y()
                                            })
                                        }
                                    } else
                                        ee(), y = ee;
                                    if ("undefined" != typeof window.addEventListener)
                                        window.addEventListener("resize", y), document.body.addEventListener("settings_nb_thumbs_changed", y);
                                    else if ("function" == typeof window.onresize) {
                                        var w = window.onresize;
                                        window.onresize = function () {
                                            w(), y()
                                        }
                                    } else
                                        window.onresize = y
                                }
                            },
                            ne = function (e, t) {
                                for (var n = 0; n < e.length; n++) {
                                    var i = e[n].info,
                                            s = e[n].banners,
                                            d = e[n].view_callback;
                                    if ("inplayersquare" !== i.type) {
                                        if ("square" === i.type && 0 === s.length && "object" == typeof html5player && html5player.setNoSquareAd(), "video" !== i.type) {
                                            if ("string" == typeof i.div) {
                                                var c;
                                                if (!(c = "native" === i.type ? r(i, !1) : document.getElementById(i.div))) {
                                                    t ? l.push(e[n]) : console.error("Div " + i.div + " is missing");
                                                    continue
                                                }
                                                i.div = c, f || "native" === i.type || (c.style.display = "none")
                                            }
                                            var p = [],
                                                    v = [],
                                                    h = xv.conf.dyn.has_premium && xv.conf.dyn.disp_removeads && null !== window.location.pathname.match(/^\/video\d+\/.*/);
                                            if (p.push(i.div), i.mobile_div) {
                                                if ("string" == typeof i.mobile_div) {
                                                    var m = document.getElementById(i.mobile_div);
                                                    if (m)
                                                        i.mobile_div = m, f || (m.style.display = "none");
                                                    else {
                                                        if (t) {
                                                            l.push(e[n]);
                                                            continue
                                                        }
                                                        console.error("Div " + i.mobile_div + " is missing")
                                                    }
                                                }
                                                i.mobile_div && p.push(i.mobile_div)
                                            }
                                            if (!h || "square" !== i.type && "footer" !== i.type && "footermobile" !== i.type && "headermobile" !== i.type || ("square" !== i.type && "headermobile" !== i.type || v.push(i.div), i.mobile_div && v.push(i.mobile_div)), 0 !== s.length || "native" === i.type) {
                                                for (var g = [], _ = 0; _ < s.length; _++)
                                                    for (var y in p)
                                                        if ("native" === i.type) {
                                                            var b = K(s[_].banner, s[_].url, s[_].label, s[_].user_name, !!s[_].video_preview, e[n].loadingreport);
                                                            f || (b.style.display = "none"), i.mozthumbs.length >= i.insert_pos ? p[y].insertBefore(b, i.mozthumbs[i.insert_pos - 1]) : p[y].appendChild(b), i.div = b, d && s[_].view_callback && u.push({
                                                                type: i.type,
                                                                elems: [b],
                                                                view_callback: s[_].view_callback
                                                            }), a && xv.thumbs && xv.thumbs.update_related_class && xv.thumbs.update_related_class()
                                                        } else {
                                                            var x = ("default" === o || "xnxx" === o) && !!a && ("square" === i.type && "video-ad" === i.div_id && "desktop" === S || "footermobile" === i.type && "ad-footer" === i.div_id && "desktop" !== S),
                                                                    w = q(s[_].banner, s[_].url, i.type, i.mobilehoriz ? "ad-mobilehoriz" : "", e[n].loadingreport),
                                                                    k = !(!d || !s[_].view_callback) && {
                                                                type: i.type,
                                                                elems: [],
                                                                view_callback: s[_].view_callback
                                                            };
                                                            for (var E in w)
                                                                xv.dom.addClass(p[y], "ad-" + i.type), xv.dom.addClass(p[y], "ad-support-" + S), p[y].appendChild(w[E]), "tower" === i.type && (N = !0), k && (w[E].view_callback_obj = k, k.elems.push(w[E]));
                                                            k && u.push(k), x && (g = g.concat(w))
                                                        }
                                                g.length > 0 && te(g, !0);
                                                for (var C = 0; C < v.length; C++) {
                                                    var c = document.createElement("div");
                                                    c.className = "remove-ads";
                                                    var T = document.createElement("a");
                                                    T.href = xv.conf.dyn.login_info.is_premium ? xv.conf.dyn.premium_domain + window.location.pathname + "?pmsc=ad" : "/remove-all-ads";
                                                    var j = document.createElement("span");
                                                    j.className = "remove-ads-link", j.innerHTML = xv.i18n.__("misc.remove_ads");
                                                    var O = document.createElement("span");
                                                    O.className = "icon-f icf-close", T.appendChild(j), T.appendChild(document.createTextNode(" ")), T.appendChild(O), c.appendChild(T), v[C].appendChild(c)
                                                }
                                            } else {
                                                var L = !1,
                                                        B = !0;
                                                "tower" === i.type && ("xnxx" !== o && "pornorama" !== o || "/" !== window.location.pathname) ? (L = !0, B = !1) : "square" !== i.type && "headermobile" !== i.type && ("footer" !== i.type && "footermobile" !== i.type || "string" != typeof i.area_tag || "hometopfooter" !== i.area_tag) || (B = !1), "tower" === i.type && "default" === o && (xv.dom.addClass(document.body, "no-side-tf-tower"), z = !0);
                                                for (var y in p) {
                                                    var I = p[y].parentNode;
                                                    if (B) {
                                                        var M = xv.dom.getNextSibling(p[y]);
                                                        I.removeChild(M)
                                                    }
                                                    L ? I.parentNode.removeChild(I) : I.removeChild(p[y])
                                                }
                                            }
                                        }
                                    } else {
                                        if ("object" != typeof html5player) {
                                            t && l.push(e[n]);
                                            continue
                                        }
                                        if (0 === s.length) {
                                            html5player.setPlayerAd("NOAD");
                                            continue
                                        }
                                        var A = {
                                            url: s[0].url,
                                            img: s[0].banner
                                        };
                                        s[0].banner_jpg && (A.jpg = s[0].banner_jpg), html5player.setPlayerAd(A)
                                    }
                                }
                                !0 === N ? (xv.dom.addClass(document.body, "has-side-tf-tower"), xv.dom.removeClass(document.body, "no-side-tf-tower")) : 0 === l.length && !1 === z && (xv.dom.addClass(document.body, "no-side-tf-tower"), z = !0)
                            },
                            oe = function (e, t) {
                                var n = [];
                                n.push(window.location.protocol + "//rpc-php.trafficfactory.biz/" + e);
                                for (var o = [], i = 0; i < t.length; i++) {
                                    var a = t[i];
                                    "undefined" == typeof a.area_tag ? o.push(a.type + "-" + a.nb_ban) : o.push(a.type + "-" + a.area_tag + "-" + a.nb_ban), t[i].is_loaded = !0
                                }
                                return n.push(o.join("x")), n.push(w), n.push(E), n.push(k), n.push(C), n.push(""), n.push(j), n.push("content.json?v=" + Math.random()), n.join("/")
                            },
                            ie = 0,
                            ae = 0,
                            re = function (e, t) {
                                try {
                                    var n = xv.utils.createRequestObject();
                                    n.open("GET", oe(!0 === t ? "videosadsselect" : "json", e), !0), n.onreadystatechange = function (o) {
                                        if (4 == n.readyState && 200 == n.status) {
                                            var i = n.responseText;
                                            if ("string" == typeof i)
                                                try {
                                                    i = JSON.parse(i)
                                                } catch (c) {
                                                    return void console.error(c)
                                                }
                                            if (!i || !i.tracker_id || !i.banners)
                                                return;
                                            xv.cookies.setLocal("wpn_ad_cookie", i.tracker_id, 6048e5, "/");
                                            var a = [];
                                            for (var r in i.banners) {
                                                var s = {
                                                    info: e[r],
                                                    banners: i.banners[r],
                                                    loadingreport: !1
                                                };
                                                !0 === t && (s.view_callback = !0), "object" == typeof i.loadingreport && "string" == typeof i.loadingreport[r] && (s.loadingreport = i.loadingreport[r]), a.push(s)
                                            }
                                            if (ne(a, !0), ae++, ie === ae && !0 !== N && !1 === z) {
                                                var d = !1;
                                                for (var r in l)
                                                    "tower" === l[r].info.type && (d = !0);
                                                d || xv.dom.addClass(document.body, "no-side-tf-tower")
                                            }
                                        }
                                        4 == n.readyState && 0 == n.status && (T || (T = !0, ue(), "object" == typeof xv.thumbs && "object" == typeof xv.thumbs.mgr && (xv.thumbs.mgr.checkOrSend(!0), "object" == typeof html5player && "function" == typeof html5player.loadingAdError && html5player.loadingAdError())))
                                    }, n.send(null)
                                } catch (a) {
                                    if (/MSIE\s/i.test(navigator.userAgent) && parseFloat(navigator.appVersion.split(/MSIE/i)[1]) < 10) {
                                        window.wpn_ad_configuration = e;
                                        var o = [];
                                        o.push(window.location.protocol + "//rpc-php.trafficfactory.biz"), o.push(zones.join("x")), o.push(w), o.push("0"), o.push(E), o.push(k), o.push(C), o.push("display.js?v=" + Math.random());
                                        var i = document.createElement("script");
                                        i.src = o.join("/"), i.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(i)
                                    } else
                                        T || (T = !0, ue(), "object" == typeof xv.thumbs && "object" == typeof xv.thumbs.mgr && (xv.thumbs.mgr.checkOrSend(!0), "object" == typeof html5player && "function" == typeof html5player.loadingAdError && html5player.loadingAdError()))
                                }
                            },
                            se = !1,
                            de = !1,
                            le = !1,
                            ce = function () {
                                if (!de) {
                                    var e = xv.i18n.__("misc.adblock_message" + ("xnxx" === o ? "_xnxx" : ""), {
                                        "%link_start%": '<a href="https://www.xvideos.red" style="box-shadow:none;display:inline;position:static;width:auto;">',
                                        "%link_end%": "</a>",
                                        "%strong%": "<strong>",
                                        "%end_strong%": "</strong>"
                                    }, null, "xnxx" === o ? "XNXX relies on ads to exist. Please disable your ad-blocker." : "Try %link_start%XVIDEOS.RED%link_end% for free. %strong%Ad-free%end_strong% experience with extra content and features.");
                                    for (var t in s) {
                                        var n = s[t].div;
                                        if ("string" == typeof n && (n = document.getElementById(n)), n && "object" == typeof n)
                                            n.innerHTML = e, n.style.textAlign = "center", n.style.fontWeight = "bold", n.style.fontSize = "16px";
                                        else if (!le && !i)
                                            return void(le = !0);
                                        if ("undefined" != typeof s[t].mobile_div)
                                            if (n = s[t].mobile_div, "string" == typeof n && (n = document.getElementById(n)), n && "object" == typeof n)
                                                n.innerHTML = e, n.style.textAlign = "center", n.style.fontWeight = "bold", n.style.fontSize = "16px";
                                            else if (!le && !i)
                                                return void(le = !0)
                                    }
                                    var a = document.getElementById("header");
                                    if (!a)
                                        return le ? void(de = !0) : void(le = !0);
                                    de = !0;
                                    var r, d = document.getElementById("x-fda-messages");
                                    if (d) {
                                        var l = xv.dom.getChildren(d);
                                        for (var c in l)
                                            if (xv.dom.hasClass(l[c], "inner")) {
                                                r = l[c];
                                                break
                                            }
                                    } else
                                        d = document.createElement("div"), d.id = "x-fda-messages", a.appendChild(d);
                                    r || (r = document.createElement("div"), r.className = "inner", d.appendChild(r));
                                    var u = document.createElement("div");
                                    u.className = "x-message x-message-info", r.appendChild(u);
                                    var f = document.createElement("div");
                                    f.className = "content", u.appendChild(f);
                                    var p = document.createElement("p");
                                    p.innerHTML = e, f.appendChild(p)
                                }
                            },
                            ue = function () {
                                se || (se = !0, "default" !== o && "xnxx" !== o || ("function" == typeof FuckAdBlock ? (window.fuckAdBlock = new FuckAdBlock({
                                    checkOnLoad: !0,
                                    resetOnEnd: !0
                                }), window.fuckAdBlock.onDetected(ce)) : ce()))
                            },
                            fe = !1,
                            pe = 768,
                            ve = 184 + (xv.cookies.get("hexavid_no_responsive") > 0 ? 930 : 1280);
                    "xnxx" === o && (pe = 992);
                    var he = function (n) {
                        if ("native" === n.type && a && !fe)
                            return !1;
                        if (null === P && (P = e()), (n.minr || n.maxr || "mobilehoriz" === n.device) && null === U && (U = P / t()), n.minr && U < n.minr)
                            return !1;
                        if (n.maxr && U > n.maxr)
                            return !1;
                        switch (n.device) {
                            case "mobile":
                                return P <= pe;
                            case "mobilehoriz":
                                return xv.conf.dyn.is_smartphone && (P >= 420 || U >= 1);
                            case "desktop":
                                return P > pe;
                            case "largescr":
                                return P >= ve
                        }
                        return console.error("Unknown device: " + n.device), !1
                    },
                            me = function (e) {
                                if ("native" === e)
                                    return !0;
                                if ("footer" !== e && "footermobile" !== e)
                                    return !1;
                                var t = xv.conf.dyn.country;
                                return j && (t = j), "FR" === t || "ES" === t || "NL" === t || "CZ" === t
                            },
                            ge = function () {
                                P = null, U = null;
                                var e = [];
                                for (var t in d)
                                    he(d[t]) && e.push(t);
                                if (0 !== e.length) {
                                    for (var n = [], o = [], i = 0; i < s.length; i++) {
                                        var a = s[i];
                                        if (!a.is_loaded)
                                            for (var r in e)
                                                a.to_load[e[r]] && (me(a.type) ? o.push(a) : n.push(a))
                                    }
                                    for (var r in e)
                                        delete d[e[r]];
                                    n.length > 0 && (re(n), ie++), o.length > 0 && (re(o, !0), ie++)
                                }
                            };
                    if ("undefined" != typeof window.addEventListener)
                        window.addEventListener("resize", ge);
                    else if ("function" == typeof window.onresize) {
                        var _e = window.onresize;
                        window.onresize = function () {
                            _e(), ge()
                        }
                    } else
                        window.onresize = ge;
                    var ye = function () {
                        i = !0, l.length > 0 && ne(l, !1), c.length > 0 && te(c, !0), le && ce(), we(!1), setTimeout(we, 2e3)
                    };
                    "function" == typeof document.addEventListener ? document.addEventListener("DOMContentLoaded", ye) : window.attachEvent("onload", ye);
                    var be = !1,
                            xe = !1,
                            we = function (e) {
                                if (0 !== u.length) {
                                    if (e || (be = !0), xe) {
                                        if (!e)
                                            return;
                                        clearTimeout(xe), xe = !1
                                    }
                                    e && !be || (be = !1, xe = setTimeout(function () {
                                        we(!0)
                                    }, 500));
                                    var t = [];
                                    for (var n in u) {
                                        var o = u[n],
                                                i = !1;
                                        for (var a in o.elems) {
                                            if ("IMG" === o.elems[a].nodeName && !o.elems[a].is_img_loaded) {
                                                i = !0;
                                                break
                                            }
                                            if ("VIDEO" === o.elems[a].nodeName && !o.elems[a].is_playing) {
                                                i = !0;
                                                break
                                            }
                                            var r = xv.dom.getChildrenRecursive(o.elems[a]);
                                            for (var s in r) {
                                                if ("IMG" === r[s].nodeName && !r[s].is_img_loaded) {
                                                    i = !0;
                                                    break
                                                }
                                                if ("VIDEO" === r[s].nodeName && !r[s].is_playing) {
                                                    i = !0;
                                                    break
                                                }
                                            }
                                        }
                                        if (i)
                                            t.push(o);
                                        else {
                                            var d = !1;
                                            for (var a in o.elems)
                                                if (xv.dom.isElementInView(o.elems[a], !0, {
                                                    no_zero: !0
                                                })) {
                                                    d = !0;
                                                    var l = xv.utils.createRequestObject();
                                                    l.open("GET", o.view_callback, !0);
                                                    try {
                                                        l.send()
                                                    } catch (c) {
                                                        return
                                                    }
                                                    break
                                                }
                                            d || t.push(o)
                                        }
                                    }
                                    u = t
                                }
                            };
                    ge(), window.xv.conf.ads_loaded = !0, xv.dom.addEventListener(window, "scroll", we), xv.dom.addEventListener(window, "resize", we);
                    var ke = function () {
                        if (document.body)
                            return document.body, void xv.dom.addClass(document.body, "no-tf");
                        window.setTimeout(ke, 100)
                    };
                    window.display_related_native = function () {
                        fe = !0, ge()
                    }, window.toggle_wpn_ads = function (e) {
                        if ((e = !!e) !== f && "OK" !== xv.cookies.get("disclaimer_display") && xv.utils.isFirstPage()) {
                            f = e, "default" === o && (f ? xv.dom.removeClass(document.body, "no-tf") : ke());
                            for (var t in s) {
                                var n = s[t].div;
                                n && "object" == typeof n && (n.style.display = f ? "" : "none"), n = s[t].mobile_div, n && "object" == typeof n && (n.style.display = f ? "" : "none")
                            }
                        }
                    }, !0 === xv.conf.data.show_disclaimer && window.toggle_wpn_ads(!1)
                }
            }
        }(),
        function () {
            if (!(xv && xv.conf && xv.conf.dyn.is_premium) || xv.conf.dyn.login_info.is_premium || "/red" === window.location.pathname.substr(0, 4) || "profile" === xv.conf.data.action) {
                var e, t, n, o, i = 0,
                        a = !1,
                        r = !1,
                        s = !1,
                        d = !1,
                        l = !1,
                        c = !1,
                        u = !1;
                logo_red_default_w = 54, logo_default_w = !1, logo_default_h = !1, logo_current_w = !1, logo_current_h = !1, logo_max_width = !1, too_small_once = !1, force_mobile_menu = !1, window_resize_callback = function (r, f) {
                    a = !1, i = (new Date).getTime();
                    var p = xv.dom.getViewportWidth();
                    if (o !== p || !0 === f) {
                        if (o = p, !1 === l || !1 === d || !1 === logo_default_h || !1 === logo_default_w) {
                            if (d = document.getElementById("site-logo-svg"), d || (d = document.getElementById("header").getElementsByTagName("svg")[0]), !d)
                                return !1;
                            l = document.getElementById("site-logo"), u = document.getElementById("site-logo-red"), c = document.getElementById("site-logo-link"), logo_default_w = parseInt(d.getAttribute("width")), logo_default_h = parseInt(d.getAttribute("height")), s = document.getElementById("header-mobile-right")
                        }
                        var v = !1,
                                h = !1,
                                m = 0,
                                g = !1,
                                _ = !1,
                                y = !1;
                        if (e = o < 768, t = e || force_mobile_menu, s) {
                            header_safety_marge_w = 10, header_left_w = 90, header_right_w = parseInt(s.offsetWidth);
                            var b = header_left_w + header_right_w + header_safety_marge_w,
                                    x = b + logo_default_w + (u ? logo_red_default_w : 0);
                            e && !1 === logo_max_width && (logo_max_width = "calc( 100% - " + b + "px )", c.style.maxWidth = logo_max_width), g = o < x
                        } else
                            g = o < logo_default_w / .28;
                        if (g) {
                            if (too_small_once = !0, s) {
                                h = o - b;
                                var w = logo_default_w;
                                u && (w += logo_red_default_w), u ? h < 100 ? (y = !0, w = .3333 * logo_default_w, w += logo_red_default_w, _ = Math.floor(h * (logo_red_default_w / w)), h = (h - _) / .3333) : (_ = Math.floor(h * (logo_red_default_w / w)), h = Math.floor(h * (logo_default_w / w))) : h < 70 ? (y = !0, (h /= .3333) > logo_default_w && (h = logo_default_w)) : h = Math.floor(h * (logo_default_w / w))
                            } else
                                h = Math.ceil(.28 * o);
                            v = Math.ceil(logo_default_h * h / logo_default_w * 100) / 100, m = Math.ceil((logo_default_h - v) / 2)
                        } else
                            logo_current_w === logo_default_w && logo_current_h === logo_default_h || (h = logo_default_w, v = logo_default_h, u && (_ = logo_red_default_w));
                        !0 === too_small_once && !1 !== h && !1 !== v && (logo_current_w = h, logo_current_h = v, d.setAttribute("width", h), d.setAttribute("height", v), d.style.marginTop = m + "px", l.setAttribute("width", h), l.setAttribute("height", v), u && !1 !== _ && (u.style.fontSize = _ + "px"), !0 === y ? (xv.dom.addClass(c, "short"), c.style.width = .3333 * h + "px") : (xv.dom.removeClass(c, "short"), c.style.width = "auto")), !1 === r || "boolean" == typeof n && n === t || (n = t, "function" == typeof xv.header.update_menu_classs && xv.header.update_menu_classs())
                    }
                }, xv || (xv = {}), xv.header || (xv.header = {}), xv.header.nav || (xv.header.nav = !1, xv.header.nav_var = {
                    menu_toggle: !1,
                    is_opened_desktop: !1,
                    main_cat_btn: !1,
                    home_trends_btn: !1
                }), xv.header.is_mobile = function (t) {
                    return !1 !== t && window_resize_callback(!1), e
                }, xv.header.is_mobile_menu = function (e) {
                    return !1 !== e && window_resize_callback(!1), t
                }, xv.header.set_force_mobile_menu = function (e) {
                    "boolean" == typeof e && force_mobile_menu !== e && (force_mobile_menu = e, window_resize_callback(!0, !0))
                }, xv.header.window_resize = function () {
                    if (!r && !a) {
                        r = !0;
                        (new Date).getTime() - i > 250 && window_resize_callback(), a = setTimeout(function () {
                            window_resize_callback(!0, !0), r = !1
                        }, 1e3)
                    }
                }
            }
        }(),
        function () {
            xv.conf && (xv.conf.dyn.premium || "/remove-all-ads" === window.location.pathname) && (xv.premium = {
                to_fade_in_up: [],
                hide_to_fadeInUp_in: function (e) {
                    var t = document.getElementById(e),
                            n = xv.dom.getChildrenRecursive(t);
                    for (var o in n)
                        n[o].getAttribute && "fadeInUp" === n[o].getAttribute("data-animation") && (xv.dom.addClass(n[o], "to-fadeInUp"), this.to_fade_in_up.push({
                            elem: n[o],
                            position_top: !1,
                            height: !1,
                            visible: !1
                        }))
                }
            })
        }(),
        function () {
            var e = function (e) {
                this.type = e, this.list = this.get_saved_list(), this.order_list()
            };
            e.prototype = {
                type: !1,
                container: !1,
                list: [],
                add_to_list: function (e) {
                    return "object" != typeof e && (e = xv.history.get_elem_obj(this.type)), "object" == typeof e && (!(e_in_list = this.elem_in_list(e, !0)) && void this.list.push(e))
                },
                elem_in_list: function (e, t) {
                    var n = xv.history.type[this.type].elem_comparison_criteria;
                    for (var o in this.list) {
                        var i = !0;
                        for (var a in n)
                            this.list[o][n[a]] !== e[n[a]] && (i = !1);
                        if (!0 === i)
                            return t && (this.list[o].timestamp = xv.history.get_timestamp(), this.list[o].count++), !0
                    }
                    return !1
                },
                save_list: function () {
                    return this.save("history", this.list)
                },
                get_saved_list: function () {
                    return this.get_save("history") || []
                },
                order_list: function (e) {
                    switch (order = this.get_stored_order(e), order) {
                        case "order-date-desc":
                        default:
                            this.list.sort(function (e, t) {
                                var n = parseInt(e.timestamp) || 0,
                                        o = parseInt(t.timestamp) || 0;
                                return n === o ? 0 : n < o ? 1 : -1
                            })
                    }
                },
                get_stored_order: function (e) {
                    stored_order = this.get_save("order");
                    var t = e || stored_order || "order-date-desc";
                    return e && this.save("order", t), t
                },
                save: function (e, t) {
                    if (!xv.history.can_use_save())
                        return !1;
                    xv.storage.set(this.type + "-" + e, t, xv.history.storage_namespace)
                },
                get_save: function (e) {
                    return !!xv.history.can_use_save() && xv.storage.get(this.type + "-" + e, xv.history.storage_namespace)
                },
                del_save: function (e) {
                    if (!xv.history.can_use_save())
                        return !1;
                    xv.storage.remove(this.type + "-" + e, xv.history.storage_namespace)
                },
                clear_history: function () {
                    return confirm(xv.utils.unescape(xv.i18n.__("categories.confirm_clear_history", null, null, "Are you sure you want to clear your navigation history ?"))) ? (this.del_save("history"), !0) : 0 === xv.history.get_history().length
                }
            }, xv.history = {
                one_history: e,
                storage_namespace: (xv.conf.sitename || "xv") + "_history_181113",
                initiated_histories: {},
                type: {
                    "video-xv": {
                        id: "videos-xv-h",
                        get_elem_obj: function () {
                            return {
                                id_video: xv.conf.data.id_video,
                                count: 1,
                                name: xv.conf.dyn.video_title,
                                url: xv.history.get_cleared_pathname(),
                                timestamp: xv.history.get_timestamp()
                            }
                        },
                        elem_comparison_criteria: ["id_video"]
                    }
                },
                get_timestamp: function () {
                    return (new Date).getTime()
                },
                get_cleared_pathname: function (e) {
                    var t = document.createElement("a");
                    return t.href = "string" == typeof e ? e : window.location.href, t.pathname.toLowerCase()
                },
                init: function (e) {
                    if ("undefined" == typeof this.type[e])
                        return !1;
                    "undefined" == typeof this.initiated_histories[e] && (this.initiated_histories[e] = []);
                    for (var t in this.initiated_histories[e])
                        return this.initiated_histories[e][t];
                    var n = new this.one_history(e);
                    return this.initiated_histories[e].push(n), n
                },
                add_page_to_list_and_save: function (e) {
                    var t = this.init(e);
                    t.add_to_list(), t.save_list()
                },
                get_elem_obj: function (e) {
                    return "undefined" != typeof this.type[e] && this.type[e].get_elem_obj()
                },
                can_use_save: function () {
                    return "object" == typeof JSON
                }
            }
        }();
(function(a) {
    a.fn.slide = function(b) {
        return a.fn.slide.defaults = {
            effect: "fade",
            autoPlay: !1,
            delayTime: 500,
            interTime: 2500,
            triggerTime: 150,
            defaultIndex: 0,
            titCell: ".hd li",
            mainCell: ".bd",
            targetCell: null,
            trigger: "mouseover",
            scroll: 1,
            vis: 1,
            titOnClassName: "on",
            autoPage: !1,
            prevCell: ".prev",
            nextCell: ".next",
            pageStateCell: ".pageState",
            opp: !1,
            pnLoop: !0,
            easing: "linear",
            startFun: null,
            endFun: null,
            switchLoad: null
        },
        this.each(function() {
            var c = a.extend({},
            a.fn.slide.defaults, b),
            d = c.effect,
            e = a(c.prevCell, a(this)),
            f = a(c.nextCell, a(this)),
            g = a(c.pageStateCell, a(this)),
            h = a(c.titCell, a(this)),
            i = h.size(),
            j = a(c.mainCell, a(this)),
            k = j.children().size(),
            l = c.switchLoad;
            if (null != c.targetCell) var m = a(c.targetCell, a(this));
            var n = parseInt(c.defaultIndex),
            o = parseInt(c.delayTime),
            p = parseInt(c.interTime);
            parseInt(c.triggerTime);
            var r = parseInt(c.scroll),
            s = parseInt(c.vis),
            t = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0,
            u = "false" == c.opp || 0 == c.opp ? !1 : !0,
            v = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0,
            w = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0,
            x = 0,
            y = 0,
            z = 0,
            A = 0,
            B = c.easing,
            C = null,
            D = n;
            if (0 == i && (i = k), v) {
                var E = k - s;
                i = 1 + parseInt(0 != E % r ? E / r + 1 : E / r),
                0 >= i && (i = 1),
                h.html("");
                for (var F = 0; i > F; F++) h.append("<li>" + (F + 1) + "</li>");
                var h = a("li", h)
            }
            if (j.children().each(function() {
                a(this).width() > z && (z = a(this).width(), y = a(this).outerWidth(!0)),
                a(this).height() > A && (A = a(this).height(), x = a(this).outerHeight(!0))
            }), k >= s) switch (d) {
            case "fold":
                j.css({
                    position:
                    "relative",
                    width: y,
                    height: x
                }).children().css({
                    position: "absolute",
                    width: z,
                    left: 0,
                    top: 0,
                    display: "none"
                });
                break;
            }
            var G = function() {
                a.isFunction(c.startFun) && c.startFun(n, i)
            },
            H = function() {
                a.isFunction(c.endFun) && c.endFun(n, i)
            },
            I = function(b) {
                b.eq(n).find("img").each(function() {
                    a(this).attr(l) !== void 0 && a(this).attr("src", a(this).attr(l)).removeAttr(l)
                })
            },
            J = function(a) {
                if (D != n || a || "leftMarquee" == d || "topMarquee" == d) {
                    switch (d) {
                    case "fold":
                        n >= i ? n = 0 : 0 > n && (n = i - 1);
                        break;
                    }
                    if (G(), null != l && I(j.children()), m && (null != l && I(m), m.hide().eq(n).animate({
                        opacity: "show"
                    },
                    o,
                    function() {
                        j[0] || H()
                    })), k >= s) switch (d) {
                    case "fold":
                        j.children().stop(!0, !0).eq(n).animate({
                            opacity: "show"
                        },
                        o, B,
                        function() {
                            H()
                        }).siblings().animate({
                            opacity: "hide"
                        },
                        o, B);
                        break;
                    }
                    h.removeClass(c.titOnClassName).eq(n).addClass(c.titOnClassName),
                    D = n,
                    0 == w && (f.removeClass("nextStop"), e.removeClass("prevStop"), 0 == n ? e.addClass("prevStop") : n == i - 1 && f.addClass("nextStop")),
                    g.html("<span>" + (n + 1) + "</span>/" + i)
                }
            };
            J(!0),
            t && ("leftMarquee" == d || "topMarquee" == d ? (u ? n--:n++, C = setInterval(J, p), j.hover(function() {
                t && clearInterval(C)
            },
            function() {
                t && (clearInterval(C), C = setInterval(J, p))
            })) : (C = setInterval(function() {
                u ? n--:n++,
                J()
            },
            p), a(this).hover(function() {
                t && clearInterval(C)
            },
            function() {
                t && (clearInterval(C), C = setInterval(function() {
                    u ? n--:n++,
                    J()
                },
                p))
            })));
            var K;
            "mouseover" == c.trigger ? h.hover(function() {
                n = h.index(this),
                K = window.setTimeout(J, c.triggerTime)
            },
            function() {
                clearTimeout(K)
            }) : h.click(function() {
                n = h.index(this),
                J()
            }),
            f.click(function() { (1 == w || n != i - 1) && (n++, J())
            }),
            e.click(function() { (1 == w || 0 != n) && (n--, J())
            })
        })
    }
})(jQuery),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    }
});
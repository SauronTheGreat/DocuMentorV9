/**
 * Created with JetBrains RubyMine.
 * User: arijit
 * Date: 10/4/12
 * Time: 5:51 PM
 * To change this template use File | Settings | File Templates.
 */

    //this is cookie content
function setCookie(c_name, value, exdays) {
    // alert(value.indexOf('\n'));
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = value.replace(/\n/g, "").trim() + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    // alert(c_value);
    document.cookie = c_name.replace(/\n/g, "").trim() + "=" + c_value;
//        alert(document.cookie)
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");

    for (i = 0; i < ARRcookies.length; i++) {
        //for (a in ARRcookies){
        //alert(ARRcookies[i]);
        //  alert(i);
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        //  alert(x);
        if (x == c_name) {
            return unescape(y);
        }


    }
    return "No-Data"
}


//this cookie content ends here

//this is gallery content

// =========================================================== 
// script: Gerard Ferrandez - Ge-1-doot - October 2005 
// http://www.dhteumeuleu.com 
// Updated - Feb 2010 - Namespaced script 
// =========================================================== 
// 
 
var siM = function () { 
    /* ---- private vars ---- */ 
    var obj = [], scr, spa, cap, img, W, Wi, Hi, wi, hi, Sx, Sy, M; 
    var xb = 0, yb = 0, ob =  - 1; 
    ////////////////////////////////////////////////////////// 
    var Nx = 4; //size grid x 
    var Ny = 4; //size grid y 
    var Tx = 3; // image width 
    var Ty = 3; // image height 
    var Mg = 10; // margin 
    var SP = 0.1; // speed 
    ////////////////////////////////////////////////////////// 
    var Cobj = function (o, x, y) { 
        this.o = o; 
        this.ix = Math.min(Nx - Tx, Math.max(0, Math.round(x - (Tx / 2)))); 
        this.iy = Math.min(Ny - Ty, Math.max(0, Math.round(y - (Ty / 2)))); 
        this.li = ((this.ix * M + this.ix * Sx) - (x * M + x * Sx)) / SP; 
        this.ti = ((this.iy * M + this.iy * Sy) - (y * M + y * Sy)) / SP; 
        this.x = x; 
        this.y = y; 
        this.l = 0; 
        this.t = 0; 
        this.w = 0; 
        this.h = 0; 
        this.s = -1; 
        this.spa = spa[o].style; 
        this.img = img[o]; 
        this.txt = img[o].alt; 
        this.img.alt = ""; 
        /* center image */ 
        this.img.center = function () { 
            this.style.left = Math.round( -(this.width - Wi) / 2) + "px"; 
            this.style.top  = Math.round( -(this.height - Hi) / 2) + "px"; 
        } 
        /* events */ 
        this.img.onclick = function () { 
            obj[o].click(); 
        } 
        this.img.onload = function () { 
            this.center(); 
        } 
        /* initial display */ 
        this.zoom(); 
    } 
    /* zooming loop */ 
    Cobj.prototype.zoom = function() { 
        this.f = false; 
        this.l += this.li * this.s; 
        this.t += this.ti * this.s; 
        this.w += wi * this.s; 
        this.h += hi * this.s; 
        if ((this.s > 0 && this.w < Wi) || (this.s < 0 && this.w > Sx)) { 
            /* loop */ 
            var o = this.o; 
            setTimeout(function() { 
                obj[o].zoom(); 
            }, 16); 
        } else { 
            /* finished */ 
            if (this.s > 0) { 
                this.l = this.ix * M + this.ix * Sx; 
                this.t = this.iy * M + this.iy * Sy; 
                this.w = Wi; 
                this.h = Hi; 
            } else { 
                this.l = this.x * M + this.x * Sx; 
                this.t = this.y * M + this.y * Sy; 
                this.w = Sx; 
                this.h = Sy; 
            } 
        } 
        /* html animation */ 
        this.spa.left   = Math.round(this.l) + "px"; 
        this.spa.top    = Math.round(this.t) + "px"; 
        this.spa.width  = Math.round(this.w) + "px"; 
        this.spa.height = Math.round(this.h) + "px"; 
        this.spa.zIndex = Math.round(this.w); 
    } 
 
    Cobj.prototype.click = function() { 
        this.img.center(); 
        /* zooming logic */ 
        if (this.s > 0) { 
            this.s = -1; 
            this.zoom(); 
            cap.innerHTML = '<a href="/assets/products/'+ this.txt.replace(/\s+/g, '') +'/'+ this.txt.replace(/\s+/g, '') +'.html">' + this.txt + '</a>'; 
        } else if (this.s < 0) { 
            if (ob >= 0) { 
                obj[ob].s =  - 1; 
                obj[ob].zoom(); 
            } 
            ob = this.o; 
            this.s = 1; 
            this.zoom(); 
            cap.innerHTML = '<a href="/assets/products/'+ this.txt.replace(/\s+/g, '') +'/'+ this.txt.replace(/\s+/g, '') +'.html">' + this.txt + '</a>'; 
        } 
    } 
    /* ====== init script ====== */ 
    var init = function () { 
        /* html elements */ 
        scr = document.getElementById("screen"); 
        spa = scr.getElementsByTagName("span"); 
        img = scr.getElementsByTagName("img"); 
        cap = document.getElementById("caption"); 
 
        /* variables */ 
        W = scr.offsetWidth; 
        H = scr.offsetHeight; 
        M = W / 40; 
        Sx = (W - (Nx - 1) * M) / Nx; 
        Sy = (H - (Ny - 1) * M) / Ny; 
        Wi = Tx * Sx + (Tx - 1) * M; 
        Hi = Ty * Sy + (Ty - 1) * M; 
        SP = M * Tx * SP; 
        wi = (Wi - Sx) / SP; 
        hi = (Hi - Sy) / SP; 
 
        /* create objects */ 
        for (var k = 0, i = 0; i < Nx; i++) { 
            for (var j = 0; j < Ny; j++) 
                obj[k] = new Cobj(k++, i, j); 
        } 
    } 
    return { 
        init : init 
    } 
}(); 

//this gallery content ends here

//this is Spider Content

function setspider() {

document.onselectstart = new Function("return false;");

    function resize() {
        var s = document.getElementById("spider");
        nw = s.offsetWidth;
        nh = s.offsetHeight;
    }
    onresize = resize;

    document.onmousemove = function (e) {
        if (window.event) e = window.event;
        xm = (e.x || e.clientX);
        ym = (e.y || e.clientY);
    }

    //////////////////////////////////////////////////////////

    m = {
        O:[],
        svg:0,
        xm:0,
        ym:0,
        nw:0,
        nh:0,
        X:0,
        Y:0,
        X0:0,
        Y0:0,
        ox:0,
        oy:0,
        drag:false,
        Odraged:0,
        ks:0,
        ////////////////////////////////////////////
        FR:6, // friction
        vL:200, // default length
        vR:1.33, // reduction ratio
        cC:"#F28518", // collapsed node
        cP:"#000", // default  node
        cV:"#00ff00", // expanded node
        vN:"#0f0", //visited node
        cL:"#000000", // lines
        sT:"#000", // stroke
        sS:"#fff", // stroke over
        tX:"#fff", // text
        tS:"#fff", // text selected
        sP:10, // dot size
        rS:.005, // rotation speed
        cN:"#ffffff", //color for clicked node....
        ////////////////////////////////////////////

        CreateNode:function (parent, label, col, link) {
            /* ==== init variables ==== */
            this.link = link;
            this.col = col;
            this.label = label;
            this.pR = 0;
            this.len = 0;
            this.len_ini = 0;
            this.lex = 0;
            this.angle = 0;
            this.angle_ini = 0;
            this.expanded = false;
            this.children = [];
            this.parent = parent;
            this.parent_ini = parent;
            this.visible = false;
            this.x = 0;
            this.y = 0;

            if (parent != "") {
                /* ==== push child ==== */
                parent.children.push(this);
                /* ==== calculate lengths & angles ==== */
                var a = (2 * Math.PI) / parent.children.length;
                var b = (parent != "") ? Math.random() : 0;
                for (var i in parent.children) {
                    with (parent.children[i]) {
                        angle = angle_ini = Math.PI / 2 + a * i + b;
                        len = len_ini = parent.len_ini / m.vR;
                    }
                }
            } else {
                /* ==== root ==== */
                this.visible = true;
                this.len_ini = m.vL * m.vR;
            }

            /* ==== create line & text elements ==== */
            this.line = m.svg.createLine(1, m.cL);
            this.text = document.createElement("span");
            this.text.onmousedown = function () {
                return false;
            };
            this.text.appendChild(document.createTextNode(label));
            this.text.style.color = m.tX;
            document.getElementById("spider").appendChild(this.text);

            /* ==== main animation loop ==== */
            this.run = function () {
                with (this) {
                    if (visible) {
                        /* ==== parent coordinates ==== */
                        xp = parent ? parent.x : m.X;
                        yp = parent ? parent.y : m.Y;
                        /* ==== trigonometry ==== */
                        var a = Math.atan2((y + Math.sin(angle + m.ks) * m.FR) - yp, (x + Math.cos(angle + m.ks) * m.FR) - xp);
                        if (lex < len) lex += (len - lex) * .1;
                        x = xp + Math.cos(a) * lex;
                        y = yp + Math.sin(a) * lex;
                        /* ==== screen limits ==== */
                        if (x < pR) x = pR; else if (x > nw - pR) x = nw - pR;
                        if (y < pR) y = pR; else if (y > nh - pR) y = nh - pR;
                        /* ==== move elements ==== */
                        line.move(x, y, xp, yp);
                        plot.move(x, y, pR);
                        text.style.left = Math.round(x + pR + 5) + "px";
                        text.style.top = Math.round(y - pR / 1.8) + "px";
                    }
                }
            };

            /* ==== collapse node ==== */
            this.collapse = function () {
                with (this) {

                    expanded = false;
                    text.style.color = m.tX;


                    plot.fill_color((children.length) ? m.cC : col);

                    for (var i = 0; i < children.length; i++) {
                        with (children[i]) {
                            visible = false;
                            lex = 0;
                            line.move(-1, -1, -1, -2);
                            plot.move(-1000, -1, 0);
                            text.style.left = "-1000px";
                            expanded = false;
                            //               alert(this.text.child.text());
                            collapse();
                        }
                    }


                }


            };

            /* ==== expand node ==== */
            this.expand = function () {

                with (this) {

                    /* ==== close all other branchs ==== */
                    if (parent_ini != "")
                        for (var i = 0; i < parent_ini.children.length; i++) {

                            //  parent_ini.children[i].collapse();
                        }
                    /* ==== expand ==== */
                    expanded = true;
                    text.style.color = m.tS;
                    plot.fill_color(m.cN);
                    for (var i = 0; i < children.length; i++) {
//                        var cookie = getCookie(children[i].label.replace(/\n/g, "").trim());
//                        if (cookie != "No-Data") {
//                            children[i].plot.fill_color(m.cV);
//                        }
                        children[i].visible = true;
                        children[i].lex = 0;
                    }
                }
            }
        },

        /* ==== mouse down event ==== */
        mousedown:function () {
            var o = this.obj;
            /* ==== cursor ==== */
            o.plot.style.cursor = "move";
            document.body.style.cursor = "move";
            /* ==== offset mouse ==== */
            m.ox = xm - o.x;
            m.oy = ym - o.y;
            m.X0 = xm;
            m.Y0 = ym;
            if (!m.drag) {
                m.drag = true;
                /* ==== change root ==== */
                if (m.Odraged != o) {
                    /* ==== reset ==== */
                    for (var i in m.O) {
                        with (m.O[i]) {
                            parent = parent_ini;
                            len = len_ini;
                            lex = len_ini;
                            angle = angle_ini;
                        }
                    }
                    /* ==== search for root path ==== */
                    var oc = [];
                    var ow = o;
                    oc.push(ow);
                    while (ow.parent != "") {
                        ow = ow.parent;
                        oc.push(ow);
                    }
                    /* ==== inverse vectors ==== */
                    for (var i = 1; i < oc.length; i++) {
                        oc[i].lex = oc[i - 1].len_ini;
                        oc[i].len = oc[i - 1].len_ini;
                        oc[i].angle = oc[i - 1].angle_ini - Math.PI;
                        oc[i].parent = oc[i - 1];
                    }
                    /* ==== switch root ==== */
                    o.parent = "";
                    o.len = 0;
                    o.lex = 0;
                    o.angle = 0;
                    m.Odraged.plot.stroke_color(m.sT);
                    m.Odraged.plot.stroke_weight(1);
                    m.Odraged = o;
                }
                return false;
            }
        },

        /* ==== mouse up event ==== */
        mouseup:function () {
            m.drag = false;
            /* ==== cursor ==== */
            m.Odraged.plot.style.cursor = "pointer";
//            document.body.style.cursor = "crosshair";
            /* ==== click ==== */
            if (Math.abs(m.X + m.ox - m.X0) < 5 && Math.abs(m.Y + m.oy - m.Y0) < 5) {
                if (this.obj.link) {
                    /* ==== open hyperlink ==== */
                    setCookie(this.obj.label, this.obj.label, 365);
                    window.open(this.obj.link, "_blank");
                } else {
                    /* ==== expand / collapse ==== */
                    setCookie(this.obj.label, this.obj.label, 365);
                    if (this.obj.expanded) this.obj.collapse(); else this.obj.expand();
                }
            }
            return false;
        },

        /* ==== mouse over event ==== */
        mouseover:function () {
            this.stroke_color(m.sS);
            this.stroke_weight(Math.round(Math.max(2, this.obj.pR / 3)));
            return false;
        },

        /* ==== mouse out event ==== */
        mouseout:function () {
            if (this.obj != m.Odraged) {
                this.stroke_color(m.sT);
                this.stroke_weight(1);
            }
            return false;
        },

        /* ==== motion thread ==== */
        run:function () {
            if (m.drag) m.X = xm - m.ox, m.Y = ym - m.oy;
            m.ks += m.rS;
            for (var i in m.O) m.O[i].run();
        },

        /* ==== parse menu DOM ==== */
        setMenuTree:function (theNode, parent) {
            if (theNode.tagName == "DIV" || theNode.tagName == "A") {
                /* ==== Node Label ==== */
                var s = theNode.innerHTML;
                var d = s.toUpperCase().indexOf("<DIV");
                if (d > 0) s = s.substring(0, d);
                d = s.toUpperCase().indexOf("<A");
                if (d > 0) s = s.substring(0, d);
                /* ==== create Node ==== */
                if (theNode.style.color != "") m.cP = theNode.style.color;
                var cookie = getCookie(s.replace(/\n/g, "").trim());
                if (cookie != "No-Data") {
                    parent = new m.CreateNode(parent, s, m.vN, theNode.href);
                }
                else {
                    parent = new m.CreateNode(parent, s, m.cP, theNode.href);
                }


                /* ==== push Node ==== */
                m.O.push(parent);

            }
            /* ==== recursive call ==== */
            for (var i = 0; i < theNode.childNodes.length; i++)
                m.setMenuTree(theNode.childNodes[i], parent);
        },

        /* ==== init menu ==== */
        init:function () {
            m.vL = nh / 4;
            m.X = nw / 2;
            m.Y = nh / 2;
            m.setMenuTree(document.getElementById("menu"), "");

            /* ==== create plots (no z-index in SVG!) ==== */
            for (var i in m.O) {

                m.O[i].pR = Math.round(Math.max(5, m.sP * m.O[i].len_ini / 200));
                m.O[i].plot = m.svg.createOval(m.O[i].pR * 2, true);
                m.O[i].plot.stroke_color(m.O[i].sT);
                m.O[i].plot.stroke_weight(1);
                m.O[i].plot.obj = m.O[i];
                m.O[i].plot.onmousedown = m.mousedown;
                m.O[i].plot.onmouseup = m.mouseup;
                m.O[i].plot.onmouseover = m.mouseover;
                m.O[i].plot.onmouseout = m.mouseout;
                m.O[i].plot.onclick = function () {
                    setCookie(m.O[i].label, m.O[i].label, 365);
                    return false;
                };
                m.O[i].text.style.fontSize = (4 + m.O[i].pR) + "px";

            }

            /* ==== expand 1st Node ==== */
            m.Odraged = m.O[0];
            m.O[0].collapse();
            m.O[0].expand();

        }
    };

    onload = function () {

        /* ==== initial size ==== */
        resize();


        /* ==== create SVGVML container ==== */


        m.svg = new vectorGraphics(document.getElementById("spider"), false);
        if (m.svg) {
            /* ==== init menu ==== */
            m.init();

            setInterval(m.run, 16);
        }
    }
    
}

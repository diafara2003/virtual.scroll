var VirtualObject = /** @class */ (function () {
    function VirtualObject() {
        this._html = "";
        this._from = 0;
        this._inital = 0;
        this._length_Datos = 0;
        this._scroll = 0;
        this._container = 1;
    }
    VirtualObject.prototype._rendering_table = function (id) {
        var _table = document.getElementById(id);
        if (_table != null) {
            _table.innerHTML = this._html;
        }
    };
    return VirtualObject;
}());
var tr_primero = "tr_primero";
var tr_ultimo = "tr_ultimo";
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(_inital) {
        this._setting = _inital;
        this._v_object = new VirtualObject();
        this._init();
    }
    VirtualScroll.prototype._init = function () {
        var _this = this;
        this._v_object._from = Math.floor(this._length_viewer()) + 20;
        this._v_object._length_Datos = this._setting.source.length;
        var _missing = this._v_object._length_Datos - this._v_object._from;
        console.log("from:" + this._v_object._from);
        this._v_object._html += this._tr_scroll(tr_primero, 0);
        this._v_object._html += this._setting.fn_chunked(this._v_object._inital, this._v_object._from, this._setting.source);
        this._v_object._html += this._tr_scroll(tr_ultimo, _missing * this._setting._length_tr);
        this._v_object._rendering_table(this._setting.id_tbody);
        var _visor_scrollind = document.getElementById(this._setting.id_visor);
        if (_visor_scrollind != null) {
            _visor_scrollind.addEventListener('scroll', function (e) {
                if (_visor_scrollind != null) {
                    _this._scrolling(_visor_scrollind.scrollTop);
                }
            });
        }
    };
    VirtualScroll.prototype._length_viewer = function () {
        var _length = document.getElementById(this._setting.id_visor);
        if (_length != null) {
            return (_length.offsetHeight / this._setting._length_tr);
        }
        else {
            return 0;
        }
    };
    VirtualScroll.prototype._tr_scroll = function (id, _length) {
        var _html_tr = '';
        _html_tr = '<tr><td id=' + id + ' style="height:' + _length + 'px"></td></tr>';
        return _html_tr;
    };
    VirtualScroll.prototype._chunked = function () {
        var _html = this._setting.fn_chunked(0, 100, this._setting.source);
        return _html;
    };
    VirtualScroll.prototype._get_length_viewver = function () {
        var _el = document.getElementById(this._setting.id_visor);
        if (_el != null) {
            return Math.floor(_el.offsetHeight / this._setting._length_tr) - 1;
        }
        else {
            return 0;
        }
    };
    VirtualScroll.prototype._get_top = function () {
        var result = Math.floor(this._v_object._scroll / this._setting._length_tr);
        if ((result + this._get_length_viewver()) > this._v_object._length_Datos) {
            result = this._v_object._length_Datos - this._get_length_viewver();
        }
        return result;
    };
    VirtualScroll.prototype._get_bottom = function () {
        var result = this._v_object._from - (this._get_top() + this._get_length_viewver());
        return result < 0 ? 0 : result;
    };
    VirtualScroll.prototype._scrolling = function (_scrolled) {
        this._v_object._scroll = _scrolled;
        var _container = this._get_container();
        if (_container != this._v_object._container) {
            this._v_object._container = _container;
            console.log("contenedor:__________" + this._v_object._container);
            var _from = this._v_object._from * this._v_object._container;
            var _inital = this._v_object._from * (this._v_object._container - 1) - this._get_length_viewver();
            var _missing = this._v_object._length_Datos - _from;
            if (_inital < 0) {
                _inital = 0;
            }
            if (_from > this._v_object._length_Datos) {
                _from = this._v_object._length_Datos;
            }
            this._v_object._html = '';
            this._v_object._html += this._tr_scroll(tr_primero, _inital * this._setting._length_tr);
            this._v_object._html += this._setting.fn_chunked(_inital, _from, this._setting.source);
            this._v_object._html += this._tr_scroll(tr_ultimo, _missing * this._setting._length_tr);
            this._v_object._rendering_table(this._setting.id_tbody);
            console.log("inicial_________:____" + _inital);
            console.log("total renderizado:____" +( _from- _inital));
        }
    };
    VirtualScroll.prototype._get_container = function () {
        var _register = this._get_top() + this._get_length_viewver();
        var result = this._container(_register);
        //decimal
        if (result.toString().split('.').length == 2) {
            var _decimal = parseFloat(result.toString().split('.')[1].substr(0, 1));
            if (_decimal > 0) {
                result += 1;
            }
        }
        // if (result == 0) {
        //     result = 1;
        // }
        return result;
    };
    VirtualScroll.prototype._container = function (_register) {
        return Math.ceil(_register / this._v_object._from);
    };
    return VirtualScroll;
}());

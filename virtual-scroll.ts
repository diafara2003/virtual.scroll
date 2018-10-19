
interface fn_chunked {

    (_i: number, _f: number, source: []): string;
}


interface StartUp {
    id_tbody: string;
    id_visor: string;
    source: [];
    _length_tr: number;
    fn_chunked: fn_chunked;
}

class VirtualObject {

    _html: string = "";
    _from: number = 0;
    _inital: number = 0;
    _length_Datos: number = 0;
    _scroll: number = 0;
    _container: number = 1;


    _rendering_table(id: string): void {
        let _table: HTMLElement | null = document.getElementById(id);

        if (_table != null) {
            _table.innerHTML = this._html;
        }

    }


}

const tr_primero: string = "tr_primero";
const tr_ultimo: string = "tr_ultimo";

class VirtualScroll {

    _setting: StartUp;
    _v_object: VirtualObject;


    constructor(_inital: StartUp) {
        this._setting = _inital;
        this._v_object = new VirtualObject();

        this._init();

    }

    _init(): void {

        this._v_object._from = Math.floor(this._length_viewer())+20;
        this._v_object._length_Datos = this._setting.source.length;
        let _missing = this._v_object._length_Datos - this._v_object._from;

        this._v_object._html += this._tr_scroll(tr_primero, 0);
        this._v_object._html += this._setting.fn_chunked(this._v_object._inital, this._v_object._from, this._setting.source);
        this._v_object._html += this._tr_scroll(tr_ultimo, _missing * this._setting._length_tr);
        this._v_object._rendering_table(this._setting.id_tbody);
        console.log("total renderizado:____" +  this._v_object._from);
        let _visor_scrollind: HTMLElement | null = document.getElementById(this._setting.id_visor);

        if (_visor_scrollind != null) {

            _visor_scrollind.addEventListener('scroll', (e) => {

                if (_visor_scrollind != null) {
                    this._scrolling(_visor_scrollind.scrollTop);
                }
            });
 
        }
    }
    _length_viewer(): number {

        var _length = document.getElementById(this._setting.id_visor);

        if (_length != null) {
            return (_length.offsetHeight / this._setting._length_tr);
        } else {
            return 0;
        }

    }

    _tr_scroll(id: string, _length: number): string {

        let _html_tr = '';
        _html_tr = '<tr><td id=' + id + ' style="height:' + _length + 'px"></td></tr>';

        return _html_tr;

    }

    _chunked(_i: number,_f:number): string {
        let _html: string = this._setting.fn_chunked(_i, _f, this._setting.source);

        return _html;
    }


    _get_length_viewver(): number {

        let _el: HTMLElement | null = document.getElementById(this._setting.id_visor);
        if (_el != null) {
            return Math.floor(_el.offsetHeight / this._setting._length_tr) - 1;
        } else {
            return 0;
        }
    }

    _get_top(): number {
        let result: number = Math.floor(this._v_object._scroll / this._setting._length_tr);

        if ((result + this._get_length_viewver()) > this._v_object._length_Datos) {
            result = this._v_object._length_Datos - this._get_length_viewver();

        }

        return result;
    }

    _get_bottom(): number {
        let result: number = this._v_object._from - (this._get_top() + this._get_length_viewver());

        return result < 0 ? 0 : result;
    }

    _scrolling(_scrolled: number): void {
debugger;
        this._v_object._scroll = _scrolled;
        let _container = this._get_container();

        if (_container != this._v_object._container) {

            this._v_object._container = _container;
            console.log("contenedor:__________" + this._v_object._container);
            let _from = this._v_object._from * this._v_object._container;
            let _inital = this._v_object._from * (this._v_object._container - 1) - this._get_length_viewver();
            let _missing: number = this._v_object._length_Datos - _from;

            if (_inital < 0) {
                _inital = 0;
            }

            if (_from>this._v_object._length_Datos) {
                _from = this._v_object._length_Datos;
            }
            this._v_object._html = '';
            this._v_object._html += this._tr_scroll(tr_primero, _inital * this._setting._length_tr);
            this._v_object._html += this._setting.fn_chunked(_inital, _from, this._setting.source);
            this._v_object._html += this._tr_scroll(tr_ultimo, _missing * this._setting._length_tr);
            this._v_object._rendering_table(this._setting.id_tbody);


            console.log("inicial_________:____" + _inital);
            console.log("total renderizado:____" + (_from-_inital));

        }

    }

    _get_container(): number {
        
        let _register = this._get_top() + this._get_length_viewver();
        let result: number = this._container(_register);

        //decimal
        if (result.toString().split('.').length == 2) {
            let _decimal: number = parseFloat(result.toString().split('.')[1].substr(0, 1));

            if (_decimal > 0) {
                result += 1;
            }
        }

        return result;

    }
    _container(_register: number): number {

        return Math.ceil(_register / this._v_object._from);
    }

}


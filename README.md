# virtual.scroll
proyecto de virtual scroll realizado en javascript para poder
renderizar mucha informacion y no satuar el DOM al momento de
insertarlos


This is a simple component that can be dropped into any JavaScript application and provide a virtual scrolling area that is highly performant and lightweight. With zero dependencies 

####**HTML code**

                                          EXAMPLE

HTML Code

```html
  <div id="visor" style="height: 500px;overflow: auto;width: 100%">
        <table id="tabledatos" style="widows: 100%;">
            <thead>
                <tr>
                    <th>position</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Color</th>
                    <th>Deporte</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody id="tbodydatos"></tbody>
        </table>
    </div>

```

JavaScript Code

```javascript
     var vs = new VirtualScroll({ id_tbody: "tbodydatos", id_visor: "visor", source: cargar_informacion(), _length_tr: 15, fn_chunked: renderizar_tabla_html });

        function cargar_informacion() {
            var source = [];
            for (let i = 0; i < 2000; i++) {
                source.push({
                    firstName: "John",
                    lastName: "Doe",
                    age: 50,
                    eyeColor: "blue",
                    sport: "Micro",
                    mail: "jaud_@hotmsi.com"
                });

            }
            return source;
        }


        function renderizar_tabla_html(_i, f, source) {

            var _html = '';
            for (let i = _i; i < f; i++) {
                const element = source[i];

                if (element == undefined) {
                    break;
                }
                _html += '<tr>';
                _html += '<td>' + (i + 1) + '</td>';
                _html += '<td>' + element.firstName + '</td>';
                _html += '<td>' + element.lastName + '</td>';
                _html += '<td>' + element.age + '</td>';
                _html += '<td>' + element.eyeColor + '</td>';
                _html += '<td>' + element.sport + '</td>';
                _html += '<td>' + element.mail + '</td>';

                _html += '<td>' + element.firstName + '</td>';
                _html += '<td>' + element.lastName + '</td>';
                _html += '<td>' + element.age + '</td>';
                _html += '<td>' + element.eyeColor + '</td>';
                _html += '<td>' + element.sport + '</td>';
                _html += '<td>' + element.mail + '</td>';

                _html += '<td>' + element.firstName + '</td>';
                _html += '<td>' + element.lastName + '</td>';
                _html += '<td>' + element.age + '</td>';
                _html += '<td>' + element.eyeColor + '</td>';
                _html += '<td>' + element.sport + '</td>';
                _html += '<td>' + element.mail + '</td>';
                _html += '</tr>';
            }

            return _html;
        }

```


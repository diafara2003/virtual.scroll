# virtual.scroll
proyecto de virtual scroll realizado en javascript para poder
renderizar mucha informacion y no satuar el DOM al momento de
insertarlos


This is a simple component that can be dropped into any JavaScript application and provide a virtual scrolling area that is highly performant and lightweight. With zero dependencies 


EXAMPLE HTML

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

//Mensajes//
//Consultar Mensajes
function traerInformacionMensajes(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}

function pintarRespuestaMensajes(respuesta){

    let myTable=`<table border="1">
        <tr>        
        <th>Mensaje</th> 
        <th>Cliente</th>   
        <th>Ortopedic</th>   
        </tr>`;
        for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].messageText}</td>
        <td>${respuesta[i].client.name}</td>
        <td>${respuesta[i].ortopedic.name}</td>
        <td>
        <button onclick="borrarMensajes(${respuesta[i].idMessage})">Borrar</button>
        <button onclick="actualizarInformacionMensajes(${respuesta[i].idMessage})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}
//Guardar Mensajes
function guardarInformacionMensajes(){
    let var5 = {
        messageText:$("#MmessageText").val(),
        client:{idClient: +$("#select-client").val()},
        ortopedic:{id: +$("#select-ortopedic").val()},
        };
    
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),
        
        url:"http://localhost:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}
//Actualizar Mensajes
function actualizarInformacionMensajes(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#MmessageText").val(),
        };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#MmessageText").val("");            
            traerInformacionMensajes();
            alert("Se ha Actualizado correctamente el mensaje")
        }
    });

}

//Borrar Mensajes
function borrarMensajes(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        idMessage:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionMensajes();
            alert("Se ha Eliminado Mensaje")
        }
    });

}
//Validar Cliente-Mensaje
function autoInicioClienteM(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    })
}
//Validar Ortopedic-Mensaje
function autoInicioOrtopedicM(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Ortopedic/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-ortopedic");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}
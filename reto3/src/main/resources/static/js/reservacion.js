//Reservaciones//
//Consultar Reservaciones
function traerInformacionReservaciones(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}

function pintarRespuestaReservaciones(respuesta){

    let myTable=`<table border="1">
    <tr>  
        <th>Id</th>      
        <th>Fecha de Inicio</th>
        <th>Fecha de Devolucion</th>     
        <th>Estado</th> 
        <th>Cliente</th> 
        <th>Ortopedic</th>   
        </tr>`;
    for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].idReservation}</td>
        <td>${respuesta[i].startDate}</td>
        <td>${respuesta[i].devolutionDate}</td>
        <td>${respuesta[i].status}</td>
        <td>${respuesta[i].client.name}</td>
        <td>${respuesta[i].ortopedic.name}</td>
        <td>
        <button onclick="borrarReservaciones(${respuesta[i].idReservation})">Borrar</button>
        <button onclick="actualizarInformacionReservaciones(${respuesta[i].idReservation})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}
//Guardar Reservaciones
function guardarInformacionReservaciones(){
    let var6 = {
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
        status:$("#Rstatus").val(),
        client:{idClient: +$("#select-client2").val()},
        ortopedic:{id: +$("#select-ortopedic2").val()},
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),
        
        url:"http://localhost:8080/api/Reservation/save",
       
        
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

//Actualizar Reservaciones
function actualizarInformacionReservaciones(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
        status:$("#Rstatus").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#RstartDate").val("");
            $("#RdevolutionDate").val("");
            $("#Rstatus").val("");
            traerInformacionReservaciones();
            alert("Se ha Actualizado correctamente la reservacion")
        }
    });

}
//Borrar Reservaciones
function borrarReservaciones(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        idReservation:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionReservaciones();
            alert("Se ha Eliminado Reservacion")
        }
    });

}

//Validar Cliente-Reservacion
function autoInicioClienteR(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client2");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    })
}
//Validar Ortopedic-Reservacion
function autoInicioOrtopedicR(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Ortopedic/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-ortopedic2");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}
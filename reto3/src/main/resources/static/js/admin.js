//Admin//
//Consultar Admin
function traerInformacionAdministradores(){
    $.ajax({
        url:"http://localhost:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdministradores(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}

function pintarRespuestaAdministradores(respuesta){

    let myTable=`<table border="1">
        <tr>        
        <th>Nombre</th>
        <th>Email</th> 
        <th>Password</th>       
        </tr>`;
    for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].email}</td>
        <td>${respuesta[i].password}</td>
        <td>
        <button onclick="borrarAdministradores(${respuesta[i].idAdmin})">Borrar</button>
        <button onclick="actualizarInformacionAdministradores(${respuesta[i].idAdmin})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+="</table>";
    $("#resultado6").html(myTable);
}
//Guardar Admin
function guardarInformacionAdministradores(){
    let var7 = {
        name:$("#Aname").val(),
        email:$("#Aemail").val(),
        password:$("#Apassword").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var7),
        
        url:"http://localhost:8080/api/Admin/save",
       
        
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
//Actualizar Administradores
function actualizarInformacionAdministradores(idElemento){
    let myData={
        idAdmin:idElemento,
        name:$("#Aname").val(),
        email:$("#Aemail").val(),
        password:$("#Apassword").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Admin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idAdmin").val("");
            $("#Aname").val("");
            $("#Aemail").val("");
            $("#Apassword").val("");
            traerInformacionAdministradores();
            alert("Se ha Actualizado correctamente Administrador")
        }
    });

}
//Borrar Administradores
function borrarAdministradores(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        idAdmin:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Admin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionAdministradores();
            alert("Se ha Eliminado Administrador")
        }
    });

}
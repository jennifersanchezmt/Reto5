//Clientes//
//Consultar Clientes
function traerInformacionClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}
function pintarRespuestaClientes(respuesta){

    let myTable=`<table border="1">
    <tr>        
    <th>Nombre</th>
    <th>Email</th>
    <th>Password</th> 
    <th>Edad</th>         
    </tr>`;
    for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].email}</td>
        <td>${respuesta[i].password}</td>     
        <td>${respuesta[i].age}</td>
        <td>
        <button onclick="borrarClientes(${respuesta[i].idClient})">Borrar</button>
        <button onclick="actualizarInformacionClientes(${respuesta[i].idClient})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+=`</table>`;
    $("#resultado3").html(myTable);
}
//Guardar Clientes
function guardarInformacionClientes(){
    let var4 = {
        name:$("#CLname").val(),
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),        
        age:$("#CLage").val(),
        };
        console.log(var4);      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var4),
        
        url:"http://localhost:8080/api/Client/save",
       
        
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
//Actualizar Clientes
function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:idElemento,
        name:$("#CLname").val(),
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        age:$("#CLage").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#CLname").val("");
            $("#CLemail").val("");
            $("#CLpassword").val("");
            $("#CLage").val("");
            traerInformacionClientes();
            alert("Se ha Actualizado correctamente Cliente")
        }
    });

}
//Borrar Clientes
function borrarClientes(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        idClient:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado Cliente")
        }
    });

}
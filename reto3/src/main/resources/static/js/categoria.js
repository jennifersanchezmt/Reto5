//Categoria//
//Consultar Categoria
function traerInformacionCategorias(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable=`<table border="1">
        <tr>                
        <th>Nombre</th>
        <th>Descripcion</th>        
        </tr>`;
    for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>        
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].description}</td>            
        <td>
        <button onclick="borrarCategorias(${respuesta[i].id})">Borrar</button>
        <button onclick="actualizarInformacionCategorias(${respuesta[i].id})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+=`</table>`;
    $("#resultado1").html(myTable);
}
//Guardar Categoria
function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };

        console.log(var2);

        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
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

//Actualizar Categoria
function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}

//Borrar Categoria
function borrarCategorias(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado Categoria")
        }
    });

}
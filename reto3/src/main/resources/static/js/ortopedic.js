//Ortopedic//
//Consultar Ortopedic
function traerInformacionOrtopedic(){
    $.ajax({
        url:"http://localhost:8080/api/Ortopedic/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaOrtopedic(respuesta);
        }
    });
}

function pintarRespuestaOrtopedic(respuesta){

    let myTable=`<table border="1">
    <tr> 
        <th>Marca</th>  
        <th>Año</th>            
        <th>Nombre</th>
        <th>Descripcion</th>    
        <th>Categoria</th>           
        </tr>`;
    for(let i=0;i<respuesta.length;i++){
        myTable+=`<tr>        
        <td>${respuesta[i].brand}</td>
        <td>${respuesta[i].year}</td>        
        <td>${respuesta[i].name}</td>      
        <td>${respuesta[i].description}</td>
        <td>${respuesta[i].category.name}</td>
        <td>
        <button onclick="borrarOrtopedic(${respuesta[i].id})">Borrar</button>
        <button onclick="actualizarInformacionOrtopedic(${respuesta[i].id})">Actualizar</button>
        </td>      
        </tr>`;
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
//Guardar Ortopedic
function guardarInformacionOrtopedic(){
    let var3 = {
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),        
        name:$("#Oname").val(),               
        description:$("#Odescription").val(),  
        category:{id: +$("#select-category").val()},            
        };
        console.log(var3);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://localhost:8080/api/Ortopedic/save",
       
        
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
//Actualizar Ortopedic
function actualizarInformacionOrtopedic(idElemento){
    let myData={
        id:idElemento,
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        name:$("#Oname").val(),
        description:$("#Odescription").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Ortopedic/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Obrand").val("");
            $("#Oyear").val("");
            $("#Oname").val("");
            $("#Odescription").val("");
            traerInformacionOrtopedic();
            alert("Se ha actualizado correctamente Ortopedic")
        }
    });

}
//Borrar Ortopedic
function borrarOrtopedic(idElemento){
    console.log("ejecutando funcion para eliminar");
    let myData={
        id:idElemento
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Ortopedic/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionOrtopedic();
            alert("Se ha Eliminado Ortopedic")
        }
    });

}
//Validar Categoria
function autoInicioCategoria(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}
var firebaseConfig = {
    apiKey: "AIzaSyC77Q0s5x49rdKQvDB0DY1J9cnYotV4Bg4",
    authDomain: "proyectobautista-b80db.firebaseapp.com",
    databaseURL: "https://proyectobautista-b80db-default-rtdb.firebaseio.com",
    projectId: "proyectobautista-b80db",
    storageBucket: "proyectobautista-b80db.appspot.com",
    messagingSenderId: "362589224902",
    appId: "1:362589224902:web:564d9ad46a029f4c32fcc7",
    measurementId: "G-ZL345F7J4T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='Selecciona país';
    document.getElementById("Input7").value='Selecciona';
}
function createR() {
    //Guardo los datos capturados usando el id de cada control
    var nombre = document.getElementById("Input1").value;
    var productoCode = document.getElementById("Input2").value;
    var cantidad = document.getElementById("Input3").value;
    var descripcion = document.getElementById("Input4").value;
    var precio = document.getElementById("Input5").value;
    var paisOrigen = document.getElementById("Input6").value;
    var categoriaProducto = document.getElementById("Input7").value;

    //validaciones
    if (productoCode.length > 0) {
        //creo un objeto que guarda los datos
        var producto = {
            nombre, 
            productoCode,
            cantidad,
            descripcion,
            precio,
            paisOrigen,
            categoriaProducto,
        }

        //console.log(alumno);

        firebase.database().ref('Productos/' + productoCode).update(producto).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input2").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Productos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(producto){
    
    if(producto!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = producto.nombre;
        cell2.innerHTML = producto.productoCode; 
        cell3.innerHTML = producto.cantidad;
        cell4.innerHTML = producto.descripcion; 
        cell5.innerHTML = producto.precio; 
        cell6.innerHTML = producto.paisOrigen; 
        cell7.innerHTML = producto.categoriaProducto; 
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${producto.productoCode})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+producto.productoCode+')">Modificar</button>';
    }
}

function deleteR(productoCode){
    firebase.database().ref('Productos/' + productoCode).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(productoCode){
    var ref = firebase.database().ref('Productos/' + productoCode);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(productoCode){
    if(productoCode!=null)
    {
        document.getElementById("Input1").value=producto.nombre;
        document.getElementById("Input2").disabled = true;
        document.getElementById("Input2").value=producto.productoCode;
        document.getElementById("Input3").value=producto.cantidad;
        document.getElementById("Input4").value=producto.descripcion;
        document.getElementById("Input5").value=producto.precio;
        document.getElementById("Input6").value=producto.paisOrigen;
        document.getElementById("Input7").value=producto.categoriaProducto;
    }
}


//Para consulta de producto
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input7").value;

    var ref = firebase.database().ref("Productos");
    ref.orderByChild("categoriaProducto").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(producto){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = producto.nombre;
    cell2.innerHTML = producto.productoCode; 
    cell3.innerHTML = producto.cantidad;
    cell4.innerHTML = producto.descripcion; 
    cell5.innerHTML = producto.precio; 
    cell6.innerHTML = producto.paisOrigen; 
    cell7.innerHTML = producto.categoriaProducto; 
}
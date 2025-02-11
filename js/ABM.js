


import { eliminarContrato, fetcher, getSupa, renderContratos, createContratoRow, editarContrato, createContratoItem  } from "/js/funciones.js";
console.log(eliminarContrato);

document.addEventListener('DOMContentLoaded', function () {
    const cargarButton = document.getElementById('cargar');
    const newContratoSection = document.getElementById('newContrato');
    const formNuevoContrato = document.getElementById('formNuevoContrato');
    const btnCancelar = document.getElementById('btnCancelar');
    
    
    $(document).ready(function () {
        $('#myTable').DataTable();
    });

    //* ahi tenes de manera simple como se guarda la data
    //? fetcher("POST",{nombre:"hola"})
    getSupa();
    //fetcher("GET").then((res)=>console.log({res}))

    cargarButton.addEventListener('click', function () {
        newContratoSection.style.display = 'block';
        
        
        
    });
    btnCancelar.addEventListener('click', function () {
        newContratoSection.style.display = 'none';
        
        
    });
    

    formNuevoContrato.addEventListener('submit', function (event) {
        event.preventDefault();
       
        let newContrato = {};
        newContrato.nombre = document.getElementById('nuevo_nombre').value;
        newContrato.descripcion = document.getElementById('nuevo_descripcion').value;
        newContrato.manager = document.getElementById('nuevo_manager').value;
        newContrato.cliente = document.getElementById('nuevo_cliente').value;
        newContrato.unidad_negocio = document.getElementById('nuevo_unidad_negocio').value;
        newContrato.tipo_contrato = document.getElementById('nuevo_tipo_contrato').value;
        newContrato.fecha_inicio = document.getElementById('nuevo_fecha_inicio').value;
        newContrato.fecha_fin = document.getElementById('nuevo_fecha_fin').value;
        console.log("se toco el formNuevoContrato ")
        newContrato.id = new Date().getTime();

         createContratoItem(newContrato);

        fetcher("POST", newContrato).then(contratoNuevo => { console.log(contratoNuevo) });

        
        

        formNuevoContrato.reset();
        newContratoSection.style.display = 'none';
        Swal.fire({
            position: "absolute",
            icon: "success",
            title: "El contrato fue Guardado",
            showConfirmButton: false,
            timer: 1500
          });


    });
    
});
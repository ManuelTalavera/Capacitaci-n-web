export const fetcher = async (method, data, param) => {
    const body = data ? JSON.stringify(data) : undefined;
    let urlBase = 'https://susaqrgcnsnzsovimyim.supabase.co/rest/v1/test';

    if (param) {
        urlBase = urlBase + "?id=eq."+ param; 
        console.log("URL final:", urlBase); 

    }
    console.log("url: ", urlBase)
    const res = await fetch(urlBase, {
        headers: {
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1c2FxcmdjbnNuenNvdmlteWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MDk4ODgsImV4cCI6MjA0ODk4NTg4OH0.HrlXcefmq87bNbW3esH2WuTV32Zv_bJioMrMlHphfA8',
            "Content-Type": "application/json",
        },
        method,
        body,
    });

    if (!res.ok) {
        console.error(`HTTP Error: ${res.status}`);
        return null; 
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return await res.json(); 
    } else {
        console.warn("La respuesta no contiene JSON");
        return null;
    }
};
let allContratos = [];
let tabla;
$(document).ready(function () {
    tabla = $("#myTable").DataTable({
        lengthChange: false
    }); 
});
export const renderContratos = (_allContratos) => {
    tabla.clear().draw(); 

    _allContratos.forEach(contrato => {
        let contratoRow = createContratoRow(contrato);
        tabla.row.add($(contratoRow)).draw(false); 
    });
};
export const getSupa = () => {
    fetcher("GET").then(_contratos => {
        allContratos = _contratos;
        renderContratos(allContratos);
    });
}

export const createContratoRow = (contrato) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${contrato.nombre}</td>
        <td>${contrato.cliente}</td>
        <td>${contrato.fecha_inicio}</td>
        <td>${contrato.fecha_fin}</td>
        <td>
            <button class="btnEditar" data-id="${contrato.id}">Editar</button>
            <button class="btnEliminar" data-id="${contrato.id}">Eliminar</button>
        </td>
    `;

    
    row.querySelector(".btnEditar").addEventListener("click", () => editarContrato(contrato));
    row.querySelector(".btnEliminar").addEventListener("click", () => mensajeEliminar(contrato.id, row) );

    return row;
};

export const editarContrato = (contrato) => {
    console.log(contrato);
    const modContrato = document.getElementById("modificarContrato");
    modContrato.style.display = "block";
    const btnCancelar2 = document.getElementById('btnCancelar2');
    document.getElementById("mod_nombre").value = contrato.nombre;
    document.getElementById("mod_descripcion").value = contrato.descripcion;
    document.getElementById("mod_manager").value = contrato.manager;
    document.getElementById("mod_cliente").value = contrato.cliente;
    document.getElementById("mod_unidad_negocio").value = contrato.unidad_negocio;
    document.getElementById("mod_tipo_contrato").value = contrato.tipo_contrato;
    document.getElementById("mod_fecha_inicio").value = contrato.fecha_inicio;
    document.getElementById("mod_fecha_fin").value = contrato.fecha_fin;

    document.getElementById("btnActualizar").onclick = function (e) {
        e.preventDefault();
        Swal.fire({
            title: "¿Estas seguro/a de editar este contrato?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Editalo",
            cancelButtonText: "No"
          }).then((result) => {
            if (result.isConfirmed) {
                

                const updatedContrato = {
                    nombre: document.getElementById("mod_nombre").value, 
                    descripcion: document.getElementById("mod_descripcion").value,
                    manager: document.getElementById("mod_manager").value,
                    cliente: document.getElementById("mod_cliente").value,
                    unidad_negocio: document.getElementById("mod_unidad_negocio").value,
                    tipo_contrato: document.getElementById("mod_tipo_contrato").value,
                    fecha_inicio: document.getElementById("mod_fecha_inicio").value,
                    fecha_fin: document.getElementById("mod_fecha_fin").value,
                };
        
                fetcher("PATCH", updatedContrato, contrato.id).then(() => {
        
                });
                
              Swal.fire({
                title: "Editado",
                text: "El contrato fue Editado",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              modContrato.style.display = 'none';
            }
            getSupa();
          });
       
        
    };
    btnCancelar2.addEventListener('click', function () {
        modContrato.style.display = 'none';
        console.log("se toco");
    });
};

export const createContratoItem = (contrato) => {
    let newRow = tabla.row.add([
        contrato.nombre,
        contrato.cliente,
        contrato.fecha_inicio,
        contrato.fecha_fin,
        `<button class="btnEditar">Editar</button>  
        <button class="btnEliminar">Eliminar</button>`
    ]).draw(false).node();

    $(newRow).find(".btnEliminar").on("click", function () {
        mensajeEliminar(contrato.id, newRow);
    });
    $(newRow).find(".btnEditar").on("click", function () {
        editarContrato(contrato, newRow);
    });

    return newRow;
};

 const mensajeEliminar = (id, row) => {
    Swal.fire({
        title: "¿Estas seguro/a?",
        text: "No vas a poder recuperar el contrato",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borralo",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarContrato(id, row)
          Swal.fire({
            title: "Borrado",
            text: "El contrato fue borrado",
            icon: "success"
          });
        }
      });
}

export const eliminarContrato = (id, row) => {
    fetcher("DELETE", null, id).then((response) => {
        if (response) {
            row.remove();
        } else {
            row.remove();
        }
    });
};


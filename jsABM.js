/*const fetcher = async (method,data,param)=>{
    const body = data ? JSON.stringify(data):undefined
    const urlBase ='https://susaqrgcnsnzsovimyim.supabase.co/rest/v1/test'
    if(param) urlBase + param
    const res = await fetch(urlBase,{
        headers:{apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1c2FxcmdjbnNuenNvdmlteWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MDk4ODgsImV4cCI6MjA0ODk4NTg4OH0.HrlXcefmq87bNbW3esH2WuTV32Zv_bJioMrMlHphfA8',
        "Content-Type":"application/Json" 
        },
        method,body, mode: "no-cors"
    })
    if(res.status <= 200)
        return await res.json()

}*/


let allContratos = [];
const renderContratos = (_allContratos) => {
    for (let i = 0; i < _allContratos.length; i++) {

        let contratoItem = createContratoItem(_allContratos[i]);
        listaContratos.appendChild(contratoItem);
    }
}
const getSupa = () => {
    fetcher("GET").then(_contratos => {
        allContratos = _contratos;
        renderContratos(allContratos);
    });
}
const createContratoItem = (contrato) => {
    const modContrato = document.getElementById('modificarContrato');
    const contratoItem = document.createElement('li');

    contratoItem.textContent = `Nombre: ${contrato.nombre}, Cliente: ${contrato.cliente}, Fecha de Inicio: ${contrato.fecha_inicio}, Fecha de Fin: ${contrato.fecha_fin}`;
    contratoItem.dataset.id = contrato.id;
    contratoItem.dataset.nombre = contrato.nombre;
    contratoItem.dataset.descripcion = contrato.descripcion;
    contratoItem.dataset.manager = contrato.manager;
    contratoItem.dataset.cliente = contrato.cliente;
    contratoItem.dataset.unidad_negocio = contrato.unidad_negocio;
    contratoItem.dataset.tipo_contrato = contrato.tipo_contrato;
    contratoItem.dataset.fecha_inicio = contrato.fecha_inicio;
    contratoItem.dataset.fecha_fin = contrato.fecha_fin;

    contratoItem.addEventListener('click', function () {
        
        modContrato.style.display = 'block';
        const btnActualizar = document.getElementById('btnActualizar');
        const btnCancelar2 = document.getElementById('btnCancelar2');
        const btnEliminar = document.getElementById('btnEliminar');
        document.getElementById('mod_nombre').value = contratoItem.dataset.nombre;
        document.getElementById('mod_descripcion').value = contratoItem.dataset.descripcion;
        document.getElementById('mod_manager').value = contratoItem.dataset.manager;
        document.getElementById('mod_cliente').value = contratoItem.dataset.cliente;
        document.getElementById('mod_unidad_negocio').value = contratoItem.dataset.unidad_negocio;
        document.getElementById('mod_tipo_contrato').value = contratoItem.dataset.tipo_contrato;
        document.getElementById('mod_fecha_inicio').value = contratoItem.dataset.fecha_inicio;
        document.getElementById('mod_fecha_fin').value = contratoItem.dataset.fecha_fin;

        console.log(contratoItem.dataset.id);
        btnEliminar.addEventListener('click', function () {
            fetcher("DELETE", null, contratoItem.dataset.id).then(response => {
                if (response) {
                    contratoItem.remove();
                    modContrato.style.display = 'none';
                } else {
                    console.error("Error al eliminar el contrato.");
                    contratoItem.remove();
                    modContrato.style.display = 'none';
                }
            });
        });
        btnActualizar.addEventListener('click', function () {
            const updatedContrato = {
                nombre: document.getElementById('mod_nombre').value,
                descripcion: document.getElementById('mod_descripcion').value,
                manager: document.getElementById('mod_manager').value,
                cliente: document.getElementById('mod_cliente').value,
                unidad_negocio: document.getElementById('mod_unidad_negocio').value,
                tipo_contrato: document.getElementById('mod_tipo_contrato').value,
                fecha_inicio: document.getElementById('mod_fecha_inicio').value,
                fecha_fin: document.getElementById('mod_fecha_fin').value,
            };

            fetcher("PATCH", updatedContrato, contratoItem.dataset.id).then(response => {
                if (response) {
                    contratoItem.textContent = `Nombre: ${updatedContrato.nombre}, Cliente: ${updatedContrato.cliente}, Fecha de Inicio: ${updatedContrato.fecha_inicio}, Fecha de Fin: ${updatedContrato.fecha_fin}`;
                    contratoItem.dataset.nombre = updatedContrato.nombre;
                    contratoItem.dataset.descripcion = updatedContrato.descripcion;
                    contratoItem.dataset.manager = updatedContrato.manager;
                    contratoItem.dataset.cliente = updatedContrato.cliente;
                    contratoItem.dataset.unidad_negocio = updatedContrato.unidad_negocio;
                    contratoItem.dataset.tipo_contrato = updatedContrato.tipo_contrato;
                    contratoItem.dataset.fecha_inicio = updatedContrato.fecha_inicio;
                    contratoItem.dataset.fecha_fin = updatedContrato.fecha_fin;
                } else {
                    console.error("Error al eliminar el contrato.");
                }
            });


            modContrato.style.display = 'none';
        });
        btnCancelar2.addEventListener('click', function () {
            modContrato.style.display = 'none';
        });

    });

    return contratoItem;
};


const fetcher = async (method, data, param) => {
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

document.addEventListener('DOMContentLoaded', function () {
    const cargarButton = document.getElementById('cargar');
    const newContratoSection = document.getElementById('newContrato');
    const formNuevoContrato = document.getElementById('formNuevoContrato');
    const btnCancelar = document.getElementById('btnCancelar');
    const listaContratos = document.getElementById('listaContratos');

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

        newContrato.id = new Date().getTime();

        const contratoItem = createContratoItem(newContrato);

        fetcher("POST", newContrato).then(contratoNuevo => { console.log(contratoNuevo) });

        allContratos.push(newContrato);
        listaContratos.appendChild(contratoItem)

        formNuevoContrato.reset();
        newContratoSection.style.display = 'none';
        


    });
    
});
/*btnEliminar.addEventListener('click', function () {
            fetcher("DELETE", null, contratoItem.dataset.id).then(response => {
                if (response) {
                    contratoItem.remove();
                } else {
                    console.error("Error al eliminar el contrato.");
                }
            });
        });*/

//* mejorar el indentado
        contratoItem.addEventListener('click', function () {
        
            modContrato.style.display = 'block';
    
           
            const btnActualizar = document.getElementById('btnActualizar');
           
   
            document.getElementById('mod_nombre').value = contratoItem.dataset.nombre;
            document.getElementById('mod_descripcion').value = contratoItem.dataset.descripcion;
            document.getElementById('mod_manager').value = contratoItem.dataset.manager;
            document.getElementById('mod_cliente').value = contratoItem.dataset.cliente;
            document.getElementById('mod_unidad_negocio').value = contratoItem.dataset.unidad_negocio;
            document.getElementById('mod_tipo_contrato').value = contratoItem.dataset.tipo_contrato;
            document.getElementById('mod_fecha_inicio').value = contratoItem.dataset.fecha_inicio;
            document.getElementById('mod_fecha_fin').value = contratoItem.dataset.fecha_fin;
    //* como mejorar esta logica???
    /**
     * const {dataset} = contratoItem //*destructuring
     *  const items = Object.key(dataset) //*claves del objeto
     *  items.forEach((element)=>{ //*itero claves
     * document.getElementById(`mod_${element}`).value = dataset[element] //*asigno las claves al elemento
     * })
     */ 
            console.log(contratoItem.dataset.id);
    
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
                        //*si es un patch no elimina actualiza
                    }
                });
    
    
                modContrato.style.display = 'none';
            });
    
        });
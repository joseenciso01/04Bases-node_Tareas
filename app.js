require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInputInput, 
        leerInput,
        listadoTareaBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirerjs');

const Tareas = require('./helpers/models/tareas');

const main = async () => {
    console.log('HOLA MUNDO CRUEL');

    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if ( tareasDB ) {
            //Establecer las tareas
            tareas.cargarTareasFromArray( tareasDB );
    }
    
    do {
       opt = await inquirerMenu();
              
       switch (opt) {
        case '1': //Crear Tarea
            const desc = await leerInput('Descripcion:');
            tareas.crearTarea( desc );
        break;

        case '2': //Listar Tarea
             tareas.listadoCompleto();
            //console.log ( tareas.listadoArr ) ;
        break;

        case '3': //Listar Tareas completadas
              tareas.listarTareasCompletadasPendientes(true);
        break;
        
        case '4': //Listar Tareas pendientes
              tareas.listarTareasCompletadasPendientes(false);
        break;
        
        case '5': //Completar tarea(s)
              const ids = await mostrarListadoChecklist( tareas.listadoArr );
              tareas.toogleCompletadas ( ids );
              
        break;
        
        case '6': //Borrar Tarea
              const id = await listadoTareaBorrar( tareas.listadoArr );
              if ( id !== '0' ){
                    const ok = await confirmar('Está seguro?');
                    if ( ok ) {
                      tareas.borrarTarea( id );
                      console.log('Tarea borrada')
                    }
              }      
        break;

        case '0': //Salir
              break;
        break;

       }

       guardarDB( tareas.listadoArr );


      await pausa(); 

    } while (opt !== '0');
};

main();

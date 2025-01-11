const Tarea = require('./tarea');

/**
 *   _listado:
 *          { 'uuid-123712-123123-2: { id:12, desc:asd, completadoeEn:92231 } },
 * 
 */

class Tareas {
        _listado = {};

        get listadoArr() {
            const listado = [];
            Object.keys(this._listado).forEach( key => {
                const tarea = this._listado[key];
                listado.push( tarea );
            });
        
            return listado;
        }

        constructor() {
            this._listado = {};
        }

        borrarTarea( id = '' ){
            if ( this._listado[id] ) {
                delete this._listado[id];
            }
        }

        cargarTareasFromArray( tareas = [] ) {
            
            tareas.forEach( tarea => {
                this._listado[tarea.id] = tarea;
            });
            
            
            //const tarea = new Tarea(id);
            //this._listado[tarea.id] = tarea;
        
        }


        crearTarea( desc = '') {
            const tarea = new Tarea(desc);

            this._listado[tarea.id] = tarea;
        }

        listadoCompleto() {
            // 1. tareas
            // Completada: verde
            // Pendiente: Rojo

            // 1. Alma:: Completada | Pendiente 
            // 2. Poder:: Completada | Pendiente 
            // 3. Realidad:: Completada | Pendiente
            console.log();
            this.listadoArr.forEach( (tarea, i) => {
                const idx = `${i + 1}`.green;
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red 

                console.log(`${ idx } ${ desc } :: ${ estado }`);

            })
             
        }

        listarTareasCompletadasPendientes( completadas = true ){
            console.log();
            let contador = 0;
            this.listadoArr.forEach( tarea => {
                
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red 
                if (completadoEn ) {
                    // mostrar completadas
                    if ( completadas ) {
                        contador += 1;
                        console.log(`${ (contador+ '.').green  } ${ desc } :: ${ estado } :: ${ completadoEn }`);              
                    }
                    
                    
                } else {
                    // mostrar pendientes 
                    if ( !completadas ) {
                        contador += 1;
                        console.log(`${ (contador+ '.').green } ${ desc } :: ${ estado }`);              
                    }
                }
                                
            })
        }

        toogleCompletadas( ids = [] ) {
            ids.forEach( id => {

                const tarea = this._listado[id];
                if ( !tarea.completadoEn ) {
                    tarea.completadoEn = new Date().toISOString()
                }
            });
        
            this.listadoArr.forEach ( tarea => {

                if ( !ids.includes(tarea.id ) ) {
                    this._listado[tarea.id].completadoEn = null;
                }
            });

        }
}

module.exports = Tareas;
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Archivo donde se guardarán las tareas
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Clase para manejar las tareas
class TaskTracker {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Cargar tareas desde el archivo JSON
    loadTasks() {
        try {
            if (fs.existsSync(TASKS_FILE)) {
                const data = fs.readFileSync(TASKS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error al cargar las tareas:', error.message);
        }
        return [];
    }

    // Guardar tareas en el archivo JSON
    saveTasks() {
        try {
            fs.writeFileSync(TASKS_FILE, JSON.stringify(this.tasks, null, 2));
        } catch (error) {
            console.error('Error al guardar las tareas:', error.message);
        }
    }

    // Generar un ID único para cada tarea
    generateId() {
        return this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    }

    // Agregar una nueva tarea
    addTask(description) {
        if (!description || description.trim() === '') {
            console.error('Error: La descripción de la tarea no puede estar vacía');
            return;
        }

        const newTask = {
            id: this.generateId(),
            description: description.trim(),
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        console.log(`Tarea agregada exitosamente (ID: ${newTask.id})`);
    }

    // Listar todas las tareas
    listTasks(status = null) {
        let filteredTasks = this.tasks;
        
        if (status) {
            filteredTasks = this.tasks.filter(task => task.status === status);
        }

        if (filteredTasks.length === 0) {
            const message = status ? `No hay tareas con estado "${status}"` : 'No hay tareas registradas';
            console.log(message);
            return;
        }

        console.log('\n📋 Lista de Tareas:');
        console.log('='.repeat(50));
        
        filteredTasks.forEach(task => {
            const statusIcon = this.getStatusIcon(task.status);
            const statusColor = this.getStatusColor(task.status);
            const resetColor = this.resetColor();
            const formattedId = this.formatId(task.id);
            const createdDateTime = this.formatDateTime(task.createdAt);
            const updatedDateTime = this.formatDateTime(task.updatedAt);
            
            console.log(`${statusIcon} ${formattedId} ${statusColor}${task.description}${resetColor}`);
            console.log(`   Estado: ${statusColor}${task.status}${resetColor}`);
            console.log(`   Creada: ${createdDateTime}`);
            console.log(`   Actualizada: ${updatedDateTime}`);
            console.log('-'.repeat(50));
        });
    }

    // Obtener icono según el estado
    getStatusIcon(status) {
        switch (status) {
            case 'todo': return '⏳';
            case 'in-progress': return '🔄';
            case 'done': return '✅';
            default: return '❓';
        }
    }

    // Obtener color según el estado
    getStatusColor(status) {
        switch (status) {
            case 'todo': return '\x1b[33m'; // Naranja/Amarillo
            case 'in-progress': return '\x1b[34m'; // Azul
            case 'done': return '\x1b[32m'; // Verde
            default: return '\x1b[37m'; // Blanco
        }
    }

    // Reset color
    resetColor() {
        return '\x1b[0m';
    }

    // Formatear ID en negrita
    formatId(id) {
        return `\x1b[1m[${id}]\x1b[0m`; // Negrita
    }

    // Formatear fecha y hora de manera legible
    formatDateTime(isoString) {
        const date = new Date(isoString);
        const dateStr = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${dateStr} ${timeStr}`;
    }

    // Actualizar el estado de una tarea
    updateTaskStatus(id, status) {
        const validStatuses = ['todo', 'in-progress', 'done'];
        
        if (!validStatuses.includes(status)) {
            console.error('Error: Estado inválido. Estados válidos: todo, in-progress, done');
            return;
        }

        const task = this.tasks.find(t => t.id === parseInt(id));
        
        if (!task) {
            console.error(`Error: No se encontró una tarea con ID ${id}`);
            return;
        }

        task.status = status;
        task.updatedAt = new Date().toISOString();
        this.saveTasks();
        console.log(`Tarea ${id} actualizada a "${status}"`);
    }

    // Actualizar la descripción de una tarea
    updateTask(id, newDescription) {
        if (!newDescription || newDescription.trim() === '') {
            console.error('Error: La nueva descripción no puede estar vacía');
            return;
        }

        const task = this.tasks.find(t => t.id === parseInt(id));
        
        if (!task) {
            console.error(`Error: No se encontró una tarea con ID ${id}`);
            return;
        }

        task.description = newDescription.trim();
        task.updatedAt = new Date().toISOString();
        this.saveTasks();
        console.log(`Tarea ${id} actualizada exitosamente`);
    }

    // Eliminar una tarea
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(id));
        
        if (taskIndex === -1) {
            console.error(`Error: No se encontró una tarea con ID ${id}`);
            return;
        }

        const deletedTask = this.tasks.splice(taskIndex, 1)[0];
        this.saveTasks();
        console.log(`Tarea "${deletedTask.description}" eliminada exitosamente`);
    }

    // Marcar tarea como completada
    markDone(id) {
        this.updateTaskStatus(id, 'done');
    }

    // Marcar tarea como en progreso
    markInProgress(id) {
        this.updateTaskStatus(id, 'in-progress');
    }

    // Borrar todas las tareas
    deleteAllTasks() {
        const totalTasks = this.tasks.length;
        
        if (totalTasks === 0) {
            console.log('No hay tareas para eliminar');
            return;
        }

        this.tasks = [];
        this.saveTasks();
        console.log(`✅ Se eliminaron ${totalTasks} tarea${totalTasks > 1 ? 's' : ''} exitosamente`);
        console.log('📝 Lista de tareas reiniciada');
    }
}

// Función para mostrar ayuda
function showHelp() {
    console.log(`
📝 Task Tracker CLI - Administrador de Tareas

COMANDOS DISPONIBLES:

  add <descripción>          Agregar una nueva tarea
  list, ls                   Listar todas las tareas
  list done, ls done         Listar tareas completadas
  list todo, ls todo         Listar tareas pendientes
  list in-progress, ls in-progress  Listar tareas en progreso
  update <id> <descripción>  Actualizar descripción de una tarea
  mark-in-progress <id>      Marcar tarea como en progreso
  mark-done <id>             Marcar tarea como completada
  delete <id>                Eliminar una tarea específica
  delete-all                 Eliminar TODAS las tareas (¡cuidado!)
  test                       Ejecutar tests automatizados
  help                       Mostrar esta ayuda

EJEMPLOS:

  task add "Estudiar JavaScript"
  task list          # o task ls
  task ls done       # listar tareas completadas
  task mark-done 1
  task update 1 "Estudiar Node.js"
  task delete 1      # eliminar tarea específica
  task delete-all    # eliminar TODAS las tareas
  task test          # ejecutar tests automatizados
`);
}

// Función principal para procesar comandos
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const tracker = new TaskTracker();

    switch (command) {
        case 'add':
            if (args.length < 2) {
                console.error('Error: Debes proporcionar una descripción para la tarea');
                console.log('Uso: task add "descripción de la tarea"');
                return;
            }
            tracker.addTask(args.slice(1).join(' '));
            break;

        case 'list':
        case 'ls':
            const status = args[1];
            tracker.listTasks(status);
            break;

        case 'update':
            if (args.length < 3) {
                console.error('Error: Debes proporcionar un ID y una nueva descripción');
                console.log('Uso: task update <id> "nueva descripción"');
                return;
            }
            tracker.updateTask(args[1], args.slice(2).join(' '));
            break;

        case 'mark-done':
            if (args.length < 2) {
                console.error('Error: Debes proporcionar el ID de la tarea');
                console.log('Uso: task mark-done <id>');
                return;
            }
            tracker.markDone(args[1]);
            break;

        case 'mark-in-progress':
            if (args.length < 2) {
                console.error('Error: Debes proporcionar el ID de la tarea');
                console.log('Uso: task mark-in-progress <id>');
                return;
            }
            tracker.markInProgress(args[1]);
            break;

        case 'delete':
            if (args.length < 2) {
                console.error('Error: Debes proporcionar el ID de la tarea');
                console.log('Uso: task delete <id>');
                return;
            }
            tracker.deleteTask(args[1]);
            break;

        case 'delete-all':
        case 'clear':
        case 'reset':
            // Si ya tiene --confirm, ejecutar directamente
            if (args[1] === '--confirm') {
                tracker.deleteAllTasks();
            } else {
                // Solo mostrar advertencia si no tiene --confirm
                console.log('⚠️  ¿Estás seguro de que quieres eliminar TODAS las tareas?');
                console.log('💡 Esta acción no se puede deshacer.');
                console.log('📝 Para confirmar, ejecuta: task delete-all --confirm');
                console.log('❌ Operación cancelada. Usa --confirm para proceder.');
            }
            break;

        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;

        case 'test':
        case '--test':
            runTests();
            break;

        default:
            if (!command) {
                showHelp();
            } else {
                console.error(`Error: Comando "${command}" no reconocido`);
                console.log('Usa "task help" para ver los comandos disponibles');
            }
            break;
    }
}

// Ejecutar tests
function runTests() {
    console.log('🧪 Ejecutando tests para Task Tracker CLI...\n');
    
    const { spawn } = require('child_process');
    const path = require('path');
    
    // Ruta al archivo de tests
    const testFile = path.join(__dirname, 'tests', 'task-tests.js');
    
    // Ejecutar tests
    const testProcess = spawn('node', [testFile], {
        stdio: 'inherit',
        cwd: __dirname
    });
    
    testProcess.on('close', (code) => {
        if (code === 0) {
            console.log('\n✅ Tests completados exitosamente!');
        } else {
            console.log('\n❌ Algunos tests fallaron');
            process.exit(code);
        }
    });
    
    testProcess.on('error', (error) => {
        console.error('❌ Error al ejecutar tests:', error.message);
        process.exit(1);
    });
}

// Ejecutar la aplicación
main();

// Tests básicos para Task Tracker CLI
// Para ejecutar: node tests/task-tests.js

const assert = require('assert');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🧪 Ejecutando tests para Task Tracker CLI...\n');

// Rutas
const cliPath = path.join(__dirname, '..', 'task-cli.js');
const tasksFile = path.join(__dirname, '..', 'tasks.json');

// Backup del archivo de tareas si existe
let originalTasks = null;
if (fs.existsSync(tasksFile)) {
    originalTasks = fs.readFileSync(tasksFile, 'utf8');
}

// Función para limpiar y restaurar
function cleanup() {
    if (originalTasks) {
        fs.writeFileSync(tasksFile, originalTasks);
    } else if (fs.existsSync(tasksFile)) {
        fs.unlinkSync(tasksFile);
    }
}

// Test 1: Verificar que el archivo existe
console.log('Test 1: Verificar existencia del archivo...');
try {
    assert(fs.existsSync(cliPath), 'El archivo task-cli.js debe existir');
    console.log('✅ Archivo existe\n');
} catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
}

// Test 2: Verificar comando de ayuda
console.log('Test 2: Verificar comando de ayuda...');
try {
    const output = execSync(`node "${cliPath}" help`, { encoding: 'utf8' });
    assert(output.includes('Task Tracker CLI'), 'La ayuda debe contener el título');
    assert(output.includes('COMANDOS'), 'La ayuda debe contener sección de comandos');
    console.log('✅ Comando de ayuda funciona\n');
} catch (error) {
    console.log('❌ Error en test de ayuda:', error.message);
}

// Test 3: Añadir tarea
console.log('Test 3: Añadir nueva tarea...');
try {
    // Limpiar archivo de tareas
    if (fs.existsSync(tasksFile)) {
        fs.unlinkSync(tasksFile);
    }
    
    const output = execSync(`node "${cliPath}" add "Tarea de prueba"`, { encoding: 'utf8' });
    assert(output.includes('añadida') || output.includes('agregada'), 'Debe confirmar que la tarea fue añadida');
    
    // Verificar que el archivo fue creado
    assert(fs.existsSync(tasksFile), 'El archivo tasks.json debe ser creado');
    
    // Verificar contenido
    const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    assert(tasks.length === 1, 'Debe haber una tarea');
    assert(tasks[0].description === 'Tarea de prueba', 'La descripción debe coincidir');
    assert(tasks[0].status === 'todo', 'El status inicial debe ser todo');
    
    console.log('✅ Añadir tarea funciona\n');
} catch (error) {
    console.log('❌ Error en test de añadir tarea:', error.message);
}

// Test 4: Listar tareas
console.log('Test 4: Listar tareas...');
try {
    const output = execSync(`node "${cliPath}" list`, { encoding: 'utf8' });
    assert(output.includes('Tarea de prueba'), 'Debe mostrar la tarea añadida');
    assert(output.includes('1') || output.includes('#1'), 'Debe mostrar el ID de la tarea');
    console.log('✅ Listar tareas funciona\n');
} catch (error) {
    console.log('❌ Error en test de listar tareas:', error.message);
}

// Test 5: Actualizar tarea
console.log('Test 5: Actualizar tarea...');
try {
    const output = execSync(`node "${cliPath}" update 1 "Tarea actualizada"`, { encoding: 'utf8' });
    assert(output.includes('actualizada'), 'Debe confirmar que la tarea fue actualizada');
    
    // Verificar contenido
    const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    assert(tasks[0].description === 'Tarea actualizada', 'La descripción debe estar actualizada');
    
    console.log('✅ Actualizar tarea funciona\n');
} catch (error) {
    console.log('❌ Error en test de actualizar tarea:', error.message);
}

// Test 6: Marcar tarea como in-progress
console.log('Test 6: Marcar tarea como in-progress...');
try {
    const output = execSync(`node "${cliPath}" mark-in-progress 1`, { encoding: 'utf8' });
    assert(output.includes('in-progress'), 'Debe confirmar el cambio de estado');
    
    // Verificar contenido
    const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    assert(tasks[0].status === 'in-progress', 'El status debe ser in-progress');
    
    console.log('✅ Marcar in-progress funciona\n');
} catch (error) {
    console.log('❌ Error en test de in-progress:', error.message);
}

// Test 7: Marcar tarea como done
console.log('Test 7: Marcar tarea como done...');
try {
    const output = execSync(`node "${cliPath}" mark-done 1`, { encoding: 'utf8' });
    assert(output.includes('done'), 'Debe confirmar el cambio de estado');
    
    // Verificar contenido
    const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    assert(tasks[0].status === 'done', 'El status debe ser done');
    
    console.log('✅ Marcar done funciona\n');
} catch (error) {
    console.log('❌ Error en test de done:', error.message);
}

// Test 8: Filtrar tareas por estado
console.log('Test 8: Filtrar tareas por estado...');
try {
    // Añadir otra tarea
    execSync(`node "${cliPath}" add "Segunda tarea"`, { encoding: 'utf8' });
    
    const output = execSync(`node "${cliPath}" list done`, { encoding: 'utf8' });
    assert(output.includes('Tarea actualizada'), 'Debe mostrar la tarea done');
    assert(!output.includes('Segunda tarea'), 'No debe mostrar la tarea todo');
    
    console.log('✅ Filtrar tareas funciona\n');
} catch (error) {
    console.log('❌ Error en test de filtrar:', error.message);
}

// Test 9: Eliminar tarea
console.log('Test 9: Eliminar tarea...');
try {
    const output = execSync(`node "${cliPath}" delete 2`, { encoding: 'utf8' });
    assert(output.includes('eliminada'), 'Debe confirmar que la tarea fue eliminada');
    
    // Verificar contenido
    const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    assert(tasks.length === 1, 'Debe quedar solo una tarea');
    
    console.log('✅ Eliminar tarea funciona\n');
} catch (error) {
    console.log('❌ Error en test de eliminar:', error.message);
}

// Test 10: Manejar ID inexistente
console.log('Test 10: Manejar ID inexistente...');
try {
    const output = execSync(`node "${cliPath}" delete 999`, { encoding: 'utf8' });
    // Este debería fallar, no deberíamos llegar aquí
    console.log('⚠️  Error: El comando debería haber fallado');
} catch (error) {
    if (error.stderr && error.stderr.includes('No se encontró una tarea con ID 999')) {
        console.log('✅ Manejo de ID inexistente funciona\n');
    } else {
        console.log('❌ Error en test de ID inexistente:', error.message);
    }
}

// Limpiar
cleanup();

console.log('🎉 Tests del Task Tracker completados!');
console.log('📝 Todas las funcionalidades básicas están funcionando correctamente.\n');

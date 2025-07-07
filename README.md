# Task Tracker CLI

Una aplicación de línea de comandos para administrar tus tareas y lista de tareas pendientes.

> 💡 **Proyecto basado en**: Este proyecto está inspirado y cumple con los requisitos del [Task Tracker CLI project](https://roadmap.sh/projects/task-tracker) de roadmap.sh, diseñado para practicar habilidades de desarrollo backend y CLI.

## 🔗 Enlaces del Proyecto

- **� Proyecto Original**: [https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)
- **�📦 Repositorio GitHub**: [https://github.com/Eduard-GG/Task-Tracker-CLI](https://github.com/Eduard-GG/Task-Tracker-CLI)
- **👨‍💻 Autor**: [Eduard-GG](https://github.com/Eduard-GG)

## 🚀 Características

- ✅ Agregar nuevas tareas
- 📋 Listar todas las tareas o filtrar por estado
- 🔄 Actualizar tareas existentes
- ✨ Marcar tareas como completadas o en progreso
- 🗑️ Eliminar tareas individuales o todas a la vez
- 💾 Persistencia de datos en archivo JSON
- 🎨 Interfaz colorizada para mejor visualización
- 🆔 IDs únicos y autoincrementales para cada tarea
- 🌐 Multiplataforma (Windows, macOS, Linux)
- ⚡ Rápido y ligero (requiere solo Node.js)

## 🛠️ Instalación

### Requisitos Previos

- **Node.js** (versión 14 o superior)
  - 📥 **Descargar Node.js**: [https://nodejs.org/](https://nodejs.org/)
  - 💡 Se recomienda la versión LTS (Long Term Support)
  - ✅ Verificar instalación: `node --version` y `npm --version`

### Pasos de Instalación

#### Opción 1: Desde GitHub (Recomendado)

1. **Instala Node.js** desde [nodejs.org](https://nodejs.org/) si no lo tienes
2. **Clona este repositorio**:
   ```bash
   git clone https://github.com/Eduard-GG/Task-Tracker-CLI.git
   ```
3. **Navega al directorio del proyecto**:
   ```bash
   cd Task-Tracker-CLI
   ```
4. **Instala el comando globalmente**:
   ```bash
   npm install -g .
   ```
5. **¡Ya puedes usar el comando `task` desde cualquier ubicación!**

#### Opción 2: Descarga directa

1. **Descarga el ZIP** desde [GitHub](https://github.com/Eduard-GG/Task-Tracker-CLI/archive/refs/heads/master.zip)
2. **Extrae los archivos** y navega al directorio
3. **Sigue los pasos 4-5** de la opción anterior

### Verificar Instalación

```bash
# Verificar que Node.js está instalado
node --version

# Verificar que npm está disponible
npm --version

# Probar el CLI de tareas
task help
```

## 📖 Uso

### Comandos Básicos

#### Agregar una tarea
```bash
task add "Estudiar JavaScript"
task add "Hacer ejercicio"
```

#### Listar tareas
```bash
# Listar todas las tareas
task list
# o usando el alias
task ls

# Listar tareas pendientes
task list todo
task ls todo

# Listar tareas en progreso
task list in-progress
task ls in-progress

# Listar tareas completadas
task list done
task ls done
```

#### Actualizar una tarea
```bash
task update 1 "Estudiar Node.js en profundidad"
```

#### Cambiar estado de tareas
```bash
# Marcar como en progreso
task mark-in-progress 1

# Marcar como completada
task mark-done 1
```

#### Eliminar una tarea
```bash
task delete 1
```

#### Eliminar todas las tareas
```bash
# Comando con confirmación requerida
task delete-all --confirm

# También disponible con aliases
task clear --confirm
task reset --confirm
```

#### Obtener ayuda
```bash
task help
```

## 📊 Estados de Tareas

Las tareas pueden tener los siguientes estados:

- **todo** ⏳ - Tarea pendiente (color naranja)
- **in-progress** 🔄 - Tarea en progreso (color azul)
- **done** ✅ - Tarea completada (color verde)

## 🏗️ Estructura de las Tareas

Cada tarea en el sistema tiene las siguientes propiedades:

### Propiedades de una Tarea

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **id** | `number` | Un identificador único autoincrementable para la tarea |
| **description** | `string` | Una breve descripción de la tarea |
| **status** | `string` | El estado actual de la tarea (`todo`, `in-progress`, `done`) |
| **createdAt** | `string` | La fecha y hora en que se creó la tarea (formato ISO 8601) |
| **updatedAt** | `string` | La fecha y hora en que se actualizó la tarea por última vez (formato ISO 8601) |

### Ejemplo de Estructura JSON

```json
{
  "id": 1,
  "description": "Estudiar JavaScript",
  "status": "in-progress",
  "createdAt": "2025-07-04T17:18:56.962Z",
  "updatedAt": "2025-07-04T18:30:15.123Z"
}
```

### Características de los IDs

- **Únicos**: Cada tarea tiene un ID único que nunca se repite
- **Autoincrementales**: Los IDs se asignan automáticamente de forma secuencial
- **Persistentes**: Una vez asignado, el ID de una tarea nunca cambia
- **Formato en negrita**: Los IDs se muestran en negrita en la interfaz para mejor legibilidad

## 💾 Almacenamiento

Las tareas se guardan automáticamente en un archivo `tasks.json` en el mismo directorio de la aplicación. Este archivo se crea automáticamente cuando agregas tu primera tarea.

## 🎯 Ejemplos de Uso

```bash
# Agregar algunas tareas (se asignan IDs automáticamente)
task add "Leer un libro"          # ID: 1, status: todo
task add "Hacer ejercicio"        # ID: 2, status: todo  
task add "Estudiar programación"  # ID: 3, status: todo

# Ver todas las tareas con sus propiedades
task list
# Salida mostrará:
# ⏳ [1] Leer un libro (naranja)
#    Estado: todo | Creada: 4/7/2025
# ⏳ [2] Hacer ejercicio (naranja)
#    Estado: todo | Creada: 4/7/2025
# ⏳ [3] Estudiar programación (naranja)
#    Estado: todo | Creada: 4/7/2025

# Marcar la primera tarea como en progreso (actualiza updatedAt)
task mark-in-progress 1

# Completar la segunda tarea (actualiza status y updatedAt)
task mark-done 2

# Ver solo las tareas completadas
task ls done
# Salida mostrará:
# ✅ [2] Hacer ejercicio (verde)
#    Estado: done | Creada: 4/7/2025

# Actualizar la descripción de una tarea (actualiza description y updatedAt)
task update 3 "Estudiar JavaScript y Node.js"

# Eliminar una tarea (remueve completamente del sistema)
task delete 1

# Eliminar todas las tareas (requiere confirmación)
task delete-all --confirm
```

### Ejemplo de Archivo tasks.json

Después de ejecutar los comandos anteriores, el archivo `tasks.json` contendría:

```json
[
  {
    "id": 2,
    "description": "Hacer ejercicio",
    "status": "done",
    "createdAt": "2025-07-04T17:18:56.962Z",
    "updatedAt": "2025-07-04T17:25:30.145Z"
  },
  {
    "id": 3,
    "description": "Estudiar JavaScript y Node.js",
    "status": "todo",
    "createdAt": "2025-07-04T17:19:15.482Z",
    "updatedAt": "2025-07-04T17:30:22.891Z"
  }
]
```

## 🔧 Estructura del Proyecto

```
task-tracker/
├── task-cli.js          # Aplicación CLI principal
├── tasks.json           # Archivo de datos (se crea automáticamente)
├── package.json         # Configuración del proyecto
├── README.md            # Documentación
```

## 🎨 Características Técnicas

### Requisitos del Sistema

- **Node.js**: Versión 14.0.0 o superior
- **npm**: Incluido con Node.js
- **Sistema Operativo**: Windows, macOS, Linux
- **Espacio en disco**: ~5MB para la aplicación

### Funcionalidades

- **Persistencia**: Los datos se guardan en formato JSON con estructura completa
- **IDs únicos**: Cada tarea tiene un ID único autoincrementable que nunca se repite
- **Timestamps**: Se registra automáticamente cuándo se creó y actualizó cada tarea
- **Validación**: Validación robusta de entrada para todos los comandos
- **Estados**: Sistema de estados para seguimiento completo del progreso
- **CLI amigable**: Mensajes claros, ayuda contextual y colores para mejor UX
- **Colores**: Interfaz colorizada con:
  - IDs en **negrita** para mejor legibilidad
  - Tareas pendientes en **naranja** 🟠
  - Tareas en progreso en **azul** 🔵  
  - Tareas completadas en **verde** 🟢
- **Aliases**: Comando `ls` como alternativa a `list` para mayor comodidad
- **Multiplataforma**: Funciona en Windows, macOS y Linux

## 🔧 Solución de Problemas

### Error: "node: command not found"
- **Problema**: Node.js no está instalado o no está en el PATH
- **Solución**: Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/)

### Error: "task: command not found"
- **Problema**: El paquete no se instaló globalmente
- **Solución**: Ejecuta `npm install -g .` en el directorio del proyecto

### Error: "Permission denied"
- **Problema**: Sin permisos para instalar globalmente
- **Solución en Windows**: Ejecutar PowerShell como administrador
- **Solución en macOS/Linux**: Usar `sudo npm install -g .`

### Las tareas no se guardan
- **Problema**: Sin permisos de escritura en el directorio
- **Solución**: Verificar permisos del directorio o cambiar ubicación

### Para desinstalar
```bash
npm uninstall -g task-tracker
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. **Fork el proyecto** desde [GitHub](https://github.com/Eduard-GG/Task-Tracker-CLI)
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit tus cambios** (`git commit -m 'Add some AmazingFeature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request** en [GitHub](https://github.com/Eduard-GG/Task-Tracker-CLI/pulls)

### Ideas para contribuir:
- 🐛 Reportar bugs
- ✨ Sugerir nuevas funcionalidades
- 📖 Mejorar la documentación
- 🧪 Agregar tests
- 🎨 Mejorar la interfaz CLI

## 🎯 Sobre el Proyecto

Este Task Tracker CLI fue desarrollado como parte del [Task Tracker project](https://roadmap.sh/projects/task-tracker) de roadmap.sh. El objetivo es practicar habilidades fundamentales de desarrollo incluyendo:

- ✅ **Manejo de archivos**: Persistencia de datos en JSON
- ✅ **Interfaz de línea de comandos**: Parsing de argumentos y comandos
- ✅ **Gestión de errores**: Validación y manejo de errores
- ✅ **Estructuras de datos**: Organización y manipulación de datos
- ✅ **CRUD Operations**: Create, Read, Update, Delete de tareas

### Requisitos Implementados del Proyecto Original:
- [x] Agregar, actualizar y eliminar tareas
- [x] Marcar tareas como en progreso o completadas
- [x] Listar todas las tareas
- [x] Listar tareas por estado (todo, in-progress, done)
- [x] Almacenamiento persistente en JSON
- [x] Interfaz CLI amigable
- [x] Manejo de IDs únicos
- [x] Timestamps de creación y actualización

## 📝 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](https://github.com/Eduard-GG/Task-Tracker-CLI/blob/master/LICENSE) para más detalles.

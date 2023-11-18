let tasks = [
    { id: 1, description: 'Hacer mercado', completed: false },
    { id: 2, description: 'Estudiar para la prueba', completed: false },
    { id: 3, description: 'Sacar a pasear a Tobby', completed: true }
];

document.addEventListener('DOMContentLoaded', () => {
    updateTaskList();
    updateTaskCount(); 
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();

    if (taskDescription !== '') {
        const newTask = {
            id: Date.now(),
            description: taskDescription,
            completed: false
        };

        tasks.push(newTask);
        updateTaskList();
        taskInput.value = '';
        updateTaskCount();
    }
}

function toggleTaskStatus(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    updateTaskList();
    updateTaskCount();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    updateTaskCount();
}

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    // Subtítulos
    const subtitles = document.createElement('div');
    subtitles.classList.add('task');
    subtitles.innerHTML = `
        <p class="subtittle1"><b>ID</b></p>
        <p class="subtittle2"><b>Tarea</b></p>
    `;
    taskList.appendChild(subtitles);

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <p>${index + 1}</p>
            <span>${task.description}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
            <button onclick="deleteTask(${task.id})">Eliminar</button>
        `;

        if (task.completed) {
            taskElement.classList.add('completed-task');
        }

        taskList.appendChild(taskElement);
    });
}

function updateTaskCount() {
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    totalTasksElement.textContent = totalTasks;
    completedTasksElement.textContent = completedTasks;
}

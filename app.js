let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let deferredPrompt;

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const statusIndicator = document.getElementById('status-indicator');
const installBtn = document.getElementById('install-btn');
const totalTasksEl = document.getElementById('total-tasks');
const activeTasksEl = document.getElementById('active-tasks');
const completedTasksEl = document.getElementById('completed-tasks');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ SW registrado:', reg.scope))
            .catch(err => console.error('❌ Error SW:', err));
    });
}

function updateOnlineStatus() {
    if (navigator.onLine) {
        statusIndicator.textContent = '● Online';
        statusIndicator.className = 'status-online';
    } else {
        statusIndicator.textContent = '● Offline';
        statusIndicator.className = 'status-offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Instalación: ${outcome}`);
        deferredPrompt = null;
        installBtn.classList.add('hidden');
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
    renderTasks();
}

function addTask(text) {
    const task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.unshift(task);
    saveTasks();
    taskInput.value = '';
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active': return tasks.filter(t => !t.completed);
        case 'completed': return tasks.filter(t => t.completed);
        default: return tasks;
    }
}

function updateStats() {
    totalTasksEl.textContent = tasks.length;
    activeTasksEl.textContent = tasks.filter(t => !t.completed).length;
    completedTasksEl.textContent = tasks.filter(t => t.completed).length;
}

function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
            <div class="task-text">${task.text}</div>
            <button class="task-delete" onclick="deleteTask('${task.id}')">Eliminar</button>
        </div>
    `).join('');
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) addTask(text);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

updateStats();
renderTasks();
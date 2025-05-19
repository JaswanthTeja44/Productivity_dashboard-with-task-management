        const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const errorMessage = document.getElementById('errorMessage');
        const filterButtons = document.querySelectorAll('.filter-btn');
        let currentFilter = 'all';

        // Event Listeners
        taskForm.addEventListener('submit', addTask);
        taskList.addEventListener('click', toggleComplete);
        taskList.addEventListener('click', deleteTask);
        filterButtons.forEach(btn => btn.addEventListener('click', filterTasks));

        // Update stats
        function updateStats() {
            const totalTasks = document.querySelectorAll('.task-item').length;
            const completedTasks = document.querySelectorAll('.completed').length;
            
            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
        }

        // Add new task
        function addTask(e) {
            e.preventDefault();
            
            const taskText = taskInput.value.trim();
            
            if (!taskText) {
                showError('Please enter a task');
                return;
            }

            const task = document.createElement('li');
            task.className = 'task-item';
            task.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
                <button class="delete-btn">Delete</button>
            `;

            taskList.appendChild(task);
            taskInput.value = '';
            errorMessage.textContent = '';
            updateStats();
            filterTasks(); // Reapply current filter
        }

        // Toggle task completion
        function toggleComplete(e) {
            if (e.target.classList.contains('task-checkbox')) {
                const taskItem = e.target.closest('.task-item');
                taskItem.classList.toggle('completed');
                updateStats();
                filterTasks(); // Reapply current filter
            }
        }

        // Delete task
        function deleteTask(e) {
            if (e.target.classList.contains('delete-btn')) {
                const taskItem = e.target.closest('.task-item');
                taskItem.style.transform = 'translateX(100%)';
                taskItem.style.opacity = '0';
                
                setTimeout(() => {
                    taskItem.remove();
                    updateStats();
                }, 300);
            }
        }

        // Filter tasks
        function filterTasks(e) {
            if (e) {
                currentFilter = e.target.dataset.filter;
                filterButtons.forEach(btn => 
                    btn.classList.toggle('active', btn.dataset.filter === currentFilter)
                );
            }

            document.querySelectorAll('.task-item').forEach(task => {
                const isCompleted = task.classList.contains('completed');
                
                task.style.display = 
                    currentFilter === 'all' ? 'flex' :
                    currentFilter === 'active' && !isCompleted ? 'flex' :
                    currentFilter === 'completed' && isCompleted ? 'flex' : 'none';
            });
        }

        // Show error message
        function showError(message) {
            errorMessage.textContent = message;
            setTimeout(() => errorMessage.textContent = '', 3000);
        }
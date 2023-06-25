import axios from 'axios';

const routes = {
    tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
    const addTaskForm = document.querySelector('form');
    const ul = document.querySelector('ul');

    const newTask = (task) => {
        const taskListItem = document.createElement('li');
        taskListItem.classList.add('list-group-item');
        taskListItem.textContent = task.name;
        ul.prepend(taskListItem);
    }

    const initalTaskList = await axios.get(routes.tasksPath()).then(result => result.data.items.reverse());
    initalTaskList.forEach(task => {
        newTask(task);
    });

    const taskInput = addTaskForm.querySelector('input');

    addTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const task = {name: taskInput.value};
        await axios.post(routes.tasksPath(), task);
        newTask(task);  
    })

}
// END
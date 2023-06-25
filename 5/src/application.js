import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
    const number = uniqueId();
    const about = {
        current: number,
        lists: [{ number: number, name: 'General' }],
        tasks: [],
    };
    
    const tasksShow = (about, elements) => {
        elements.tasksContainer.innerHTML = '';
        const filteredTasks = about.tasks.filter(({ listId }) => listId === about.current);

        if (filteredTasks.length === 0) {
            return;
        }

        const ul = document.createElement('ul');

        filteredTasks.forEach(({ name }) => {
            const li = document.createElement('li');
            li.textContent = name;
            ul.append(li);
        });

        elements.tasksContainer.append(ul);
    };

    const listsShow = (about, elements) => {
        elements.listsContainer.innerHTML = '';
        const ul = document.createElement('ul');

        about.lists.forEach(({ number, name }) => {
        const li = document.createElement('li');
        let newElement;
      
        if (number === about.current) {
            newElement = document.createElement('b');
            newElement.textContent = name;
        } else {
            newElement = document.createElement('a');
            newElement.setAttribute('href', `#${name.toLowerCase()}`);
            newElement.textContent = name;
            newElement.addEventListener('click', (e) => {
                e.preventDefault();
                about.current = number;
                listsShow(about, elements);
                tasksShow(about, elements);
            });
        }
      
            li.append(newElement);
            ul.append(li);
        });
        
        elements.listsContainer.append(ul);

    };

    const elements = {
        listsContainer: document.querySelector('[data-container="lists"]'),
        tasksContainer: document.querySelector('[data-container="tasks"]'),
    };
    
    const newListForm = document.querySelector('[data-container="new-list-form"]');
    const newTaskForm = document.querySelector('[data-container="new-task-form"]');
    
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const value = e.target.querySelector('input').value;

        const list = { number: uniqueId(), name: value };
        form.reset();
        form.focus();

        let flag = true;
        for (let item of about.lists) {
            if (item.name === value) {
                flag = false;
            }
        }
        if (flag) {
            about.lists.push(list);
        }


        listsShow(about, elements);
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target);
        const task = { number: uniqueId(), name: e.target.querySelector('input').value, listId: about.current };
        e.target.reset();
        e.target.focus();
        about.tasks.push(task);
        tasksShow(about, elements);
    });

    listsShow(about, elements);
    tasksShow(about, elements);
};
// END
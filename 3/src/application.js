// BEGIN
export default (notebooks) => {
    const resultContainer = document.querySelector('.result');
    const form = document.querySelector('form');

    function filterNotebooks() {
        const filterList = {
            processor: document.querySelector('select[name="processor_eq"]').value,
            memory: document.querySelector('select[name="memory_eq"]').value,
            frequency_gte: document.querySelector('input[name="frequency_gte"]').value,
            frequency_lte: document.querySelector('input[name="frequency_lte"]').value,
        }

        const filteredNotebooks = notebooks.filter(notebook => {
            return Object.keys(filterList).every(key => {
                if (key === 'processor') {
                    
                    return filterList[key] == '' || notebook[key].includes(filterList[key]);
                }
                if (key === 'memory') {
                    return filterList[key] == '' || notebook[key] == filterList[key];
                }
                if (key === 'frequency_gte') {
                    return filterList[key] == '' || notebook.frequency > filterList[key];
                }
                if (key === 'frequency_lte') {
                    return filterList[key] == '' || notebook.frequency < filterList[key];
                }
                
            })
        })


        if (filteredNotebooks.length > 0) {
            resultContainer.innerHTML = '';
            const ul = document.createElement('ul');
            ul.className = 'list-group';
            filteredNotebooks.forEach(notebook => {
                const li = document.createElement('li');
                li.textContent = notebook.model;
                li.className = 'list-group-item';
                ul.appendChild(li);
            });
            resultContainer.appendChild(ul);
        } else {
            resultContainer.innerHTML = '';
        }

    }

    filterNotebooks();

    form.addEventListener('input', filterNotebooks);
    form.addEventListener('change', filterNotebooks);
}
// END
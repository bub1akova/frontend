// BEGIN
export default (companies) => {
    const listOfButtons = document.querySelector('.container')

    for (let company of companies) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = company.name;
        listOfButtons.appendChild(btn);

        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const div = listOfButtons.querySelector('div');

            if (!div) {
                const descriptionToBtn = document.createElement('div');
                descriptionToBtn.textContent = company.description;
                listOfButtons.appendChild(descriptionToBtn);
            } else {
                if (div.textContent != company.description) {
                    div.textContent = company.description;
                } else {
                    div.remove();
                }
            }

        })
        
    }

}
// END
// BEGIN
export default () => {
    const forma = document.querySelector('form');
    const res = document.querySelector('#result');
    const input = document.querySelector('[name="number"]');
    let summa = 0;

    const makeChanges = (event) => {
        
        switch (event) {
            case 'submit':
                summa += +input.value;
                break;
            case 'button':
                summa = 0;
                break;
        }

        input.value = '';
        input.focus();
        res.textContent = summa;
    } 
    makeChanges();

    forma.addEventListener('click', (event) => {
        event.preventDefault();
        makeChanges(event.target.type);
    })

}
// END
const container = document.querySelector('.textarea');
const textarea = document.getElementById('myTextarea');
const charcounter = document.getElementById('charCounter');
const zeroTo250 = document.getElementById('0-250');
const oneTo250 = document.getElementById('1-250');
const maxTo250 = document.getElementById('250-250');

textarea.addEventListener('input', () => {

    const remaining = textarea.value.length;
    charcounter.textContent = remaining + '/250';

    if (remaining === 0) {
        container.style.border = '2px solid black';
        zeroTo250.style.display = 'block';
        oneTo250.style.display = 'none';
        maxTo250.style.display = 'none';
        charcounter.style.color = 'black';
    } else if (remaining < 250) {
        container.style.border = '2px solid black';
        zeroTo250.style.display = 'none';
        oneTo250.style.display = 'block';
        maxTo250.style.display = 'none';
        charcounter.style.color = 'black';
    } else {
        container.style.border = '2px solid red';
        zeroTo250.style.display = 'none';
        oneTo250.style.display = 'none';
        maxTo250.style.display = 'block';
        maxTo250.style.color = 'red';
        charcounter.style.color = 'red';
    }
});


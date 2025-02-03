const tabs = document.querySelectorAll('.navbar ul li');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        tab.classList.add('active');

        const targetTab = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);

        targetContent.classList.add('active');
    })
});
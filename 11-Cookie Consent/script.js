document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const resetCookiesBtn = document.getElementById('resetCookiesBtn');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const declineCookiesBtn = document.getElementById('declineCookiesBtn');

    const consent = localStorage.getItem('cookieConsent');

    if (consent === 'accepted') {
        cookieConsent.style.display = 'none';
        console.log('Cookies found: Accepted');
    } else if (consent === 'declined') {
        cookieConsent.style.display = 'none';
        console.log('Cookies found: Declined');
    } else {
        cookieConsent.style.display = 'block';
    }
    
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
        console.log('Cookies accepted');
    });

    declineCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.style.display = 'none';
        console.log('Cookies declined');
    });

    resetCookiesBtn.addEventListener('click', function() {
        localStorage.removeItem('cookieConsent');
        cookieConsent.style.display = 'block';
        console.log('Cookies reseted');
    });
    
});
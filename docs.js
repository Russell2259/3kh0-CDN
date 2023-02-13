if (window.location.pathname.endsWith('/')) {
    const readme = document.querySelector('#readme');
    fetch('https://raw.githubusercontent.com/Russell2259/3kh0-CDN/main/README.md')
    .then(res => res.text())
    .then(data => {
        readme.innerHTML = data;
    })
}
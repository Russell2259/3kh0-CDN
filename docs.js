if (window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('/wiki/')) {
    const readme = document.querySelector('#readme');
    readme.contentWindow.document.write('asdfghjkl');
}
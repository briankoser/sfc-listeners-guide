let fs = require('fs');
let cacheString = () => (new Date()).toISOString().slice(0, 10).replace(/-/g, '');

// point home page to cache busted css file
let homePageLocation = './_site/index.html';
let customCss = '/css/custom.css';
let newCustomCss = customCss.replace('.css', `.${cacheString()}.css`);

fs.readFile(homePageLocation, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading home page for cache busting: ' + err);
        process.exit(1);
    }

    let newHomePage = data.replace(customCss, newCustomCss);

    fs.writeFile(homePageLocation, newHomePage, 'utf-8', function (err) {
        if (err) {
            console.log('Error writing home page for cache busting: ' + err);
            process.exit(1);
        }
        
        console.log('home page pointed to cache busting css file');
    });
});



// rename css file to bust cache
let customCssLocation = `./_site${customCss}`;
let newCustomCssLocation = customCssLocation.replace('.css', `.${cacheString()}.css`);

fs.rename(customCssLocation, newCustomCssLocation, (err) => {
    if (err) {
        console.log('Error renaming css file for cache busting: ' + err);
        process.exit(1);
    }   

    console.log('css file renamed for cache bust');
});
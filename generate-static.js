const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('./public/index.html', 'utf8');

const pages = [
    {name: 'home', title: 'home', description: 'WIP'},
    {name: 'printables', title: 'printables', description: 'a review and some possible improvements to Printable.com'},
    {name: 'thesis', title: 'thesis', description: 'Decreasing the Reality Gap of a Vehicle Simulation Digital Sibling Using the Addition of a Road Slope Study thesis and links'},
    {name: 'solarsystem', title: 'solar system', description: 'a representation of the solar system with planets and their orbits'},
    {name: 'credits', title: 'credits', description: 'credits page with links to resources used in the website'}
];

pages.forEach(function(page){
    const contentPath = path.join(__dirname, "public", `${page.name}.html`);
    const content = fs.readFileSync(contentPath, 'utf8');

    const navbar = `<nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
    <a class="navbar-brand ${page.name === 'home' ? 'active' : ''}" href="/home.html">gianlucafabris2001.github.io</a>
    <div class="me-auto navbar-nav">
        <a class="nav-link ${page.name === 'printables' ? 'active' : ''}" href="/printables.html">Printables</a>
    </div>
</nav>`;
    
    const result = template.replace('{{title}}', page.title).replace('{{description}}', page.description).replace('{{navbar}}', navbar).replace('{{content}}', content);

    fs.writeFileSync(path.join(__dirname, "build", `${page.name}.html`), result);
    console.log(`Generated ${page.name}.html`);
});

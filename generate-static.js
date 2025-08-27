import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let template = fs.readFileSync("./src/index.html", "utf8");

template = template.replace(/<head>(\s*)/, `<head>$1{{header}}$1`); //add header placeholder

const pages = [
    {name: "home", title: "home", description: "WIP"},
    {name: "printables", title: "printables", description: "a review and some possible improvements to Printable.com"},
    {name: "thesis", title: "thesis", description: "Decreasing the Reality Gap of a Vehicle Simulation Digital Sibling Using the Addition of a Road Slope Study thesis and links"},
    {name: "solarsystem", title: "solar system", description: "a representation of the solar system with planets and their orbits"},
    // {name: "citiesguesser", title: "cities guesser", description: "a representation of various cities with data from OpenStreetMap and you have to guess the city based on the map"},
    {name: "credits", title: "credits", description: "credits page with links to resources used in the website"}
];

const navLinks = [
    {name: "printables", label: "Printables"}
];

pages.forEach(function(page){
    const contentPath = path.join(__dirname, "public", `${page.name}.html`);
    const content = fs.readFileSync(contentPath, "utf8");

    const header = `<title>Gianluca Fabris - ${page.title}</title>
<meta name="description" content="Gianluca Fabris website - ${page.title} page, ${page.description}" />
<!-- Open Graph -->
<meta property="og:title" content="Gianluca Fabris - ${page.title}" />
<meta property="og:description" content="Gianluca Fabris website - ${page.title} page, ${page.description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://gianlucafabris.github.io/${page.name}.html" />
<meta property="og:image" content="https://gianlucafabris.github.io/src/img/backgroundImage.png" />
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Gianluca Fabris - ${page.title}" />
<meta name="twitter:description" content="Gianluca Fabris website - ${page.title} page, ${page.description}" />
<meta name="twitter:image" content="https://gianlucafabris.github.io/src/img/backgroundImage.png" />`;

    const navbar = `<nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
    <a class="navbar-brand ${page.name === "home" ? "active" : ""}" href="/home.html">gianlucafabris2001.github.io</a>
    <div class="me-auto navbar-nav">
        ${navLinks.map(function(link){
            return `<a class="nav-link ${page.name === link.name ? "active" : ""}" href="/${link.name}.html">${link.label}</a>`;
        }).join("")}
    </div>
</nav>`;

    const result = template.replace("{{header}}", header).replace("{{navbar}}", navbar).replace("{{content}}", content);

    fs.writeFileSync(path.join(__dirname, "build", `${page.name}.html`), result);
    console.log(`Generated ${page.name}.html`);
});

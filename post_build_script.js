import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { build } from "esbuild";
import { execSync } from "child_process";

// pages
import { pages, navLinks } from "./src/Pages.js";

// Modify build/index.html to add analytics scripts

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let index = fs.readFileSync(path.join(__dirname, "build", "index.html"), "utf8");

const header = `<!-- Cookies/Analytics -->
    <!-- Iubenda -->
    <script type="text/javascript" src="https://embeds.iubenda.com/widgets/6b65e048-35bb-4c71-a039-72682d28fd9d.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-T4SZ17FKTX"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());

    gtag("config", "G-T4SZ17FKTX");
    </script>
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "t7jc2bxwb2");
    </script>
</head>`;

const result = index.replace("</head>", header);

fs.writeFileSync(path.join(__dirname, "build", "index.html"), result);
console.log(`📄 index.html`);

// Static pages

let template = fs.readFileSync("./src/index.html", "utf8");

pages.forEach(function(page){
    const contentPath = path.join(__dirname, "public", `${page.name}.html`);
    const content = fs.readFileSync(contentPath, "utf8");

    const header = `<!-- Metadata -->
    <name>Gianluca Fabris - ${page.title}</title>
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
    <meta name="twitter:image" content="https://gianlucafabris.github.io/src/img/backgroundImage.png" />
    <!-- Cookies/Analytics -->
    <!-- Iubenda -->
    <script type="text/javascript" src="https://embeds.iubenda.com/widgets/6b65e048-35bb-4c71-a039-72682d28fd9d.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-T4SZ17FKTX"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());

    gtag("config", "G-T4SZ17FKTX");
    </script>
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "t7jc2bxwb2");
    </script>
</head>`;

    const navbar = `<nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
    <a class="navbar-brand ${page.name === "home" ? "active" : ""}" href="/home.html">gianlucafabris2001.github.io</a>
    <div class="me-auto navbar-nav">
        ${navLinks.map(function(link){
            return `<a class="nav-link ${page.name === link.name ? "active" : ""}" href="/${link.name}.html">${link.label}</a>`;
        }).join("")}
    </div>
</nav>`;

    const result = template.replace("</head>", header).replace("{{name}}", page.name).replace("{{navbar}}", navbar).replace("{{content}}", content);

    fs.writeFileSync(path.join(__dirname, "build", `${page.name}.html`), result);
    console.log(`📄 ${page.name}.html`);
});

// Optimize images

const imgs = await globby(["build/src/img/**/*.{jpg,jpeg,png}", "!build/src/img/favicon/**"]);

imgs.forEach(async function(img){
    const buffer = fs.readFileSync(img);
    const result = await imagemin.buffer(buffer, { plugins: [imageminWebp({ quality: 75 })] });

    const outFile = img.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    fs.writeFileSync(outFile, result);

    console.log(`🖼️ ${path.basename(outFile)}`);
});

// Optimize css

await build({ entryPoints: ["public/src/style.css"], outfile: "build/src/style.css", minify: true, bundle: false });
execSync(`(del /f /q "build\\src\\debug.css" || rm -f build/src/debug.css)`, { stdio: "inherit" });
console.log("🎨 style.css minified and debug.css removed");

// Sitemap

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://gianlucafabris.github.io/</loc>
        <priority>1.0</priority>
    </url>`;

pages.forEach(function(page){
    sitemap += `<url>
    <loc>https://gianlucafabris.github.io/${page.name}.html</loc>
    <priority>${page.priority}</priority>
</url>`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, "build", "sitemap.xml"), sitemap, "utf8");
console.log("🤖 sitemap.xml");

// Robots

const robots = `User-agent: *
Disallow: /src/
Allow: /

Sitemap: https://gianlucafabris.github.io/sitemap.xml`;

fs.writeFileSync(path.join(__dirname, "build", "robots.txt"), robots, "utf8");
console.log("🤖 robots.txt");

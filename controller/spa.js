/* GLOBAL VARIABLES */
const mainNode = document.querySelector('main');
const headNode = document.querySelector('head');
let routes = [];
let scriptsRunning = [];


/* GETS MAIN HTML FROM PAGES FILES */
async function getMainHTML(dir, startComment) {

    try {

        let mainString;

        await $.get(dir, function (page, textStatus, jqXHR) {

            const pageString = page.toString();

            mainString = pageString.substring(
                pageString.lastIndexOf(startComment),
                pageString.lastIndexOf('</main>')
            );


        }, "html");

        return mainString;

    } catch (error) {
        console.log('Error al obtener archivo html: ', error);
    }

}

/* STORES PAGES IN ROUTES */
async function storePages() {

    try {

        routes = [{
                path: '/index',
                title: "Jack & Jek",
                classes: "mainIndex container-fluid",
                mainHTML: await getMainHTML('index.html', "<!-- START HERO SECTION -->").then((mainString) => {
                    return mainString
                }),
                scripts: ["controller/index/heroCarousel.js"]
            },
            {
                path: '/menu',
                title: "Jack & Jek | Menú",
                classes: "mainMenu container-fluid",
                mainHTML: await getMainHTML('/pages/menu.html', "<!-- START BURGERS ARTICLE -->").then((mainString) => {
                    return mainString
                }),
                scripts: []
            },
            {
                path: '/orders',
                title: "Jack & Jek | Pedidos",
                classes: "mainOrders container-fluid row",
                mainHTML: await getMainHTML('/pages/orders.html', "<!-- START ORDER SECTION -->").then((mainString) => {
                    return mainString
                }),
                scripts: ["../controller/orders/products.js", "../controller/orders/items.js",
                    "../controller/orders/ordersFunctions.js", "../controller/orders/listeners.js",
                    "../controller/orders/orders.js"
                ]
            },
            {
                path: '/contact',
                title: "Jack & Jek | Contacto",
                classes: "mainContact container-fluid row",
                mainHTML: await getMainHTML('/pages/contact.html', "<!-- START CONTACT SECTION -->").then((mainString) => {
                    return mainString
                }),
                scripts: []
            },
            {
                path: '/jobs',
                title: "Jack & Jek | Empleos",
                classes: "mainJobs container-fluid row",
                mainHTML: await getMainHTML('/pages/jobs.html', "<!-- START ABOUT US SECTION -->").then((mainString) => {
                    return mainString
                }),
                scripts: []
            }
        ]

    } catch (error) {
        console.log('Error al cargar las rutas: ', error);
    }

}




/* PARSES USER LOCATION */
function parseLocation() {

    return location.hash.slice(1) || '/';
}

/* FIND PAGE THAT MATCHES LOCATION */
function findMainMatch(userPath) {

    return routes.find(route => route.path === userPath) || routes[0];
}

/* SET NAV ITEM ACTIVE */
function setNavLinkActive(pagePath) {

    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    navLinks.forEach(navLink => {
        const href = navLink.getAttribute('href').slice(2);

        if (href === pagePath)
            navLink.classList = 'nav-link active';

        else
            navLink.classList = 'nav-link';

    });

}

/* RUN SCRIPTS OF PAGE */
function runScripts(scripts) {

    if (scripts.length === 0) return;

    scripts.forEach(scriptUrl => {

        const script = document.createElement('script');
        script.defer = true;
        script.src = scriptUrl;

        if (scriptsRunning.find(scriptNode => scriptNode.src === script.src)) return;


        headNode.appendChild(script);
        scriptsRunning.push(script);
    });
}

/* ROUTER */
async function router() {

    try {

        const userPath = parseLocation();
        const pageObject = findMainMatch(userPath);

        setNavLinkActive(pageObject.path);
        document.title = pageObject.title;
        mainNode.innerHTML = pageObject.mainHTML;
        mainNode.classList = pageObject.classes;
        runScripts(pageObject.scripts);

        console.log('Routed to:', pageObject.path);

    } catch (error) {
        console.log('Error en Main: ', error);
    }

}




/* MAIN */
async function main() {
    await storePages();
    router();
}
main();

/* ADDS LISTENER TO HASH CHANGES */
window.addEventListener('hashchange', router);
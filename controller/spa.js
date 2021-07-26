/* GLOBAL VARIABLES */
const mainNode = document.querySelector('main');
let routes = [];



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
                path: '/',
                title: "Jack & Jek",
                classes: "mainIndex container-fluid",
                mainHTML: await getMainHTML('index.html', "<!-- START HERO SECTION -->").then((mainString) => {
                    return mainString
                })
            },
            {
                path: '/menu',
                title: "Jack & Jek | Menú",
                classes: "mainMenu container-fluid",
                mainHTML: await getMainHTML('/pages/menu.html', "<!-- START BURGERS ARTICLE -->").then((mainString) => {
                    return mainString
                })
            },
            {
                path: '/orders',
                title: "Jack & Jek | Pedidos",
                classes: "mainOrders container-fluid row",
                mainHTML: await getMainHTML('/pages/orders.html', "<!-- START ORDER SECTION -->").then((mainString) => {
                    return mainString
                })
            },
            {
                path: '/contact',
                title: "Jack & Jek | Contacto",
                classes: "mainContact container-fluid row",
                mainHTML: await getMainHTML('/pages/contact.html', "<!-- START CONTACT SECTION -->").then((mainString) => {
                    return mainString
                })
            },
            {
                path: '/jobs',
                title: "Jack & Jek | Empleos",
                classes: "mainJobs container-fluid row",
                mainHTML: await getMainHTML('/pages/jobs.html', "<!-- START ABOUT US SECTION -->").then((mainString) => {
                    return mainString
                })
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
function findMainMatch(userPath){

    return routes.find(route => route.path === userPath);
}

/* ROUTER */
async function router() {

    try {

        const userPath = parseLocation();
        const pageObject = findMainMatch(userPath);

        console.log(pageObject);

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
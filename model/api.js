/* GLOBAL SCOPE */
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


/* MIDDLEWARES */
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



/* GET ORDERS */
function getOrders() {

    return new Promise((res, rej) => {

        fs.readFile("orders.json", 'utf-8', (err, json) => {

            res(json);
        });
    });

}

/* SAVE ORDER */
function saveOrders(orders) {

    return new Promise(function (res, rej) {

        fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
            if (err) throw err;

            console.log('Ordenes guardadas con éxito.');
            res();
        });

    });
}

/* ROUTES */
//PAGES
//index
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../index.html'));

});

app.get('/pages/menu.html', (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/menu.html'));

});

app.get('/pages/orders.html', (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/orders.html'));

});

app.get('/pages/contact.html', (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/contact.html'));

});

app.get('/pages/jobs.html', (req, res) => {

    res.sendFile(path.join(__dirname, '../pages/jobs.html'));

});


//LINKS
app.get('/css/bootstrap.css', (req, res) => {

    res.sendFile(path.join(__dirname, '../css/bootstrap.css'));

});
app.get('/css/bootstrap.css.map', (req, res) => {

    res.sendFile(path.join(__dirname, '../css/bootstrap.css.map'));

});
app.get('/css/main.css', (req, res) => {

    res.sendFile(path.join(__dirname, '../css/main.css'));

});


//SCRIPTS
app.get('/js/bootstrap.min.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../js/bootstrap.min.js'));

});
app.get('/js/bootstrap.min.js.map', (req, res) => {

    res.sendFile(path.join(__dirname, '../js/bootstrap.min.js.map'));

});
app.get('/controller/spa.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/spa.js'));

});
app.get('/controller/index/heroCarousel.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/index/heroCarousel.js'));

});
app.get('/controller/orders/products.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/orders/products.js'));

});
app.get('/controller/orders/items.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/orders/items.js'));

});
app.get('/controller/orders/ordersFunctions.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/orders/ordersFunctions.js'));

});
app.get('/controller/orders/listeners.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/orders/listeners.js'));

});
app.get('/controller/orders/orders.js', (req, res) => {

    res.sendFile(path.join(__dirname, '../controller/orders/orders.js'));

});
app.get('/model/products.json', (req, res) => {

    res.sendFile(path.join(__dirname, '/products.json'));

});



/* POST HANDLING */
app.post('/api/orders', (req, res) => {
   

    let orders;
    getOrders()
        .then((json) => {
            orders = json ? JSON.parse(json) : [];
            const order = req.body;
            console.log('Nueva orden: ', order);
            
            orders.push(order);
            saveOrders(orders)
                .then(() => {
                    console.log('Nueva Orden guardada.\n');
                    res.send(order);
                });

        });
});



/* START SERVER */
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port: ${port}`));
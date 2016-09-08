(function() {
    'use strict';

    const aliveJson = { isAlive: true };
    const categoriesJson = [
        { id: 101, name: 'Guitars' },
        { id: 102, name: 'Basses' }
    ];
    const productsJson = [
        { id: 1000, name: 'Les Paul Standard', price: 4000, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1001, name: 'Les Paul Sunburst', price: 2500, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1002, name: 'Les Paul Student', price: 1200, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1003, name: 'Fender Stratocaster HSS', price: 1000, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1004, name: 'Fender American Stratocaster HH', price: 5000, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1005, name: 'Fender American Stratocaster HSS', price: 5500, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1006, name: 'Fender Standard Telecaster', price: 3400, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1007, name: 'Fender Telecaster HH', price: 1000, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1008, name: 'Ibanez RG', price: 800, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1009, name: 'Squier Telecaster', price: 220, currency: 'USD', description: 'test description', categoryId: 101 },
        { id: 1010, name: 'Fender Jazz Bass', price: 2500, currency: 'USD', description: 'test description', categoryId: 102 },
        { id: 1011, name: 'Fender Precision Bass', price: 3400, currency: 'USD', description: 'test description', categoryId: 102 },
        { id: 1012, name: 'Fender Artist', price: 11000, currency: 'USD', description: 'test description', categoryId: 102 },
    ];

    let express = require('express');
    let _ = require('lodash');
    let app = express();    

    let createGetResponse = (data, res) => {
        if(data) {
            res.json(data);
        } else {
            res.status(404).send('Not found');
        }
    };

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', (req, res) => {
        res.json(aliveJson);
    });
    
    app.get('/hotdeals/:dealsCount', (req, res) => {
        let dealsCount = req.params ? _.toNumber(req.params.dealsCount) : undefined;
        let productsCount = productsJson.length;
        
        let ret = [];
        let ordered = _.orderBy(productsJson, ['price', 'dsc']);
        if(dealsCount < productsCount) {
            ret = _.take(ordered, dealsCount);
        } else {
            ret = ordered;
        }

        res.json(ret);        
    });

    app.get('/products', (req, res) => {
        
        let prodname = req.query && req.query.q ? req.query.q.toLowerCase() : undefined;
        let sort = req.query && req.query.sort ? req.query.sort: undefined; 
        let products = [];
        
        if(_.isUndefined(prodname)) {
            products = productsJson;
        } else {
            products = _.filter(productsJson, 
                prod =>  prod.name ? prod.name.toLowerCase().search(prodname) > -1 : false);
        }

        if(!_.isUndefined(sort)) {
            products = _.orderBy(products, sort, 'asc');
        }

        createGetResponse(products, res);
    });

    app.get('/products/:productId', (req, res) => {
        let prodId = req.params ? _.toNumber(req.params.productId) : undefined;
        let product = _.find(productsJson, prod => prod.id === prodId);
        
        createGetResponse(product, res);
    });

    app.get('/categories', (req, res) => {
        res.json(categoriesJson);
    });

    app.get('/categories/:categoryId', (req, res) => {
        let catId = req.params ? _.toNumber(req.params.categoryId) : undefined;
        let category = _.find(categoriesJson, cat => cat.id === catId)

        createGetResponse(category, res);
    }); 

    app.get('/categories/:categoryId/products', (req, res) => {
        let catId = req.params ? _.toNumber(req.params.categoryId) : undefined;
        let category = _.find(categoriesJson, cat => cat.id === catId)
        let products = _.filter(productsJson, prod => prod.categoryId === catId);

        createGetResponse({
            category: category,
            products: products
        }, res);
    });

    app.listen(process.env.ENV_PORT || 1986);
})();



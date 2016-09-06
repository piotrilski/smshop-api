(function() {
    'use strict';

    const aliveJson = { isAlive: true };
    const categoriesJson = [
        { id: 101, name: 'Guitars' }
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
        { id: 1009, name: 'Squier Telecaster', price: 220, currency: 'USD', description: 'test description', categoryId: 101 }
    ];

    let express = require('express');
    let _ = require('lodash');
    let app = express();
    
    app.get('/', (req, res) => {
        res.json(aliveJson);
    });
    
    app.get('/hotdeals/:dealsCount', (req, res) => {
        let dealsCount = req.params ? req.params.dealsCount : undefined;
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
        res.json(productsJson);
    });

    app.get('/categories', (req, res) => {
        res.json(categoriesJson);
    });

    app.listen(process.env.ENV_PORT || 1986);
})();



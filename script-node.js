import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.get('/getBasket', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToBasket', (req, res) => {
    const cartFile = 'cart.json';

    fs.readFile(cartFile, 'utf-8', (err, rawData) => {
        const data = JSON.parse(rawData);
        let findResult = data.filter((item) => item.id === req.body.id);
        if (findResult.length === 0) {
            data.push(req.body);
        } else {
            data[data.indexOf(findResult[0])]['quantity'] += 1;
        };
        fs.writeFile(cartFile, JSON.stringify(data), (err) => {
            res.send(JSON.stringify({
                result: err ? 0 : 1
            }));
        });
    });
});

app.post('/removeFromBasket', (req, res) => {
    const cartFile = 'cart.json';

    fs.readFile(cartFile, 'utf-8', (err, rawData) => {
        const data = JSON.parse(rawData);
        let findResult = data.filter((item) => item.id === req.body.id);
        if (findResult.length != 0) {
            if (findResult[0]['quantity'] === 1) {
                data.splice(data.indexOf(findResult[0]), 1);
            } else {
                data[data.indexOf(findResult[0])]['quantity'] -= 1;
            };
        };
        fs.writeFile(cartFile, JSON.stringify(data), (err) => {
            res.send(JSON.stringify({
                result: err ? 0 : 1
            }));
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

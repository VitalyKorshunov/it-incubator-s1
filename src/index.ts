import express, {Request, Response} from 'express'

const app = express();
const port = 3001;

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'apple'}];
const addresses = [{id: 1, value: 'Trudovie 11'}, {id: 2, value: 'Solnechnaya 20'}];

app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello Incubator!!';
    res.send(helloMessage)
})

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (+req.params.id === products[i].id) {
            products.splice(i, 1)
            res.send(204);
            return;
        }
    }

    res.send(404)
})
app.post('/products/', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct);
    res.status(201).send(newProduct);
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

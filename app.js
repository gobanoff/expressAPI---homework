const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Create an Express app
const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Sample data for the shop and items
let shops = [
    { id: 1, name: "My Shop", location: "123 Main St" }
];

let items = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
    { id: 3, name: "Item 3", price: 30 }
];

// Routes

/**
 * @swagger
 * /shops:
 *   get:
 *     summary: Get all shops
 *     description: Retrieve all shops.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *   post:
 *     summary: Create a new shop
 *     description: Create a new shop.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 */
// Get all shops
app.get('/shops', (req, res) => {
    res.json(shops);
});

// Create a new shop
app.post('/shops', (req, res) => {
    const newShop = req.body;
    newShop.id = shops.length + 1;
    shops.push(newShop);
    res.status(201).json(newShop);
});

/**
 * @swagger
 * /shops/{id}:
 *   put:
 *     summary: Update a shop
 *     description: Update a shop by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *   delete:
 *     summary: Delete a shop
 *     description: Delete a shop by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       404:
 *         description: Shop not found
 */
// Update a shop
app.put('/shops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shops.findIndex(shop => shop.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Shop not found' });
    }
    shops[index] = req.body;
    shops[index].id = id;
    res.json(shops[index]);
});

// Delete a shop
app.delete('/shops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shops.findIndex(shop => shop.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Shop not found' });
    }
    const deletedShop = shops.splice(index, 1);
    res.json(deletedShop[0]);
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve all items.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *   post:
 *     summary: Create a new item
 *     description: Create a new item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     description: Update an item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *   delete:
 *     summary: Delete an item
 *     description: Delete an item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
// Update an item
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items[index] = req.body;
    items[index].id = id;
    res.json(items[index]);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
const port = 5000;

const corsOptions = {
    origin: ['http://127.0.0.1:5500','http://localhost:5500'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
app.use('/api/contacts', contactRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const taskRoutes = require('./routes');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://ASAPJJ:Juanjo124@clusteripf.52hmhhu.mongodb.net/tareas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a la base de datos');
})
.catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use('/api', taskRoutes);

app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: 'Error en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

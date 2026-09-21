const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let pacientes = [];

// GET: Listar fila de pacientes
app.get('/pets', (req, res) => {
    res.json(pacientes);
});

// POST: Registar nova entrada clínica
app.post('/pets', (req, res) => {
    const novoPaciente = {
        id: Date.now().toString(),
        ...req.body
    };
    pacientes.push(novoPaciente);
    res.status(201).json(novoPaciente);
});

// PUT: Atualizar ficha clínica
app.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const index = pacientes.findIndex(p => String(p.id) === String(id));
    if (index === -1) {
        return res.status(404).json({ erro: 'Paciente não encontrado' });
    }
    pacientes[index] = { ...pacientes[index], ...req.body, id: pacientes[index].id };
    res.json(pacientes[index]);
});

// DELETE: Dar alta / remover da fila
app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    pacientes = pacientes.filter(p => String(p.id) !== String(id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor PetLover a operar em http://localhost:${PORT}`);
});
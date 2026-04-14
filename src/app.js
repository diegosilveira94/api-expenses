import express from 'express';

const app = express();
const PORT = 3000;

app.get('/expenses', (req, res) => {
    res.send('despesas');
})

app.post('/expenses', (req, res) => {
    const expense = req.json()
    res.send(expense)
})

app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: http://localhost:${PORT}`);
})
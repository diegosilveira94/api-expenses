import express from 'express'
import expenseRoutes from './routes/expenseRoutes.js'

const app = express();
const PORT = 3000;
app.use(express.json())

app.use('/expenses', expenseRoutes)

app.listen(PORT, (error) => {
    if(error) {
        console.log('Ocorreu um erro');
        return;
    }
    console.log(`Server running http://localhost:${PORT} 🚀`);  
});


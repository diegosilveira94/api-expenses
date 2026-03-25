import express from 'express'
import {createExpense} from '../models/expense.js'
import {readFileSync, writeFileSync} from 'fs'

const router = express.Router()

// VALIDAÇÕES
function validDate(date) {
    
}

// CADASTRO
router.post('/', (req, res) => {
    const {
            title,
            amount,
            category,
            date,
            description,
        } = req.body
    
    const [year, month, day] = date.split('-');
    const dateInput = new Date(year, month -1, day)

    // VALIDAÇÕES
    if(!title) {
        return res.status(400).json('O campo "title" é obrigatório')
    }
    if (amount <= 0) {
        return res.status(400).json('Valor deve ser maior que zero!')
    }
    if(!date || day > 31 || month > 12) {
        return res.status(400).json('Data inválida. Formato: YYYY-MM-DD válido')
    }
    if(dateInput > new Date()) {
        return res.status(400).json('Data não pode ser futura!')
    }

    // CRIAR OBJETO
    const expense = createExpense({
        title,
        amount,
        category,
        date,
        description
    })

    // SALVAR NO EXPENSES JSON
    const file = './src/data/expenses.json';
    try {
        const data = readFileSync(file, 'utf8')
        const expenses = [...JSON.parse(data), expense]
        writeFileSync(file, JSON.stringify(expenses), 'utf8')
    } catch (err) {
        console.error('Arquivo não existe ou inválido: ', err)
    }

    return res.status(201).json(expense)
}) 

// LISTAR TODOS
router.get('/', (req, res) => {
    try {
        const file = './src/data/expenses.json';
        const data = readFileSync(file, 'utf8')
        const expenses = JSON.parse(data)
        return res.json(expenses)
    } catch (err) {
        return res.status(500).json('Erro ao retornar os dados: ', err)
    }
})

// LISTAR POR ID
router.get('/:id', (req, res) => {
    const { id } = req.params
    try {
        const file = './src/data/expenses.json';
        const data = readFileSync(file, 'utf8')
        const expenses = JSON.parse(data)
        const expenseMatch = expenses.find(expense => expense.id === id)
        if (!expenseMatch) {
            return res.status(404).json('Despesa não encontrada')
        }
        return res.json(expenseMatch)
    } catch (err) {
        return res.status(500).json('Erro ao retornar a despesa: ', err)
    }
})

// ATUALIZAR
router.put('/:id', (req, res) => {
    const { id } = req.params
    const {
            title,
            amount,
            category,
            date,
            description,
        } = req.body
    try {
        const file = './src/data/expenses.json';
        const data = readFileSync(file, 'utf8')
        const expenses = JSON.parse(data)
        const expenseMatch = expenses.find(expense => expense.id === id)
        if (!expenseMatch) {
            return res.status(404).json('Despesa não encontrada')
        }
        const updatedExpense = {
            ...expenseMatch,
            title,
            amount,
            category,
            date,
            description
        }
        const updatedExpenses = expenses.map(e => e.id === id ? updatedExpense : e)
        writeFileSync(file, JSON.stringify(updatedExpenses), 'utf8')
        
        return res.status(200).json(updatedExpense)
    } catch (err) {
        return res.status(500).json('Erro ao atualizar a despesa: ', err)
    }
})

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params
    try {
        const file = './src/data/expenses.json';
        const data = readFileSync(file, 'utf8')
        const expenses = JSON.parse(data)
        const expenseMatch = expenses.find(expense => expense.id === id)
        if (!expenseMatch) {
            return res.status(404).json('Despesa não encontrada')
        }
        const expensesUpdated = expenses.filter(expense => expense.id !== id)
        writeFileSync(file, JSON.stringify(expensesUpdated), 'utf8')
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json('Erro ao deletar a despesa: ', err)
    }
})

// SOMAR TODOS OS GASTOS
router.get('/summary/total', (req, res) => {
    try {
        const file = './src/data/expenses.json';
        const data = readFileSync(file, 'utf8')
        const expenses = JSON.parse(data)
        const amountTotal = expenses.reduce((total, obj) => total + obj.amount, 0)
        return res.status(200).json({ total: amountTotal})
    } catch (err) {
        return res.status(500).json('Erro ao retornar os dados: ', err)
    }
})

// SOMAR GASTOS POR CATEGORIA
router.get('/summary/category', (req, res) => {
    try {
            const file = './src/data/expenses.json';
            const data = readFileSync(file, 'utf8')
            const expenses = JSON.parse(data)
            const categories = expenses.reduce((acc, expense) => {
                const cat = expense.category
    
                if(!acc[cat]) {
                    acc[cat] = 0
                }
    
                acc[cat] += expense.amount
    
                return acc
            }, {})
            return res.status(200).json(categories)
        } catch (err) {
            return res.status(500).json('Erro ao retornar os dados: ', err)
    }
})

export default router
import { randomUUID } from 'crypto'

export function createExpense({
    title, amount, category, date, description
}) {
    
    return({
        id: randomUUID(),
        title,
        amount,
        category,
        date,
        description,
        createdAt: new Date().toISOString()
    })

}
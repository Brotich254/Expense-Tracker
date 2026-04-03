import { useState, useEffect } from 'react'
import Summary from './components/Summary'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import { Wallet } from 'lucide-react'

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('expenses')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => setExpenses((prev) => [...prev, expense])
  const deleteExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id))

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2.5 rounded-xl">
            <Wallet size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Expense Tracker</h1>
            <p className="text-gray-400 text-sm">Keep tabs on where your money goes</p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Summary expenses={expenses} />
          </div>
          <div className="space-y-6">
            <AddExpense onAdd={addExpense} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  )
}

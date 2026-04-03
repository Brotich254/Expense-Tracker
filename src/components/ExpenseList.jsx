import { Trash2 } from 'lucide-react'

const CATEGORY_COLORS = {
  Food: 'bg-amber-500/10 text-amber-400',
  Transport: 'bg-blue-500/10 text-blue-400',
  Shopping: 'bg-pink-500/10 text-pink-400',
  Health: 'bg-emerald-500/10 text-emerald-400',
  Entertainment: 'bg-purple-500/10 text-purple-400',
  Other: 'bg-gray-500/10 text-gray-400',
}

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Health: '💊',
  Entertainment: '🎮',
  Other: '📦',
}

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center text-gray-500 text-sm py-12">
        No expenses recorded yet.
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Recent Expenses</h2>
      <ul className="space-y-3">
        {[...expenses].reverse().map((expense) => (
          <li
            key={expense.id}
            className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{CATEGORY_ICONS[expense.category] || '📦'}</span>
              <div>
                <p className="text-sm font-medium text-white">{expense.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other}`}>
                    {expense.category}
                  </span>
                  <span className="text-xs text-gray-500">{expense.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onDelete(expense.id)}
                className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Delete expense"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

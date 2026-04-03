import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444']

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Health: '💊',
  Entertainment: '🎮',
  Other: '📦',
}

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const chartData = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-gray-200 mb-1">Overview</h2>
      <p className="text-4xl font-bold text-white mb-6">
        ${total.toFixed(2)}
        <span className="text-sm font-normal text-gray-400 ml-2">total spent</span>
      </p>

      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => `$${val.toFixed(2)}`}
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {chartData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-gray-300">
                    {CATEGORY_ICONS[item.name] || '📦'} {item.name}
                  </span>
                </div>
                <span className="text-gray-400">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm text-center py-8">No expenses yet. Add one to get started.</p>
      )}
    </div>
  )
}

"use client"

export function Sparkline() {
  return (
    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 25L10 20L20 28L30 10L40 15L50 5L59 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function MiniBars() {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {[4, 7, 3, 9, 5, 8].map((h, i) => (
        <div key={i} className="w-1.5 bg-indigo-200 rounded-t-sm" style={{ height: `${h * 10}%` }} />
      ))}
    </div>
  )
}
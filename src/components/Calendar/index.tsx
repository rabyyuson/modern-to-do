import './index.scss'

const Calendar = () => {
  const now = new Date()
  const today = {
    month: now.toLocaleString('en-US', { month: 'short' }),
    date: now.getDate()
  }

  return (
    <div className="Calendar">
      <div className="Calendar-icon">
        <div className="Calendar-icon-month">{today.month}</div>
        <div className="Calendar-icon-date">{today.date}</div>
      </div>
      <div className="Calendar-label">Today</div>
    </div>
  )
}

export default Calendar

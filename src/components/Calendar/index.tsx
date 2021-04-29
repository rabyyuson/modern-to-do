const Calendar = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const now = new Date()
  const today = {
    day: (days[now.getDay()] || '').slice(0,3),
    date: now.getDate()
  }

  return (
    <div className="Calendar">
      <div className="Calendar-icon">
        <div className="Calendar-icon-day">{today.day}</div>
        <div className="Calendar-icon-date">{today.date}</div>
      </div>
      <div className="Calendar-label">Today</div>
    </div>
  )
}

export default Calendar

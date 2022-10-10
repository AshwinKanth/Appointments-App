import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isStartToggled} = props
  const {title, date, isStarred, id} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isStartToggled(id)
  }

  return (
    <li className="appointment-list-item">
      <div className="details-container">
        <p className="title">{title}</p>
        <button className="star-button" type="button" onClick={onClickStar}>
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date : {date}</p>
    </li>
  )
}

export default AppointmentItem

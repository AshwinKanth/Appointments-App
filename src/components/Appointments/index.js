import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(preventDefault => ({
      appointmentsList: [...preventDefault.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  isStartToggled = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickStarred = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentsList = () => {
    const {isFilterActive, appointmentsList} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="add-appointment-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="description" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label className="description" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                className="input"
                id="date"
                value={dateInput}
                onChange={this.onChangeDate}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr" />
          <div className="appointment-container">
            <h1 className="heading">Appointments</h1>
            <button
              className={filterClassName}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-details-container">
            {filteredAppointmentsList.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                isStartToggled={this.isStartToggled}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

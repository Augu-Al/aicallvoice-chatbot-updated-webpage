import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { API_APPOINTMENT } from '../common/constants';
import '../css/appointment-schedule.css';

const localizer = momentLocalizer(moment);

const AppointmentSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        
        const startOfMonth = moment(selectedDate).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(selectedDate).endOf('month').format('YYYY-MM-DD');

        console.log('Fetching appointments for the month:', startOfMonth, 'to', endOfMonth);

        console.log('Fetching appointments for date:', selectedDate.toISOString().split('T')[0]); // Add logging
        const response = await axios.get(API_APPOINTMENT, {
          // params: { date: selectedDate.toISOString().split('T')[0] }
          params: { start_date: startOfMonth, end_date: endOfMonth }
        });
        console.log('Appointments response:', response.data); // Add logging
        const appointments = response.data.map(appointment => ({
          title: `Customer Name: ${appointment.customer_name}\nStaff: ${appointment.staff_name}\nNote: ${appointment.notes}`,
          start: new Date(`${appointment.appointment_date}T${appointment.appointment_time}:00`), 
          end: new Date(new Date(`${appointment.appointment_date}T${appointment.appointment_time}:00`).getTime() + appointment.duration_minutes * 60000), 
          service_type: appointment.service_type,
          status: appointment.status,
          notes: appointment.notes,
          technician_id: appointment.technician_id,
          customer_id: appointment.customer_id
        }));
        
        setEvents(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const eventStyleGetter = (event) => {
    let backgroundColor ='green'; // Default color
    if (event.service_type.includes('medicure')) {
      backgroundColor = 'pink';
    } else if (event.service_type.includes('pedicure')) {
      backgroundColor = 'lightgreen';
    }

    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };

    return {
      style,
    };
  };

  return (
  <div>
    <div className='appointment-schedule'>
      <h1>Appointment Schedule</h1>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
      <div className="legend">
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "pink" }}></span> Medicure
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "lightgreen" }}></span> Pedicure
          </span>
      </div>
    </div>
  </div>

  );
};

export default AppointmentSchedule;
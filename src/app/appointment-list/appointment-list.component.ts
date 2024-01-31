import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = ''
  newAppointmentDate: Date = new Date()
  appointments: Appointment[] = []

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments')
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppoint: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(newAppoint);
      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = '';

      localStorage.setItem('appointments', JSON.stringify(this.appointments))
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1)
    localStorage.setItem('appointments', JSON.stringify(this.appointments))
  }
}

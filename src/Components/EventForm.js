import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gapi } from "gapi-script";
import SuccessModal from './SuccessModal';

var calendarID = process.env.REACT_APP_CALENDAR_ID;
var accessToken = process.env.REACT_APP_ACCESS_TOKEN;


const FormContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px',
});

const FormWrapper = styled('div')(({ theme }) => ({
  width: '80vw',
  maxWidth: 500,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const EventForm = () => {

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    datetime: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset validation error for the current field
    setFormErrors({ ...formErrors, [name]: false });
  };




  //add Events
  const addEvent = (calendarID, event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            handleCloseSuccessModal();
            setFormData({
              name: '',
              email: '',
              phone: '',
              datetime: '',
            })
            return [true, response];
          },
          function (err) {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };



  var handleCloseSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let isValid = true;
    const newFormErrors = { ...formErrors };

    // Validate name
    if (formData.name.trim() === '') {
      newFormErrors.name = true;
      isValid = false;
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newFormErrors.email = true;
      isValid = false;
    }

    // Validate phone number (optional: add more specific validation if needed)
    if (formData.phone.trim() === '') {
      newFormErrors.phone = true;
      isValid = false;
    }

    // Validate datetime (optional: add more specific validation if needed)
    if (formData.datetime.trim() === '') {
      newFormErrors.datetime = true;
      isValid = false;
    }

    // Update state with validation errors (if any)
    setFormErrors(newFormErrors);

    if (isValid) {
      console.log('Form submitted:', formData);
      // Add logic to submit the form data to your backend or perform further actions

      function addOneHour(timeString) {
        const dateTime = new Date(timeString);
        dateTime.setHours(dateTime.getHours() + 1);

        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hour = String(dateTime.getHours()).padStart(2, '0');
        const minute = String(dateTime.getMinutes()).padStart(2, '0');
        const second = String(dateTime.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`;
      }
     
      const customFormatDate = (formData) => {
        const dateTime = new Date(formData);
        dateTime.setHours(dateTime.getHours());

        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hour = String(dateTime.getHours()).padStart(2, '0');
        const minute = String(dateTime.getMinutes()).padStart(2, '0');
        const second = String(dateTime.getSeconds()).padStart(2, '0');
          
        return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`;
      }

      const originalTime = formData.datetime;
      const newTime = addOneHour(originalTime);

      let startDateAndTime =  customFormatDate(formData.datetime);

      // console.log(formData.datetime, newTime)
      console.log("startDateAndTime",startDateAndTime)


      var event = {
        summary: `Booking Cofirmed of your adventure`,
        location: '',
        description: `hi, ${formData.name}! your Horse ride booking has been confirmed by this BookingApp.com.`,
        start: {
          dateTime: startDateAndTime,
          timeZone: 'IST',
        },
        end: {
          dateTime: newTime,
          timeZone: 'IST',
        },
        attendees: [
          {
            email:formData.email
          }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 10 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      }

      addEvent(calendarID, event);

    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <FormContainer component="main" maxWidth="xl">
      <FormWrapper>
        <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '20px' }}>
          Book Your Adventure
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={formErrors.name}
                helperText={formErrors.name ? 'Please enter your name' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
                helperText={formErrors.email ? 'Please enter a valid email address' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
                helperText={formErrors.phone ? 'Please enter your phone number' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="datetime"
                label="Preferred Date and Time"
                name="datetime"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.datetime}
                onChange={handleInputChange}
                error={formErrors.datetime}
                helperText={formErrors.datetime ? 'Please select a date and time' : ''}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </SubmitButton>
        </form>
      </FormWrapper>
      <SuccessModal open={showSuccessModal} onClose={handleCloseSuccessModal} />
    </FormContainer >
  );
};

export default EventForm;

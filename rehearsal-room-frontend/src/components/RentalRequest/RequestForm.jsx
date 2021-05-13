import React from "react";
import { TextField, Button, Checkbox } from '@material-ui/core';
import axios from "axios";


export default function RequestForm(props) {
   const { formState, handleChange } = props;

   const handleSubmit = () => {
    const bookingData = {...formState}
    axios.post('/api/bookings', { bookingData })
    props.setVisualMode("SPACE_SHOW")
    props.setPopUp(true)
   }

  return (
    <>
      <form>
      
        <label for="usage_description">
          Brief description of activity:
        </label>
            <TextField name="usage_description" value={formState.usage_descript} onChange={handleChange} id="outlined-basic" variant="outlined" />

        <label for="date">Select a date: </label>
          <TextField
            id="date"
            name="date"
            type="date"
            value={formState.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: "2020-10-10"
            }}
          />
        
        <label for="start_time">Select a start time: </label>
          <TextField
            id="time"
            name="start_time"
            label="Start Time"
            type="time"
            defaultValue="10:30"
            value={formState.start_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />     

        <label for="end_time">Select an end time: </label>
          <TextField
            id="time"
            name="end_time"
            label="End Time"
            type="time"
            defaultValue="9:30"
            value={formState.end_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        
        <label for="used_before"> Have you rented this space before? </label>
          <Checkbox
            name="used_before"
            color="primary"
            checked={formState.used_before} 
            onChange={handleChange}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          
        <label for="multi_day_rental">Is this a multi-day rental?</label>
          
          <Checkbox
            name="multi_day_rental"
            color="primary"
            checked={formState.multi_day_rental} 
            onChange={handleChange}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        
    
        <label for="alternative_payment"> 
          This host acknowledges the diverse realities of local artists. If you are interested in future alternative workexchange options to offset space rental rates please check here.
        </ label>
        <Checkbox
          name="alternative_payment"
          color="primary"
          checked={formState.alternative_payment} 
          onChange={handleChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
        
      </form>
    </>
    
    
  )

}



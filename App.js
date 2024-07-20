import React from 'react';
import './App.css'
import BookingForm from './BookingForm';
import { Container } from 'react-bootstrap';
const App = () => {
  return (  
    <>
     
    <Container>
   
    <h1 style={{
      display:'flex',alignItems:'center',justifyContent:'center',fontSize:'50px'
    }}>Dream<span style={{color:'red'}}>Hotel</span></h1>
      <BookingForm />
    </Container>
    </>
  );
};

export default App;
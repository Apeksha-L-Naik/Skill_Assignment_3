import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Table from 'react-bootstrap/Table';

const BookingForm = () => {
  const [selectedValues, setSelectedValues] = useState({
    dropdown1: 'Select number of Rooms',
    dropdown2: 'Select number of Adults',
    dropdown3: 'Select number of Children',
  });

  const handleSelect = (eventKey, dropdownId) => {
    setSelectedValues({
      ...selectedValues,
      [dropdownId]: eventKey,
    });
  };

  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8081/get-hotel')
      .then(res => {
        setData(res.data.data.hotelBook)
      }).then(function(response){
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    rooms: '',
    adults: '',
    children: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    axios.post('http://localhost:8081/add-hotel', formData)
      .then((res) => {
        console.log('data', res.data);
        setData([...data, formData]);

        // Reset form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          rooms: '',
          adults: '',
          children: ''
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>   
      <div className='dtJAmi' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <section style={{ marginBottom: '120px' }}>
          <h1 style={{ fontSize: '40px', color: 'red' }}>DreamLand</h1>
          <p style={{ width: '600px', textAlign: 'start', fontSize: '18px' }}>
            Book direct on the official site to get the best price guaranteed. Instant confirmation. Book with total confidence and take advantage of our special NH Discovery rates
            Brands: NH Hotels, NH Collection, nhow, Tivoli Hotels & Resorts
          </p>
        </section>
        <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '30px', borderRadius: '10px' }}>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First Name</Form.Label><br />
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter FirstName"
              style={{ width: '16rem', height: '30px', marginTop: '10px' }}
            />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formEmail" style={{ marginTop: '10px' }}>
            <Form.Label>Email</Form.Label><br />
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '16rem', height: '30px', marginTop: '10px' }}
            />
          </Form.Group>
          
          <Form.Group controlId="formPhone" style={{ marginTop: '10px' }}>
            <Form.Label>Phone</Form.Label><br />
            <Form.Control
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: '16rem', height: '30px', marginTop: '10px' }}
            />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formCheckInDate" style={{ marginTop: '10px' }}>
            <Form.Label>Check-in Date</Form.Label><br />
            <Form.Control
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              style={{ width: '16rem', height: '30px', marginTop: '10px' }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCheckOutDate" style={{ marginTop: '10px' }}>
            <Form.Label>Check-out Date</Form.Label><br />
            <Form.Control
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              style={{ width: '16rem', height: '30px', marginTop: '10px' }}
            />
          </Form.Group>    
          
          <Form.Group controlId="formSelect" style={{ marginTop: '10px' }}>
            <Form.Label>Select Number of Rooms:</Form.Label>
            <Form.Control
              as="select"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId="formSelect" style={{ marginTop: '10px' }}>
            <Form.Label>Select Number of Adults:</Form.Label>
            <Form.Control
              as="select"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId="formSelect" style={{ marginTop: '10px' }}>
            <Form.Label>Select Number of Children:</Form.Label>
            <Form.Control
              as="select"
              name="children"
              value={formData.children}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button type="submit" style={{ marginTop: '20px', width: '8rem', height: '40px', borderRadius: '20px', backgroundColor: 'red', color: 'white', cursor: 'pointer', border: 'none' }}>
              Book Now
            </Button>
          </div>
        </Form> 
      </div>    

      <div className='container'>
        <h1>Rooms Booked</h1>
        {Array.isArray(data) && data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>CheckIn Date</th>
                <th>CheckOut Date</th>
                <th>Rooms</th>
                <th>Adults</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.checkIn}</td>
                  <td>{val.checkOut}</td>
                  <td>{val.rooms}</td>
                  <td>{val.adults}</td>
                  <td>{val.children}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No rooms booked yet.</p>
        )}
      </div>
    </>
  );
};  

export default BookingForm;

import React, { useState } from 'react'
import { Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import {Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import emailjs from '@emailjs/browser'

const PaymentScreen = () => {

    const navigate = useNavigate()

    const cart= useSelector(state => state.cart)
    const {shippingAddress} = cart

 



    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState('PayPal')
   

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod}))
        navigate('/placeorder')
        
    }

  return (
    <FormContainer>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
      
        <Form.Group className='mt-4'>
            <Form.Label as='legend'>
                Select Method
            </Form.Label> 
            
        <Col> 
            <Form.Check 
                type='radio' 
                label='PayPal or Credit Card' 
                id='PayPal' 
                name='paymentMetod' 
                value='PayPal' 
                checked 
                onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>

        </Col>

        </Form.Group>
   

    <Button type='submit' variant='primary' className='mt-3'>Continue</Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen


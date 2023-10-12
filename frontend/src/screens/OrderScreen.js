import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { saveShippingAddress } from '../actions/cartActions'
import {PayPalButton} from 'react-paypal-button-v2'

import FormContainer from '../components/FormContainer'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import emailjs from '@emailjs/browser'

const OrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const orderId = id
    
    const [sdkReady, setSdkReady] = useState(false)
    

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay } = orderPay

    
    const userDetails = useSelector(state => state.userDetails)
    const {  user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

  
  

    if(!loading){
        
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0))
    }

    useEffect(() =>{

        

     
        const addPaypalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload =() => {
                setSdkReady(true)

                const data = {
                    service_id: 'service_gukx7hz',
                    template_id: 'template_pn8dg4n',
                    user_id: 'wsnx4uIOeSxph6IEi',
                    template_params: {
                        'username': user.name,
                        'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
                    }
                };
            
                fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) {
                    if (response.ok) {
                        
                    } else {
                        return response.json().then(function(error) {
                        
                        });
                    }
                })
                .catch(function(error) {
                   
                });
            
            }

            document.body.appendChild(script)
        }

        if(!order  || successPay){
           
            dispatch(getOrderDetails(orderId))
           
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }

        
         

       
    },[dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
        
    }

    
    

    


  return loading ? <Loader></Loader> : error ? <Message variant='danger'></Message> : <>
  <h1>Order {order._id}</h1>
  <Row className='row'> 
  <Col md={8}>
      <ListGroup variant='flush'>
          <ListGroup.Item>
              <h2 className='shipping'> Shipping</h2>
              <p className='name'><strong >Name: </strong> {order.user.name} </p>
              <p className='email'><strong >Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
              <p className='address'>
                  <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>

              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt }</Message> : <Message variant='danger'>Not delivered </Message>}
          </ListGroup.Item>

          <ListGroup.Item>
              <h2>Payment Method</h2>
             <p className='payment'> <strong>Method: </strong>{order.paymentMethod}</p>
             {order.isPaid ? <Message variant='success'>Paid on {order.paidAt }</Message> : <Message variant='danger'>Not paid </Message>}
          </ListGroup.Item>

          <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0? <Message>Order is empty</Message>: (
                  <ListGroup variant='flush'>
                      {order.orderItems.map((item,index)=>(
                          <ListGroup.Item key={index}>
                              <Row>
                                  <Col md={1}>
                                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                                  </Col>

                                  <Col>
                                      <Link to={`/product/${item.product}`}>
                                          {item.name}
                                      </Link>
                                  </Col>

                                  <Col md={4}>
                                      {item.qty} x &#x20b9; {item.price} = ${item.qty * item.price}
                                  </Col>
                              </Row>
                          </ListGroup.Item>
                      ))}
                  </ListGroup>
              )}
          </ListGroup.Item>

      </ListGroup>
  
  </Col>

  <Col md={4}>
      <Card>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                  <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                      <Col>Items</Col>
                      <Col>&#x20b9; {order.itemsPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                      <Col>Shipping</Col>
                      <Col>&#x20b9; {order.shippingPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                      <Col>Tax</Col>
                      <Col>&#x20b9; {order.taxPrice}</Col>
                  </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  <Row>
                      <Col>Total</Col>
                      <Col>&#x20b9; {order.totalPrice}</Col>
                  </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                    {loadingPay && <Loader></Loader>}
                    {!sdkReady? <Loader></Loader> :(
                       <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton> 
                    )}
                </ListGroup.Item>
              )}

                          
              
              
          </ListGroup>
      </Card>
  </Col>
</Row>
  </>
}

export default OrderScreen

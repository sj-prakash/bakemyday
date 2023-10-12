import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import { addToCart, removeFromCart } from "../actions/cartActions"



const CartScreen = () => {

const {id } =  useParams()
const location = useLocation()
const navigate = useNavigate()

const qty = location.search ? Number (location.search.split('=')[1]) : 1


const dispatch =useDispatch()

const cart = useSelector(state => state.cart)
const {cartItems} = cart




useEffect(() => {
  if(id){
    dispatch( addToCart(id, qty))
  }
},[dispatch, id, qty]) 


const removeFromCartHandler = (id) => {
  dispatch(removeFromCart(id))
}

const checkoutHandler = () => {

  
    navigate('/login?redirect=/shipping');
  
};


  return (
    <Row>
      <Col md={8}>
        <h1 className='pb-4'>
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>go back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product} alt={item.name} >
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded></Image>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>

                  </Col>

                  <Col md={2}>
                  &#x20b9; {item.price}
                  </Col>

                  <Col md={2}>
                  <Form.Control 
                    as='select' 
                    className='form-select' 
                    value={item.qty} 
                    onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            
                    {[...Array(item.countIn).keys()].map((x) =>(
                        <option key={x+1} value={x+1}>
                            {x+1}
                        </option>    
                    ))}

                 </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button className='trash-btn' type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'/>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

            ))}
          </ListGroup>
        )}
      </Col>


      <Col md={4}>
          <Card>
              <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2 className='pb-2'>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
                        &#x20b9; {cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                      </ListGroup.Item>

                      <ListGroup.Item>
                      <div className='button-div'>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        Proceed To Checkout
                        </Button>
                      </div>
                        
                      </ListGroup.Item>
              </ListGroup>
          </Card>
      </Col>

      
    </Row>
  )
}

export default CartScreen

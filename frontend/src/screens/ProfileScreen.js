import React, { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import {Table, Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'






const ProfileScreen = () => {

    const  [name, setName]  = useState('')
    const  [email, setEmail]  = useState('')
    const  [password, setPassword]  = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error,user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.userUpdateProfile)
    const { loading: loadingOrders, error: errorOrders, orders: orderList } = orderListMy;
    const [orders, setOrders] = useState([]);
    


    const location = useLocation()
    const navigate = useNavigate()

    

    useEffect(() =>{
        if(!userInfo){ 
            navigate('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders)
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[navigate,userInfo,dispatch,user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match!')
        }else{
          dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
        
    }
    
    
  return <Row>
        <Col md={3}>
        <h2>USER PROFILE</h2>
        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='warning'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>

                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    
                    </Form.Control>
                </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>
                     Email Address
                </Form.Label>

                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>
                     Password
                </Form.Label>

                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>
                     Confirm Password
                </Form.Label>

                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>
        </Form>
        </Col>

        <Col md={9}>
        <h2>My Orders</h2>
        <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderItems._id}>
                  <td>{order.orderItems._id}</td>
                  <td>{order.rderItems.createdAt.substring(0, 10)}</td>
                  <td>{order.orderItems.totalPrice}</td>
                  <td>
                    {order.orderItems.isPaid ? (
                        order.orderItems.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.orderItems.isDelivered ? (
                        order.orderItems.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.orderItems._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
                   
      </Col>
    </Row>
}

export default ProfileScreen


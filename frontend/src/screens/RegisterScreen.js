import React, { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'




const RegisterScreen = () => {

    const  [name, setName]  = useState('')
    const  [email, setEmail]  = useState('')
    const  [password, setPassword]  = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error,userInfo } = userRegister

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match!')
        }else{
            dispatch(register(name,email,password))
        }
        
    }
    
    
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='warning'>{message}</Message>}
        {error && <Message variant='warning'>{error}</Message>}
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
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?{' '}<Link to={redirect ? `/logn?redirect=${redirect}` :'/login'}>Login</Link> 
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen

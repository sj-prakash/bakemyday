import React from 'react'
import {  useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link , useParams } from 'react-router-dom'
import { Row , Card, Col, Image, ListGroup, Button,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';



const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state =>state.productDetails)
    const {loading,error,product} = productDetails


    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() =>{
        dispatch(listProductDetails(id))
    },[dispatch,id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

  return (
    <>
    
        <Link className='butt btn my-3' to='/'>Go Back</Link>

        {loading ? <Loader/> : error ? <Message variant ='danger'>{error}</Message> :(
            <Row>
            <Col md={6}>
                <Image style={{width: '500px' , height: '500px'}} src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price : &#x20b9; {product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description :{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>

                                <Col>
                                    <strong>&#x20b9; {product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>

                                <Col>
                                    {product.countIn > 0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countIn > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' className='form-select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            
                                            {[...Array(product.countIn).keys()].map((x) =>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <div className='button-div'>
                            <Button 
                                onClick={addToCartHandler} 
                                className='button btn-block' type='button' 
                                disabled={product.countIn === 0}>
                                Add to cart
                            </Button>

                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>

            </Col>
        </Row> 
        )}

        

     
    </>
  )
}

export default ProductScreen

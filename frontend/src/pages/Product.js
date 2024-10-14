import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const Product = () => {
    //use state hook. Nothing in the squarer brackets cause it's empty in the beginning.
    //it has a current state and update state
    const [products, setProduct] = useState([])
    useEffect(()=>{
        const fetchAllProducts = async()=>{
            try {
                const res = await axios.get("http://localhost:8800/product")
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        //call the fetch function
        fetchAllProducts()
        //empty brackets/empty array means it will run just once
    },[])
  return (
    <div>

        <h1>MetroMart</h1>

        <div className='products'>
            {products.map(product=>(
                <div className='product' key={product.ProductID}>
                    <h2>{product.ProductName}</h2>
                    <h2>{product.Size}</h2>
                    <span>{product.Price}</span>
                </div>
            ))}
        </div>
        <button><Link to ="add">Add A New Product</Link></button>
    </div>
  )
}

export default Product

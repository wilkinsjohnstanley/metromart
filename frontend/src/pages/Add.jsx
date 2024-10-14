import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const Add = () => {
    const [product, setProduct] = useState({
        ProductID:null,
        ProductName:"",
        UPC:"",
        Size:"",
        Price:null,
        ProductTypeID:null,
        BrandID:null,
    });
    const [error,setError] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setProduct((prev)=>({...prev, [e.target.name]:e.target.value}));
    };
console.log(product)

    const handleClick = async (e) => {
        e.preventDefault() 
        try {
            await axios.post("http://localhost:8800/product", product)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    };

  return (
    <div className='form'>
        <h1>Add A New Product</h1>
        <input type='number' placeholder='ProductID (number)' onChange={handleChange} name="ProductID"  ></input>
        <input type='text' placeholder='ProductName (text)' onChange={handleChange} name="ProductName" ></input>

        <input type='text' placeholder='UPC (number)' onChange={handleChange}  name="UPC" ></input>

        <input type='text' placeholder='Size (text)'  onChange={handleChange} name="Size" ></input>

        <input type='number' placeholder='Price (number)' onChange={handleChange} name="Price" ></input>

        <input type='number' placeholder='ProductTypeID (number)' onChange={handleChange} name="ProductTypeID"  ></input>

        <input type='number' placeholder='BrandID (number)' onChange={handleChange} name="BrandID" ></input>
    <button onClick={handleClick}>Add</button>
    <Link to="/"> See all books</Link>
    </div>
  )
}

export default Add

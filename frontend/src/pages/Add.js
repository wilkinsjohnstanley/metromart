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

    const handleClick = async e => {
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
        <input type='number' placeholder='ProductID (number)' name="ProductID" onChange={handleChange} ></input>
        <input type='text' placeholder='ProductName (text)' name="ProductName" onChange={handleChange} ></input>

        <input type='text' placeholder='UPC (number)' name="UPC" onChange={handleChange} ></input>

        <input type='text' placeholder='Size (text)' name="Size" onChange={handleChange} ></input>

        <input type='number' placeholder='Price (number)' name="Price" onChange={handleChange} ></input>

        <input type='number' placeholder='ProductTypeID (number)' name="ProductTypeID" onChange={handleChange} ></input>

        <input type='number' placeholder='BrandID (number)' name="BrandID" onChange={handleChange} ></input>
    <button onClick={handleClick}>Add</button>
    {error && "Something went wrong!"}
    <Link to="/"> See all books</Link>
    </div>
  )
}

export default Add

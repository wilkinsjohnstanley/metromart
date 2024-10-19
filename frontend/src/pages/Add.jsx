import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const Add = () => {
    const [product, setProduct] = useState({
        ProductID: null,
        ProductName: "",
        UPC: null,
        Size: "",
        Price: null,
        ProductTypeID: null,
        BrandID: null,
    });

    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the input type should be a number and convert it accordingly
        const updatedValue = (name === "ProductID" || name === "Price" || name === "ProductTypeID" || name === "BrandID")
            ? Number(value) || null // Convert to number or set null if empty
            : value;

        setProduct((prev) => ({ ...prev, [name]: updatedValue }));
    };

    console.log(product);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/product", product);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);  // Set error to true if request fails
        }
    };

    return (
        <div className='form'>
            <h1>Add A New Product</h1>
            <input
                type='number'
                placeholder='ProductID (number)'
                onChange={handleChange}
                name="ProductID"
            />
            <input
                type='text'
                placeholder='ProductName (text)'
                onChange={handleChange}
                name="ProductName"
            />
            <input
                type='text'
                placeholder='UPC (number)'
                onChange={handleChange}
                name="UPC"
            />
            <input
                type='text'
                placeholder='Size (text)'
                onChange={handleChange}
                name="Size"
            />
            <input
                type='number'
                placeholder='Price (number)'
                onChange={handleChange}
                name="Price"
            />
            <input
                type='number'
                placeholder='ProductTypeID (number)'
                onChange={handleChange}
                name="ProductTypeID"
            />
            <input
                type='number'
                placeholder='BrandID (number)'
                onChange={handleChange}
                name="BrandID"
            />
            <button onClick={handleClick}>Add</button>
            {error && <p style={{ color: 'red' }}>Something went wrong! Please try again.</p>}
            <Link to="/"> See all products</Link>
        </div>
    )
}

export default Add;

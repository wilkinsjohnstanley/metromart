import axios from 'axios'
import React from 'react'
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
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        //call the fetch function
        fetchAllProducts()
        //empty brackets/empty array means it will run just once
    },[])
  return (
    <div>
      Insert Products Here
    </div>
  )
}

export default Product

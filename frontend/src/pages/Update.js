import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {

    // const [item, setItem] = useState({
    //   title: "",
    //   desc: "",
    //   price: null,
    //   cover: "",
    // });
    // const [error,setError] = useState(false)
  
    // const location = useLocation();
    // const navigate = useNavigate();
  
    // const bookId = location.pathname.split("/")[2];
  
    // const handleChange = (e) => {
    //   setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
  
    // const handleClick = async (e) => {
    //   e.preventDefault();
  
    //   try {
    //     await axios.put(`http://localhost:8800/books/${bookId}`, book);
    //     navigate("/");
    //   } catch (err) {
    //     console.log(err);
    //     setError(true);
    //   }
    // };
  return (
    <div className="max-w-container mx-auto px-4">
      
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Update the inventory
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
          <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Store Name
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter the name of the store here"
                // onChange={handleChange}
              />
         
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Location
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the location"
                // onChange={handleChange}
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Product Name
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the name of the product"
                // onChange={handleChange}
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Stock Quantity
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the quantity of the stock"
                // onChange={handleChange}
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Reorder Level
              </p>
              <textarea
                
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter level at which it becomes necessary to reorder"
                // onChange={handleChange}
              ></textarea>
              
              
            </div>
            
            <button //onClick={handleClick}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Update
            </button>
          </div>
        </form>
      
    </div>
  );
}

export default Update

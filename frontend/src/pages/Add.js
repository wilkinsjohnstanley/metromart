import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
// Function to hold the state, and update if necessary
const [item, setItem] = useState({
  StoreName: "",
  Location: "",
  ProductName: "",
  StockQuantity: null,
  ReorderLevel:null,
});
const [error,setError] = useState(false)

const navigate = useNavigate();


//In order to change the values, there must be a handleChange function.
const handleChange = (e) => {
  setItem(prev=>({...prev,[e.target.name]: e.target.value}));
};
console.log(item)


//Make operable the button which has the duty of updating the data stored on the server
const handleClick = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8800/inventory", item);
    navigate("/InventoryMgmt");
  } catch (err) {
    console.log(err);
    setError(true)
  }
};

  return (
    <div className="max-w-container mx-auto px-4">
      
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Add to the Inventory
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
                onChange={handleChange}

                name='StoreName'
              />
         
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Location
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the location"
                onChange={handleChange}

                name='Location'
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Product Name
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the name of the product"
                onChange={handleChange}

                name='ProductName'
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Stock Quantity
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the quantity of the stock"
                onChange={handleChange}

                name='StockQuantity'
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
                onChange={handleChange}
                name='ReorderLevel'
              ></textarea>
              
              
            </div>
            
            <button
              onClick={handleClick}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Add
            </button>
            {error && "Something went wrong!"}
      <Link to="/">See all items</Link>
          </div>
        </form>
      
    </div>
  );
}

export default Add

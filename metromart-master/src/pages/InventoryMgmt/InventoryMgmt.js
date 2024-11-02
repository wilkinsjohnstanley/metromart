import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";

const InventoryMgmt = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);


  //Get the inventory from the backend. 
  const [items, setItems] = useState([])
  useEffect(()=>{
    const fetchAllItems = async ()=>{
      try {
        //the result of the inventory SQL query is retrieved. 
        const res = await axios.get("http://localhost:8800/inventory")
        console.log(res)
        //get the data from the backend server!!
        setItems(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    //call the function
    fetchAllItems()
  },[])


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Inventory Management System" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">          Items below Reorder Level
          </span>{" "}
        </h1>
        {/* Inventory table! */}
        <table className="table table-bordered">
          <thead>
        <tr>
          <th scope="col"> Store </th>
          <th scope="col"> Location </th>
          <th scope="col"> Product </th>
          <th scope="col"> Stock Quantity </th>
          <th scope="col"> Reorder Level </th>

        </tr>
        </thead>

        <tbody>
          {items.map(item=>{
            return(
              <tr>
                <>
            <td>{item.StoreName}</td>
            <td>{item.Location}</td>
            <td>{item.ProductName}</td>
            <td>{item.StockQuantity}</td>
            <td>{item.ReorderLevel}</td>

            </>
              </tr>

            )
           

})}
   
   </tbody>
        </table>

        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>

        
      </div>
    </div>
  );
};

export default InventoryMgmt;

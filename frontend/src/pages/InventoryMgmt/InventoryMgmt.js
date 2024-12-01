import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";

const InventoryMgmt = () => {
    //for the navigation breadcrumbs
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);


 //Get the inventory from the backend 
 const [stock, setStock] = useState([])
 useEffect(()=>{
   const fetchAllStock = async ()=>{
     try {
       //the result of the inventory SQL query is retrieved. 
       const res = await axios.get("http://localhost:8800/inventory")


       console.log(res)
       //get the data from the backend server!!
       setStock(res.data);
     } catch (err) {
       console.log(err)
     }
   }
   //call the function
   fetchAllStock()
 },[])
 //Add Stock

  //Get the items below reorder level from the backend. 
  const [items, setItems] = useState([])
  useEffect(()=>{
    const fetchAllItems = async ()=>{
      try {
        //the result of the inventory SQL query is retrieved. 
        const res = await axios.get("http://localhost:8800/reorder")
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
//Reorder Items
    const handleReorder = async (e, ProductID) => {
      e.preventDefault();
  
      try {
        await axios.put(`http://localhost:8800/reorder/${ProductID}`);
        // navigate("/");
      } catch (err) {
        console.log(err);
        // setError(true);
      }
    };




  //Delete function
  // const handleDelete = async(id)=>{
  //   try {
  //     await axios.delete(`http://localhost:8800/inventory/${id}`)

  //     window.location.reload() //refresh is normally done with Redux
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Inventory Management System" prevLocation={prevLocation} />
      <div className="pb-10">

        {/* Inventory  */}
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">          Inventory
          </span>{" "}
        </h1>
        <table className="table table-bordered">
          <thead>
        <tr>
          <th  style={{ padding: "16px" }}scope="col"> Store </th>
          <th  style={{ padding: "16px" }}scope="col"> Address </th>
          <th  style={{ padding: "16px" }}scope="col"> Product </th>
          <th  style={{ padding: "16px" }}scope="col"> Quantity </th>

        </tr>
        </thead>

        <tbody>
          {stock.map((stocks)=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }}>{stocks.StoreName}</td>
            <td style={{ padding: "16px" }}>{stocks.Location}</td>
            <td style={{ padding: "16px" }}>{stocks.ProductName}</td>
            <td style={{ padding: "16px" }}>{stocks.StockQuantity}</td>
            {/* <td style={{ padding: "16px" }}><button className="update" ><Link to={`/add/${stocks.id}`}>Update</Link></button></td>
            <td style={{ padding: "16px" }}><button className="delete" onClick={()=>handleDelete(stocks.id)}>Delete</button></td> */}

               </>
              </tr> )
           

})}

   
   </tbody>
        </table>

        {/* Items below reorder level table */}

        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">          Items below Reorder Level
          </span>{" "}
        </h1>
        <table className="table table-bordered">
          <thead>
        <tr>
          <th  style={{ padding: "16px" }}scope="col"> ProductID </th>
          <th  style={{ padding: "16px" }}scope="col"> Store </th>
          <th  style={{ padding: "16px" }}scope="col"> Location </th>
          <th  style={{ padding: "16px" }}scope="col"> Product </th>
          <th  style={{ padding: "16px" }}scope="col"> Stock Quantity </th>
          <th  style={{ padding: "16px" }}scope="col"> Reorder Level </th>
          <th  style={{ padding: "16px" }}scope="col"> Button</th>


        </tr>
        </thead>

        <tbody>
          {items.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }}>{item.ProductID}</td>
            <td style={{ padding: "16px" }}>{item.StoreName}</td>
            <td style={{ padding: "16px" }}>{item.Location}</td>
            <td style={{ padding: "16px" }}>{item.ProductName}</td>
            <td style={{ padding: "16px" }}>{item.StockQuantity}</td>
            <td style={{ padding: "16px" }}>{item.ReorderLevel}</td>
            <td style={{ padding: "16px" }}><button className="reorder" onClick={()=>handleReorder(item.ProductID)}>Reorder</button></td>


            </>
              </tr>

            )
           

})}
   
   </tbody>
        </table>

        {/* <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link> */}

        
      </div>
    </div>
  );
};

export default InventoryMgmt;

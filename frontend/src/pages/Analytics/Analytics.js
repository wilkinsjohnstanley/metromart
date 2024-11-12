import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from "axios";


const Analytics = () => {
  //for the navigation breadcrumbs
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

// =================== Get the analytics data from the backend====================

//Top 20 for Each Store. 
const [top20ByStore, setTop20ByStore] = useState([])
useEffect(()=>{
  const fetchTop20ByStore = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/top20ByStore")
      console.log(res)
      //get the data from the backend server!!
      setTop20ByStore(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchTop20ByStore()
},[]);

//Top 20 for Each State
//http://localhost:8800/top20ByState
const [top20ByState, setTop20ByState] = useState([])
useEffect(()=>{
  const fetchTop20ByState = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/top20ByState")
      console.log(res)
      //get the data from the backend server!!
      setTop20ByState(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchTop20ByState()
},[]);
//Top 5 Stores
//http://localhost:8800/top5stores
const [top5stores, setTop5stores] = useState([])
useEffect(()=>{
  const fetchTop5stores = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/top5stores")
      console.log(res)
      //get the data from the backend server!!
      setTop5stores(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchTop5stores()
},[]);
//In how many stores did Coke outsell Pepsi?
//http://localhost:8800/cokeVsPepsi
const [cokeVsPepsi, setCokeVsPepsi] = useState([])
useEffect(()=>{
  const fetchCokeVsPepsi = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/cokeVsPepsi")
      console.log(res)
      //get the data from the backend server!!
      setCokeVsPepsi(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchCokeVsPepsi()
},[]);
//What are the top 3 products people bought alongside milk?
//http://localhost:8800/top3WithMilk
const [top3WithMilk, setTop3WithMilk] = useState([])
useEffect(()=>{
  const fetchTop3WithMilk = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/top3WithMilk")
      console.log(res)
      //get the data from the backend server!!
      setTop3WithMilk(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchTop3WithMilk()
},[]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Analytics" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Analytics</span>{" "}
          are the metrics that set MetroMart apart from other world leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic Worldwide cool
          looking style.
          <ul>
          <li>----------------------------------------------------------------------</li>
          <li>1. What are the 20 top-selling products at each store? </li>
           {/* Analytics table! */}
 <table className="table table-bordered">
          <thead>
        <tr>
          <th style={{ padding: "16px" }} scope="col"> Store Name </th>
          <th style={{ padding: "16px" }} scope="col"> Product Name </th>
          <th style={{ padding: "16px" }} scope="col"> SalesCount </th>


        </tr>
        </thead>

        <tbody>
          {top20ByStore.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }} >{item.StoreName}</td>
            <td style={{ padding: "16px" }}>{item.ProductName}</td>
            <td style={{ padding: "16px" }}>{item.SalesCount}</td>

            </>
              </tr>

            )
           

})}   </tbody>
        </table>
        <li>----------------------------------------------------------------------</li>

          <li>2. What are the 20 top-selling products in each state?  </li>
                     {/* Analytics table! */}
 <table className="table table-bordered">
          <thead>
        <tr>
          <th style={{ padding: "16px" }}scope="col"> Location </th>
          <th style={{ padding: "16px" }}scope="col"> Product Name </th>
          <th style={{ padding: "16px" }}scope="col"> Total Quantity Sold </th>


        </tr>
        </thead>

        <tbody>
          {top20ByState.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }}>{item.State}</td>
            <td style={{ padding: "16px" }}>{item.ProductName}</td>
            <td style={{ padding: "16px" }}>{item.TotalQuantitySold}</td>

            </>
              </tr>

            )
           

})}   </tbody>
        </table>
        <li>----------------------------------------------------------------------</li>

          <li>3. What are the 5 stores with the most sales so far this year? </li>
                               {/* Analytics table! */}
 <table className="table table-bordered">
          <thead>
        <tr>
          <th  style={{ padding: "16px" }} scope="col"> Location </th>
          <th style={{ padding: "16px" }} scope="col"> Total Sales </th>


        </tr>
        </thead>

        <tbody>
          {top5stores.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }}>{item.Location}</td>
            <td style={{ padding: "16px" }}>{item.TotalSales}</td>

            </>
              </tr>

            )
           

})}   </tbody>
        </table>
        <li>----------------------------------------------------------------------</li>

          <li>4. In how many stores does Coke outsell Pepsi?</li>
            {/* Analytics table! */}
 <table className="table table-bordered">
          <thead>
        <tr>
          <th style={{ padding: "16px" }} scope="col"> Number of Stores </th>


        </tr>
        </thead>

        <tbody>
          {cokeVsPepsi.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }} >{item.StoresWhereCokeOutsellsPepsi}</td>

            </>
              </tr>

            )
           

})}   </tbody>
        </table>
        <li>----------------------------------------------------------------------</li>

          <li>5. What are the top 3 types of product that customers buy in addition to milk?</li>
            {/* Analytics table! */}
            <table className="table table-bordered">
          <thead>
        <tr>
          <th style={{ padding: "16px" }} scope="col"> Product </th>
          <th  style={{ padding: "16px" }}scope="col"> How many times was it bought alongside milk? </th>


        </tr>
        </thead>

        <tbody>
          {top3WithMilk.map(item=>{
            return(
              <tr>
                <>
            <td style={{ padding: "16px" }} >{item.ProductName}</td>
            <td style={{ padding: "16px" }}>{item.PurchaseCount}</td>

            </>
              </tr>

            )
           

})}   </tbody>
        </table>

          </ul>
        </h1>
















        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Analytics;

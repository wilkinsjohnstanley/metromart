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

//Get the analytics data from the backend. 
const [analyticData, setAnalyticData] = useState([])
useEffect(()=>{
  const fetchAnalyticData = async ()=>{
    try {
      //the result of the inventory SQL query is retrieved. 
      const res = await axios.get("http://localhost:8800/analytics")
      console.log(res)
      //get the data from the backend server!!
      setAnalyticData(res.analyticData);
    } catch (err) {
      console.log(err)
    }
  }
  //call the function
  fetchAnalyticData()
},[])



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
            <li>1. In how many stores does Coke outsell Pepsi?</li>
            <li>2. What are the 5 stores with the most sales so far this year? </li>
            <li>3. What are the 20 top-selling products at each store? </li>
            <li>4. What are the 20 top-selling products in each state?  </li>
            <li>5. What are the top 3 types of product that customers buy in addition to milk?</li>


          </ul>
        </h1>

 {/* Analytics table! */}
 <table className="table table-bordered">
          <thead>
        <tr>
          <th scope="col"> column name </th>
          <th scope="col"> column name </th>
          <th scope="col"> column name </th>
          <th scope="col"> column name </th>
          <th scope="col"> column name </th>

        </tr>
        </thead>

        <tbody>
          {analyticData.map(item=>{
            return(
              <tr>
                <>
            {/* <td>{item.StoreName}</td>
            <td>{item.Location}</td>
            <td>{item.ProductName}</td>
            <td>{item.StockQuantity}</td>
            <td>{item.ReorderLevel}</td> */}

            </>
              </tr>

            )
           

})}   </tbody>
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

export default Analytics;

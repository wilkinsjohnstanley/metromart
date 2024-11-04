import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  metromart_t_shirt,
  metromart_bag,
  metromart_hat,
  metromart_charger,
} from "../../../assets/images/index";

const SpecialOffers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1101"
          img={metromart_t_shirt}
          productName="MetroMart T-Shirt"
          price="10.00"
          color="Blank and White"
          badge={true}
          des="Simply the most comfortable T-Shirt for you."
        />
        <Product
          _id="1102"
          img={metromart_bag}
          productName="MetroMart Tote Bag"
          price="180.00"
          color="Gray"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1103"
          img={metromart_hat}
          productName="MetroMart Hat"
          price="25.00"
          color="Mixed"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1104"
          img={metromart_charger}
          productName="MetroMart Phone Charger"
          price="220.00"
          color="Black"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
      </div>
    </div>
  );
};

export default SpecialOffers;

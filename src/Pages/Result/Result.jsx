import React, { useEffect } from 'react'
import LayOut from '../../Component/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import ProductCard from '../../Component/Products/ProductCard'
import classes from "../Result/Resul.module.css";
import { productUrl } from "../../Api/Endpoint";
function Result() {
   const[result,SetResults]=useState([])
  const { CategoryName } = useParams()
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${CategoryName}`)
      .then((res) => {
        SetResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[])
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {CategoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {result?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true}
            />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Result
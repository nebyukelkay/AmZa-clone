import React,{useContext, useState} from "react";
import classes from "./Payment.module.css"
import { DataContext } from "../../Component/DataProvider/Dataprovider";
import LayOut from "../../Component/Layout/Layout"
import ProductCard from "../../Component/Products/ProductCard"
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import Currency from "../../Component/CurrencyFormat/Currency";


function Payment(){
  const [{user,basket}]=useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);


  const [cardError,setcardError]=useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange= (e)=>{
e?.error?.message? setcardError(e?.error?.message):setcardError(" ")
  }
  return(
    <LayOut>


    <div className={classes.payment_header}>
          checkout ({totalItem}) items
        </div>
      <section className={classes.payment}>

       <div className={classes.flex}>
     <h3>Delivery Adress</h3>
     <div>
      <div>{user?.email}</div>
      <div>123 React lane</div>
      <div>Chicago IL</div>
     </div>
       </div>
        <hr />

        <div className={classes.flex}>
      <h3>Review items and delivery</h3>
         <div>
          {
            basket?.map((item)=><ProductCard product={item} flex={true}/>)
          }
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
         <h3>Payment Method</h3>
         <div className={classes.payment_card_container}>
          <div className={classes.payment_details}>
            <form action="">
              {cardError && <small style={{color:"red"}}>{cardError}</small>}
            <CardElement onChange={handleChange}/>
            <div className={classes.payment_price}> 
              <div>
                <span style={{display:"flex",gap:"10px"}}>
                  <p> Total Order |</p>
                  <Currency amount={total}/>
                </span>
              </div>
              <button>Pay Now</button>
            </div>
            </form>
          </div>
         </div>
        </div>
      </section>
    </LayOut>
  )
}
export default Payment;
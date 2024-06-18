import React,{useContext, useId, useState} from "react";
import classes from "./Payment.module.css"
import { DataContext } from "../../Component/DataProvider/Dataprovider";
import LayOut from "../../Component/Layout/Layout"
import ProductCard from "../../Component/Products/ProductCard"
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import Currency from "../../Component/CurrencyFormat/Currency";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import  {useNavigate}  from "react-router-dom";
import { Type } from "../../Utility/action.type";




function Payment(){
  const [{user,basket},dispatch]=useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);


  const [cardError,setcardError]=useState(null);

  const[processing,setProcessing]=useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  


  const handleChange= (e)=>{
e?.error?.message? setcardError(e?.error?.message):setcardError(" ")
  }
const handlepayment=async (e)=>{
  e.preventDefault();

try {

  setProcessing(true)
  //1.back end || function ------contact to the client secret
  const response= await axiosInstance({
    method:"POST",
    url: `/payment/create?total=${total*100}`,
  })
  // console.log(response.data)

  const clientSecret= response.data?.clientSecret;
  //2.client side (react side confiramtion)

  const {paymentIntent}= await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method:{
        card:elements.getElement(CardElement)
      }
    });

    // console.log(paymentIntent)
    //3.after the confiramtion


await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
  basket:basket,
  amount:paymentIntent.amount,
  created:paymentIntent.created
})
//empty basket
  dispatch({type:Type.EMPTY_BASKET})



    setProcessing(false)
    navigate("/Order",{state:{msg:"you have placed new order"}})
} catch (error) {
  // console.log(error);

  setProcessing(false);
  navigate("/Order",{state:{msg:"you have placed new order"}})
 
}

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

            <form onSubmit={handlepayment}>
              {cardError && <small style={{color:"red"}}>{cardError}</small>}
            <CardElement onChange={handleChange}/>
            <div className={classes.payment_price}> 
              <div>
                <span style={{display:"flex",gap:"10px"}}>
                  <p> Total Order |</p>
                  <Currency amount={total}/>
                </span>
              </div>
              <button type="submit">

                {
                  processing?(
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12}/>
                      <p> please wait ... </p>
                       
                    </div>
                  ):"Pay Now"
                }
                
                
                </button>
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
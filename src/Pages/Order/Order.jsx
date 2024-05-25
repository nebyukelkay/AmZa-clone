import React,{useContext,useEffect} from 'react'
import Layout from '../../Component/Layout/Layout'
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Component/DataProvider/Dataprovider';
import classes from "./Order.module.css"


function Order() {
  const[{user},dispatch]=useContext(DataContext);
  

  useEffect(()=>{},[])
    return (
      <Layout>
        <section className={classes.container}>
          <div className={classes.orders_container}>
            <h2>Your Orders</h2>
          </div>
        </section>
      </Layout>
    );
}

export default Order
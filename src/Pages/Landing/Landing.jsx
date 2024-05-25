import React from 'react'
import Layout from '../../Component/Layout/Layout';
import Caursel from '../../Component/Caruosel/Carousel'
import Category
  from '../../Component/Category/category';
import Product
  from '../../Component/Products/Product';


function Landing() {
  return (
    <div>
      <Layout>
        <Caursel />
        <Category />
        <Product />
      
    </Layout>
    </div>
  );
}

export default Landing
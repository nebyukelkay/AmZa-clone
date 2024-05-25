
import Header from "./Component/Header/Header";
import Carousel from "./Component/Caruosel/Carousel";
import Category from "./Component/Category/category";
import Product from "./Component/Products/Product";
import './index.css'
import Routing from "./Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./Component/DataProvider/Dataprovider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";


function App() {
const [user,dispatch]=useContext(DataContext);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
       
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    })
  },[])
  return (
    < >
      <Routing/>
    </>
  );
}

export default App;

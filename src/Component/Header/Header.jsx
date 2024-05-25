import React, { useContext } from "react";
import classes from '../Header/Header.module.css'
import LowerHeader from "./LowerHeader";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {Link} from "react-router-dom"
import { DataContext } from "../DataProvider/Dataprovider";
import {auth} from "../../Utility/firebase"
const Header = () => {
 const [{ user, basket }, dispatch] = useContext(DataContext);
 const totalItem = basket?.reduce((amount, item) => {
   return item.amount + amount;
 }, 0);
    return (
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            <div className={classes.log_container}>
              {/* {logo}   */}
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
            </div>
            <div className={classes.deliver}>
              {/* {delivery} */}
              <span>
                <LocationOnOutlinedIcon />
              </span>
              <div>
                <p> Delivery to </p> <span>Ethiopia</span>
              </div>
            </div>

            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" id="" />

              <SearchIcon size={38} />
            </div>
            {/* {right side link} */}
            <div className={classes.order}>
              <Link Link to="/" className={classes.laungage}>
                <img
                  src="https://t3.ftcdn.net/jpg/05/43/00/48/360_F_543004860_AiMa6Qr8ub2khwxduNxWg8R9bpYTauW4.jpg"
                  alt=""
                />
                <section>
                  <select name="" id="">
                    <option value="">EN</option>
                  </select>
                </section>
              </Link>
              <Link to={!user &&"/Auth"}>
                <div>
                  {
                    user?(
                      <>
                      <p> Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign out</span>
                      </>
                    
                    ):(
                      <>
                      <p> Hello Sign in </p>
                      <span>Account & List</span>
                      </>
                      )
                  }
                 
                
                </div>
              
              </Link>
              {/* {Order} */}
              <Link to="/Order">
                <p>Returns</p>
                <span> & Orders</span>
              </Link>
              {/* {cart} */}
              <Link to="/Cart" className={classes.cart}>
                <AddShoppingCartOutlinedIcon size={35} />
                <span>{basket.length }</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    );
}

export default Header;

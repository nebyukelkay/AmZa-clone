import React from "react";
import { categoryImg } from "./categoryFullInfo.js";
import CategoryCard from './categorycard';
import classes from "../Category/Category.module.css";
function Category() {
  return (
    <section className={classes.category__container }>
      {categoryImg.map((infos) => (
        <CategoryCard data={infos} />
      ))}
    </section>
  );
}

export default Category;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ROOT_URL } from "../..";
import { fetchProductInfo } from "../../asyncActions/products";
import s from "./ProductInfo.module.css";
import Button from "../../UI/Button/Button";
import { addItemAction } from "../../store/Reducers/cartReducer";
import {
  decrementCounterAction,
  incrementCounterAction,
} from "../../store/Reducers/productInfoReducer";
import minus from "./icons/minus.svg";
import plus from "./icons/plus.svg";

export default function ProductInfo() {
  const { id } = useParams();

  const product = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductInfo(id));
  }, [dispatch]);

  const oldPrice = (price, discont_price) => {
    return Math.floor(price / (1 - discont_price / 100));
  };

  return (
    <section className="wrapper">
      <div className={s.product_info_container}>
        <div className={s.image_product}>
          <img src={ROOT_URL + product.image} alt={product.title} />
          {product.discont_price && (
            <span className={s.mobile_active}>-{product.discont_price}%</span>
          )}
        </div>
        <h3 className={s.product_title}>{product.title}</h3>
        <div className={s.product_descr}>
          <div className={s.price}>
            <h2>${product.price}</h2>
            {product.discont_price && (
              <p>${oldPrice(product.price, product.discont_price)}</p>
            )}
            {product.discont_price && <span>-{product.discont_price}%</span>}
          </div>
          <div className={s.counter_button_container}>
            <div className={s.counter}>
              <img
                src={minus}
                onClick={() => dispatch(decrementCounterAction(1))}
              />
              <p>{product.count}</p>
              <img
                src={plus}
                onClick={() => dispatch(incrementCounterAction(1))}
              />
            </div>
            <Button
              onClick={() => dispatch(addItemAction(product))}
              text={"Add to cart"}
              color={"green"}
            />
          </div>
        </div>
        <div className={s.text_descr}>
          <p style={{ fontWeight: "600" }}>Description</p>
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
}

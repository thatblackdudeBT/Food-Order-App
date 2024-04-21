import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import ChechOutForm from "./CheckOutForm";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `N${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const orderConfirmationHandler = (userData) => {
    fetch(
      "https://react-http-300e8-default-rtdb.firebaseio.com/UserOrder.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          order: cartCtx.items,
        }),
      }
    );
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <ChechOutForm
          onOrder={orderConfirmationHandler}
          onClick={hideFormHandler}
        />
      )}
      <div className={classes.actions}>
        {!showForm && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {!showForm && hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;

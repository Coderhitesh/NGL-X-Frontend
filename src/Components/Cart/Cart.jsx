import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Cart.css';
import cartbg from './cart.png'

const Cart = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem("userid");
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userid');
    sessionStorage.setItem("login", false);
    navigate('/login');
    toast.success("Logout Successful");
  };

  useEffect(() => {
    if (userid) {
      const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
      const userCartItems = storedCartItems.filter(item => item.userid === userid);
      setCartItems(userCartItems);

      const storedQuantities = JSON.parse(sessionStorage.getItem('quantities')) || {};
      setQuantity(storedQuantities);
    }
  }, [userid]);

  const handleDecrease = (item) => {
    if (item && item._id) {
      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) - 1 };
        if (newQuantity[item._id] <= 0) {
          handleRemove(item);
        } else {
          sessionStorage.setItem('quantities', JSON.stringify(newQuantity));
        }
        return newQuantity;
      });
    }
  };

  const handleIncrease = (item) => {
    if (item && item._id) {
      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) + 1 };
        sessionStorage.setItem('quantities', JSON.stringify(newQuantity));
        return newQuantity;
      });
    }
  };

  const handleRemove = (item) => {
    if (item && item._id) {
      setCartItems(prevCartItems => {
        const updatedCartItems = prevCartItems.filter(cartItem => cartItem._id !== item._id);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });

      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity };
        delete newQuantity[item._id];
        sessionStorage.setItem('quantities', JSON.stringify(newQuantity));
        return newQuantity;
      });
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.afterdiscount * (quantity[item._id] || 1)), 0);
  const totalMainPrice = cartItems.reduce((acc, item) => acc + (item.mainPrice * (quantity[item._id] || 1)), 0);
  sessionStorage.setItem("Price", totalAmount);

  const handleCheckout = () => {
    const orderData = {
      items: cartItems,
      quantities: quantity,
      totalMRP: totalMainPrice,
      finalPrice: totalAmount,
      shippingFee: 50 // Example shipping fee, adjust as necessary
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/cart/finalcart');
  };

  if (cartItems.length === 0){
    return(
      <>
        <section className='cart-section'>
        <div className="cart-container">
          <div className="empty-box">
            <img src={cartbg} alt="" />
            <p>Your Cart is empty</p>
            <Link className='btn-grad' to={'/Shop-All'}>Go to Shopping</Link>
            </div>
        </div>
        </section>
      </>
    )
  }

  return (

    <>
      <section className='cart-section'>
        <div className="cart-container">
          <div className="heading">
            <h2>Shopping Cart</h2>
          </div>
          <div className="main-container">
            <div className="left">
              {cartItems && cartItems.map((item, index) => (
                <div key={index} className="row">
                  <div className="img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="content">
                    <div className="price">
                      <h2>Rs.{item.afterdiscount}</h2>
                      <del>Rs.{item.mainPrice}</del>
                    </div>
                    <div className="name-in">
                      <h1 className='product-name'>{item.productName}</h1>
                      <div className="count">
                        <div className="pluse" onClick={() => handleDecrease(item)}>
                          <i className="ri-subtract-fill"></i>
                        </div>
                        <div className="input">
                          <span>{quantity[item._id] || 1}</span>
                        </div>
                        <div className="pluse" onClick={() => handleIncrease(item)}>
                          <i className="ri-add-line"></i>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleRemove(item)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="right">
              <div className="head">
                <h2>Order Summary</h2>
              </div>
              <div className="heading">
                <h3>Estimated total</h3>
                <div className="price">
                  <h2>Rs.{totalAmount}</h2>
                  <del>Rs.{totalMainPrice}</del>
                </div>
              </div>
              <p>Pan India Free Shipping for orders above ₹450</p>
              <button onClick={handleCheckout} className='CHECKOUT-btn'>
                <i className="ri-git-repository-private-fill"></i> CHECKOUT SECURELY
              </button>
            </div>
          </div>
        </div>
      </section>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Cart;
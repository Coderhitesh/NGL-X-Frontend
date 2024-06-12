import React, { useState, useEffect } from 'react';
import './SinglePage.css';
import warrenty from './warrenty.png';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function SinglePage() {
  const navigate = useNavigate();
  const login = sessionStorage.getItem("login");
  const userid = sessionStorage.getItem("userid");
  const [data, setData] = useState([]);
  const { _id } = useParams();

  // Local state for the cart
  const [cart, setCart] = useState(() => JSON.parse(sessionStorage.getItem('cartItems')) || []);
  const [quantity, setQuantity] = useState(() => JSON.parse(sessionStorage.getItem('quantities')) || {});

  const dataFetching = async () => {
    try {
      const res = await axios.get('http://localhost:4100/api/getAllProducts');
      const fetchData = res.data.data;
      const fetched = fetchData.filter((item) => item._id === _id);
      setData(fetched);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetching();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [_id]);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cart));
    sessionStorage.setItem('quantities', JSON.stringify(quantity));
  }, [cart, quantity]);

  const [topImage, setTopImage] = useState('');

  const handleImageClick = (image) => {
    setTopImage(image);
  };

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id && cartItem.userid === userid);
      if (!existingItem) {
        return [...prevCart, { ...item, userid }];
      }
      return prevCart.map(cartItem =>
        cartItem._id === item._id && cartItem.userid === userid
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
    });
  
    setQuantity((prevQuantity) => {
      const currentQuantity = prevQuantity[item._id] || 0;
      if (currentQuantity === 0) {
        return {
          ...prevQuantity,
          [item._id]: 1 // Initial quantity for new item
        };
      }
      return {
        ...prevQuantity,
        [item._id]: currentQuantity + 1 // Increment quantity if item already exists
      };
    });
  
    toast.success("Product is added to cart");
  };

  const handleBuyNow = async (item) => {
    await handleAddToCart(item);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };
  
  const handleIncrease = (item) => {
    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) + 1 };
      sessionStorage.setItem('quantities', JSON.stringify(newQuantity)); // Update sessionStorage
      return newQuantity;
    });
  };

  const handleDecrease = (item) => {
    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) - 1 };
      if (newQuantity[item._id] <= 0) {
        // Remove item from cart if quantity is 0
        handleRemove(item);
      }
      sessionStorage.setItem('quantities', JSON.stringify(newQuantity)); // Update sessionStorage
      return newQuantity;
    });
  };

  const handleRemove = (item) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(cartItem => cartItem._id !== item._id);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update sessionStorage
      return updatedCart;
    });

    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[item._id];
      sessionStorage.setItem('quantities', JSON.stringify(newQuantity)); // Update sessionStorage
      return newQuantity;
    });
  };

  return (
    <section className='SinglePage-section'>
      <div className="SinglePage-container">
        {data && data.map((item, index) => (
          <div key={index} className="left">
            <div className="up">
              <img src={topImage || item.img} alt="" />
            </div>
            <div className="down">
              {item.secondImage && (
                <div className={`same-img ${topImage === item.secondImage ? 'active' : ''}`} onClick={() => handleImageClick(item.secondImage)}>
                  <img src={item.secondImage} alt="" />
                </div>
              )}
              {item.thirdImage && (
                <div className={`same-img ${topImage === item.thirdImage ? 'active' : ''}`} onClick={() => handleImageClick(item.thirdImage)}>
                  <img src={item.thirdImage} alt="" />
                </div>
              )}
              {item.fourthImage && (
                <div className={`same-img ${topImage === item.fourthImage ? 'active' : ''}`} onClick={() => handleImageClick(item.fourthImage)}>
                  <img src={item.fourthImage} alt="" />
                </div>
              )}
              {item.fifthImage && (
                <div className={`same-img ${topImage === item.fifthImage ? 'active' : ''}`} onClick={() => handleImageClick(item.fifthImage)}>
                  <img src={item.fifthImage} alt="" />
                </div>
              )}
            </div>
          </div>
        ))}
        {data && data.map((item, index) => (
          <div key={index} className="right">
            <div className="price">
              <h2>Rs.{item.afterdiscount}</h2>
              <del>MRP Rs.{item.mainPrice}</del>
              <span>Incl. of all taxes</span>
            </div>
            <h2>{item.productName}</h2>
            <div className="star">
              <i className="ri-star-fill"></i>
              <p>(4.8|304)</p>
            </div>
            <div className="incdec">
              <div className="dec" onClick={() => handleDecrease(item)}>-</div>
              <div className="res">{quantity[item._id] || 1}</div>
              <div className="inc" onClick={() => handleIncrease(item)}>+</div>
            </div>
            <div className="des">
              <Accordion className='main-accordion-parent' open={open === 1}>
                <AccordionHeader className='accordion-heading' onClick={() => handleOpen(1)}>Description</AccordionHeader>
                <AccordionBody className='accordion-children'>
                  {item.description}
                </AccordionBody>
              </Accordion>
              <Accordion className='main-accordion-parent' open={open === 2}>
                <AccordionHeader className='accordion-heading' onClick={() => handleOpen(2)}>
                  Shipping
                </AccordionHeader>
                <AccordionBody className='accordion-children'>
                  <ul>
                    <li>FREE Standard Delivery on orders over Rs. 499* (Excluding Sale Items). For same day delivery</li>
                    <li>FREE Standard Delivery on orders over Rs. 499*</li>
                    <li>Orders under Rs. 499 will be delivered within 2 working days.</li>
                    <li>For orders above Rs. 499, delivery will be made within 3 to 6 business days.*</li>
                    <li><b>Please note:</b> Orders placed between the hours of 12am and 5pm IST may take longer to deliver due to peak delivery times</li>
                    <li><b>Please note:</b> The estimated delivery date is subject to the availability of stock and other factors such as</li>
                  </ul>
                </AccordionBody>
              </Accordion>
            </div>
            <div className="services">
              <div className="col">
                <i className="ri-refund-2-fill"></i>
                <p>Easy 30 Day Return</p>
              </div>
              <div className="col">
                <img src={warrenty} alt="" />
                <p>1-Year Warranty</p>
              </div>
            </div>
            <div className="btns">
              {
                login ? <button className='btn-grad' onClick={() => handleAddToCart(item)}>Add to Cart</button> : 
                <Link to={'/login'}><button className='btn-grad'>Add to Cart</button></Link>
              }
              <button className='btn-grad' onClick={() => handleBuyNow(item)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SinglePage;

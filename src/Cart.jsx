import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { decQuantity, incQuantity, placeOrder, removeFromCart } from "./store";
import CouponApply from "./CouponApply";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import SendOrderEmail from "./SendOrderEmail";
import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart || []);
  let {code, discount, applied, message} = useSelector(state => state.coupon  )

  let[discountPercentage, setdiscountPercentage] = useState(0);

  // const calculations = useMemo(()=>{
  // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity,0);
  // let discountAmount = totalPrice*(discountPercentage/100);
  // let priceAfterDiscount = totalPrice-discountAmount;
  // let CouponAmount = priceAfterDiscount* (discount/100);
  // let gstAmount = priceAfterDiscount*(18/100);
  // let netAmount = priceAfterDiscount+gstAmount - CouponAmount;
  // console.log("cart calculation rerendering");
  // return{totalPrice, discountAmount, priceAfterDiscount, gstAmount, CouponAmount, netAmount}
  // }, []);

  // const{totalPrice, discountAmount, priceAfterDiscount, gstAmount, CouponAmount, netAmount} = calculations;
  

  const { totalPrice, discountAmount, priceAfterDiscount, gstAmount, netAmount, CouponAmount } = useMemo(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      const qty = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      return total + price * qty;
    }, 0);
    console.log("cart rendering");
    const discountAmount = totalPrice * (discountPercentage / 100);
    const priceAfterDiscount = totalPrice - discountAmount;

    const gstAmount = priceAfterDiscount * 0.18;
    const CouponAmount = priceAfterDiscount * ((discount || 0) / 100);

    const netAmount = priceAfterDiscount + gstAmount- CouponAmount;

    return { totalPrice, discountAmount, priceAfterDiscount, gstAmount, netAmount, CouponAmount };
  }, [cartItems, discountPercentage, discount]);

  let [customerEmail, setCustomerEmail] = useState('');

  const cartList = cartItems.map((item) => (
    <li className="cart-card" key={item.id}>
      <div className="cart-img-box">
        <img className="cart-img" src={item.img} alt={item.name} />
      </div>

      <div className="cart-info">
        <h3>{item.name}</h3>

        <div className="qty-box">
          <button className="qty-btn" onClick={() => dispatch(incQuantity(item))}>+</button>
          <span className="qty-number">{item.quantity}</span>
          <button className="qty-btn" onClick={() => dispatch(decQuantity(item))}>-</button>
        </div>

        <p className="cart-price">₹{item.price}</p>
        <p className="cart-qty">Quantity: {item.quantity}</p>
        <p className="cart-pack">{item.pack}</p>

        <button className="remove-btn" onClick={() => {dispatch(removeFromCart(item));
                                                      toast.warning(`product ${item.name} removed successfully`,{position:"top-center"})
        }}>Remove</button>
      </div>
    </li>
  ));

  let navigate = useNavigate();
  let[showQR, setshowQr] = useState(false);

  let handleCheckout = ()=>{
    navigate("/orders");
    const orderData = {
      items:cartItems,
      totalAmount: netAmount,
      orderDate: new Date
    }
    dispatch(placeOrder(orderData));
  }

  let upiId = "7075765698@axl";
  let payerName = "sriya" ;
  let upiLink = `upi://pay?pa=${upiId}&pn=${payerName}&am=${netAmount}&cu=INR`;

  // let {loading, error, successMessage} = useSelector(globalstate=>globalstate.order)

  return (
    <div className="cart-container">
      <h2 className="title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <ul className="cart-grid">{cartList}</ul>
      )}
     
      {cartItems.length !== 0 && (
        <div className="cart-summary">

          <CouponApply />

          <div className="discount-btn-group">
            <button className="discount-btn" onClick={() => setdiscountPercentage(10)}>Apply 10% Discount</button>
            <button className="discount-btn" onClick={() => setdiscountPercentage(20)}>Apply 20% Discount</button>
            <button className="discount-btn" onClick={() => setdiscountPercentage(30)}>Apply 30% Discount</button>
          </div>

          <div className="email-section">
            <h4 className="email-label">Enter your Email to receive order details</h4>
            <input className="email-input" type="email" placeholder="Enter your email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
          </div>

<SendOrderEmail
  cartItems={cartItems}
  totalPrice={totalPrice}
  discountAmount={discountAmount}
  gstAmount={gstAmount.toFixed(2)}
  netAmount={netAmount}
  customerEmail={customerEmail}
/>
          <button className="scan-btn" onClick={()=>setshowQr(true)}>Scan & Pay</button>
          { showQR&&(
            <div>
              <h4>scan the below QR code to pay</h4>
              <h4>Total Amount :{netAmount}</h4>
              <QRCodeCanvas value={upiLink} size={250}/>
            </div>
          )}

          <button className="checkout-btn" onClick={handleCheckout}>Proceed To Checkout</button>

          <h3>Total Amount: ₹{totalPrice}</h3>
          { discountPercentage!==0 &&
            <div>
              <h3> {discountPercentage} % discount is applied </h3>
              <h3> discount amount : {discountAmount}</h3>
              <h3>The total price after discount : {priceAfterDiscount}</h3>
            </div>
          }

          { applied? <h3>coupon applied {CouponAmount}</h3>:<h3>{message}</h3> }
          <h3>GST Amount : {gstAmount.toFixed(2)}</h3>
          <h3>The total net amount price:{netAmount}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;

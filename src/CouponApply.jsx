import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { applyCoupon } from './store';
import "./CouponApply.css";

function CouponApply() {

    const [input, setInput] = useState("");
    let dispatch = useDispatch();
    let handleApply = ()=> {dispatch(applyCoupon(input))}

  return (
    <>
      <div className="coupon-box">
        <input 
          type="text" 
          className="coupon-input"
          placeholder="Enter coupon code" 
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />

        <button className="coupon-btn" onClick={handleApply}>
          Apply Coupon
        </button>
      </div>
    </>
  )
}

export default CouponApply;

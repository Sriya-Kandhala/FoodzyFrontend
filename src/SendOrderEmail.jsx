import React from 'react'
import emailjs from "emailjs-com";

function SendOrderEmail({cartItems, gstAmount,  netAmount, customerEmail,totalPrice,discountAmount }) {

    let sendEmail=()=>{
        let templateParams ={
            orders: cartItems.map(item=>({
                name:item.name,
                units: item.quantity,
                price: item.price

            })),
            order_id :Date.now(),
            total_amount: totalPrice,
  discount_amount: discountAmount,
  gst_amount: gstAmount,

  net_amount: netAmount,  // ✅ THIS MATCHES {{net_amount}}

  email: customerEmail
        }
emailjs.send("service_azyk3a7",
             "template_hiynqr9",
             templateParams,
             "KW_MFTZIDm5rgFcKV")
    .then((response)=>{
        alert("email send successfully", response.status,response.text)
    })

    }

 return (
  <>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button 
        onClick={sendEmail}
        style={{
          background: "#2e7d32",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Send Email
      </button>
    </div>
  </>
);

}

export default SendOrderEmail

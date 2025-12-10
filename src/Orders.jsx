// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders } from "./store";
// import "./Orders.css";

// function Orders() {
//   const dispatch = useDispatch();

  // const { orders, loading, error } = useSelector(
  //   (state) => state.allorders
  // );

//   // Fetch orders on mount
  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [dispatch]);

//   let ordersContent = (
//     <>
//       {/* {loading && <p className="status-text">Loading orders...</p>} */}
//       {error && <p className="error-text">{error}</p>}

//       {orders.length === 0 && loading ? (
//         <p className="status-text">No orders found.</p>
//       ) : (
//         <ul className="orders-list">
//           {orders.map((order) => (
//             <li key={order._id} className="order-card">
//               <h3 className="order-id">Order #{order._id}</h3>

//               <p className="order-date">
//                 <strong>Order Date:</strong>{" "}
//                 {new Date(order.orderDate).toLocaleString()}
//               </p>

//               <h4 className="items-title">Items:</h4>
//               <ul className="items-list">
//                 {order.items.map((item) => (
//                   <li key={item._id} className="item-row">
//                     {item.name} — <span className="price">₹{item.price}</span>
                    
//                   </li>
//                 ))}
//               </ul>

//               <p className="total-amount">
//                 <strong>Total Amount:</strong> ₹{order.totalAmount}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );

//   return (
//     <div className="orders-container">
//       <h1 className="page-title">Your Orders</h1>
//       {ordersContent}
//     </div>
//   );
// }

// export default Orders;







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css";
import { getOrders } from "./store";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.allorders
  );
    const [expandedOrders, setExpandedOrders] = useState({});

   useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="container my-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Your Orders</h2>

      {loading && <p className="text-center">Loading...</p>}
      {!loading && orders.length === 0 && (
        <p className="text-center text-muted">No orders found.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="card shadow-sm mb-3 border-0 rounded-4"
        >
          <div
            className="card-header d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() => toggleExpand(order._id)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h5 className="fw-bold mb-0">Order #{order._id}</h5>
              <small className="text-muted">
                {new Date(order.orderDate).toLocaleString()}
              </small>
            </div>
            <button className="btn btn-sm btn-outline-primary">
              {expandedOrders[order._id] ? "Collapse" : "Expand"}
            </button>
          </div>

          {expandedOrders[order._id] && (
            <div className="card-body">
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between py-2 border-bottom"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <span className="badge bg-success">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <div>₹{item.price}</div>
                      <small className="text-muted">
                        Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between pt-3 mt-3 border-top">
                <h5 className="fw-bold mb-0">Total</h5>
                <h5 className="fw-bold mb-0 text-primary">
                  ₹{order.totalAmount.toFixed(2)}
                </h5>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
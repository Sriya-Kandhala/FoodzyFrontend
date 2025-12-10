import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>

        <p>
          Welcome to <b>Foodzy</b> – your trusted online food delivery service
          where we <b>cook fresh food in our own kitchens</b> and deliver it
          straight to your doorstep. From wholesome veg meals to delicious
          non-veg dishes, mouth-watering desserts, and refreshing beverages –
          everything is prepared with care, hygiene, and love.
        </p>

        <p>
          At Foodzy, we believe great food starts with fresh ingredients and
          clean cooking practices. Our experienced chefs prepare every meal
          only after you place your order, ensuring <b>freshness, taste, and
          safety</b> in every bite.
        </p>

        <h2>Why Choose Foodzy?</h2>

        <ul>
          <li>✔ Freshly cooked food (not from outside restaurants)</li>
          <li>✔ Pure veg & premium non-veg options</li>
          <li>✔ In-house desserts & handcrafted beverages</li>
          <li>✔ Strict hygiene & quality standards</li>
          <li>✔ Fast & reliable home delivery</li>
          <li>✔ Easy ordering & secure payments</li>
        </ul>

        <p>
          Foodzy is more than just a food delivery app — it’s your daily kitchen
          away from home. Thank you for trusting <b>Foodzy</b> to serve healthy,
          tasty, and freshly cooked meals every day.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;

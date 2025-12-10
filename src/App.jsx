import './App.css'
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom'
import Veg from './Veg'
import NonVeg from './NonVeg'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import Cart from './Cart'
import Home from './Home'
import Desserts from './Desserts'
import Beverages from './Beverages'
import { useSelector } from 'react-redux'
import Orders from './Orders'
import { FaClipboardList, FaDrumstickBite, FaGlassWhiskey, FaHome, FaIceCream, FaInfoCircle, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { GiFruitBowl } from 'react-icons/gi'
import { ToastContainer } from 'react-toastify'
import RegistrationForm from './RegistrationForm'
import Login from './Login'
import { HiPhone } from 'react-icons/hi'
import LogoutButton from './LogoutButton'
import LandingPage from './LandingPage'

function Layout({ children }) {
  const location = useLocation()
  const { token } = useSelector((state) => state.login)

  const cartItems = useSelector(state => state.cart)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const isLanding = location.pathname === "/"

  return (
    <>
      <ToastContainer />

      {isLanding && (
  <div className="landing-auth">
    <Link to="/register" className="landing-btn">
      <FaUserPlus />Register
    </Link>
    <Link to="/login" className="landing-btn">
      <FaSignInAlt /> Login
    </Link>
  </div>
)}

      {/* ✅ NAVBAR HIDDEN ON "/" */}
      {!isLanding && (
        <nav className="big-navbar">
          <div className="nav-right">
            <Link to="/home"><FaHome /> Home</Link>
            <Link to="/veg"><GiFruitBowl /> Veg</Link>
            <Link to="/nonveg"><FaDrumstickBite /> Non-Veg</Link>
            <Link to="/desserts"><FaIceCream /> Desserts</Link>
            <Link to="/beverages"><FaGlassWhiskey /> Beverages</Link>
            <Link to="/contact"><HiPhone /> Contact</Link>
            <Link to="/about"><FaInfoCircle /> About</Link>
            <Link to="/cart"><FaShoppingCart /> Cart: {cartCount}</Link>
            <Link to="/orders"><FaClipboardList /> Orders</Link>
           {!token && (
              <>
                <Link to="/register"><FaUserPlus /> Register</Link>
                <Link to="/login"><FaSignInAlt /> Login</Link>
              </>
            )}

            {token && <LogoutButton />}
          </div>
        </nav>
      )}

      <div className="main-content">{children}</div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

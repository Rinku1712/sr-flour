import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import ComingSoon from '../pages/ComingSoon'
import Contact from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Updates from '../pages/Updates'
import Account from '../pages/Account'
import AuthForm from '../pages/AuthForm'

// Pages still to build: [path, title]. Listed now so navigation never breaks.
const upcoming = [
  ['checkout', 'Checkout'], ['order-success', 'Order Success'],
  ['orders', 'My Orders'], ['orders/:id', 'Order Details'], ['profile', 'Profile'],
]

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="updates" element={<Updates />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<AuthForm mode="login" />} />
        <Route path="signup" element={<AuthForm mode="signup" />} />
        <Route path="forgot-password" element={<AuthForm mode="forgot-password" />} />
        {upcoming.map(([path, title]) => <Route key={path} path={path} element={<ComingSoon title={title} />} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

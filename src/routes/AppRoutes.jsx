import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import NotFound from '../pages/NotFound'
import ComingSoon from '../pages/ComingSoon'

// Pages still to build: [path, title]. Listed now so navigation never breaks.
const upcoming = [
  ['about', 'About Us'], ['contact', 'Contact'], ['faq', 'FAQ'], ['login', 'Login'], ['signup', 'Sign Up'],
  ['forgot-password', 'Forgot Password'], ['checkout', 'Checkout'], ['order-success', 'Order Success'],
  ['account', 'My Account'], ['orders', 'My Orders'], ['orders/:id', 'Order Details'], ['profile', 'Profile'],
]

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        {upcoming.map(([path, title]) => <Route key={path} path={path} element={<ComingSoon title={title} />} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

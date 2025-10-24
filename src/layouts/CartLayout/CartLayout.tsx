import CartHeader from '@/components/CartHeader'
import Footer from '@/components/Footer'

interface CartLayoutProps {
  children: React.ReactNode
}

const CartLayout = ({ children }: CartLayoutProps) => {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}

export default CartLayout

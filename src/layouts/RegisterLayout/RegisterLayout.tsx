import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout

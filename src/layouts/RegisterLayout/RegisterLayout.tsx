import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default RegisterLayout

const COUNTRIES = [
  'Singapore',
  'Indonesia',
  'Đài Loan',
  'Thái Lan',
  'Malaysia',
  'Việt Nam',
  'Philippines',
  'Brazil',
  'México',
  'Colombia',
  'Chile',
  'Poland'
]

const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-12'>
      <div className='container max-w-6xl mx-auto px-4'>
        {/* Main Footer Content */}
        <section className='grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8'>
          <h2 className='sr-only'>Thông tin công ty</h2>

          {/* Copyright Section */}
          <article className='space-y-3'>
            <h3 className='text-base font-semibold text-neutral-800'>Bản quyền</h3>
            <p className='text-sm text-neutral-600 leading-relaxed'>
              © 2025 Shopping Spree. Tất cả các quyền được bảo lưu.
            </p>
          </article>

          {/* Countries Section */}
          <article className='space-y-3'>
            <h3 className='text-base font-semibold text-neutral-800'>Quốc gia & Khu vực</h3>
            <div className='flex flex-wrap gap-2'>
              {COUNTRIES.map((country, index) => (
                <span
                  key={index}
                  className='inline-block px-3 py-1 text-xs bg-neutral-200 text-neutral-700 rounded-full'
                >
                  {country}
                </span>
              ))}
            </div>
          </article>
        </section>

        {/* Company Info Section */}
        <section className='border-t border-neutral-200 pt-8'>
          <h2 className='sr-only'>Thông tin liên hệ</h2>
          <div className='text-center space-y-4'>
            <address className='not-italic'>
              <h3 className='text-lg font-semibold text-neutral-800 mb-2'>Công ty TNHH Shopping Spree</h3>
              <p className='text-sm text-neutral-600'>Địa chỉ: 6 Nại Nam, Hoà Cường Bắc, Hải Châu, Đà Nẵng</p>
            </address>

            <div className='pt-4 border-t border-neutral-200'>
              <p className='text-xs text-neutral-600'>© 2025 - Bản quyền thuộc về Công ty TNHH Shopping Spree</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer

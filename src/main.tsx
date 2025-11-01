import App from '@/App'
import { AppProvider } from '@/contexts'
import queryClient from '@/queryClient'
import '@/styles/index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/i18n/i18n'
import { HelmetProvider } from '@dr.pogodin/react-helmet'

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((d) => ({
        default: d.ReactQueryDevtools
      }))
    )
  : () => null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} position='right' />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
)

import useRouteElements from '@/useRouteElements'

const App = () => {
  const routeElements = useRouteElements()

  return <>{routeElements}</>
}

export default App

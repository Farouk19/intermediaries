import { Outlet } from 'react-router-dom'
import Header from './components/header/header'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <div className="h-full">
        <Outlet />

      </div>
    </>
  )
}

export default App
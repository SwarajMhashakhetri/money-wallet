import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { TransferDone } from './pages/TransferDone'
import Landingpage from './pages/Landingpage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/send" element={<SendMoney/>} />
          <Route path="/transferdone" element={<TransferDone/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

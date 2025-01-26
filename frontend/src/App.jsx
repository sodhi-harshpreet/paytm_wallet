import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"
import { Signup } from "./pages/Signup";

import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Signin } from "./pages/Signin";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/send" element={<SendMoney/>}/>
            <Route path="*" element={<div>404 Not Found</div>} />

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

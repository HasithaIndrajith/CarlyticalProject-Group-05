import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmployeeHome from "./pages/EmployeeHome";
import ManagerHome from "./pages/ManagerHome";
import CustomerPredictionPage from "./pages/CustomerPredictionPage";
import { RequireAuth } from "./utils/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="employeehome"
            element={
              <RequireAuth>
                <EmployeeHome />
              </RequireAuth>
            }
          />
          <Route
            path="managerhome"
            element={
              <RequireAuth>
                <ManagerHome />
              </RequireAuth>
            }
          />
          <Route
            path="predictcustomer"
            element={
              <RequireAuth>
                <CustomerPredictionPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

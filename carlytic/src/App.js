import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmployeeHome from "./pages/EmployeeHome";
import ManagerHome from "./pages/ManagerHome";
import CustomerPredictionPage from "./pages/CustomerPredictionPage";
import { RequireAuth } from "./utils/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import PredictCustomerSetPage from "./pages/PredictCustomerSetPage";
import SignInSide from "./pages/LoginMUI";
import Dashboard from "./pages/Dashboard";
import CustomerOutputPage from "./pages/customerOutputPage";
import CustomerSetOutputPage from "./pages/customerSetOutputPage";
const ROLES = {
  MANAGER: 1,
  EMPLOYEE: 0,
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignInSide />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="employeehome"
            element={
              <RequireAuth allowedRoles={[ROLES.EMPLOYEE]}>
                <EmployeeHome />
              </RequireAuth>
            }
          />
          <Route
            path="managerhome"
            element={
              <RequireAuth allowedRoles={[ROLES.MANAGER]}>
                <ManagerHome />
              </RequireAuth>
            }
          />
          <Route
            path="predictcustomer"
            element={
              <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <CustomerPredictionPage />
              </RequireAuth>
            }
          />
          <Route
            path="predictcustomers"
            element={
              <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <PredictCustomerSetPage />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="customeroutput"
            element={
              <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <CustomerOutputPage/>
              </RequireAuth>
            }
          />
          <Route
            path="customersetoutput"
            element={
              <CustomerSetOutputPage/>
              // <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
              //   <CustomerSetOutputPage/>
              // </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

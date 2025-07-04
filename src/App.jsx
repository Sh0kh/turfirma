import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Client from "./Components/Client/Client";
import Category from "./Components/Category/Category";
import Payment from "./Components/Payment/Payment";
import Links from "./Components/Links/Links";
import BotSettings from "./Components/BotSettings/BotSettings";
import UsersCome from "./Components/Dashboard/components/UsersCome/UsersCome";
import ReLink from "./Components/ReLink/ReLink";
import Referal from "./Components/Referal/Referal";
import ReferalChart from "./Components/ReferealChart/ReferalChart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              // <ProtectedRoute>
              <AdminLayout />
              //  </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/client" element={<Client />} />
            <Route path="/category" element={<Category />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/links" element={<Links />} />
            <Route path="/bot/settings" element={<BotSettings />} />
            <Route path="/users/:ID" element={<UsersCome />} />
            <Route path="/linksnews" element={<ReLink />} />
            <Route path="/referal" element={<Referal />} />
            <Route path="/referal-chart" element={<ReferalChart />} />



          </Route>
          <Route element={<MainLayout />}>

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Sidenav from "./components/Sidenav/Sidenav";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";
import SearchResults from "./pages/SearchResults";
import EmployeeViewsPage from "./pages/EmployeeViewsPage";
import DepartmentPage from "./pages/DepartmentPage";
import TasksViewPage from "./pages/TasksViewPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidenav />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="maps/*" element={<TaskPage />} />
          <Route path="search/*" element={<SearchResults />} />
          <Route path="employees/*" element={<EmployeeViewsPage />} />
          <Route path="departments/*" element={<DepartmentPage/>} />
          <Route path="tasks/*" element={<TasksViewPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

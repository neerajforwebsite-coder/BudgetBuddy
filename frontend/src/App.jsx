// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Layout
import MainLayout from "./components/Layout/MainLayout";

// Public Components
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";

// Private Components
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AuthRoute from "./components/Auth/AuthRoute";

// Category Components
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";

// Transactions
import TransactionForm from "./components/Transactions/TransactionForm";
import TransactionList from "./components/Transactions/TransactionList";

// Dashboard / Reports / Profile
import Dashboard from "./components/Users/Dashboard";
import Reports from "./components/Reports/Reports";
import UserProfile from "./components/Users/UserProfile";

function App() {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>

      {/* Navbar switches based on login */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Protected: Categories */}
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <MainLayout>
                <AddCategory />
              </MainLayout>
            </AuthRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <AuthRoute>
              <MainLayout>
                <CategoriesList />
              </MainLayout>
            </AuthRoute>
          }
        />

        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <MainLayout>
                <UpdateCategory />
              </MainLayout>
            </AuthRoute>
          }
        />

        {/* Protected: Transactions */}
        <Route
          path="/transactions"
          element={
            <AuthRoute>
              <MainLayout>
                <TransactionList />
              </MainLayout>
            </AuthRoute>
          }
        />

        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <MainLayout>
                <TransactionForm />
              </MainLayout>
            </AuthRoute>
          }
        />

        {/* Protected: Reports */}
        <Route
          path="/reports"
          element={
            <AuthRoute>
              <MainLayout>
                <Reports />
              </MainLayout>
            </AuthRoute>
          }
        />

        {/* Protected: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </AuthRoute>
          }
        />

        {/* Protected: Profile */}
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <MainLayout>
                <UserProfile />
              </MainLayout>
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

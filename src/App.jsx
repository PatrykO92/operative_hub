import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import TrucksLoading from "./pages/TrucksLoading";
import TrucksManagement from "./pages/TrucksManagement";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";
import AppAdminLayout from "./ui/AppAdminLayout";
import AppCraneLayout from "./ui/AppCraneLayout";
import Operator from "./pages/Operator";
import Crane from "./pages/Crane";
import InformationBoard from "./pages/InformationBoard";
import AppOperatorLayout from "./ui/AppOperatorLayout";
import LogoutPage from "./pages/LogoutPage";
import Maintenance from "./pages/Maintenance";
import Signup from "./pages/Signup";
import SuccessfullyRegistered from "./pages/SuccessfullyRegistered";
import ContactWithAdmin from "./pages/ContactWithAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trucks_loading" element={<TrucksLoading />} />
            <Route path="trucks_management" element={<TrucksManagement />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route element={<AppOperatorLayout />}>
            <Route path="operator" element={<Operator />} />
            <Route path="information_board" element={<InformationBoard />} />
          </Route>

          <Route element={<AppCraneLayout />}>
            <Route path="crane" element={<Crane />} />
          </Route>

          <Route
            path="successfully_registered"
            element={<SuccessfullyRegistered />}
          />
          <Route path="contact_admin" element={<ContactWithAdmin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={20}
        containerStyle={{ margin: "20px" }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "400px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0",
            color: "var(--color-grey-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}

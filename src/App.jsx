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
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
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
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trucks_loading" element={<TrucksLoading />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
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

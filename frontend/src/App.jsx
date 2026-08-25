// import Navbar from "./components/Navbar";

// import HomePage from "./pages/HomePage";
// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
// import SettingsPage from "./pages/SettingsPage";
// import ProfilePage from "./pages/ProfilePage";

// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";
// import { useEffect } from "react";

// import { Loader } from "lucide-react";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
//   const { theme } = useThemeStore();

//   console.log({ onlineUsers });

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   console.log({ authUser });

//   if (isCheckingAuth && !authUser)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );

//   return (
//     <div data-theme={theme}>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
//         <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
//       </Routes>

//       <Toaster />
//     </div>
//   );
// };
// export default App;
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
  } = useAuthStore();

  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Hide navbar on authentication pages
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // Authentication loading screen
  if (isCheckingAuth && !authUser) {
    return (
      <div
        data-theme={theme}
        className="min-h-screen flex items-center justify-center bg-base-300"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/20">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>

          <p className="text-sm text-base-content/60 animate-pulse">
            Loading ChatFlow...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-300 text-base-content"
    >
      {/* Navbar only for authenticated/main pages */}
      {!isAuthPage && authUser && <Navbar />}

<main
  className={
    isAuthPage
      ? "min-h-screen"
      : "min-h-screen pt-20"
  }
>        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              authUser ? (
                <HomePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              !authUser ? (
                <LoginPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={
              !authUser ? (
                <SignUpPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              authUser ? (
                <SettingsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              authUser ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Unknown route */}
          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: theme === "dark" ? "#18181b" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#18181b",
          },
        }}
      />
    </div>
  );
};

export default App;
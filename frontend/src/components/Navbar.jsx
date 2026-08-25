// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header
//       className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
//     backdrop-blur-lg bg-base-100/80"
//     >
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold">Chatty</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors
              
//               `}
//             >
//               <Settings className="w-4 h-4" />
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             {authUser && (
//               <>
//                 <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//                   <User className="size-5" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>

//                 <button className="flex gap-2 items-center" onClick={logout}>
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Circle,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-3 sm:px-5 pt-3">
        <nav
          className="
            h-16
            rounded-2xl
            border border-white/10
            bg-base-100/75
            backdrop-blur-xl
            shadow-lg shadow-black/5
          "
        >
          <div className="h-full px-4 sm:px-5 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="
                  relative
                  w-10 h-10
                  rounded-xl
                  bg-gradient-to-br from-purple-600 to-indigo-600
                  flex items-center justify-center
                  shadow-lg shadow-purple-500/20
                  group-hover:scale-105
                  transition-transform duration-200
                "
              >
                <MessageSquare className="w-5 h-5 text-white" />

                {/* Small online dot */}
                {authUser && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-base-100" />
                )}
              </div>

              <div className="hidden sm:block">
                <h1
                  className="
                    text-lg font-bold tracking-tight
                    bg-gradient-to-r from-purple-500 to-indigo-500
                    bg-clip-text text-transparent
                  "
                >
                  Chatty
                </h1>

                {authUser && (
                  <p className="text-[10px] text-base-content/40 -mt-0.5">
                    Stay connected
                  </p>
                )}
              </div>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Settings */}
              <Link
                to="/settings"
                className={`
                  group
                  flex items-center gap-2
                  px-3 py-2
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive("/settings")
                      ? "bg-primary/10 text-primary"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-content/5"
                  }
                `}
              >
                <Settings
                  className={`
                    w-4 h-4
                    transition-transform duration-300
                    group-hover:rotate-45
                  `}
                />

                <span className="hidden sm:inline">
                  Settings
                </span>
              </Link>

              {/* Profile */}
              {authUser && (
                <Link
                  to="/profile"
                  className={`
                    flex items-center gap-2
                    px-2 sm:px-3 py-1.5
                    rounded-xl
                    transition-all duration-200
                    ${
                      isActive("/profile")
                        ? "bg-primary/10"
                        : "hover:bg-base-content/5"
                    }
                  `}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={
                        authUser?.profilePic ||
                        "/avatar.png"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-base-content/10"
                    />

                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-base-100" />
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold max-w-24 truncate">
                      {authUser?.fullName || "User"}
                    </p>

                    <p className="text-[10px] text-base-content/40">
                      Online
                    </p>
                  </div>

                  <User className="w-4 h-4 hidden sm:block text-base-content/50" />
                </Link>
              )}

              {/* Divider */}
              {authUser && (
                <div className="hidden sm:block h-7 w-px bg-base-content/10 mx-1" />
              )}

              {/* Logout */}
              {authUser && (
                <button
                  onClick={logout}
                  className="
                    group
                    flex items-center gap-2
                    px-3 py-2
                    rounded-xl
                    text-sm font-medium
                    text-base-content/60
                    hover:text-red-500
                    hover:bg-red-500/10
                    transition-all duration-200
                  "
                >
                  <LogOut
                    className="
                      w-4 h-4
                      group-hover:translate-x-0.5
                      transition-transform
                    "
                  />

                  <span className="hidden sm:inline">
                    Logout
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
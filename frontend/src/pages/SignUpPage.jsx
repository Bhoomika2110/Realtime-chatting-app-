// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
// import { Link } from "react-router-dom";

// import AuthImagePattern from "../components/AuthImagePattern";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { signup, isSigningUp } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const success = validateForm();

//     if (success === true) signup(formData);
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* left side */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
//               group-hover:bg-primary/20 transition-colors"
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">Get started with your free account</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="size-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="size-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link to="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Full name is required");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (!formData.password) {
      return toast.error("Password is required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 grid lg:grid-cols-2 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* LEFT SIDE */}
      <div className="relative flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-gradient-to-br from-purple-600 to-indigo-600
                  flex items-center justify-center
                  shadow-xl shadow-purple-500/20
                  group-hover:scale-105
                  transition-transform
                "
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </div>

              <span
                className="
                  text-2xl font-bold
                  bg-gradient-to-r from-purple-500 to-indigo-500
                  bg-clip-text text-transparent
                "
              >
                Chatty
              </span>
            </Link>
          </div>

          {/* Card */}
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-base-200/70
              backdrop-blur-xl
              shadow-2xl
              p-6 sm:p-8
            "
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Welcome to Chatty
              </div>
            
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-base-content/50">
                Join thousands of people staying connected.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/35 pointer-events-none" />

                  <input
                    type="text"
                    className="
                      w-full h-12
                      rounded-xl
                      border border-base-content/10
                      bg-base-300/60
                      pl-12 pr-4
                      text-sm
                      outline-none
                      placeholder:text-base-content/30
                      focus:border-purple-500/50
                      focus:ring-2 focus:ring-purple-500/10
                      transition-all
                    "
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/35 pointer-events-none" />

                  <input
                    type="email"
                    className="
                      w-full h-12
                      rounded-xl
                      border border-base-content/10
                      bg-base-300/60
                      pl-12 pr-4
                      text-sm
                      outline-none
                      placeholder:text-base-content/30
                      focus:border-purple-500/50
                      focus:ring-2 focus:ring-purple-500/10
                      transition-all
                    "
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/35 pointer-events-none" />

                  <input
                    type={showPassword ? "text" : "password"}
                    className="
                      w-full h-12
                      rounded-xl
                      border border-base-content/10
                      bg-base-300/60
                      pl-12 pr-12
                      text-sm
                      outline-none
                      placeholder:text-base-content/30
                      focus:border-purple-500/50
                      focus:ring-2 focus:ring-purple-500/10
                      transition-all
                    "
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      w-9 h-9
                      rounded-lg
                      flex items-center justify-center
                      text-base-content/40
                      hover:text-base-content
                      hover:bg-base-content/5
                      transition-all
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-base-content/40 mt-2">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="
                  w-full h-12
                  rounded-xl
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-500 hover:to-indigo-500
                  text-white
                  font-semibold
                  flex items-center justify-center gap-2
                  shadow-lg shadow-purple-500/20
                  hover:shadow-purple-500/30
                  hover:-translate-y-0.5
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                  transition-all duration-200
                "
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-base-content/50">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-purple-400
                    hover:text-purple-300
                    transition-colors
                  "
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-base-content/30 mt-6">
            By creating an account, you agree to our terms and privacy
            policy.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block relative">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with the people who matter."
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default SignUpPage;
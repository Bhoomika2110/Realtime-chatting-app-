// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Camera, Mail, User } from "lucide-react";

// const ProfilePage = () => {
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
//   const [selectedImg, setSelectedImg] = useState(null);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       await updateProfile({ profilePic: base64Image });
//     };
//   };

//   return (
//     <div className="h-screen pt-20">
//       <div className="max-w-2xl mx-auto p-4 py-8">
//         <div className="bg-base-300 rounded-xl p-6 space-y-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold ">Profile</h1>
//             <p className="mt-2">Your profile information</p>
//           </div>

//           {/* avatar upload section */}

//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || authUser.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="size-32 rounded-full object-cover border-4 "
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`
//                   absolute bottom-0 right-0 
//                   bg-base-content hover:scale-105
//                   p-2 rounded-full cursor-pointer 
//                   transition-all duration-200
//                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
//                 `}
//               >
//                 <Camera className="w-5 h-5 text-base-200" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <p className="text-sm text-zinc-400">
//               {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
//             </div>
//           </div>

//           <div className="mt-6 bg-base-300 rounded-xl p-6">
//             <h2 className="text-lg font-medium  mb-4">Account Information</h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center justify-between py-2 border-b border-zinc-700">
//                 <span>Member Since</span>
//                 <span>{authUser.createdAt?.split("T")[0]}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span>Account Status</span>
//                 <span className="text-green-500">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfilePage;

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      await updateProfile({
        profilePic: base64Image,
      });
    };
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-2">
            <Sparkles className="w-2 h-2" />
            Account
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="mt-2 text-base-content/60">
            Manage your profile information and account details.
          </p>
        </div>

        {/* Main profile card */}
        <div className="rounded-3xl border border-white/10 bg-base-200/70 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Gradient header */}
          <div className="h-32 md:h-40 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute top-5 right-5">
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                Profile
              </div>
            </div>
          </div>

          {/* Profile section */}
          <div className="px-5 sm:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16 relative">
              {/* Avatar */}
              <div className="relative w-fit mx-auto md:mx-0">
                <div className="p-1 rounded-full bg-base-200 shadow-xl">
                  <img
                    src={
                      selectedImg ||
                      authUser?.profilePic ||
                      "/avatar.png"
                    }
                    alt="Profile"
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-base-200"
                  />
                </div>

                {/* Online indicator */}
                <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-green-500 border-4 border-base-200" />

                {/* Upload button */}
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 left-0
                    flex items-center justify-center
                    w-11 h-11
                    rounded-full
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    text-white
                    cursor-pointer
                    shadow-lg shadow-purple-500/30
                    hover:scale-110
                    transition-all duration-200
                    ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none"
                        : ""
                    }
                  `}
                >
                  <Camera className="w-5 h-5" />

                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* User name */}
              <div className="text-center md:text-left pb-2">
                <h2 className="text-2xl font-bold">
                  {authUser?.fullName || "User"}
                </h2>

                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-base-content/60">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">
                    {authUser?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Upload message */}
            <div className="mt-5 flex justify-center md:justify-start">
              <p className="text-xs text-base-content/50">
                {isUpdatingProfile
                  ? "Uploading your new profile photo..."
                  : "Click the camera button to update your profile photo."}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-base-content/10 my-8" />

            {/* Personal information */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-400" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Personal Information
                  </h3>
                  <p className="text-xs text-base-content/50">
                    Your basic account information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="group p-4 rounded-2xl bg-base-300/60 border border-base-content/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-2 text-xs text-base-content/50 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>

                  <p className="font-medium">
                    {authUser?.fullName || "Not available"}
                  </p>
                </div>

                {/* Email */}
                <div className="group p-4 rounded-2xl bg-base-300/60 border border-base-content/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-2 text-xs text-base-content/50 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>

                  <p className="font-medium break-all">
                    {authUser?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account information */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Account Information
                  </h3>

                  <p className="text-xs text-base-content/50">
                    Your account status and activity
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-base-300/60 border border-base-content/10 overflow-hidden">
                {/* Member since */}
                <div className="flex items-center justify-between gap-4 p-4 border-b border-base-content/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-base-content/5 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-base-content/60" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Member Since
                      </p>

                      <p className="text-xs text-base-content/50">
                        Account creation date
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-base-content/70">
                    {memberSince}
                  </span>
                </div>

                {/* Account status */}
                <div className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Account Status
                      </p>

                      <p className="text-xs text-base-content/50">
                        Your account is currently active
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-base-content/40 mt-6">
          Your profile information is securely stored.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
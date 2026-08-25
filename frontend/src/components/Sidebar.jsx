// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { Users } from "lucide-react";

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

//   const { onlineUsers } = useAuthStore();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;

//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         {/* TODO: Online filter toggle */}
//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`
//               w-full p-3 flex items-center gap-3
//               hover:bg-base-300 transition-colors
//               ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
//             `}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img
//                 src={user.profilePic || "/avatar.png"}
//                 alt={user.name}
//                 className="size-12 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span
//                   className="absolute bottom-0 right-0 size-3 bg-green-500 
//                   rounded-full ring-2 ring-zinc-900"
//                 />
//               )}
//             </div>

//             {/* User info - only visible on larger screens */}
//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}

//         {filteredUsers.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;

import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

import {
  Users,
  Search,
  SlidersHorizontal,
  Circle,
  UserRound,
} from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = useMemo(() => {
    let result = users;

    // Online filter
    if (showOnlineOnly) {
      result = result.filter((user) =>
        onlineUsers.includes(user._id)
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((user) =>
        user.fullName?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [users, onlineUsers, showOnlineOnly, searchQuery]);

  const onlineCount = users.filter((user) =>
    onlineUsers.includes(user._id)
  ).length;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="
        h-full
        w-20 lg:w-80
        border-r border-base-content/10
        bg-base-100/60
        backdrop-blur-xl
        flex flex-col
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-base-content/10">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-gradient-to-br from-purple-600/15 to-indigo-600/15
                flex items-center justify-center
              "
            >
              <Users className="w-5 h-5 text-purple-400" />
            </div>

            <div className="hidden lg:block">
              <h2 className="font-semibold text-sm">
                Messages
              </h2>

              <p className="text-xs text-base-content/40 mt-0.5">
                {users.length} contacts
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10">
            <Circle className="w-2 h-2 fill-green-500 text-green-500" />

            <span className="text-[11px] font-medium text-green-500">
              {onlineCount} online
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden lg:block relative">
          <Search
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              w-4 h-4
              text-base-content/35
            "
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full h-10
              rounded-xl
              border border-base-content/10
              bg-base-300/50
              pl-9 pr-3
              text-xs
              outline-none
              placeholder:text-base-content/30
              focus:border-purple-500/40
              focus:ring-2 focus:ring-purple-500/10
              transition-all
            "
          />
        </div>

        {/* Online filter */}
        <div className="hidden lg:flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) =>
                setShowOnlineOnly(e.target.checked)
              }
              className="
                checkbox
                checkbox-xs
                checkbox-primary
              "
            />

            <span className="text-xs text-base-content/50 group-hover:text-base-content/80 transition-colors">
              Show online only
            </span>
          </label>

          <SlidersHorizontal className="w-3.5 h-3.5 text-base-content/30" />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                relative
                w-full
                p-2.5
                mb-1
                flex items-center
                gap-3
                rounded-2xl
                text-left
                transition-all duration-200
                group

                ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10"
                    : "hover:bg-base-content/5"
                }
              `}
            >
              {/* Active indicator */}
              {isSelected && (
                <div
                  className="
                    absolute left-0
                    top-1/2
                    -translate-y-1/2
                    w-1
                    h-8
                    rounded-r-full
                    bg-gradient-to-b
                    from-purple-500
                    to-indigo-500
                  "
                />
              )}

              {/* Avatar */}
              <div className="relative shrink-0 mx-auto lg:mx-0">
                <img
                  src={
                    user.profilePic || "/avatar.png"
                  }
                  alt={user.fullName}
                  className={`
                    w-11 h-11
                    lg:w-12 lg:h-12
                    rounded-full
                    object-cover
                    border
                    transition-all duration-200

                    ${
                      isSelected
                        ? "border-purple-500/50"
                        : "border-base-content/10 group-hover:border-base-content/20"
                    }
                  `}
                />

                {/* Online status */}
                {isOnline && (
                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      w-3.5 h-3.5
                      rounded-full
                      bg-green-500
                      border-[2px]
                      border-base-100
                      shadow-sm
                    "
                  />
                )}
              </div>

              {/* User information */}
              <div className="hidden lg:block min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`
                      font-semibold
                      text-sm
                      truncate
                      ${
                        isSelected
                          ? "text-primary"
                          : ""
                      }
                    `}
                  >
                    {user.fullName}
                  </span>

                  {/* Status dot */}
                  {isOnline && (
                    <span className="text-[10px] text-green-500 shrink-0">
                      Online
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  {isOnline ? (
                    <>
                      <Circle className="w-1.5 h-1.5 fill-green-500 text-green-500" />

                      <span className="text-xs text-green-500/80">
                        Active now
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-base-content/35">
                      Offline
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-base-content/5
                flex items-center justify-center
                mb-3
              "
            >
              {searchQuery ? (
                <Search className="w-5 h-5 text-base-content/30" />
              ) : (
                <UserRound className="w-5 h-5 text-base-content/30" />
              )}
            </div>

            <p className="text-sm font-medium text-base-content/60">
              {searchQuery
                ? "No contacts found"
                : "No online users"}
            </p>

            <p className="text-xs text-base-content/35 mt-1">
              {searchQuery
                ? "Try a different search"
                : "Your online contacts will appear here"}
            </p>
          </div>
        )}
      </div>

      {/* Bottom status */}
      <div className="hidden lg:block p-4 border-t border-base-content/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-base-300/50">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500" />
          </div>

          <div>
            <p className="text-xs font-medium">
              You're online
            </p>

            <p className="text-[10px] text-base-content/40 mt-0.5">
              Ready to chat
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
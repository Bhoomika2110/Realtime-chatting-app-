// import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();

//   return (
//     <div className="p-2.5 border-b border-base-300">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="avatar">
//             <div className="size-10 rounded-full relative">
//               <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
//             </div>
//           </div>

//           {/* User info */}
//           <div>
//             <h3 className="font-medium">{selectedUser.fullName}</h3>
//             <p className="text-sm text-base-content/70">
//               {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Close button */}
//         <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ChatHeader;

import {
  X,
  MoreVertical,
  Phone,
  Video,
  Info,
  Circle,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header
      className="
        h-[72px]
        shrink-0
        px-4 sm:px-5
        border-b border-base-content/10
        bg-base-100/70
        backdrop-blur-xl
        flex items-center justify-between
      "
    >
      {/* LEFT - User */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="
              w-10 h-10
              sm:w-11 sm:h-11
              rounded-full
              object-cover
              border border-base-content/10
              shadow-sm
            "
          />

          {/* Online indicator */}
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

        {/* User info */}
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            {selectedUser.fullName}
          </h3>

          <div className="flex items-center gap-1.5 mt-0.5">
            <Circle
              className={`
                w-1.5 h-1.5
                ${
                  isOnline
                    ? "fill-green-500 text-green-500"
                    : "fill-base-content/30 text-base-content/30"
                }
              `}
            />

            <p
              className={`
                text-xs
                ${
                  isOnline
                    ? "text-green-500"
                    : "text-base-content/40"
                }
              `}
            >
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT - Actions */}
      <div className="flex items-center gap-1">
        {/* Voice call */}
        <button
          type="button"
          className="
            hidden sm:flex
            w-9 h-9
            rounded-xl
            items-center justify-center
            text-base-content/50
            hover:text-purple-400
            hover:bg-purple-500/10
            transition-all
          "
          title="Voice call"
        >
          <Phone className="w-[18px] h-[18px]" />
        </button>

        {/* Video call */}
        <button
          type="button"
          className="
            hidden sm:flex
            w-9 h-9
            rounded-xl
            items-center justify-center
            text-base-content/50
            hover:text-purple-400
            hover:bg-purple-500/10
            transition-all
          "
          title="Video call"
        >
          <Video className="w-[18px] h-[18px]" />
        </button>

        {/* Info */}
        <button
          type="button"
          className="
            hidden sm:flex
            w-9 h-9
            rounded-xl
            items-center justify-center
            text-base-content/50
            hover:text-purple-400
            hover:bg-purple-500/10
            transition-all
          "
          title="Chat information"
        >
          <Info className="w-[18px] h-[18px]" />
        </button>

        {/* More */}
        <button
          type="button"
          className="
            hidden sm:flex
            w-9 h-9
            rounded-xl
            items-center justify-center
            text-base-content/50
            hover:text-purple-400
            hover:bg-purple-500/10
            transition-all
          "
          title="More options"
        >
          <MoreVertical className="w-[18px] h-[18px]" />
        </button>

        {/* Close chat */}
        <button
          type="button"
          onClick={() => setSelectedUser(null)}
          className="
            w-9 h-9
            rounded-xl
            flex items-center justify-center
            text-base-content/50
            hover:text-red-400
            hover:bg-red-500/10
            transition-all
            ml-1
          "
          title="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;

import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-full min-h-0 flex flex-col overflow-hidden bg-base-100">
        <ChatHeader />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <MessageSkeleton />
        </div>

        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col overflow-hidden bg-base-100">
      {/* HEADER */}
      <div className="shrink-0">
        <ChatHeader />
      </div>

      {/* MESSAGES */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          px-4
          py-5
          space-y-4
        "
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                <span className="text-2xl">👋</span>
              </div>

              <h3 className="font-semibold text-base">
                Start a conversation
              </h3>

              <p className="text-sm text-base-content/50 mt-2">
                Send a message to {selectedUser.fullName}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage =
              message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`flex items-end gap-2 ${
                  isOwnMessage
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* Receiver Avatar */}
                {!isOwnMessage && (
                  <img
                    src={
                      selectedUser.profilePic ||
                      "/avatar.png"
                    }
                    alt={selectedUser.fullName}
                    className="
                      w-8 h-8
                      rounded-full
                      object-cover
                      border border-base-content/10
                    "
                  />
                )}

                {/* Message */}
                <div
                  className={`max-w-[70%] flex flex-col ${
                    isOwnMessage
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`
                      px-4 py-3
                      rounded-2xl
                      shadow-sm
                      ${
                        isOwnMessage
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                          : "bg-base-200 border border-base-content/5 rounded-bl-md"
                      }
                    `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="
                          max-w-[280px]
                          max-h-[350px]
                          rounded-xl
                          mb-2
                          object-cover
                        "
                      />
                    )}

                    {message.text && (
                      <p className="text-sm leading-relaxed break-words">
                        {message.text}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] text-base-content/40 mt-1 px-1">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>

                {/* Sender Avatar */}
                {isOwnMessage && (
                  <img
                    src={
                      authUser.profilePic ||
                      "/avatar.png"
                    }
                    alt={authUser.fullName}
                    className="
                      w-8 h-8
                      rounded-full
                      object-cover
                      border border-purple-500/20
                    "
                  />
                )}
              </div>
            );
          })
        )}

        <div ref={messageEndRef} />
      </div>

      {/* INPUT */}
      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
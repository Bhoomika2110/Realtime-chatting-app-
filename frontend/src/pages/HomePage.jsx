// // import { useChatStore } from "../store/useChatStore";

// // import Sidebar from "../components/Sidebar";
// // import NoChatSelected from "../components/NoChatSelected";
// // import ChatContainer from "../components/ChatContainer";

// // const HomePage = () => {
// //   const { selectedUser } = useChatStore();

// //   return (
// //     <div className="h-screen bg-base-200">
// //       <div className="flex items-center justify-center pt-20 px-4">
// //         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
// //           <div className="flex h-full rounded-lg overflow-hidden">
// //             <Sidebar />

// //             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default HomePage;

// import { useChatStore } from "../store/useChatStore";

// import Sidebar from "../components/Sidebar";
// import NoChatSelected from "../components/NoChatSelected";
// import ChatContainer from "../components/ChatContainer";

// const HomePage = () => {
//   const { selectedUser } = useChatStore();

//   return (
//     <div className="min-h-screen bg-base-300 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />

//         <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
//       </div>

//       {/* Main Chat Area */}
//       <div className="relative h-[calc(100vh-5rem)] px-3 sm:px-5 lg:px-8 pt-3">
//         <div
//           className="
//             h-full
//             max-w-[1500px]
//             mx-auto
//             overflow-hidden
//             rounded-3xl
//             border border-white/10
//             bg-base-100/75
//             backdrop-blur-xl
//             shadow-2xl shadow-black/10
//           "
//         >
//           <div className="flex h-full overflow-hidden">
//             {/* Sidebar */}
//             <div className="h-full shrink-0">
//               <Sidebar />
//             </div>

//             {/* Chat */}
//             <div className="flex-1 min-w-0 h-full">
//               {!selectedUser ? (
//                 <NoChatSelected />
//               ) : (
//                 <ChatContainer />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-4rem)] pt-16 bg-base-300">
      <div className="h-full p-3 sm:p-4">
        <div
          className="
            h-full
            w-full
            max-w-[1500px]
            mx-auto
            rounded-2xl
            overflow-hidden
            border border-base-content/10
            bg-base-100
            shadow-2xl
          "
        >
          <div className="flex h-full min-h-0">
            {/* Sidebar */}
            <Sidebar />

            {/* Chat Area */}
            <main className="flex-1 min-w-0 min-h-0">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoChatSelected />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
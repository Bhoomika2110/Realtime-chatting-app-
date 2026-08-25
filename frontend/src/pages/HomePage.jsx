

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

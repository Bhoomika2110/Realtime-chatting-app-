

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import {
  Send,
  Palette,
  Check,
  Sparkles,
  MessageCircle,
  Circle,
} from "lucide-react";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
  {
    id: 3,
    content: "That sounds awesome! 🔥",
    isSent: false,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            Personalization
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="mt-2 text-base-content/60">
            Customize your chat experience and choose your favorite theme.
          </p>
        </div>

        {/* Theme Section */}
        <section className="rounded-3xl border border-white/10 bg-base-200/70 backdrop-blur-xl shadow-2xl p-5 sm:p-7">
          {/* Section heading */}
          <div className="flex items-start gap-4 mb-7">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Appearance
              </h2>

              <p className="text-sm text-base-content/50 mt-1">
                Choose a theme for your chat interface.
              </p>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {THEMES.map((t) => {
              const isSelected = theme === t;

              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  data-theme={t}
                  className={`
                    relative group p-2 rounded-2xl
                    border transition-all duration-200
                    ${
                      isSelected
                        ? "border-primary bg-base-100 shadow-lg scale-[1.02]"
                        : "border-base-content/10 bg-base-100/50 hover:border-primary/40 hover:bg-base-100"
                    }
                  `}
                >
                  {/* Selected check */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Theme preview */}
                  <div
                    className="h-16 rounded-xl overflow-hidden relative"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 bg-base-100 p-2">
                      <div className="flex gap-1 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>

                      <div className="space-y-1">
                        <div className="w-3/4 h-2 rounded bg-base-300" />
                        <div className="w-1/2 h-2 rounded bg-primary/40" />
                        <div className="w-2/3 h-2 rounded bg-base-300" />
                      </div>
                    </div>
                  </div>

                  {/* Theme name */}
                  <div className="pt-2 px-1">
                    <span className="text-xs font-semibold capitalize truncate block">
                      {t}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current theme */}
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-base-300/60 border border-base-content/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Current Theme
                </p>

                <p className="text-xs text-base-content/50">
                  Your selected appearance
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize">
              {theme}
            </span>
          </div>
        </section>

        {/* Preview Section */}
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Live Preview
              </h2>

              <p className="text-sm text-base-content/50">
                See how your selected theme looks in chat.
              </p>
            </div>
          </div>

          {/* Preview Container */}
          <div
            data-theme={theme}
            className="rounded-3xl border border-base-content/10 overflow-hidden bg-base-100 shadow-2xl"
          >
            {/* Browser-style header */}
            <div className="px-5 py-3 border-b border-base-300 bg-base-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>

              <span className="text-xs text-base-content/40">
                Chat Preview
              </span>

              <div className="w-12" />
            </div>

            <div className="p-4 sm:p-8 bg-base-200">
              <div className="max-w-2xl mx-auto">
                {/* Chat window */}
                <div className="rounded-3xl overflow-hidden border border-base-300 bg-base-100 shadow-xl">
                  {/* Chat Header */}
                  <div className="px-5 py-4 border-b border-base-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            J
                          </div>

                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-base-100" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm">
                            John Doe
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-green-500">
                            <Circle className="w-2 h-2 fill-current" />
                            Online
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-5 space-y-4 min-h-[280px] bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%] sm:max-w-[65%]
                            rounded-2xl px-4 py-3
                            ${
                              message.isSent
                                ? "bg-primary text-primary-content rounded-br-md"
                                : "bg-base-200 rounded-bl-md"
                            }
                          `}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>

                          <p
                            className={`
                              text-[10px] mt-2
                              ${
                                message.isSent
                                  ? "text-primary-content/60"
                                  : "text-base-content/50"
                              }
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-base-300">
                    <div className="flex gap-2">
                      <div className="flex-1 h-11 rounded-xl border border-base-300 bg-base-200 px-4 flex items-center text-sm text-base-content/40">
                        Type a message...
                      </div>

                      <button className="w-11 h-11 rounded-xl bg-primary text-primary-content flex items-center justify-center hover:scale-105 transition-transform">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/40 mt-8">
          Your theme preference is automatically saved.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;

import { useState } from "react";
import { ArrowLeft, Phone, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function UssdSimulator() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<"menu" | "tasks">("menu");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useState(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  });

  const keypadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  const handleKeyPress = (key: string) => {
    if (screen === "menu" && key === "1") {
      setScreen("tasks");
    } else if (screen === "tasks" && key === "0") {
      setScreen("menu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#ECEFF1" }}>
      <div className="w-full max-w-6xl p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium hover:underline"
          style={{ color: "#1A237E" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex justify-center gap-12">
          {/* Phone Frame */}
          <div
            className="rounded-3xl p-6 shadow-2xl"
            style={{
              backgroundColor: "#3A3A3A",
              width: "380px",
            }}
          >
            {/* Phone Screen */}
            <div
              className="rounded-2xl p-6 mb-6 font-mono"
              style={{
                backgroundColor: "#000000",
                color: "#00FF00",
                minHeight: "400px",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              {screen === "menu" ? (
                <div>
                  <div className="text-center font-bold mb-4 border-b border-green-500 pb-2">
                    APEXROUTE
                  </div>
                  <div className="mb-4">Code: *123#</div>
                  <div className="mb-6">
                    <div>1. View Tasks</div>
                    <div>2. Update Status</div>
                    <div>3. Report Issue</div>
                    <div>4. Get Directions</div>
                  </div>
                  <div className="flex items-center">
                    <span>Reply with option:</span>
                    {cursorVisible && <span className="ml-1">_</span>}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center font-bold mb-4 border-b border-green-500 pb-2">
                    MY TASKS
                  </div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <div>1. ORD-5678</div>
                      <div className="ml-3 text-xs">123 Main St</div>
                      <div className="ml-3">[PENDING]</div>
                    </div>
                    <div>
                      <div>2. ORD-5681</div>
                      <div className="ml-3 text-xs">456 Oak Ave</div>
                      <div className="ml-3">[PENDING]</div>
                    </div>
                  </div>
                  <div className="border-t border-green-500 pt-3">
                    <div>0. Back</div>
                  </div>
                </div>
              )}
            </div>

            {/* Keypad */}
            <div className="space-y-3">
              {keypadButtons.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-3 gap-3">
                  {row.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className="h-14 rounded-lg font-bold text-lg transition-all active:scale-95"
                      style={{
                        backgroundColor: "#4A4A4A",
                        color: "#FFFFFF",
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}

              {/* Call and End Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  className="h-14 rounded-lg flex items-center justify-center transition-all active:scale-95"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </button>
                <button
                  className="h-14 rounded-lg flex items-center justify-center transition-all active:scale-95"
                  style={{ backgroundColor: "#C62828" }}
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* D-Pad */}
              <div className="flex justify-center mt-6">
                <div className="relative w-32 h-32">
                  {/* Up */}
                  <button
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-t-lg"
                    style={{ backgroundColor: "#4A4A4A" }}
                  >
                    <span className="text-white">▲</span>
                  </button>
                  {/* Down */}
                  <button
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-b-lg"
                    style={{ backgroundColor: "#4A4A4A" }}
                  >
                    <span className="text-white">▼</span>
                  </button>
                  {/* Left */}
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-l-lg"
                    style={{ backgroundColor: "#4A4A4A" }}
                  >
                    <span className="text-white">◀</span>
                  </button>
                  {/* Right */}
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-r-lg"
                    style={{ backgroundColor: "#4A4A4A" }}
                  >
                    <span className="text-white">▶</span>
                  </button>
                  {/* Center */}
                  <button
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
                    style={{ backgroundColor: "#1A237E" }}
                  >
                    <span className="text-white text-xs">OK</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex-1 max-w-md">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#263238" }}>
                USSD Interface
              </h2>
              <p className="mb-4" style={{ color: "#546E7A" }}>
                Feature phone simulation for drivers without smartphones. Access core functionality via
                USSD codes.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2" style={{ color: "#263238" }}>
                    Features:
                  </h3>
                  <ul className="space-y-1 text-sm" style={{ color: "#546E7A" }}>
                    <li>• View assigned tasks</li>
                    <li>• Update delivery status</li>
                    <li>• Report issues or delays</li>
                    <li>• Get turn-by-turn directions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2" style={{ color: "#263238" }}>
                    How to use:
                  </h3>
                  <ol className="space-y-1 text-sm" style={{ color: "#546E7A" }}>
                    <li>1. Dial *123# from any phone</li>
                    <li>2. Select option from menu (1-4)</li>
                    <li>3. Follow on-screen prompts</li>
                    <li>4. Press 0 to go back</li>
                  </ol>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "#E8F4F8" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#1A237E" }}>
                    💡 Try pressing "1" on the keypad to view tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
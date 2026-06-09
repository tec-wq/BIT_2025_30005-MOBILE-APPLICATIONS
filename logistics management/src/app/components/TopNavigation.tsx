import { useNavigate } from "react-router";
import { Bell, Settings, Hexagon, LogOut } from "lucide-react";

export function TopNavigation({ activeTab }: { activeTab?: string }) {
  const navigate = useNavigate();
  
  // Updated tabs to include all the main workspace areas
  const tabs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Fleet", path: "/fleet" },
    { label: "Queue", path: "/queue" },
    { label: "Dispatch", path: "/dispatch" },
    { label: "Reports", path: "/reports" }
  ];

  return (
    <div className="h-16 flex items-center justify-between px-6" style={{ backgroundColor: "#1A237E" }}>
      <div className="flex items-center gap-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Hexagon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg">ApexRoute</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className="px-4 py-2 rounded-lg transition-colors relative text-sm font-medium"
              style={{
                color: activeTab === tab.label ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)",
                backgroundColor: activeTab === tab.label ? "rgba(255, 255, 255, 0.15)" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={() => navigate("/settings")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={() => navigate("/")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
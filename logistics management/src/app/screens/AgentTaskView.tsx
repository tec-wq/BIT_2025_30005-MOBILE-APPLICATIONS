import { ArrowLeft, Bell, Navigation, CheckCircle, AlertTriangle, Home, MapIcon, User, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";

export function AgentTaskView() {
  const navigate = useNavigate();

  const currentTask = {
    orderId: "ORD-5678",
    location: "123 Main St",
    eta: "15:45",
    distance: 12.5,
    progress: 68,
  };

  const upcomingTasks = [
    { orderId: "ORD-5681", location: "456 Oak Ave", eta: "16:00" },
    { orderId: "ORD-5682", location: "789 Pine Rd", eta: "16:30" },
  ];

  const bottomNavItems = [
    { icon: Home, label: "Home", path: "/agent-tasks" },
    { icon: Package, label: "Tasks", path: "/agent-tasks", active: true },
    { icon: MapIcon, label: "Map", path: "/fleet" },
    { icon: User, label: "Profile", path: "/agent-tasks" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#ECEFF1" }}>
      {/* Mobile Frame */}
      <div
        className="bg-white shadow-2xl overflow-hidden relative"
        style={{
          width: "375px",
          height: "812px",
          borderRadius: "40px",
          border: "12px solid #2A2A2A",
        }}
      >
        {/* Status Bar Spacer */}
        <div className="h-12" style={{ backgroundColor: "#FFFFFF" }} />

        {/* Top App Bar */}
        <div className="h-16 flex items-center justify-between px-4 border-b" style={{ borderColor: "#E0E0E0" }}>
          <button onClick={() => navigate("/dashboard")} className="p-2">
            <ArrowLeft className="w-5 h-5" style={{ color: "#263238" }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#263238" }}>
            My Tasks
          </h1>
          <button className="relative p-2">
            <Bell className="w-5 h-5" style={{ color: "#263238" }} />
            <Badge
              className="absolute -top-0 -right-0 h-4 w-4 flex items-center justify-center p-0 text-xs"
              style={{ backgroundColor: "#FF6D00", color: "white" }}
            >
              2
            </Badge>
          </button>
        </div>

        {/* User Info Banner */}
        <div className="px-4 py-4" style={{ backgroundColor: "#F5F7FA" }}>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback style={{ backgroundColor: "#1A237E", color: "white" }}>
                JM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-bold" style={{ color: "#263238" }}>
                John M.
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#546E7A" }}>
                <span>🚚 KT-234</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#2E7D32" }} />
                  <span style={{ color: "#2E7D32" }}>En Route</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Task Card */}
        <div className="px-4 py-4">
          <h2 className="text-xs font-semibold mb-3" style={{ color: "#546E7A" }}>
            CURRENT TASK
          </h2>
          <Card
            className="p-4 rounded-xl shadow-md border-l-4"
            style={{ borderLeftColor: "#FF6D00" }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                    Order ID
                  </p>
                  <p className="text-lg font-bold font-mono" style={{ color: "#263238" }}>
                    {currentTask.orderId}
                  </p>
                </div>
                <Badge
                  className="text-xs px-2 py-1"
                  style={{ backgroundColor: "#FF6D00", color: "white" }}
                >
                  IN PROGRESS
                </Badge>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                  Delivery Location
                </p>
                <p className="font-medium" style={{ color: "#263238" }}>
                  {currentTask.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                    ETA
                  </p>
                  <p className="font-bold text-lg" style={{ color: "#1A237E" }}>
                    {currentTask.eta}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                    Distance
                  </p>
                  <p className="font-bold text-lg" style={{ color: "#1A237E" }}>
                    {currentTask.distance} km
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: "#546E7A" }}>
                    Route Progress
                  </p>
                  <p className="text-xs font-bold" style={{ color: "#1976D2" }}>
                    {currentTask.progress}%
                  </p>
                </div>
                <Progress
                  value={currentTask.progress}
                  className="h-2"
                  style={
                    {
                      "--progress-background": "#1976D2",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <Button
              className="w-full h-12 rounded-xl text-white font-semibold"
              style={{ backgroundColor: "#1976D2" }}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Navigate
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="h-11 rounded-xl text-white font-medium"
                style={{ backgroundColor: "#2E7D32" }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Delivered
              </Button>
              <Button
                className="h-11 rounded-xl text-white font-medium"
                style={{ backgroundColor: "#FF8F00" }}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </div>

        {/* Up Next Section */}
        <div className="px-4 py-3">
          <h2 className="text-xs font-semibold mb-3" style={{ color: "#546E7A" }}>
            UP NEXT
          </h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <Card key={task.orderId} className="p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold font-mono mb-1" style={{ color: "#263238" }}>
                      {task.orderId}
                    </p>
                    <p className="text-xs" style={{ color: "#546E7A" }}>
                      {task.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#546E7A" }}>
                      Est.
                    </p>
                    <p className="font-bold" style={{ color: "#1A237E" }}>
                      {task.eta}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <button
            className="w-full mt-3 text-center text-sm font-medium hover:underline"
            style={{ color: "#1976D2" }}
          >
            View All Tasks (4)
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 border-t flex items-center justify-around px-4 bg-white"
          style={{ borderColor: "#E0E0E0", borderRadius: "0 0 28px 28px" }}
        >
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 transition-colors"
              style={{
                color: item.active ? "#1A237E" : "#9E9E9E",
              }}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
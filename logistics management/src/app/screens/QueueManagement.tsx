import { useState } from "react";
import { ArrowLeft, Bell, Truck, GripVertical, Zap, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export function QueueManagement() {
  const navigate = useNavigate();
  const [queueItems, setQueueItems] = useState([
    { id: 1, position: 1, vehicleId: "KT-234", wait: "8 min", driver: "John M.", capacity: "2.5/3.0 tons", isPriority: true },
    { id: 2, position: 2, vehicleId: "TR-456", wait: "12 min", driver: "Sarah K.", capacity: "1.8/3.0 tons", isPriority: false },
    { id: 3, position: 3, vehicleId: "LM-789", wait: "15 min", driver: "Mike R.", capacity: "2.9/3.0 tons", isPriority: true },
    { id: 4, position: 4, vehicleId: "QW-321", wait: "18 min", driver: "Lisa P.", capacity: "2.0/3.0 tons", isPriority: false },
    { id: 5, position: 5, vehicleId: "ZX-654", wait: "22 min", driver: "Tom H.", capacity: "1.5/3.0 tons", isPriority: false },
  ]);

  const servingBays = [
    { bay: 1, vehicleId: "TR-789", started: "14:20", estComplete: "14:35", progress: 60 },
    { bay: 2, vehicleId: "KP-123", started: "14:25", estComplete: "14:40", progress: 35 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#263238" }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: "#263238" }}>
            Hub A - Queue Manager
          </h1>
        </div>
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" style={{ color: "#263238" }} />
          <Badge
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            style={{ backgroundColor: "#FF6D00", color: "white" }}
          >
            3
          </Badge>
        </button>
      </div>

      {/* Hub Status Banner */}
      <div className="px-6 py-4" style={{ backgroundColor: "#FFF3E0" }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold" style={{ color: "#FF8F00" }}>
            NEAR CAPACITY (75%)
          </h2>
          <span className="text-sm font-medium" style={{ color: "#546E7A" }}>
            15 vehicles in queue
          </span>
        </div>
        <Progress
          value={75}
          className="h-3"
          style={
            {
              "--progress-background": "#FF8F00",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-5 gap-6">
          {/* Incoming Queue - 60% */}
          <Card className="col-span-3 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#263238" }}>
              INCOMING QUEUE
            </h3>

            <div className="space-y-3">
              {queueItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                  style={{
                    borderColor: item.isPriority ? "#FF6D00" : "#E0E0E0",
                    borderLeftWidth: item.isPriority ? "4px" : "2px",
                  }}
                >
                  {/* Drag Handle */}
                  <button className="cursor-move p-1">
                    <GripVertical className="w-5 h-5" style={{ color: "#546E7A" }} />
                  </button>

                  {/* Queue Position */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                    style={{ backgroundColor: "#ECEFF1", color: "#263238" }}
                  >
                    {item.position}
                  </div>

                  {/* Vehicle Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#1A237E" }}
                  >
                    <Truck className="w-5 h-5 text-white" />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold font-mono" style={{ color: "#263238" }}>
                        {item.vehicleId}
                      </span>
                      {item.isPriority && (
                        <Badge
                          className="text-xs px-2 py-0.5"
                          style={{ backgroundColor: "#FF6D00", color: "white" }}
                        >
                          PRIORITY
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm" style={{ color: "#546E7A" }}>
                      <span>Driver: {item.driver}</span>
                      <span>•</span>
                      <span>Wait: {item.wait}</span>
                      <span>•</span>
                      <span>Load: {item.capacity}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="h-9 px-3 rounded-lg text-white"
                      style={{ backgroundColor: "#FF6D00" }}
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Prioritize
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 px-3 rounded-lg"
                      style={{ borderColor: "#546E7A", color: "#546E7A" }}
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Delay
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Currently Serving - 40% */}
          <Card className="col-span-2 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#263238" }}>
              CURRENTLY SERVING
            </h3>

            <div className="space-y-4">
              {servingBays.map((bay) => (
                <div
                  key={bay.bay}
                  className="border-2 rounded-lg p-4"
                  style={{ borderColor: "#2E7D32" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "#2E7D32" }}
                    />
                    <span className="font-bold" style={{ color: "#263238" }}>
                      Bay {bay.bay}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Vehicle
                      </p>
                      <p className="font-bold font-mono" style={{ color: "#263238" }}>
                        {bay.vehicleId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Started
                      </p>
                      <p className="text-sm font-medium" style={{ color: "#263238" }}>
                        {bay.started}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Est. Complete
                      </p>
                      <p className="text-sm font-medium" style={{ color: "#263238" }}>
                        {bay.estComplete}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs" style={{ color: "#546E7A" }}>
                          Progress
                        </p>
                        <p className="text-xs font-bold" style={{ color: "#2E7D32" }}>
                          {bay.progress}%
                        </p>
                      </div>
                      <Progress
                        value={bay.progress}
                        className="h-2"
                        style={
                          {
                            "--progress-background": "#2E7D32",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              className="h-11 px-6 rounded-lg text-white font-medium"
              style={{ backgroundColor: "#1A237E" }}
            >
              <Play className="w-4 h-4 mr-2" />
              Auto-Optimize Queue
            </Button>
            <Button
              variant="outline"
              className="h-11 px-6 rounded-lg font-medium"
              style={{ borderColor: "#1A237E", color: "#1A237E" }}
            >
              Manual Reorder
            </Button>
          </div>
          <Button
            variant="outline"
            className="h-11 px-6 rounded-lg font-medium"
            style={{ borderColor: "#C62828", color: "#C62828" }}
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause Incoming
          </Button>
        </div>
      </div>
    </div>
  );
}
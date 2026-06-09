import { useState } from "react";
import { TopNavigation } from "../components/TopNavigation";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Search, Filter, Truck, MapPin, Clock, Package, MessageSquare, Navigation } from "lucide-react";

export function FleetTracking() {
  const [selectedVehicle, setSelectedVehicle] = useState("KT-234");

  const vehicleDetails = {
    id: "KT-234",
    driver: "John M.",
    status: "EN ROUTE",
    eta: "14:30",
    speed: "45 km/h",
    route: "A → B → C",
    capacity: 2.5,
    maxCapacity: 3.0,
  };

  const statusCounts = {
    active: 28,
    delayed: 8,
    stopped: 3,
    offline: 3,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <TopNavigation activeTab="Fleet" />

      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "#546E7A" }}
            />
            <Input
              placeholder="Search vehicle..."
              className="pl-10 h-12 rounded-xl bg-white"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-xl bg-white">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="h-12 px-6 rounded-xl bg-white">
            <MapPin className="w-5 h-5 mr-2" />
            Zone Selector
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-10 gap-6">
          {/* Map View - 70% */}
          <Card className="col-span-7 p-6 rounded-xl shadow-md" style={{ height: "600px" }}>
            <div
              className="w-full h-full rounded-lg relative overflow-hidden"
              style={{ backgroundColor: "#E8F4F8" }}
            >
              {/* Interactive Map Placeholder */}
              <div className="absolute inset-0">
                {/* Route lines */}
                <svg className="w-full h-full">
                  <path
                    d="M 100 200 L 250 150 L 400 250 L 550 180"
                    stroke="#1976D2"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-24"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M 150 350 Q 300 300 450 350"
                    stroke="#1976D2"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>

                {/* Vehicle markers */}
                <div className="absolute" style={{ top: "200px", left: "100px" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: "#2E7D32" }}
                    onClick={() => setSelectedVehicle("KT-234")}
                  >
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute" style={{ top: "250px", left: "400px" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: "#FF8F00" }}
                  >
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute" style={{ top: "180px", left: "550px" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: "#2E7D32" }}
                  >
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Hub locations */}
                <div className="absolute" style={{ top: "150px", left: "250px" }}>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: "#1A237E" }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Delivery points */}
                <div className="absolute" style={{ top: "350px", left: "150px" }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF6D00" }} />
                </div>
                <div className="absolute" style={{ top: "350px", left: "450px" }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF6D00" }} />
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" className="w-10 h-10 rounded-lg bg-white text-black shadow-md">
                  +
                </Button>
                <Button size="sm" className="w-10 h-10 rounded-lg bg-white text-black shadow-md">
                  −
                </Button>
              </div>
            </div>
          </Card>

          {/* Vehicle Details Panel - 30% */}
          <Card className="col-span-3 p-6 rounded-xl shadow-md" style={{ height: "600px" }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#263238" }}>
              Vehicle Details
            </h3>

            <div className="space-y-6">
              {/* Vehicle ID */}
              <div>
                <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                  Vehicle ID
                </p>
                <p className="text-xl font-bold font-mono" style={{ color: "#263238" }}>
                  {vehicleDetails.id}
                </p>
              </div>

              {/* Driver */}
              <div>
                <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                  Driver
                </p>
                <p className="text-base font-medium" style={{ color: "#263238" }}>
                  {vehicleDetails.driver}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs mb-2" style={{ color: "#546E7A" }}>
                  Status
                </p>
                <Badge
                  className="text-sm font-semibold px-3 py-1"
                  style={{ backgroundColor: "#2E7D32", color: "white" }}
                >
                  {vehicleDetails.status}
                </Badge>
              </div>

              {/* ETA */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" style={{ color: "#546E7A" }} />
                <div>
                  <p className="text-xs" style={{ color: "#546E7A" }}>
                    ETA
                  </p>
                  <p className="text-lg font-bold" style={{ color: "#263238" }}>
                    {vehicleDetails.eta}
                  </p>
                </div>
              </div>

              {/* Speed */}
              <div>
                <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                  Current Speed
                </p>
                <p className="text-base font-medium" style={{ color: "#263238" }}>
                  {vehicleDetails.speed}
                </p>
              </div>

              {/* Route */}
              <div>
                <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                  Route
                </p>
                <p className="text-base font-medium" style={{ color: "#263238" }}>
                  {vehicleDetails.route}
                </p>
              </div>

              {/* Capacity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: "#546E7A" }}>
                    Capacity
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#263238" }}>
                    {vehicleDetails.capacity}/{vehicleDetails.maxCapacity} tons
                  </p>
                </div>
                <Progress
                  value={(vehicleDetails.capacity / vehicleDetails.maxCapacity) * 100}
                  className="h-2"
                  style={
                    {
                      "--progress-background": "#1976D2",
                    } as React.CSSProperties
                  }
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-lg font-medium"
                  style={{ borderColor: "#1A237E", color: "#1A237E" }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Reroute
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-lg font-medium"
                  style={{ borderColor: "#1A237E", color: "#1A237E" }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Driver
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Bar */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#2E7D32" }} />
              <span className="font-medium" style={{ color: "#263238" }}>
                {statusCounts.active} Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF8F00" }} />
              <span className="font-medium" style={{ color: "#263238" }}>
                {statusCounts.delayed} Delayed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#C62828" }} />
              <span className="font-medium" style={{ color: "#263238" }}>
                {statusCounts.stopped} Stopped
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="font-medium" style={{ color: "#263238" }}>
                {statusCounts.offline} Offline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { TopNavigation } from "../components/TopNavigation";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Search, MapPin, Package, Clock, Sparkles } from "lucide-react";

export function DispatchConsole() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(1);

  const orders = [
    { id: 1, orderId: "ORD-5678", priority: "HIGH", pickup: "Warehouse A", delivery: "123 Main St", weight: "2.5 tons", deadline: "15:00" },
    { id: 2, orderId: "ORD-5679", priority: "MED", pickup: "Warehouse B", delivery: "456 Oak Ave", weight: "1.8 tons", deadline: "16:30" },
    { id: 3, orderId: "ORD-5680", priority: "HIGH", pickup: "Warehouse A", delivery: "789 Pine Rd", weight: "3.0 tons", deadline: "14:30" },
    { id: 4, orderId: "ORD-5681", priority: "LOW", pickup: "Warehouse C", delivery: "321 Elm St", weight: "1.2 tons", deadline: "18:00" },
  ];

  const aiRecommendation = {
    vehicle: "KT-234",
    route: "A → B → C → D",
    eta: "15:45",
    efficiency: 94,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "#C62828";
      case "MED": return "#FF8F00";
      case "LOW": return "#2E7D32";
      default: return "#546E7A";
    }
  };

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <TopNavigation activeTab="Dispatch" />

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Pending Orders - Left 50% */}
          <Card className="p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: "#263238" }}>
                PENDING ORDERS (156)
              </h3>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "#546E7A" }}
              />
              <Input
                placeholder="Search orders..."
                className="pl-10 h-11 rounded-lg"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>

            {/* Order List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedOrderId === order.id ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: selectedOrderId === order.id ? "#1A237E" : "#E0E0E0",
                    backgroundColor: selectedOrderId === order.id ? "#F5F7FA" : "white",
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => handleOrderSelect(order.id)}
                      className="mt-1"
                      onClick={(e) => e.stopPropagation()}
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold font-mono" style={{ color: "#263238" }}>
                          {order.orderId}
                        </span>
                        <Badge
                          className="text-xs px-2 py-0.5 font-semibold"
                          style={{
                            backgroundColor: getPriorityColor(order.priority),
                            color: "white",
                          }}
                        >
                          {order.priority}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm" style={{ color: "#546E7A" }}>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Pickup: {order.pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Delivery: {order.delivery}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{order.weight}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>By {order.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Order Details - Right 50% */}
          <Card className="p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-6" style={{ color: "#263238" }}>
              ORDER DETAILS
            </h3>

            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                      Order ID
                    </p>
                    <p className="text-xl font-bold font-mono" style={{ color: "#263238" }}>
                      {selectedOrder.orderId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Priority
                      </p>
                      <Badge
                        className="text-sm px-3 py-1 font-semibold"
                        style={{
                          backgroundColor: getPriorityColor(selectedOrder.priority),
                          color: "white",
                        }}
                      >
                        {selectedOrder.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Deadline
                      </p>
                      <p className="font-medium" style={{ color: "#263238" }}>
                        {selectedOrder.deadline}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                      Pickup Location
                    </p>
                    <p className="font-medium" style={{ color: "#263238" }}>
                      {selectedOrder.pickup}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                      Delivery Address
                    </p>
                    <p className="font-medium" style={{ color: "#263238" }}>
                      {selectedOrder.delivery}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                      Weight
                    </p>
                    <p className="font-medium" style={{ color: "#263238" }}>
                      {selectedOrder.weight}
                    </p>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#E8F4F8" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" style={{ color: "#1976D2" }} />
                    <h4 className="font-bold" style={{ color: "#1A237E" }}>
                      AI RECOMMENDATION
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Recommended Vehicle
                      </p>
                      <p className="font-bold font-mono text-lg" style={{ color: "#263238" }}>
                        {aiRecommendation.vehicle}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                        Suggested Route
                      </p>
                      <p className="font-medium" style={{ color: "#263238" }}>
                        {aiRecommendation.route}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                          ETA
                        </p>
                        <p className="font-medium" style={{ color: "#263238" }}>
                          {aiRecommendation.eta}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs mb-1" style={{ color: "#546E7A" }}>
                          Efficiency Score
                        </p>
                        <p className="text-lg font-bold" style={{ color: "#2E7D32" }}>
                          {aiRecommendation.efficiency}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 rounded-lg text-white font-medium"
                    style={{ backgroundColor: "#1A237E" }}
                  >
                    Assign as Recommended
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-lg font-medium"
                    style={{ borderColor: "#1A237E", color: "#1A237E" }}
                  >
                    Override & Manual Assign
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full h-12 rounded-lg font-medium"
                    style={{ color: "#1976D2" }}
                  >
                    Batch with #5679
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center py-12" style={{ color: "#546E7A" }}>
                Select an order to view details
              </p>
            )}
          </Card>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox />
            <span className="font-medium" style={{ color: "#263238" }}>
              Select All
            </span>
            {selectedOrders.length > 0 && (
              <span className="text-sm" style={{ color: "#546E7A" }}>
                {selectedOrders.length} orders selected
              </span>
            )}
          </div>
          <Button
            className="h-11 px-6 rounded-lg text-white font-medium"
            style={{ backgroundColor: "#1A237E" }}
            disabled={selectedOrders.length === 0}
          >
            Auto-Dispatch Selected
          </Button>
        </div>
      </div>
    </div>
  );
}
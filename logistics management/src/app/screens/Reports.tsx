import { TopNavigation } from "../components/TopNavigation";
import { Card } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Package, Truck, Clock } from "lucide-react";

const deliveryData = [
  { day: "Mon", deliveries: 120, failed: 8 },
  { day: "Tue", deliveries: 145, failed: 5 },
  { day: "Wed", deliveries: 132, failed: 12 },
  { day: "Thu", deliveries: 167, failed: 4 },
  { day: "Fri", deliveries: 189, failed: 7 },
  { day: "Sat", deliveries: 98, failed: 3 },
  { day: "Sun", deliveries: 76, failed: 2 },
];

const waitTimeData = [
  { time: "08:00", avg: 3.2 },
  { time: "10:00", avg: 4.8 },
  { time: "12:00", avg: 6.1 },
  { time: "14:00", avg: 5.4 },
  { time: "16:00", avg: 7.2 },
  { time: "18:00", avg: 4.9 },
  { time: "20:00", avg: 2.8 },
];

const summaryCards = [
  { label: "Total Deliveries", value: "927", change: "+14%", icon: Package, positive: true },
  { label: "Active Vehicles", value: "42", change: "+3%", icon: Truck, positive: true },
  { label: "Avg Wait Time", value: "4.6 min", change: "-11%", icon: Clock, positive: true },
  { label: "Success Rate", value: "96.3%", change: "+2%", icon: TrendingUp, positive: true },
];

export function Reports() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <TopNavigation activeTab="Reports" />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6">
          {summaryCards.map((card) => (
            <Card key={card.label} className="p-5 rounded-xl shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm mb-1" style={{ color: "#546E7A" }}>{card.label}</p>
                  <p className="text-2xl font-bold" style={{ color: "#263238" }}>{card.value}</p>
                  <p className="text-sm mt-1 font-medium" style={{ color: "#2E7D32" }}>{card.change} this week</p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: "#E3F2FD" }}>
                  <card.icon className="w-5 h-5" style={{ color: "#1565C0" }} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4" style={{ color: "#263238" }}>Deliveries This Week</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECEFF1" />
                <XAxis dataKey="day" tick={{ fill: "#546E7A", fontSize: 12 }} />
                <YAxis tick={{ fill: "#546E7A", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="deliveries" fill="#1565C0" radius={[4, 4, 0, 0]} name="Delivered" />
                <Bar dataKey="failed" fill="#C62828" radius={[4, 4, 0, 0]} name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4" style={{ color: "#263238" }}>Average Wait Time (Today)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={waitTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECEFF1" />
                <XAxis dataKey="time" tick={{ fill: "#546E7A", fontSize: 12 }} />
                <YAxis tick={{ fill: "#546E7A", fontSize: 12 }} unit=" min" />
                <Tooltip formatter={(v) => [`${v} min`, "Avg Wait"]} />
                <Line type="monotone" dataKey="avg" stroke="#FF8F00" strokeWidth={2} dot={{ fill: "#FF8F00" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Hub Performance Table */}
        <Card className="p-6 rounded-xl shadow-md">
          <h2 className="font-semibold mb-4" style={{ color: "#263238" }}>Hub Performance Summary</h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #ECEFF1" }}>
                {["Hub", "Deliveries", "Failed", "Success Rate", "Avg Wait", "Status"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 font-medium" style={{ color: "#546E7A" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { hub: "Hub A", deliveries: 287, failed: 11, rate: "96.2%", wait: "4.1 min", status: "Normal" },
                { hub: "Hub B", deliveries: 214, failed: 6, rate: "97.2%", wait: "3.8 min", status: "Normal" },
                { hub: "Hub C", deliveries: 263, failed: 21, rate: "92.0%", wait: "7.4 min", status: "Overloaded" },
                { hub: "Hub D", deliveries: 163, failed: 3, rate: "98.2%", wait: "2.9 min", status: "Normal" },
              ].map((row) => (
                <tr key={row.hub} style={{ borderBottom: "1px solid #ECEFF1" }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: "#263238" }}>{row.hub}</td>
                  <td className="py-3 pr-4" style={{ color: "#263238" }}>{row.deliveries}</td>
                  <td className="py-3 pr-4" style={{ color: "#C62828" }}>{row.failed}</td>
                  <td className="py-3 pr-4" style={{ color: "#2E7D32" }}>{row.rate}</td>
                  <td className="py-3 pr-4" style={{ color: "#263238" }}>{row.wait}</td>
                  <td className="py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: row.status === "Overloaded" ? "#FFEBEE" : "#E8F5E9",
                        color: row.status === "Overloaded" ? "#C62828" : "#2E7D32",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
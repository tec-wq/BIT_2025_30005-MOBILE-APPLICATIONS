import { TopNavigation } from "../components/TopNavigation";
import { TrendingUp, Truck, Package, Clock, Building2 } from "lucide-react";

export function Dashboard() {
  const kpiData = [
    { label: "Active Vehicles", value: "42", change: "+12%", icon: Truck },
    { label: "Pending Orders", value: "156", change: "-8%", icon: Package },
    { label: "Avg Wait Time", value: "4.2 min", change: "-15%", icon: Clock },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <TopNavigation activeTab="Dashboard" />
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-6">
          {kpiData.map((kpi) => (
            <div key={kpi.label} className="p-6 rounded-xl shadow-md bg-white border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm mb-2 text-gray-500">{kpi.label}</p>
                  <p className="text-3xl font-bold mb-2 text-gray-800">{kpi.value}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                  <kpi.icon className="w-6 h-6 text-blue-900" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="p-6 rounded-xl shadow-md bg-white border">
          <h3 className="text-lg font-bold mb-4 text-gray-800">LIVE MAP VIEW</h3>
          <div className="rounded-lg flex items-center justify-center relative overflow-hidden h-96 bg-blue-50">
            <div className="absolute top-32 left-44"><Truck className="w-6 h-6 text-green-700" /></div>
            <div className="absolute top-48 left-24"><Building2 className="w-7 h-7 text-blue-900" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
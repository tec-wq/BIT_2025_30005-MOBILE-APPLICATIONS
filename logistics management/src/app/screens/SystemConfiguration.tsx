import { useState } from "react";
import { TopNavigation } from "../components/TopNavigation";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Settings } from "lucide-react";

export function SystemConfiguration() {
  const [distanceWeight, setDistanceWeight] = useState([60]);
  const [priorityWeight, setPriorityWeight] = useState([40]);
  const [capacityWeight, setCapacityWeight] = useState([50]);
  const [waitTimeWeight, setWaitTimeWeight] = useState([70]);
  const [costWeight, setCostWeight] = useState([30]);

  const [algorithmType, setAlgorithmType] = useState("hybrid");
  const [recalcInterval, setRecalcInterval] = useState("5min");
  const [maxVehicles, setMaxVehicles] = useState("3");
  const [queueThreshold, setQueueThreshold] = useState("80");

  const [predictiveRouting, setPredictiveRouting] = useState(true);
  const [autoRebalancing, setAutoRebalancing] = useState(true);
  const [experimentalFeatures, setExperimentalFeatures] = useState(false);

  const [activeTab, setActiveTab] = useState("algorithm");

  const tabs = [
    { id: "algorithm", label: "Algorithm" },
    { id: "hubs", label: "Hubs" },
    { id: "vehicles", label: "Vehicles" },
    { id: "users", label: "Users" },
    { id: "alerts", label: "Alerts" },
    { id: "api", label: "API" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <TopNavigation />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8" style={{ color: "#1A237E" }} />
          <h1 className="text-3xl font-bold" style={{ color: "#263238" }}>
            System Configuration
          </h1>
        </div>

        {/* Tab Bar */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b" style={{ borderColor: "#E0E0E0" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-4 font-medium transition-colors relative"
                style={{
                  color: activeTab === tab.id ? "#1A237E" : "#546E7A",
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#1A237E" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Tab Content */}
        {activeTab === "algorithm" && (
          <div className="space-y-6">
            {/* Optimization Algorithm Parameters */}
            <Card className="p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6" style={{ color: "#263238" }}>
                Optimization Algorithm Parameters
              </h2>

              <div className="space-y-8">
                {/* Distance Weight */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Distance Weight
                    </Label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#1A237E" }}
                    >
                      {distanceWeight[0]}%
                    </span>
                  </div>
                  <Slider
                    value={distanceWeight}
                    onValueChange={setDistanceWeight}
                    max={100}
                    step={5}
                    className="w-full [&_[data-slot=slider-range]]:bg-[#1A237E] [&_[data-slot=slider-thumb]]:border-[#1A237E]"
                  />
                </div>

                {/* Priority Weight */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Priority
                    </Label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#1A237E" }}
                    >
                      {priorityWeight[0]}%
                    </span>
                  </div>
                  <Slider
                    value={priorityWeight}
                    onValueChange={setPriorityWeight}
                    max={100}
                    step={5}
                    className="w-full [&_[data-slot=slider-range]]:bg-[#1A237E] [&_[data-slot=slider-thumb]]:border-[#1A237E]"
                  />
                </div>

                {/* Capacity Weight */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Capacity
                    </Label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#1A237E" }}
                    >
                      {capacityWeight[0]}%
                    </span>
                  </div>
                  <Slider
                    value={capacityWeight}
                    onValueChange={setCapacityWeight}
                    max={100}
                    step={5}
                    className="w-full [&_[data-slot=slider-range]]:bg-[#1A237E] [&_[data-slot=slider-thumb]]:border-[#1A237E]"
                  />
                </div>

                {/* Wait Time Weight */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Wait Time
                    </Label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#1A237E" }}
                    >
                      {waitTimeWeight[0]}%
                    </span>
                  </div>
                  <Slider
                    value={waitTimeWeight}
                    onValueChange={setWaitTimeWeight}
                    max={100}
                    step={5}
                    className="w-full [&_[data-slot=slider-range]]:bg-[#1A237E] [&_[data-slot=slider-thumb]]:border-[#1A237E]"
                  />
                </div>

                {/* Cost Weight */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Cost
                    </Label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#1A237E" }}
                    >
                      {costWeight[0]}%
                    </span>
                  </div>
                  <Slider
                    value={costWeight}
                    onValueChange={setCostWeight}
                    max={100}
                    step={5}
                    className="w-full [&_[data-slot=slider-range]]:bg-[#1A237E] [&_[data-slot=slider-thumb]]:border-[#1A237E]"
                  />
                </div>
              </div>
            </Card>

            {/* Algorithm Type */}
            <Card className="p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6" style={{ color: "#263238" }}>
                Algorithm Type
              </h2>

              <RadioGroup value={algorithmType} onValueChange={setAlgorithmType}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                    style={{ borderColor: algorithmType === "greedy" ? "#1A237E" : "#E0E0E0" }}
                  >
                    <RadioGroupItem value="greedy" id="greedy" />
                    <Label htmlFor="greedy" className="flex-1 cursor-pointer font-medium">
                      Greedy
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                    style={{ borderColor: algorithmType === "hybrid" ? "#1A237E" : "#E0E0E0" }}
                  >
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid" className="flex-1 cursor-pointer font-medium">
                      Hybrid A* + Genetic
                    </Label>
                    <Badge
                      className="text-xs px-2 py-1"
                      style={{ backgroundColor: "#2E7D32", color: "white" }}
                    >
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                    style={{ borderColor: algorithmType === "neural" ? "#1A237E" : "#E0E0E0" }}
                  >
                    <RadioGroupItem value="neural" id="neural" />
                    <Label htmlFor="neural" className="flex-1 cursor-pointer font-medium">
                      Neural Network
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Additional Settings */}
            <Card className="p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6" style={{ color: "#263238" }}>
                Additional Settings
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Recalculation Interval */}
                <div>
                  <Label className="text-base font-medium mb-3 block" style={{ color: "#263238" }}>
                    Recalculation Interval
                  </Label>
                  <Select value={recalcInterval} onValueChange={setRecalcInterval}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1min">1 minute</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="10min">10 minutes</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Vehicles per Route */}
                <div>
                  <Label className="text-base font-medium mb-3 block" style={{ color: "#263238" }}>
                    Max Vehicles per Route
                  </Label>
                  <Select value={maxVehicles} onValueChange={setMaxVehicles}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 vehicle</SelectItem>
                      <SelectItem value="2">2 vehicles</SelectItem>
                      <SelectItem value="3">3 vehicles</SelectItem>
                      <SelectItem value="5">5 vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Queue Threshold Alert */}
                <div>
                  <Label className="text-base font-medium mb-3 block" style={{ color: "#263238" }}>
                    Queue Threshold Alert
                  </Label>
                  <Select value={queueThreshold} onValueChange={setQueueThreshold}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Toggle Switches */}
            <Card className="p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6" style={{ color: "#263238" }}>
                Feature Toggles
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#E0E0E0" }}>
                  <div>
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Enable predictive routing
                    </Label>
                    <p className="text-sm mt-1" style={{ color: "#546E7A" }}>
                      Use AI to predict traffic and optimize routes
                    </p>
                  </div>
                  <Switch checked={predictiveRouting} onCheckedChange={setPredictiveRouting} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#E0E0E0" }}>
                  <div>
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Enable auto-rebalancing
                    </Label>
                    <p className="text-sm mt-1" style={{ color: "#546E7A" }}>
                      Automatically redistribute vehicles across hubs
                    </p>
                  </div>
                  <Switch checked={autoRebalancing} onCheckedChange={setAutoRebalancing} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#E0E0E0" }}>
                  <div>
                    <Label className="text-base font-medium" style={{ color: "#263238" }}>
                      Enable experimental features
                    </Label>
                    <p className="text-sm mt-1" style={{ color: "#546E7A" }}>
                      Beta features that may be unstable
                    </p>
                  </div>
                  <Switch checked={experimentalFeatures} onCheckedChange={setExperimentalFeatures} />
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-lg font-medium"
                style={{ borderColor: "#546E7A", color: "#546E7A" }}
              >
                Reset to Defaults
              </Button>
              <Button
                className="h-12 px-8 rounded-lg text-white font-medium"
                style={{ backgroundColor: "#1A237E" }}
              >
                Save Configuration
              </Button>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "algorithm" && (
          <Card className="p-12 rounded-xl shadow-md text-center">
            <p className="text-lg" style={{ color: "#546E7A" }}>
              {tabs.find((t) => t.id === activeTab)?.label} settings coming soon
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { FleetTracking } from "./screens/FleetTracking";
import { QueueManagement } from "./screens/QueueManagement";
import { UssdSimulator } from "./screens/UssdSimulator";
import { DispatchConsole } from "./screens/DispatchConsole";
import { SystemConfiguration } from "./screens/SystemConfiguration";
import { AgentTaskView } from "./screens/AgentTaskView";
import { Reports } from "./screens/Reports";

export const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/dashboard", Component: Dashboard },
  { path: "/fleet", Component: FleetTracking },
  { path: "/queue", Component: QueueManagement },
  { path: "/ussd", Component: UssdSimulator },
  { path: "/dispatch", Component: DispatchConsole },
  { path: "/settings", Component: SystemConfiguration },
  { path: "/agent-tasks", Component: AgentTaskView },
  { path: "/reports", Component: Reports },
  { path: "/logout", element: <Navigate to="/" replace /> },
]);
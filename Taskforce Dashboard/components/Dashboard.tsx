import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, UserCheck, Stethoscope, Activity } from "lucide-react";
import { malaysianStatesData, getTotalStats } from "../data/malaysianStates";

export function Dashboard() {
  const totalStats = getTotalStats();
  const averageStaffPer1000 = (totalStats.totalStaff / totalStats.totalPopulation * 1000).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl mb-2">Healthcare Staff Distribution Dashboard</h1>
        <p className="text-muted-foreground">Distribution of healthcare staff across Malaysian states</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Healthcare Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalStaff.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {averageStaffPer1000} per 1,000 population
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalDoctors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalStats.totalDoctors / totalStats.totalStaff) * 100).toFixed(1)}% of total staff
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Nurses</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalNurses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalStats.totalNurses / totalStats.totalStaff) * 100).toFixed(1)}% of total staff
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Specialists</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalSpecialists.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalStats.totalSpecialists / totalStats.totalStaff) * 100).toFixed(1)}% of total staff
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing States */}
      <Card>
        <CardHeader>
          <CardTitle>Top States by Staff-to-Population Ratio</CardTitle>
          <CardDescription>States with highest healthcare staff per 1,000 population</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {malaysianStatesData
              .sort((a, b) => b.staffPer1000 - a.staffPer1000)
              .slice(0, 5)
              .map((state, index) => (
                <div key={state.code} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-8 h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{state.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {state.totalStaff.toLocaleString()} total staff
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{state.staffPer1000}</p>
                    <p className="text-xs text-muted-foreground">per 1,000</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
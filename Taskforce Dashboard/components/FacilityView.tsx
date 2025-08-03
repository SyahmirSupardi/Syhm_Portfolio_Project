import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Building2, Users, TrendingDown, TrendingUp } from "lucide-react";
import { departmentData, staffCategories } from "../data/taskforceData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface FacilityViewProps {
  facilityId: string;
}

export function FacilityView({ facilityId }: FacilityViewProps) {
  // Find facility across all departments and states
  let facility = null;
  let departmentName = '';
  
  for (const [deptId, dept] of Object.entries(departmentData)) {
    for (const [stateCode, facilities] of Object.entries(dept.facilities)) {
      const found = facilities.find(f => f.id === facilityId);
      if (found) {
        facility = found;
        departmentName = dept.name;
        break;
      }
    }
    if (facility) break;
  }

  if (!facility) {
    return <div>Facility not found</div>;
  }

  // Prepare chart data
  const staffData = staffCategories.map(category => ({
    name: category.name,
    current: facility.currentStaff[category.id as keyof typeof facility.currentStaff] || 0,
    required: facility.requiredStaff[category.id as keyof typeof facility.requiredStaff] || 0,
    gap: facility.gap[category.id as keyof typeof facility.gap] || 0,
    fill: category.color
  }));

  const fillRateData = staffData.map(item => ({
    name: item.name,
    fillRate: item.required > 0 ? (item.current / item.required) * 100 : 0,
    fill: item.fill
  }));

  const overallFillRate = facility.totalRequired > 0 ? 
    (facility.totalCurrent / facility.totalRequired) * 100 : 0;

  const getStatusColor = (fillRate: number) => {
    if (fillRate >= 90) return 'text-green-600';
    if (fillRate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Facility Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">{facility.name}</CardTitle>
                <p className="text-muted-foreground">{departmentName}</p>
              </div>
            </div>
            <Badge variant={overallFillRate >= 90 ? "default" : overallFillRate >= 70 ? "secondary" : "destructive"}>
              {facility.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{facility.totalCurrent}</div>
              <div className="text-sm text-muted-foreground">Keseluruhan Semasa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{facility.totalRequired}</div>
              <div className="text-sm text-muted-foreground">Jumlah Keperluan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{facility.totalGap}</div>
              <div className="text-sm text-muted-foreground">Jurang Perbezaan</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getStatusColor(overallFillRate)}`}>
                {overallFillRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Kadar Pengisian</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Keseluruhan Pengisian Staf</span>
              <span>{facility.totalCurrent}/{facility.totalRequired}</span>
            </div>
            <Progress value={overallFillRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Staff Categories Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {staffData.map((staff) => {
          const fillRate = staff.required > 0 ? (staff.current / staff.required) * 100 : 0;
          
          return (
            <Card key={staff.name}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{staff.name}</span>
                  <Badge 
                    variant={fillRate >= 90 ? "default" : fillRate >= 70 ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {fillRate.toFixed(0)}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="font-semibold text-blue-600">{staff.current}</div>
                    <div className="text-muted-foreground">Semasa</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600">{staff.required}</div>
                    <div className="text-muted-foreground">Keperluan</div>
                  </div>
                  <div>
                    <div className={`font-semibold ${staff.gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {staff.gap > 0 ? '-' : '+'}{Math.abs(staff.gap)}
                    </div>
                    <div className="text-muted-foreground">Jurang</div>
                  </div>
                </div>
                
                <Progress value={fillRate} className="h-2" />
                
                {staff.gap > 0 && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    <span>Kekurangan {staff.gap} orang</span>
                  </div>
                )}
                
                {staff.gap < 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Lebihan {Math.abs(staff.gap)} orang</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Taburan Staf Mengikut Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" name="Semasa" fill="#3b82f6" />
                <Bar dataKey="required" name="Keperluan" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fill Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Kadar Pengisian Mengikut Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fillRateData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, fillRate }) => `${name}: ${fillRate.toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="fillRate"
                >
                  {fillRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Kadar Pengisian']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Cadangan Tindakan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {staffData
              .filter(staff => staff.gap > 0)
              .sort((a, b) => b.gap - a.gap)
              .map(staff => (
                <div key={staff.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <div className="font-medium text-red-800">{staff.name}</div>
                    <div className="text-sm text-red-600">Kekurangan {staff.gap} orang staf</div>
                  </div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    Prioriti Tinggi
                  </Badge>
                </div>
              ))}
            
            {staffData.every(staff => staff.gap <= 0) && (
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-green-800 font-medium">Kemudahan ini mempunyai keperluan staf yang mencukupi</div>
                <div className="text-sm text-green-600 mt-1">Semua kategori staf telah dipenuhi</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
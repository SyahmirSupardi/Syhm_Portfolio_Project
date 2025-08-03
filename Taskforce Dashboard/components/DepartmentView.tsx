import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { MapPin, Users, AlertTriangle } from "lucide-react";
import { departmentData, stateData, malaysianStates } from "../data/taskforceData";

interface DepartmentViewProps {
  departmentId: string;
  onStateSelect: (stateCode: string) => void;
}

export function DepartmentView({ departmentId, onStateSelect }: DepartmentViewProps) {
  const department = departmentData[departmentId];
  
  if (!department) {
    return <div>Department not found</div>;
  }

  const statesWithData = malaysianStates.map(state => {
    const facilities = department.facilities[state.code] || [];
    const totalCurrent = facilities.reduce((sum, facility) => sum + facility.totalCurrent, 0);
    const totalRequired = facilities.reduce((sum, facility) => sum + facility.totalRequired, 0);
    const gap = totalRequired - totalCurrent;
    const fillRate = totalRequired > 0 ? (totalCurrent / totalRequired) * 100 : 0;
    
    return {
      ...state,
      totalCurrent,
      totalRequired,
      gap,
      fillRate,
      facilitiesCount: facilities.length,
      status: fillRate >= 90 ? 'good' : fillRate >= 70 ? 'warning' : 'critical'
    };
  }).sort((a, b) => b.totalCurrent - a.totalCurrent);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Baik</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sederhana</Badge>;
      case 'critical': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Kritikal</Badge>;
      default: return <Badge variant="outline">-</Badge>;
    }
  };

  const overallStats = {
    totalCurrent: statesWithData.reduce((sum, state) => sum + state.totalCurrent, 0),
    totalRequired: statesWithData.reduce((sum, state) => sum + state.totalRequired, 0),
    totalFacilities: statesWithData.reduce((sum, state) => sum + state.facilitiesCount, 0)
  };

  const overallFillRate = overallStats.totalRequired > 0 ? 
    (overallStats.totalCurrent / overallStats.totalRequired) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Department Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{department.name}</h1>
        <p className="text-lg text-gray-600">Taburan staf {department.name.toLowerCase()} mengikut negeri</p>
      </div>

      {/* Department Overview Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 text-center">Ringkasan Keseluruhan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{overallStats.totalCurrent.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Staf Semasa</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-green-600 mb-2">{overallStats.totalRequired.toLocaleString()}</div>
              <div className="text-sm text-green-700">Keperluan</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-red-600 mb-2">{(overallStats.totalRequired - overallStats.totalCurrent).toLocaleString()}</div>
              <div className="text-sm text-red-700">Jurang</div>
            </div>
            <div className="text-center bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">{overallFillRate.toFixed(1)}%</div>
              <div className="text-sm text-purple-700">Kadar Pengisian</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-2xl text-center">Ringkasan Status - {department.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {statesWithData.filter(s => s.status === 'good').length}
              </div>
              <div className="text-green-700 font-medium">Negeri Status Baik</div>
              <div className="text-sm text-green-600 mt-1">≥90% pengisian</div>
            </div>
            <div className="text-center bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {statesWithData.filter(s => s.status === 'warning').length}
              </div>
              <div className="text-yellow-700 font-medium">Negeri Status Sederhana</div>
              <div className="text-sm text-yellow-600 mt-1">70-89% pengisian</div>
            </div>
            <div className="text-center bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {statesWithData.filter(s => s.status === 'critical').length}
              </div>
              <div className="text-red-700 font-medium">Negeri Status Kritikal</div>
              <div className="text-sm text-red-600 mt-1">&lt;70% pengisian</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* States Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pilih Negeri untuk Analisis Terperinci</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statesWithData.map((state) => (
            <Card 
              key={state.code} 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300"
              onClick={() => onStateSelect(state.code)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{state.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">{state.code}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(state.status)}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(state.status)}`}></div>
                    <span className="font-medium">{state.fillRate.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pengisian Staf</span>
                    <span className="font-medium">{state.totalCurrent}/{state.totalRequired}</span>
                  </div>
                  <Progress value={state.fillRate} className="h-3" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-600">{state.totalCurrent}</div>
                    <div className="text-blue-700">Semasa</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="font-semibold text-red-600">{state.gap}</div>
                    <div className="text-red-700">Jurang</div>
                  </div>
                </div>

                {/* Facilities Count */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 p-2 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span>{state.facilitiesCount} Kemudahan</span>
                </div>

                {/* Warning for critical states */}
                {state.status === 'critical' && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Memerlukan perhatian segera</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      
    </div>
  );
}
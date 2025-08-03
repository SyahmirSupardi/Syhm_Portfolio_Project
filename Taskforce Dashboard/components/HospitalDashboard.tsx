import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Users, TrendingUp, TrendingDown, Activity, ChevronDown, BarChart3 } from "lucide-react";
import { FloatingNavigation } from "./FloatingNavigation";
import { getOverallKPIs, departments } from "../data/taskforceData";

interface HospitalDashboardProps {
  onDepartmentSelect: (departmentId: string) => void;
}

export function HospitalDashboard({ onDepartmentSelect }: HospitalDashboardProps) {
  const kpis = getOverallKPIs();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationSections = [
    { id: 'kpi-section', label: 'KPI Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'departments-section', label: 'Jabatan', icon: <Activity className="w-4 h-4" /> }
  ];

  const getDepartmentIcon = (deptId: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'general-medicine': '🏥',
      'radiology': '📷',
      'emergency': '🚨',
      'anesthesiology': '💉',
      'pathology': '🔬',
      'orthopedic': '🦴',
      'surgery': '⚕️',
      'pediatric': '👶',
      'obstetrics': '🤱',
      'ent': '👂',
      'ophthalmology': '👁️',
      'psychiatry': '🧠'
    };
    return icons[deptId] || '🏥';
  };

  return (
    <>
      <FloatingNavigation sections={navigationSections} />
      
      <div className="space-y-8">
        {/* Page Header with Navigation */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Dashboard Hospital</h1>
          <p className="text-lg text-gray-600 mb-6">Analisis taburan staf mengikut jabatan dan negeri</p>
          
          {/* Section Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('kpi-section')}
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
            >
              <BarChart3 className="w-4 h-4" />
              KPI Overview
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('departments-section')}
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
            >
              <Activity className="w-4 h-4" />
              Jabatan Hospital
            </Button>
          </div>
        </div>

        {/* KPI Section */}
        <div id="kpi-section" className="scroll-mt-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Key Performance Indicators</h2>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Big KPI Card */}
            <Card className="lg:col-span-1 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-800">Keseluruhan Semasa Jawatan</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {kpis.totalCurrent.toLocaleString()}
                </div>
                <div className="text-sm text-blue-700 mb-6">Jumlah Staf Semasa</div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Keperluan</div>
                      <div className="text-xl font-semibold text-green-600">{kpis.totalRequired.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Gap</div>
                      <div className="text-xl font-semibold text-red-600">{kpis.totalGap.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medium KPI Cards */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-green-800">Jumlah Tertinggi</CardTitle>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{kpis.highest.toLocaleString()}</div>
                <p className="text-xs text-green-700 mb-4">Negeri dengan staf terbanyak</p>
                
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-600">Purata Keseluruhan</div>
                  <div className="text-lg font-medium text-gray-800">{kpis.averageStaffing.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-red-800">Jumlah Terendah</CardTitle>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">{kpis.lowest.toLocaleString()}</div>
                <p className="text-xs text-red-700 mb-4">Negeri dengan staf terendah</p>
                
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="text-sm text-gray-600">Perbezaan dari Purata</div>
                  <div className="text-lg font-medium text-red-600">
                    -{(kpis.averageStaffing - kpis.lowest).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigate to Departments Button */}
          <div className="text-center">
            <Button 
              onClick={() => scrollToSection('departments-section')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-2">Lihat Jabatan Hospital</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Departments Section */}
        <div id="departments-section" className="scroll-mt-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Jabatan Hospital</h2>
            </div>
          </div>

          {/* Department Buttons */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3 justify-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                Pilih Jabatan untuk Analisis Terperinci
              </CardTitle>
              <p className="text-muted-foreground text-center">
                Klik pada jabatan di bawah untuk melihat taburan staf mengikut negeri
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {departments.map((department) => (
                  <Button
                    key={department.id}
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 hover:border-blue-300 hover:bg-blue-50"
                    onClick={() => onDepartmentSelect(department.id)}
                  >
                    <span className="text-3xl">{getDepartmentIcon(department.id)}</span>
                    <span className="text-sm text-center leading-tight font-medium">{department.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigate Back to KPIs Button */}
          <div className="text-center mt-6">
            <Button 
              variant="outline"
              onClick={() => scrollToSection('kpi-section')}
              className="border-blue-300 text-blue-600 hover:bg-blue-50 px-6 py-2"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Kembali ke KPI Overview
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{departments.length}</div>
              <div className="text-sm text-blue-700">Jabatan Hospital</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">16</div>
              <div className="text-sm text-green-700">Negeri & Wilayah</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {((kpis.totalCurrent / kpis.totalRequired) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-orange-700">Kadar Pengisian</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-sm text-purple-700">Kategori Skim</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
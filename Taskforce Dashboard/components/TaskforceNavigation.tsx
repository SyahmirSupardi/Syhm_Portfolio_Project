import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronLeft, Home, Building2, Users } from "lucide-react";
import { TopNavbar } from "./TopNavbar";
import { HospitalDashboard } from "./HospitalDashboard";
import { DepartmentView } from "./DepartmentView";
import { StateView } from "./StateView";
import { FacilityView } from "./FacilityView";

type ViewType = 'main' | 'jkn' | 'hospital' | 'department' | 'state' | 'facility';

interface NavigationState {
  view: ViewType;
  selectedDepartment?: string;
  selectedState?: string;
  selectedFacility?: string;
}

export function TaskforceNavigation() {
  const [navState, setNavState] = useState<NavigationState>({ view: 'main' });

  const navigateTo = (newState: Partial<NavigationState>) => {
    setNavState(prev => ({ ...prev, ...newState }));
  };

  const goBack = () => {
    switch (navState.view) {
      case 'facility':
        setNavState(prev => ({ ...prev, view: 'state', selectedFacility: undefined }));
        break;
      case 'state':
        setNavState(prev => ({ ...prev, view: 'department', selectedState: undefined }));
        break;
      case 'department':
        setNavState(prev => ({ ...prev, view: 'hospital', selectedDepartment: undefined }));
        break;
      case 'hospital':
        setNavState(prev => ({ ...prev, view: 'jkn' }));
        break;
      case 'jkn':
        setNavState(prev => ({ ...prev, view: 'main' }));
        break;
      default:
        break;
    }
  };

  const getBreadcrumb = () => {
    const parts = ['Taskforce Dashboard'];
    
    if (navState.view !== 'main') {
      parts.push('JKN');
    }
    
    if (['hospital', 'department', 'state', 'facility'].includes(navState.view)) {
      parts.push('Hospital');
    }
    
    if (['department', 'state', 'facility'].includes(navState.view) && navState.selectedDepartment) {
      const deptName = getDepartmentName(navState.selectedDepartment);
      parts.push(deptName);
    }
    
    if (['state', 'facility'].includes(navState.view) && navState.selectedState) {
      const stateName = getStateName(navState.selectedState);
      parts.push(stateName);
    }
    
    if (navState.view === 'facility' && navState.selectedFacility) {
      parts.push('Facility Details');
    }
    
    return parts.join(' > ');
  };

  const getDepartmentName = (deptId: string) => {
    const departments = [
      { id: 'general-medicine', name: 'Perubatan Am' },
      { id: 'radiology', name: 'Radiologi' },
      { id: 'emergency', name: 'Kecemasan dan Trauma' },
      { id: 'anesthesiology', name: 'Anestesiologi' },
      { id: 'pathology', name: 'Patologi' },
      { id: 'orthopedic', name: 'Ortopedik' },
      { id: 'surgery', name: 'Pembedahan Am' },
      { id: 'pediatric', name: 'Pediatrik' },
      { id: 'obstetrics', name: 'Obstetrik dan Ginekologi' },
      { id: 'ent', name: 'Otorinolaringologi (ENT)' },
      { id: 'ophthalmology', name: 'Oftalmologi' },
      { id: 'psychiatry', name: 'Psikiatri' }
    ];
    return departments.find(d => d.id === deptId)?.name || deptId;
  };

  const getStateName = (stateCode: string) => {
    const states = [
      { code: 'JHR', name: 'Johor' }, { code: 'KDH', name: 'Kedah' },
      { code: 'KTN', name: 'Kelantan' }, { code: 'MLK', name: 'Melaka' },
      { code: 'NSN', name: 'Negeri Sembilan' }, { code: 'PHG', name: 'Pahang' },
      { code: 'PRK', name: 'Perak' }, { code: 'PLS', name: 'Perlis' },
      { code: 'PNG', name: 'Pulau Pinang' }, { code: 'SBH', name: 'Sabah' },
      { code: 'SWK', name: 'Sarawak' }, { code: 'SGR', name: 'Selangor' },
      { code: 'TRG', name: 'Terengganu' }, { code: 'KUL', name: 'Kuala Lumpur' },
      { code: 'LBN', name: 'Labuan' }, { code: 'PJY', name: 'Putrajaya' }
    ];
    return states.find(s => s.code === stateCode)?.name || stateCode;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header - Only show for non-main pages */}
        {navState.view !== 'main' && (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              {navState.view !== 'main' && (
                <Button variant="outline" size="sm" onClick={goBack}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-3xl mb-1">Taskforce Dashboard</h1>
                <p className="text-muted-foreground">{getBreadcrumb()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {navState.view === 'main' && (
          <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
            {/* Centered Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">Taskforce Dashboard</h1>
              <p className="text-xl text-gray-600 mb-2">Sistem Pengurusan Taburan Tenaga Kerja Kesihatan</p>
              <p className="text-lg text-gray-500">Kementerian Kesihatan Malaysia</p>
            </div>

            {/* Main Menu Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card 
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200" 
                onClick={() => navigateTo({ view: 'jkn' })}
              >
                <CardHeader className="text-center py-12">
                  <div className="mx-auto mb-6 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl mb-3">JKN</CardTitle>
                  <p className="text-lg text-muted-foreground">Jabatan Kesihatan Negeri</p>
                </CardHeader>
                <CardContent className="text-center pb-12">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Pengurusan taburan staf kesihatan untuk hospital dan pejabat kesihatan daerah di seluruh Malaysia
                  </p>
                  <div className="mt-6">
                    <Button size="lg" className="px-8 py-3">
                      Masuk ke JKN
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-green-200 opacity-75">
                <CardHeader className="text-center py-12">
                  <div className="mx-auto mb-6 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl mb-3">IPKKM</CardTitle>
                  <p className="text-lg text-muted-foreground">Institut Perubatan Kuala Lumpur</p>
                </CardHeader>
                <CardContent className="text-center pb-12">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Pengurusan dan taburan staf perubatan untuk institut dan pusat latihan kesihatan
                  </p>
                  <div className="mt-6">
                    <Button size="lg" variant="outline" className="px-8 py-3" disabled>
                      Akan Datang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer Info */}
            <div className="mt-16 text-center text-gray-500">
              <p className="text-sm">© 2024 Kementerian Kesihatan Malaysia. Hak Cipta Terpelihara.</p>
            </div>
          </div>
        )}

        {navState.view === 'jkn' && (
          <div className="space-y-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Jabatan Kesihatan Negeri</h1>
              <p className="text-lg text-gray-600">Pilih kategori kemudahan kesihatan untuk pengurusan staf</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" 
                onClick={() => navigateTo({ view: 'hospital' })}
              >
                <CardHeader className="text-center py-8">
                  <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">Hospital</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-muted-foreground mb-4">
                    Taburan staf hospital mengikut jabatan dan kepakaran
                  </p>
                  <Button className="w-full">
                    Lihat Hospital
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 opacity-75">
                <CardHeader className="text-center py-8">
                  <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Home className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">Pejabat Kesihatan Daerah</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-muted-foreground mb-4">
                    Pengurusan staf pejabat kesihatan daerah dan klinik
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Akan Datang
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {navState.view === 'hospital' && (
          <HospitalDashboard onDepartmentSelect={(deptId) => navigateTo({ view: 'department', selectedDepartment: deptId })} />
        )}

        {navState.view === 'department' && navState.selectedDepartment && (
          <DepartmentView 
            departmentId={navState.selectedDepartment}
            onStateSelect={(stateCode) => navigateTo({ view: 'state', selectedState: stateCode })}
          />
        )}

        {navState.view === 'state' && navState.selectedDepartment && navState.selectedState && (
          <StateView
            departmentId={navState.selectedDepartment}
            stateCode={navState.selectedState}
            onFacilitySelect={(facilityId) => navigateTo({ view: 'facility', selectedFacility: facilityId })}
          />
        )}

        {navState.view === 'facility' && navState.selectedFacility && (
          <FacilityView facilityId={navState.selectedFacility} />
        )}
      </div>
    </div>
  );
}
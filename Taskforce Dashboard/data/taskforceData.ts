export interface StaffCategory {
  pakarPerubatan: number;
  jururawat: number;
  pegawaiPerubatan: number;
  jururawatPakar: number;
  pembantuPerubatan: number;
  pegawaiKesihatan: number;
}

export interface FacilityData {
  id: string;
  name: string;
  type: 'Hospital' | 'Klinik' | 'Pusat Kesihatan';
  currentStaff: StaffCategory;
  requiredStaff: StaffCategory;
  gap: StaffCategory;
  totalCurrent: number;
  totalRequired: number;
  totalGap: number;
}

export interface DepartmentData {
  id: string;
  name: string;
  totalStaff: number;
  facilities: { [stateCode: string]: FacilityData[] };
}

export interface StateStaffData {
  stateCode: string;
  stateName: string;
  totalCurrent: number;
  totalRequired: number;
  totalGap: number;
  departments: { [deptId: string]: number };
}

export const departments = [
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

export const staffCategories = [
  { id: 'pakarPerubatan', name: 'Pakar Perubatan', color: '#0088FE' },
  { id: 'jururawat', name: 'Jururawat', color: '#00C49F' },
  { id: 'pegawaiPerubatan', name: 'Pegawai Perubatan', color: '#FFBB28' },
  { id: 'jururawatPakar', name: 'Jururawat Pakar', color: '#FF8042' },
  { id: 'pembantuPerubatan', name: 'Pembantu Perubatan', color: '#8884D8' },
  { id: 'pegawaiKesihatan', name: 'Pegawai Kesihatan', color: '#82CA9D' }
];

export const malaysianStates = [
  { code: 'JHR', name: 'Johor' },
  { code: 'KDH', name: 'Kedah' },
  { code: 'KTN', name: 'Kelantan' },
  { code: 'MLK', name: 'Melaka' },
  { code: 'NSN', name: 'Negeri Sembilan' },
  { code: 'PHG', name: 'Pahang' },
  { code: 'PRK', name: 'Perak' },
  { code: 'PLS', name: 'Perlis' },
  { code: 'PNG', name: 'Pulau Pinang' },
  { code: 'SBH', name: 'Sabah' },
  { code: 'SWK', name: 'Sarawak' },
  { code: 'SGR', name: 'Selangor' },
  { code: 'TRG', name: 'Terengganu' },
  { code: 'KUL', name: 'Kuala Lumpur' },
  { code: 'LBN', name: 'Labuan' },
  { code: 'PJY', name: 'Putrajaya' }
];

// Generate mock data for facilities
const generateMockFacilities = (stateCode: string, deptId: string): FacilityData[] => {
  const facilityCount = Math.floor(Math.random() * 5) + 2;
  const facilities: FacilityData[] = [];
  
  for (let i = 0; i < facilityCount; i++) {
    const current: StaffCategory = {
      pakarPerubatan: Math.floor(Math.random() * 20) + 5,
      jururawat: Math.floor(Math.random() * 50) + 20,
      pegawaiPerubatan: Math.floor(Math.random() * 15) + 8,
      jururawatPakar: Math.floor(Math.random() * 12) + 3,
      pembantuPerubatan: Math.floor(Math.random() * 25) + 10,
      pegawaiKesihatan: Math.floor(Math.random() * 18) + 7
    };
    
    const required: StaffCategory = {
      pakarPerubatan: current.pakarPerubatan + Math.floor(Math.random() * 10),
      jururawat: current.jururawat + Math.floor(Math.random() * 20),
      pegawaiPerubatan: current.pegawaiPerubatan + Math.floor(Math.random() * 8),
      jururawatPakar: current.jururawatPakar + Math.floor(Math.random() * 6),
      pembantuPerubatan: current.pembantuPerubatan + Math.floor(Math.random() * 12),
      pegawaiKesihatan: current.pegawaiKesihatan + Math.floor(Math.random() * 9)
    };
    
    const gap: StaffCategory = {
      pakarPerubatan: required.pakarPerubatan - current.pakarPerubatan,
      jururawat: required.jururawat - current.jururawat,
      pegawaiPerubatan: required.pegawaiPerubatan - current.pegawaiPerubatan,
      jururawatPakar: required.jururawatPakar - current.jururawatPakar,
      pembantuPerubatan: required.pembantuPerubatan - current.pembantuPerubatan,
      pegawaiKesihatan: required.pegawaiKesihatan - current.pegawaiKesihatan
    };
    
    const totalCurrent = Object.values(current).reduce((sum, val) => sum + val, 0);
    const totalRequired = Object.values(required).reduce((sum, val) => sum + val, 0);
    const totalGap = totalRequired - totalCurrent;
    
    facilities.push({
      id: `${stateCode}-${deptId}-${i + 1}`,
      name: `${getStateName(stateCode)} ${getHospitalName(deptId)} ${i + 1}`,
      type: i === 0 ? 'Hospital' : Math.random() > 0.5 ? 'Klinik' : 'Pusat Kesihatan',
      currentStaff: current,
      requiredStaff: required,
      gap,
      totalCurrent,
      totalRequired,
      totalGap
    });
  }
  
  return facilities;
};

const getStateName = (code: string): string => {
  return malaysianStates.find(state => state.code === code)?.name || code;
};

const getHospitalName = (deptId: string): string => {
  const names = ['Hospital Umum', 'Hospital Pakar', 'Pusat Perubatan', 'Hospital Daerah'];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate comprehensive department data
export const departmentData: { [deptId: string]: DepartmentData } = {};

departments.forEach(dept => {
  const facilities: { [stateCode: string]: FacilityData[] } = {};
  let totalStaff = 0;
  
  malaysianStates.forEach(state => {
    const stateFacilities = generateMockFacilities(state.code, dept.id);
    facilities[state.code] = stateFacilities;
    totalStaff += stateFacilities.reduce((sum, facility) => sum + facility.totalCurrent, 0);
  });
  
  departmentData[dept.id] = {
    id: dept.id,
    name: dept.name,
    totalStaff,
    facilities
  };
});

// Generate state summary data
export const stateData: { [stateCode: string]: StateStaffData } = {};

malaysianStates.forEach(state => {
  let totalCurrent = 0;
  let totalRequired = 0;
  const deptData: { [deptId: string]: number } = {};
  
  departments.forEach(dept => {
    const facilities = departmentData[dept.id].facilities[state.code] || [];
    const deptCurrent = facilities.reduce((sum, facility) => sum + facility.totalCurrent, 0);
    deptData[dept.id] = deptCurrent;
    totalCurrent += deptCurrent;
    totalRequired += facilities.reduce((sum, facility) => sum + facility.totalRequired, 0);
  });
  
  stateData[state.code] = {
    stateCode: state.code,
    stateName: state.name,
    totalCurrent,
    totalRequired,
    totalGap: totalRequired - totalCurrent,
    departments: deptData
  };
});

// Calculate overall KPIs
export const getOverallKPIs = () => {
  const states = Object.values(stateData);
  const totalCurrent = states.reduce((sum, state) => sum + state.totalCurrent, 0);
  const totalRequired = states.reduce((sum, state) => sum + state.totalRequired, 0);
  const highest = Math.max(...states.map(state => state.totalCurrent));
  const lowest = Math.min(...states.map(state => state.totalCurrent));
  
  return {
    totalCurrent,
    totalRequired,
    totalGap: totalRequired - totalCurrent,
    highest,
    lowest,
    averageStaffing: Math.round(totalCurrent / states.length)
  };
};
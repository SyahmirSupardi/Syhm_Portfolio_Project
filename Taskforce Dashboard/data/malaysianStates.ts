export interface HealthcareStaff {
  doctors: number;
  nurses: number;
  specialists: number;
  technicians: number;
  support: number;
}

export interface StateData {
  code: string;
  name: string;
  population: number;
  staff: HealthcareStaff;
  totalStaff: number;
  staffPer1000: number;
}

export const malaysianStatesData: StateData[] = [
  {
    code: "JHR",
    name: "Johor",
    population: 3781000,
    staff: { doctors: 2850, nurses: 8950, specialists: 1250, technicians: 1850, support: 2100 },
    totalStaff: 17000,
    staffPer1000: 4.5
  },
  {
    code: "KDH",
    name: "Kedah",
    population: 2178000,
    staff: { doctors: 1680, nurses: 5280, specialists: 720, technicians: 1080, support: 1240 },
    totalStaff: 10000,
    staffPer1000: 4.6
  },
  {
    code: "KTN",
    name: "Kelantan",
    population: 1906000,
    staff: { doctors: 1430, nurses: 4490, specialists: 570, technicians: 860, support: 1150 },
    totalStaff: 8500,
    staffPer1000: 4.5
  },
  {
    code: "MLK",
    name: "Melaka",
    population: 932000,
    staff: { doctors: 780, nurses: 2450, specialists: 380, technicians: 520, support: 620 },
    totalStaff: 4750,
    staffPer1000: 5.1
  },
  {
    code: "NSN",
    name: "Negeri Sembilan",
    population: 1126000,
    staff: { doctors: 890, nurses: 2790, specialists: 420, technicians: 630, support: 770 },
    totalStaff: 5500,
    staffPer1000: 4.9
  },
  {
    code: "PHG",
    name: "Pahang",
    population: 1679000,
    staff: { doctors: 1260, nurses: 3950, specialists: 580, technicians: 840, support: 1070 },
    totalStaff: 7700,
    staffPer1000: 4.6
  },
  {
    code: "PRK",
    name: "Perak",
    population: 2507000,
    staff: { doctors: 1950, nurses: 6120, specialists: 850, technicians: 1280, support: 1550 },
    totalStaff: 11750,
    staffPer1000: 4.7
  },
  {
    code: "PLS",
    name: "Perlis",
    population: 255000,
    staff: { doctors: 180, nurses: 560, specialists: 80, technicians: 120, support: 160 },
    totalStaff: 1100,
    staffPer1000: 4.3
  },
  {
    code: "PNG",
    name: "Pulau Pinang",
    population: 1773000,
    staff: { doctors: 1620, nurses: 5080, specialists: 920, technicians: 1240, support: 1390 },
    totalStaff: 10250,
    staffPer1000: 5.8
  },
  {
    code: "SBH",
    name: "Sabah",
    population: 3418000,
    staff: { doctors: 2380, nurses: 7460, specialists: 980, technicians: 1590, support: 1940 },
    totalStaff: 14350,
    staffPer1000: 4.2
  },
  {
    code: "SWK",
    name: "Sarawak",
    population: 2453000,
    staff: { doctors: 1890, nurses: 5930, specialists: 810, technicians: 1260, support: 1610 },
    totalStaff: 11500,
    staffPer1000: 4.7
  },
  {
    code: "SGR",
    name: "Selangor",
    population: 6538000,
    staff: { doctors: 5280, nurses: 16570, specialists: 2640, technicians: 3960, support: 4550 },
    totalStaff: 33000,
    staffPer1000: 5.0
  },
  {
    code: "TRG",
    name: "Terengganu",
    population: 1149000,
    staff: { doctors: 860, nurses: 2700, specialists: 390, technicians: 580, support: 720 },
    totalStaff: 5250,
    staffPer1000: 4.6
  },
  {
    code: "KUL",
    name: "Kuala Lumpur",
    population: 1982000,
    staff: { doctors: 2380, nurses: 7460, specialists: 1430, technicians: 1590, support: 1640 },
    totalStaff: 14500,
    staffPer1000: 7.3
  },
  {
    code: "LBN",
    name: "Labuan",
    population: 99000,
    staff: { doctors: 65, nurses: 200, specialists: 25, technicians: 40, support: 70 },
    totalStaff: 400,
    staffPer1000: 4.0
  },
  {
    code: "PJY",
    name: "Putrajaya",
    population: 109000,
    staff: { doctors: 150, nurses: 470, specialists: 90, technicians: 110, support: 130 },
    totalStaff: 950,
    staffPer1000: 8.7
  }
];

export const getTotalStats = () => {
  return malaysianStatesData.reduce(
    (acc, state) => ({
      totalPopulation: acc.totalPopulation + state.population,
      totalStaff: acc.totalStaff + state.totalStaff,
      totalDoctors: acc.totalDoctors + state.staff.doctors,
      totalNurses: acc.totalNurses + state.staff.nurses,
      totalSpecialists: acc.totalSpecialists + state.staff.specialists,
      totalTechnicians: acc.totalTechnicians + state.staff.technicians,
      totalSupport: acc.totalSupport + state.staff.support,
    }),
    {
      totalPopulation: 0,
      totalStaff: 0,
      totalDoctors: 0,
      totalNurses: 0,
      totalSpecialists: 0,
      totalTechnicians: 0,
      totalSupport: 0,
    }
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, ArrowRight, Users } from "lucide-react";
import { departmentData, malaysianStates, staffCategories } from "../data/taskforceData";

interface MaldistributionMapProps {
  stateCode: string;
  departmentId: string;
  selectedCategory: string;
}

export function MaldistributionMap({ stateCode, departmentId, selectedCategory }: MaldistributionMapProps) {
  const department = departmentData[departmentId];
  const facilities = department?.facilities[stateCode] || [];
  
  // Calculate movement patterns (mock data for demonstration)
  const movements = generateMovementData(stateCode, departmentId, selectedCategory);
  
  const currentState = malaysianStates.find(s => s.code === stateCode);
  const categoryName = staffCategories.find(c => c.id === selectedCategory)?.name || 'Semua Kategori';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Peta Maldistribution - {currentState?.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Pergerakan staf {categoryName.toLowerCase()} untuk jabatan {department?.name}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Movement Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{movements.inflow.length}</div>
              <div className="text-sm text-muted-foreground">Staf Masuk</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{movements.outflow.length}</div>
              <div className="text-sm text-muted-foreground">Staf Keluar</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {movements.inflow.length - movements.outflow.length > 0 ? '+' : ''}
                {movements.inflow.length - movements.outflow.length}
              </div>
              <div className="text-sm text-muted-foreground">Netto</div>
            </div>
          </div>

          {/* Inflow Movements */}
          {movements.inflow.length > 0 && (
            <div>
              <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Pergerakan Masuk ke {currentState?.name}
              </h4>
              <div className="space-y-2">
                {movements.inflow.map((movement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{movement.from}</Badge>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{stateCode}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{movement.count} orang</div>
                      <div className="text-xs text-muted-foreground">{movement.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outflow Movements */}
          {movements.outflow.length > 0 && (
            <div>
              <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Pergerakan Keluar dari {currentState?.name}
              </h4>
              <div className="space-y-2">
                {movements.outflow.map((movement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{stateCode}</Badge>
                      <ArrowRight className="w-4 h-4 text-red-600" />
                      <Badge variant="outline">{movement.to}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">{movement.count} orang</div>
                      <div className="text-xs text-muted-foreground">{movement.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual Map Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-medium text-gray-600 mb-2">Peta Visual Malaysia</h4>
            <p className="text-sm text-gray-500">
              Peta interaktif akan menunjukkan pergerakan staf antara negeri dengan 
              garis dan arrow yang menunjukkan arah dan volum pergerakan.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Pergerakan Masuk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs">Pergerakan Keluar</span>
              </div>
            </div>
          </div>

          {/* Movement Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Destinasi Keluar</CardTitle>
              </CardHeader>
              <CardContent>
                {movements.topDestinations.map((dest, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{dest.state}</Badge>
                      <span className="text-sm">{getStateName(dest.state)}</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      {dest.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Sumber Masuk</CardTitle>
              </CardHeader>
              <CardContent>
                {movements.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{source.state}</Badge>
                      <span className="text-sm">{getStateName(source.state)}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {source.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function generateMovementData(stateCode: string, departmentId: string, selectedCategory: string) {
  // Mock movement data generation
  const otherStates = malaysianStates.filter(s => s.code !== stateCode);
  const reasons = ['Pertukaran', 'Kenaikan Pangkat', 'Permintaan Peribadi', 'Keperluan Perkhidmatan'];
  
  const inflow = [];
  const outflow = [];
  
  // Generate random inflow (2-4 movements)
  const inflowCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < inflowCount; i++) {
    const randomState = otherStates[Math.floor(Math.random() * otherStates.length)];
    inflow.push({
      from: randomState.code,
      count: Math.floor(Math.random() * 8) + 2,
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    });
  }
  
  // Generate random outflow (1-3 movements)
  const outflowCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < outflowCount; i++) {
    const randomState = otherStates[Math.floor(Math.random() * otherStates.length)];
    outflow.push({
      to: randomState.code,
      count: Math.floor(Math.random() * 6) + 1,
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    });
  }
  
  // Top destinations and sources
  const topDestinations = outflow.sort((a, b) => b.count - a.count).slice(0, 3)
    .map(item => ({ state: item.to, count: item.count }));
  
  const topSources = inflow.sort((a, b) => b.count - a.count).slice(0, 3)
    .map(item => ({ state: item.from, count: item.count }));
  
  return {
    inflow,
    outflow,
    topDestinations,
    topSources
  };
}

function getStateName(code: string): string {
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
  return states.find(s => s.code === code)?.name || code;
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Building2, Filter, Users, AlertCircle } from "lucide-react";
import { departmentData, staffCategories, FacilityData } from "../data/taskforceData";
import { MaldistributionMap } from "./MaldistributionMap";

interface StateViewProps {
  departmentId: string;
  stateCode: string;
  onFacilitySelect: (facilityId: string) => void;
}

export function StateView({ departmentId, stateCode, onFacilitySelect }: StateViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [facilitiesPerPage, setFacilitiesPerPage] = useState(10);
  
  const department = departmentData[departmentId];
  const facilities = department?.facilities[stateCode] || [];
  
  // Calculate pagination
  const totalPages = Math.ceil(facilities.length / facilitiesPerPage);
  const startIndex = (currentPage - 1) * facilitiesPerPage;
  const endIndex = startIndex + facilitiesPerPage;
  const currentFacilities = facilities.slice(startIndex, endIndex);
  
  const stateName = getStateName(stateCode);
  
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

  const getFilteredData = (facility: FacilityData) => {
    if (selectedCategory === 'all') {
      return {
        current: facility.totalCurrent,
        required: facility.totalRequired,
        gap: facility.totalGap
      };
    }
    
    const categoryKey = selectedCategory as keyof typeof facility.currentStaff;
    return {
      current: facility.currentStaff[categoryKey] || 0,
      required: facility.requiredStaff[categoryKey] || 0,
      gap: facility.gap[categoryKey] || 0
    };
  };

  const getFacilityStatus = (facility: FacilityData) => {
    const data = getFilteredData(facility);
    const fillRate = data.required > 0 ? (data.current / data.required) * 100 : 0;
    
    if (fillRate >= 90) return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
    if (fillRate >= 70) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'critical', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hospital': return '🏥';
      case 'Klinik': return '🏪';
      case 'Pusat Kesihatan': return '🏢';
      default: return '🏥';
    }
  };

  const totalStats = facilities.reduce((acc, facility) => {
    const data = getFilteredData(facility);
    return {
      current: acc.current + data.current,
      required: acc.required + data.required,
      gap: acc.gap + data.gap
    };
  }, { current: 0, required: 0, gap: 0 });

  const overallFillRate = totalStats.required > 0 ? (totalStats.current / totalStats.required) * 100 : 0;

  // Calculate stats for current page
  const currentPageStats = currentFacilities.reduce((acc, facility) => {
    const data = getFilteredData(facility);
    return {
      current: acc.current + data.current,
      required: acc.required + data.required,
      gap: acc.gap + data.gap
    };
  }, { current: 0, required: 0, gap: 0 });

  const currentPageFillRate = currentPageStats.required > 0 ? (currentPageStats.current / currentPageStats.required) * 100 : 0;

  // Reset to page 1 when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // Reset to page 1 when facilities per page changes
  const handlePerPageChange = (value: string) => {
    setFacilitiesPerPage(parseInt(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{stateName} - {department?.name}</CardTitle>
              <p className="text-muted-foreground">
                {facilities.length} kemudahan kesihatan
                {facilities.length > facilitiesPerPage && (
                  <span className="ml-2 text-blue-600">
                    (Menunjukkan {startIndex + 1}-{Math.min(endIndex, facilities.length)} dari {facilities.length})
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pilih kategori skim" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {staffCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {facilities.length > 10 && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <Select value={facilitiesPerPage.toString()} onValueChange={handlePerPageChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per halaman</SelectItem>
                      <SelectItem value="10">10 per halaman</SelectItem>
                      <SelectItem value="20">20 per halaman</SelectItem>
                      <SelectItem value="50">50 per halaman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalStats.current.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Keseluruhan Semasa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalStats.required.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Jumlah Keperluan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalStats.gap.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Jurang Perbezaan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{overallFillRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Kadar Pengisian</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities List */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentFacilities.map((facility) => {
          const data = getFilteredData(facility);
          const status = getFacilityStatus(facility);
          const fillRate = data.required > 0 ? (data.current / data.required) * 100 : 0;
          
          return (
            <Card 
              key={facility.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => onFacilitySelect(facility.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(facility.type)}</span>
                    <div>
                      <CardTitle className="text-base">{facility.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">{facility.type}</Badge>
                    </div>
                  </div>
                  <Badge className={`${status.bg} ${status.color} hover:${status.bg}`}>
                    {fillRate.toFixed(0)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pengisian Staf</span>
                    <span>{data.current}/{data.required}</span>
                  </div>
                  <Progress value={fillRate} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-600">{data.current}</div>
                    <div className="text-xs text-muted-foreground">Semasa</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">{data.required}</div>
                    <div className="text-xs text-muted-foreground">Keperluan</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <div className="font-semibold text-red-600">{data.gap}</div>
                    <div className="text-xs text-muted-foreground">Jurang</div>
                  </div>
                </div>

                {/* Alert for critical facilities */}
                {status.status === 'critical' && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <span>Kekurangan staf kritikal</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
          })}
        </div>

        {/* Current Page Status Summary */}
        {facilities.length > facilitiesPerPage && (
          <Card className="border-l-4 border-l-blue-500 bg-blue-50">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{currentPageStats.current.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Semasa (Halaman Ini)</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{currentPageStats.required.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Keperluan (Halaman Ini)</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{currentPageStats.gap.toLocaleString()}</div>
                  <div className="text-sm text-red-700">Jurang (Halaman Ini)</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{currentPageFillRate.toFixed(1)}%</div>
                  <div className="text-sm text-purple-700">Kadar Pengisian (Halaman Ini)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="py-6">
              <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-gray-600">
                  Menunjukkan halaman {currentPage} dari {totalPages} 
                  <span className="ml-2 font-medium text-blue-600">
                    ({startIndex + 1}-{Math.min(endIndex, facilities.length)} dari {facilities.length} kemudahan)
                  </span>
                </div>
                
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-blue-100'}`}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((pageNum, index) => (
                      <PaginationItem key={index}>
                        {pageNum === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum as number);
                            }}
                            isActive={currentPage === pageNum}
                            className={currentPage === pageNum ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-blue-100'}
                          >
                            {pageNum}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-blue-100'}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* Quick page jump for large datasets */}
                {totalPages > 10 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Lompat ke halaman:</span>
                    <Select 
                      value={currentPage.toString()} 
                      onValueChange={(value) => setCurrentPage(parseInt(value))}
                    >
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <SelectItem key={page} value={page.toString()}>
                            {page}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Maldistribution Map */}
      <MaldistributionMap 
        stateCode={stateCode} 
        departmentId={departmentId}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
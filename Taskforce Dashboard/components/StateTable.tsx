import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, ArrowUpDown } from "lucide-react";
import { malaysianStatesData, StateData } from "../data/malaysianStates";

type SortField = keyof StateData | 'totalStaff' | 'staffPer1000';
type SortDirection = 'asc' | 'desc';

export function StateTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('totalStaff');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredData = malaysianStatesData.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    if (sortField === 'totalStaff') {
      aValue = a.totalStaff;
      bValue = b.totalStaff;
    } else if (sortField === 'staffPer1000') {
      aValue = a.staffPer1000;
      bValue = b.staffPer1000;
    } else {
      aValue = typeof a[sortField] === 'number' ? a[sortField] as number : 0;
      bValue = typeof b[sortField] === 'number' ? b[sortField] as number : 0;
    }

    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getRatioColor = (ratio: number) => {
    if (ratio >= 6) return "bg-green-500";
    if (ratio >= 4.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl mb-2">State-by-State Details</h2>
        <p className="text-muted-foreground">Comprehensive data for all Malaysian states</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Staff by State</CardTitle>
          <CardDescription>Detailed breakdown of healthcare staff distribution</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('name')} className="p-0 h-auto font-medium">
                      State
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('population')} className="p-0 h-auto font-medium">
                      Population
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('totalStaff')} className="p-0 h-auto font-medium">
                      Total Staff
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Doctors</TableHead>
                  <TableHead>Nurses</TableHead>
                  <TableHead>Specialists</TableHead>
                  <TableHead>Technicians</TableHead>
                  <TableHead>Support</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('staffPer1000')} className="p-0 h-auto font-medium">
                      Per 1,000
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((state) => (
                  <TableRow key={state.code}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{state.code}</Badge>
                        <span className="font-medium">{state.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{state.population.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{state.totalStaff.toLocaleString()}</TableCell>
                    <TableCell>{state.staff.doctors.toLocaleString()}</TableCell>
                    <TableCell>{state.staff.nurses.toLocaleString()}</TableCell>
                    <TableCell>{state.staff.specialists.toLocaleString()}</TableCell>
                    <TableCell>{state.staff.technicians.toLocaleString()}</TableCell>
                    <TableCell>{state.staff.support.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getRatioColor(state.staffPer1000)}`}></div>
                        <span>{state.staffPer1000}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
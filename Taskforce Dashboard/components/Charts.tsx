import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { malaysianStatesData } from "../data/malaysianStates";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Charts() {
  // Prepare data for charts
  const staffByStateData = malaysianStatesData.map(state => ({
    state: state.code,
    name: state.name,
    total: state.totalStaff,
    doctors: state.staff.doctors,
    nurses: state.staff.nurses,
    specialists: state.staff.specialists,
    technicians: state.staff.technicians,
    support: state.staff.support,
    ratio: state.staffPer1000
  })).sort((a, b) => b.total - a.total);

  // Staff composition data for pie chart
  const staffCompositionData = [
    { name: 'Nurses', value: malaysianStatesData.reduce((sum, state) => sum + state.staff.nurses, 0), fill: COLORS[0] },
    { name: 'Doctors', value: malaysianStatesData.reduce((sum, state) => sum + state.staff.doctors, 0), fill: COLORS[1] },
    { name: 'Support Staff', value: malaysianStatesData.reduce((sum, state) => sum + state.staff.support, 0), fill: COLORS[2] },
    { name: 'Technicians', value: malaysianStatesData.reduce((sum, state) => sum + state.staff.technicians, 0), fill: COLORS[3] },
    { name: 'Specialists', value: malaysianStatesData.reduce((sum, state) => sum + state.staff.specialists, 0), fill: COLORS[4] }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl mb-2">Data Visualization</h2>
        <p className="text-muted-foreground">Interactive charts showing healthcare staff distribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Staff by State */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Total Healthcare Staff by State</CardTitle>
            <CardDescription>Distribution of healthcare staff across Malaysian states</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={staffByStateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value.toLocaleString(), name]}
                  labelFormatter={(label) => staffByStateData.find(d => d.state === label)?.name || label}
                />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Staff Composition Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Staff Composition</CardTitle>
            <CardDescription>Breakdown by staff category nationwide</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffCompositionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {staffCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Staff-to-Population Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>Staff per 1,000 Population</CardTitle>
            <CardDescription>Healthcare accessibility ratio by state</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={staffByStateData.sort((a, b) => a.ratio - b.ratio)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value, "Staff per 1,000"]}
                  labelFormatter={(label) => staffByStateData.find(d => d.state === label)?.name || label}
                />
                <Line type="monotone" dataKey="ratio" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Staff Category Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Staff Categories by State</CardTitle>
            <CardDescription>Detailed breakdown of healthcare staff categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={staffByStateData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value.toLocaleString(), name]}
                  labelFormatter={(label) => staffByStateData.find(d => d.state === label)?.name || label}
                />
                <Bar dataKey="nurses" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="doctors" stackId="a" fill={COLORS[1]} />
                <Bar dataKey="support" stackId="a" fill={COLORS[2]} />
                <Bar dataKey="technicians" stackId="a" fill={COLORS[3]} />
                <Bar dataKey="specialists" stackId="a" fill={COLORS[4]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
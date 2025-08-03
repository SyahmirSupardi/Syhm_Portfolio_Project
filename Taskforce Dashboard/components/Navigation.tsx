import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dashboard } from "./Dashboard";
import { Charts } from "./Charts";
import { StateTable } from "./StateTable";
import { BarChart3, Home, Table } from "lucide-react";

export function Navigation() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            State Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="charts" className="mt-6">
          <Charts />
        </TabsContent>
        
        <TabsContent value="table" className="mt-6">
          <StateTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
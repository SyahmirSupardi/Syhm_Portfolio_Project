import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Home, Settings, LogOut, User } from "lucide-react";

export function TopNavbar() {
  return (
    <div className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-medium">Bahagian Sumber Manusia</span>
          </div>

          {/* Right side - User info and menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Selamat Datang, System!</span>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-blue-700 hover:text-white h-8 px-3"
              >
                <Home className="w-4 h-4 mr-1" />
                Homepage
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-blue-700 hover:text-white h-8 px-3"
              >
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-blue-700 hover:text-white h-8 px-3"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
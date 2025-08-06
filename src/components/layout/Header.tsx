import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-hero text-primary-foreground">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">HR Readiness Assessment</h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Professional Assessment Tool
          </Badge>
        </div>
      </div>
    </header>
  );
};
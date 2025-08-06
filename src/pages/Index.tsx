import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, Brain, Target, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-hero text-primary-foreground">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">HR Readiness Assessment</h1>
            </div>
          </div>
          
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Professional Assessment Tool
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary">
              <Brain className="w-4 h-4" />
              Comprehensive Career Assessment
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Discover Your HR Career Readiness
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Take our scientifically-backed assessment to determine if you're ready to become 
              an HR Specialist & Analyst. Get personalized insights and career guidance.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <Brain className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle>Psychometric Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evaluate personality traits, interests, and cognitive preferences using validated frameworks
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <Target className="w-10 h-10 text-accent mx-auto mb-2" />
                <CardTitle>Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Test your HR knowledge, analytical capabilities, and technical readiness
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-success/20 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-success mx-auto mb-2" />
                <CardTitle>Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive personalized recommendations and learning paths for your HR journey
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Overview */}
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Begin?</CardTitle>
              <CardDescription className="text-base">
                This comprehensive assessment takes 25-30 minutes and provides detailed insights 
                into your readiness for an HR career.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25-30</div>
                  <div className="text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">3</div>
                  <div className="text-muted-foreground">Assessment Sections</div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-hero hover:opacity-90 transition-opacity shadow-glow"
                onClick={() => navigate("/assessment")}
              >
                Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;

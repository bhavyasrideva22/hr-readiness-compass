import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { AssessmentCard } from "@/components/assessment/AssessmentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, BarChart3, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessmentSteps = [
  "Introduction",
  "Psychometric",
  "Technical",
  "WISCAR",
  "Results"
];

export const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(0);

  const assessmentSections = [
    {
      title: "Psychometric Evaluation",
      description: "Assess your personality traits, interests, and cognitive preferences using validated psychological frameworks including Big 5 and Holland Codes.",
      duration: "10 min",
      difficulty: "Beginner" as const,
      icon: <Brain className="w-5 h-5" />,
      onStart: () => navigate("/psychometric")
    },
    {
      title: "Technical & Aptitude Test",
      description: "Evaluate your current HR knowledge, analytical skills, and technical readiness for modern HR tools and data analysis.",
      duration: "10 min", 
      difficulty: "Intermediate" as const,
      icon: <Target className="w-5 h-5" />,
      onStart: () => navigate("/technical")
    },
    {
      title: "WISCAR Framework Analysis",
      description: "Comprehensive readiness evaluation across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world fit dimensions.",
      duration: "8 min",
      difficulty: "Advanced" as const,
      icon: <BarChart3 className="w-5 h-5" />,
      onStart: () => navigate("/wiscar")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={assessmentSteps.length}
          steps={assessmentSteps}
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              Step 1: Assessment Overview
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Am I Ready to Become an HR Specialist & Analyst?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive assessment to determine if you're psychologically, cognitively, 
              and technically ready to pursue a career in HR analytics and human capital management.
            </p>
          </div>

          {/* Role Overview */}
          <Card className="mb-8 border-primary/20 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                What Does an HR Specialist & Analyst Do?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed">
                HR Specialists & Analysts manage core HR functions such as recruitment, employee relations, 
                compensation analysis, performance evaluation, and HR data analytics. They combine interpersonal 
                skills with data-driven decision making to enhance organizational culture and performance.
              </CardDescription>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Key Responsibilities:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Talent acquisition and recruitment</li>
                    <li>• Employee performance analysis</li>
                    <li>• Compensation and benefits management</li>
                    <li>• HR data analytics and reporting</li>
                    <li>• Organizational development initiatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Career Paths:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">HR Specialist</Badge>
                    <Badge variant="secondary">HR Data Analyst</Badge>
                    <Badge variant="secondary">Talent Acquisition</Badge>
                    <Badge variant="secondary">People Operations</Badge>
                    <Badge variant="secondary">Compensation Analyst</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Factors */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Who Succeeds in This Role?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Strong interpersonal & communication skills",
                  "Analytical thinking & comfort with data",
                  "Empathy, discretion, and ethical reasoning",
                  "Comfortable with digital HR tools",
                  "Interest in organizational psychology",
                  "Systems thinking approach"
                ].map((trait, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Sections */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Assessment Components</h2>
            <div className="grid gap-6">
              {assessmentSections.map((section, index) => (
                <AssessmentCard
                  key={index}
                  {...section}
                />
              ))}
            </div>
          </div>

          {/* Start Assessment */}
          <div className="text-center pt-8">
            <Card className="max-w-2xl mx-auto border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Ready to Begin?</h3>
                <p className="text-muted-foreground mb-6">
                  This comprehensive assessment takes approximately 25-30 minutes to complete. 
                  You'll receive detailed insights and personalized career guidance.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-glow"
                  onClick={() => navigate("/psychometric")}
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
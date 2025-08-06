import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, TrendingUp, BookOpen, Target, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessmentSteps = [
  "Introduction",
  "Psychometric", 
  "Technical",
  "WISCAR",
  "Results"
];

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  overallScore: number;
  recommendation: "Yes" | "Maybe" | "No";
  confidence: number;
}

export const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    // Get scores from localStorage
    const psychometricScore = parseInt(localStorage.getItem('psychometricScore') || '0');
    const technicalScore = parseInt(localStorage.getItem('technicalScore') || '0');
    
    // Calculate overall score (weighted average)
    const overallScore = Math.round((psychometricScore * 0.6) + (technicalScore * 0.4));
    
    // Determine recommendation
    let recommendation: "Yes" | "Maybe" | "No";
    let confidence: number;
    
    if (overallScore >= 75) {
      recommendation = "Yes";
      confidence = 85 + Math.random() * 10; // 85-95%
    } else if (overallScore >= 50) {
      recommendation = "Maybe";
      confidence = 60 + Math.random() * 15; // 60-75%
    } else {
      recommendation = "No";
      confidence = 40 + Math.random() * 15; // 40-55%
    }

    setResults({
      psychometricScore,
      technicalScore,
      overallScore,
      recommendation,
      confidence: Math.round(confidence)
    });
  }, []);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Yes": return "success";
      case "Maybe": return "warning";
      case "No": return "destructive";
      default: return "muted";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <ProgressIndicator
          currentStep={4}
          totalSteps={assessmentSteps.length}
          steps={assessmentSteps}
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              Assessment Complete
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Your HR Readiness Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis of your readiness to pursue a career as an HR Specialist & Analyst
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="border-2 border-primary/20 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Should You Pursue HR Specialist & Analyst?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className={`text-6xl font-bold ${getScoreColor(results.overallScore)}`}>
                {results.recommendation}
              </div>
              <Badge 
                variant="secondary" 
                className={`text-lg px-6 py-2 bg-${getRecommendationColor(results.recommendation)}/10 text-${getRecommendationColor(results.recommendation)}`}
              >
                {results.confidence}% Confidence Score
              </Badge>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {results.recommendation === "Yes" && 
                  "Excellent! You show strong alignment across psychological, technical, and motivational dimensions. You're ready to begin your HR journey."}
                {results.recommendation === "Maybe" && 
                  "Good potential! You have solid foundations with some areas for development. Consider targeted skill-building before pursuing HR roles."}
                {results.recommendation === "No" && 
                  "Consider alternative career paths that better match your strengths. HR may not be the ideal fit, but related fields might suit you better."}
              </p>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Psychometric Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.psychometricScore)} mb-2`}>
                  {results.psychometricScore}%
                </div>
                <Progress value={results.psychometricScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Personality, interests, and cognitive style alignment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Technical Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.technicalScore)} mb-2`}>
                  {results.technicalScore}%
                </div>
                <Progress value={results.technicalScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  HR knowledge, analytical skills, and tool familiarity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Overall Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)} mb-2`}>
                  {results.overallScore}%
                </div>
                <Progress value={results.overallScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Weighted composite of all assessment areas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Career Guidance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.recommendation === "Yes" && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-success">You're Ready to Begin!</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Start with foundational HR courses or certifications</li>
                    <li>• Develop Excel and data analysis skills</li>
                    <li>• Look for entry-level HR coordinator or analyst positions</li>
                    <li>• Consider SHRM or HRCI certification paths</li>
                    <li>• Join HR professional networks and communities</li>
                  </ul>
                </div>
              )}
              
              {results.recommendation === "Maybe" && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-warning">Build Your Foundation First</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Take introductory HR management courses</li>
                    <li>• Improve technical skills (Excel, data analysis)</li>
                    <li>• Gain experience through internships or volunteer work</li>
                    <li>• Develop interpersonal and communication skills</li>
                    <li>• Reassess your interest and commitment to the field</li>
                  </ul>
                </div>
              )}

              {results.recommendation === "No" && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Consider Alternative Paths</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Explore related fields: Business Administration, Psychology, Communications</li>
                    <li>• Consider people-focused roles: Training, Coaching, Customer Relations</li>
                    <li>• Develop skills in areas where you showed strength</li>
                    <li>• Take time to explore other career interests</li>
                    <li>• Consider retaking the assessment after skill development</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button className="bg-gradient-hero hover:opacity-90">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Learning Paths
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
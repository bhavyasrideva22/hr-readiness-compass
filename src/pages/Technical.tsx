import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessmentSteps = [
  "Introduction",
  "Psychometric", 
  "Technical",
  "WISCAR",
  "Results"
];

interface Question {
  id: string;
  text: string;
  category: "aptitude" | "knowledge" | "tools";
  options: { value: string; label: string; isCorrect?: boolean }[];
}

const technicalQuestions: Question[] = [
  {
    id: "aptitude_1",
    text: "A company has 100 employees. If 15% leave in Q1 and 10 new hires join, what's the Q1 attrition rate?",
    category: "aptitude",
    options: [
      { value: "a", label: "10%", isCorrect: false },
      { value: "b", label: "15%", isCorrect: true },
      { value: "c", label: "25%", isCorrect: false },
      { value: "d", label: "5%", isCorrect: false }
    ]
  },
  {
    id: "knowledge_1",
    text: "What is a competency model in HR?",
    category: "knowledge",
    options: [
      { value: "a", label: "A pay structure framework", isCorrect: false },
      { value: "b", label: "A framework defining skills, behaviors, and knowledge needed for success", isCorrect: true },
      { value: "c", label: "An employee scheduling tool", isCorrect: false },
      { value: "d", label: "A performance review template", isCorrect: false }
    ]
  },
  {
    id: "knowledge_2",
    text: "What does EEO stand for in HR compliance?",
    category: "knowledge",
    options: [
      { value: "a", label: "Employee Engagement Optimization", isCorrect: false },
      { value: "b", label: "Equal Employment Opportunity", isCorrect: true },
      { value: "c", label: "Executive Employment Operations", isCorrect: false },
      { value: "d", label: "Employee Exit Overview", isCorrect: false }
    ]
  },
  {
    id: "tools_1",
    text: "Which metric would you use to measure recruitment effectiveness?",
    category: "tools",
    options: [
      { value: "a", label: "Employee satisfaction score", isCorrect: false },
      { value: "b", label: "Cost-per-hire", isCorrect: true },
      { value: "c", label: "Training completion rate", isCorrect: false },
      { value: "d", label: "Overtime hours", isCorrect: false }
    ]
  },
  {
    id: "aptitude_2",
    text: "If you need to analyze employee data trends, which Excel function would be most useful?",
    category: "aptitude",
    options: [
      { value: "a", label: "CONCATENATE", isCorrect: false },
      { value: "b", label: "PIVOT TABLES", isCorrect: true },
      { value: "c", label: "UPPER", isCorrect: false },
      { value: "d", label: "ROUND", isCorrect: false }
    ]
  },
  {
    id: "knowledge_3",
    text: "What is the primary purpose of an HRIS (Human Resource Information System)?",
    category: "knowledge",
    options: [
      { value: "a", label: "To conduct interviews", isCorrect: false },
      { value: "b", label: "To centralize and manage employee data and HR processes", isCorrect: true },
      { value: "c", label: "To design office layouts", isCorrect: false },
      { value: "d", label: "To calculate taxes", isCorrect: false }
    ]
  }
];

export const Technical = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [technicalQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < technicalQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate technical score
      let correctAnswers = 0;
      technicalQuestions.forEach(question => {
        const userAnswer = answers[question.id];
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (userAnswer === correctOption?.value) {
          correctAnswers++;
        }
      });
      
      const percentage = Math.round((correctAnswers / technicalQuestions.length) * 100);
      localStorage.setItem('technicalScore', percentage.toString());
      navigate("/wiscar");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = technicalQuestions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const progress = ((currentQuestion + 1) / technicalQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <ProgressIndicator
          currentStep={2}
          totalSteps={assessmentSteps.length}
          steps={assessmentSteps}
        />

        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Technical & Aptitude Assessment
            </div>
            <h1 className="text-3xl font-bold mb-4">HR Knowledge & Skills Test</h1>
            <p className="text-muted-foreground">
              This section evaluates your current HR knowledge, analytical capabilities, 
              and familiarity with essential tools and concepts.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {technicalQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-8 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQ.text}
              </CardTitle>
              <CardDescription className="capitalize">
                {currentQ.category} • Choose the best answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="text-sm font-medium cursor-pointer flex-1"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-accent hover:opacity-90 transition-opacity"
            >
              {currentQuestion === technicalQuestions.length - 1 ? "Finish Section" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
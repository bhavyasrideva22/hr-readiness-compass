import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BarChart3, ArrowRight, ArrowLeft } from "lucide-react";
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
  dimension: "will" | "interest" | "skill" | "cognitive" | "ability" | "realworld";
  options: { value: string; label: string }[];
}

const wiscarQuestions: Question[] = [
  {
    id: "will_1",
    text: "I consistently set goals and work towards them, even when facing obstacles.",
    dimension: "will",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "will_2",
    text: "I maintain consistent effort over long periods to achieve important objectives.",
    dimension: "will",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "interest_1",
    text: "I find myself genuinely curious about workplace dynamics and employee behavior.",
    dimension: "interest",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "skill_1",
    text: "I have experience working with spreadsheets and analyzing data trends.",
    dimension: "skill",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "cognitive_1",
    text: "I can quickly identify patterns and relationships in complex information.",
    dimension: "cognitive",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "ability_1",
    text: "I actively seek feedback and use it to improve my performance.",
    dimension: "ability",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "realworld_1",
    text: "I can see myself thriving in a professional HR environment with diverse stakeholders.",
    dimension: "realworld",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "realworld_2",
    text: "I feel confident about handling confidential employee information responsibly.",
    dimension: "realworld",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  }
];

export const WISCAR = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [wiscarQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < wiscarQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate WISCAR scores by dimension
      const dimensions = ["will", "interest", "skill", "cognitive", "ability", "realworld"];
      const wiscarScores: Record<string, number> = {};
      
      dimensions.forEach(dimension => {
        const dimensionQuestions = wiscarQuestions.filter(q => q.dimension === dimension);
        const dimensionAnswers = dimensionQuestions.map(q => parseInt(answers[q.id] || "0"));
        const dimensionScore = dimensionAnswers.reduce((sum, score) => sum + score, 0);
        const maxScore = dimensionQuestions.length * 5;
        wiscarScores[dimension] = Math.round((dimensionScore / maxScore) * 100);
      });

      // Store WISCAR scores and navigate to results
      localStorage.setItem('wiscarScores', JSON.stringify(wiscarScores));
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = wiscarQuestions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const progress = ((currentQuestion + 1) / wiscarQuestions.length) * 100;

  const getDimensionLabel = (dimension: string) => {
    const labels = {
      will: "Will & Determination",
      interest: "Interest & Passion",
      skill: "Current Skills",
      cognitive: "Cognitive Ability",
      ability: "Learning Ability",
      realworld: "Real-World Fit"
    };
    return labels[dimension as keyof typeof labels] || dimension;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <ProgressIndicator
          currentStep={3}
          totalSteps={assessmentSteps.length}
          steps={assessmentSteps}
        />

        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              WISCAR Framework Analysis
            </div>
            <h1 className="text-3xl font-bold mb-4">Multi-Dimensional Readiness Profile</h1>
            <p className="text-muted-foreground">
              This section evaluates your readiness across six key dimensions: Will, Interest, 
              Skill, Cognitive ability, Ability to learn, and Real-world fit.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {wiscarQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
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
              <CardDescription>
                {getDimensionLabel(currentQ.dimension)} • WISCAR Dimension
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
              className="bg-success hover:opacity-90 transition-opacity"
            >
              {currentQuestion === wiscarQuestions.length - 1 ? "Complete Assessment" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
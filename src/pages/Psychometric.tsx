import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
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
  category: "interest" | "personality" | "cognitive" | "motivation";
  options: { value: string; label: string }[];
}

const psychometricQuestions: Question[] = [
  {
    id: "interest_1",
    text: "I enjoy helping others navigate challenges at work.",
    category: "interest",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "interest_2", 
    text: "I'm curious about how people decisions impact business results.",
    category: "interest",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "personality_1",
    text: "I tend to be compassionate and understanding with colleagues.",
    category: "personality",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "personality_2",
    text: "I pay attention to details and follow through on commitments.",
    category: "personality", 
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
    text: "I prefer to analyze data before making important decisions.",
    category: "cognitive",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "cognitive_2",
    text: "I work well in structured environments with clear processes.",
    category: "cognitive",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "motivation_1",
    text: "I persist through challenges even when progress is slow.",
    category: "motivation",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  },
  {
    id: "motivation_2",
    text: "I'm motivated by helping others grow and develop in their careers.",
    category: "motivation",
    options: [
      { value: "5", label: "Strongly Agree" },
      { value: "4", label: "Agree" },
      { value: "3", label: "Neutral" },
      { value: "2", label: "Disagree" },
      { value: "1", label: "Strongly Disagree" }
    ]
  }
];

export const Psychometric = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [psychometricQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < psychometricQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate and store results
      const totalScore = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
      const maxScore = psychometricQuestions.length * 5;
      const percentage = Math.round((totalScore / maxScore) * 100);
      
      localStorage.setItem('psychometricScore', percentage.toString());
      navigate("/technical");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = psychometricQuestions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const progress = ((currentQuestion + 1) / psychometricQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <ProgressIndicator
          currentStep={1}
          totalSteps={assessmentSteps.length}
          steps={assessmentSteps}
        />

        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Psychometric Evaluation
            </div>
            <h1 className="text-3xl font-bold mb-4">Personality & Interest Assessment</h1>
            <p className="text-muted-foreground">
              This section evaluates your psychological fit using validated frameworks including 
              Big 5 personality traits and Holland interest codes.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {psychometricQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
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
                {currentQ.category.replace('_', ' ')} Assessment
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
              className="bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              {currentQuestion === psychometricQuestions.length - 1 ? "Finish Section" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Brain, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: React.ReactNode;
  onStart: () => void;
  completed?: boolean;
  score?: number;
  className?: string;
}

export const AssessmentCard = ({
  title,
  description,
  duration,
  difficulty,
  icon,
  onStart,
  completed = false,
  score,
  className
}: AssessmentCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success text-success-foreground";
      case "Intermediate":
        return "bg-warning text-warning-foreground";
      case "Advanced":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-elegant group",
      completed && "border-success/50 bg-gradient-to-br from-success/5 to-transparent",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getDifficultyColor(difficulty)}>
                  {difficulty}
                </Badge>
                {completed && score !== undefined && (
                  <Badge variant="outline" className="text-success">
                    Score: {score}%
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {completed && (
            <div className="text-success text-2xl">✓</div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed mb-4">
          {description}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            variant={completed ? "outline" : "default"}
            className="transition-all duration-300"
          >
            {completed ? "Retake" : "Start Assessment"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
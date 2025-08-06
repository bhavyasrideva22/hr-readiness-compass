import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export const ProgressIndicator = ({ 
  currentStep, 
  totalSteps, 
  steps, 
  className 
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("w-full max-w-4xl mx-auto mb-8", className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                index < currentStep
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : index === currentStep
                  ? "bg-accent text-accent-foreground animate-pulse"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-1 w-16 mx-2 transition-all duration-300",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        {steps.map((step, index) => (
          <span
            key={index}
            className={cn(
              "text-center transition-colors duration-300",
              index === currentStep && "text-foreground font-medium"
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};
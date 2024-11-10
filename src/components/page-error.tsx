import { AlertTriangle } from "lucide-react";

interface PageErrorPageProps {
  message: string;
}

export const PageErrorPage = ({
  message = "Something went wrong",
}: PageErrorPageProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

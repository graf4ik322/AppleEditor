import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

export function toast({
  title,
  description,
  variant = "default",
  duration,
}: ToastProps) {
  const message =
    title && description
      ? `${title}: ${description}`
      : title || description || "";

  switch (variant) {
    case "success":
      sonnerToast.success(message, { duration });
      break;
    case "destructive":
      sonnerToast.error(message, { duration });
      break;
    default:
      sonnerToast(message, { duration });
      break;
  }
}

export function useToast() {
  return { toast };
}

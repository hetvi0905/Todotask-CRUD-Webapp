import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalWrapperProps {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ModalWrapper = ({
  trigger,
  children,
  title,
  open,
  onOpenChange,
}: ModalWrapperProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </DialogContent>
  </Dialog>
);

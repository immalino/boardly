"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateTaskFormWrapper } from "./create-task-form-wrapper";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

function CreateTaskModal() {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
export default CreateTaskModal;

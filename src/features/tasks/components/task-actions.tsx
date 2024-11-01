import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "Are you sure you want to delete this task?",
    "destructive"
  );
  const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            disabled={isPending}
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

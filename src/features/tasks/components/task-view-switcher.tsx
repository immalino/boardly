"use client";

import { Loader, PlusIcon } from "lucide-react";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useQueryState } from "nuqs";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { useCallback } from "react";
import { number, string } from "zod";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-task";
import { DataCalendar } from "./data-calendar";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
}: TaskViewSwitcherProps) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const { mutate: bulkUpdateTasks } = useBulkUpdateTasks();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModal();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    status,
    assigneeId,
    projectId,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdateTasks({
        json: { tasks },
      });
    },
    [bulkUpdateTasks]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full rounded-lg border"
    >
      <div className="flex flex-col overflow-auto p-4">
        <div className="flex flex-col lg:flex-row justify-between gap-y-2 items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full lg:w-auto h-8" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="w-full lg:w-auto h-8" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-full lg:w-auto h-8" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size="sm" className="w-full lg:w-auto">
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

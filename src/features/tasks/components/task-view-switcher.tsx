"use client";

import { PlusIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();

  return (
    <Tabs className="flex-1 w-full rounded-lg border">
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
        Data filters
        <DottedSeparator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

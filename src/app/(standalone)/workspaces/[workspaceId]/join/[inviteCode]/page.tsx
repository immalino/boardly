import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";

interface WorkspaceIdJoinPageProps {
  params: { workspaceId: string };
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />;
};
export default WorkspaceIdJoinPage;

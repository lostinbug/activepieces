import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/spinner';
import { ProjectMemberCard } from '@/features/team/component/project-member-card';
import { projectMembersApi } from '@/features/team/lib/project-members-api';
import { authenticationSession } from '@/lib/authentication-session';
import { ProjectRole } from '@activepieces/shared';

type ProjectMembersProps = {
  projectRole: ProjectRole | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

function ProjectMembersDialog({
  projectRole,
  isOpen,
  onClose,
}: ProjectMembersProps) {
  const {
    data: selectedProjectMembers,
    isLoading,
    refetch: refetchProjectMembers,
  } = useQuery({
    queryKey: ['project-members', projectRole?.id],
    gcTime: 0,
    staleTime: 0,
    queryFn: async () => {
      if (!projectRole) {
        return [];
      }
      const page = await projectMembersApi.list({
        projectId: authenticationSession.getProjectId()!,
        projectRoleId: projectRole.id,
        cursor: undefined,
        limit: 100,
      });
      return page.data;
    },
    enabled: !!projectRole,
  });

  if (!projectRole) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogTitle className="h-10">
          {t(projectRole ? `Members: ${projectRole.name}` : 'Members')}
        </DialogTitle>
        <div className="flex flex-col gap-4">
          {isLoading && <LoadingSpinner className="mx-auto" size={28} />}
          {!isLoading &&
            selectedProjectMembers &&
            selectedProjectMembers.length === 0 && (
              <div className="text-center">
                {t('No members are added to this role.')}
              </div>
            )}
          {!isLoading &&
            Array.isArray(selectedProjectMembers) &&
            selectedProjectMembers.map((member) => (
              <ProjectMemberCard
                key={member.id}
                member={member}
                onUpdate={() => {
                  refetchProjectMembers();
                }}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectMembersDialog;

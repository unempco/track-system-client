import type { Device } from '@/modules/devices/types';

import { FolderPlusIcon, PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { CreateDeviceDialogTrigger } from '@/modules/devices/components/dialogs/create-device-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function DevicesHeader({ selectedItems }: DevicesHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader title={t('devices:name')}>
      <PermissionGuard permissions={ApiPermissions.Devices.CREATE}>
        <CreateDeviceDialogTrigger>
          <Button>
            <PlusIcon />
            {t('devices:actions.addNew')}
          </Button>
        </CreateDeviceDialogTrigger>
      </PermissionGuard>
      <Button
        variant="secondary"
        size="icon"
        disabled={!selectedItems?.length}
        onClick={() => {
          toast.info(
            'Selected items: ' + selectedItems.map((d) => d.name).join(', '),
          );
          console.log(selectedItems);
        }}
      >
        <FolderPlusIcon />
      </Button>
    </PageHeader>
  );
}

export type DevicesHeaderProps = {
  selectedItems: Device[];
};

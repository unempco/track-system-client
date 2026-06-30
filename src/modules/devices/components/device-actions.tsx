import type { Device } from '@/modules/devices/types';

import React, { useState } from 'react';
import { DotsThreeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateDeviceDialog } from '@/modules/devices/components/dialogs/update-device-dialog';
import { useDeleteDeviceMutation } from '@/modules/devices/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function DeviceActions({
  device,
  className,
  ...restOfProps
}: DataActionsProps) {
  const { t } = useTranslation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteDeviceMutation({ deviceId: device.id });

  return (
    <PermissionGuard
      permissions={[
        ApiPermissions.Devices.UPDATE,
        ApiPermissions.Devices.DELETE,
      ]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={className}
            {...restOfProps}
          >
            <DotsThreeIcon weight="bold" className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Devices.UPDATE}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>

          <PermissionGuard permissions={ApiPermissions.Devices.DELETE}>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateDeviceDialog
        device={device}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={device.name}
      />
    </PermissionGuard>
  );
}

export type DataActionsProps = React.ComponentProps<typeof Button> & {
  device: Device;
};

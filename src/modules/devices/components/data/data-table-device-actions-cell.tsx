import type { Device } from '@/modules/devices/types';
import type { CellContext } from '@tanstack/react-table';

import { DeviceActions } from '@/modules/devices/components/device-actions';

export function DataTableDeviceActionsCell({
  row,
}: DataTableDeviceActionsProps) {
  return <DeviceActions device={row.original} />;
}

export type DataTableDeviceActionsProps = CellContext<Device, unknown>;

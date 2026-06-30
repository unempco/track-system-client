import type { Device } from '@/modules/devices/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableDeviceActionsCell } from '@/modules/devices/components/data/data-table-device-actions-cell';

export const devicesTableColumns: ColumnDef<Device>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'devices:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'devices:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'brand',
    meta: {
      headerI18nKey: 'devices:fields.brand',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'chip',
    meta: {
      headerI18nKey: 'devices:fields.chip',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'os',
    meta: {
      headerI18nKey: 'devices:fields.os',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'ports',
    meta: {
      headerI18nKey: 'devices:fields.ports',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'available',
    meta: {
      headerI18nKey: 'devices:fields.available',
      columnType: DataTableColumnType.BOOLEAN,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'devices:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableDeviceActionsCell,
    enableHiding: false,
  },
];

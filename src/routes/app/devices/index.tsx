import type { Device, DevicesSearchParams } from '@/modules/devices/types';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { devicesIndexQueryOptions } from '@/modules/devices/api/query-options';
import { DevicesHeader } from '@/modules/devices/components/devices-header';
import { devicesTableColumns } from '@/modules/devices/data/data-table-settings';
import { DeviceCard } from '@/modules/devices/device-card';
import { devicesSearchSchema } from '@/modules/devices/schemas';

export const Route = createFileRoute('/app/devices/')({
  validateSearch: devicesSearchSchema,
  loaderDeps: ({ search }): DevicesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(devicesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'devices:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(devicesIndexQueryOptions(search));

  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DevicesHeader selectedItems={selectedItems} />
      <DataView
        preferencesNamespace="devices"
        items={data.items}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        pagination={data.meta}
        dataTableColumnsSettings={devicesTableColumns}
        className="grow"
        dataGridCardSlot={(device) => (
          <DeviceCard device={device} key={device.id} />
        )}
        dataFiltersSlot={<DataSearch className="w-0 grow" />}
      />
    </div>
  );
}

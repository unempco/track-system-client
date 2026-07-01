import type { DevicesSearchParams } from '@/modules/devices/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { devicesIndexQueryOptions } from '@/modules/devices/api/query-options';
import { DeviceCard } from '@/modules/devices/components/device-card';
import { DevicesHeader } from '@/modules/devices/components/devices-header';
import { devicesTableColumns } from '@/modules/devices/data/data-table-settings';
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

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DevicesHeader />
      <DataView
        preferencesNamespace="devices"
        items={data.items}
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

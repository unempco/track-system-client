import type { DevicesSearchParams } from '@/modules/devices/types';

import { queryOptions } from '@tanstack/react-query';

import { getDeviceById, getDevicesList } from '@/modules/devices/api/query-fns';

export const devicesIndexQueryOptions = (params: DevicesSearchParams) =>
  queryOptions({
    queryKey: ['devices', params],
    queryFn: () => getDevicesList(params),
  });

export const deviceQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['deviceById', itemId],
    queryFn: () => getDeviceById(itemId),
  });

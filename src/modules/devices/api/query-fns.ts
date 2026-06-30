/* Example api functions for devices module. These functions simulate API calls using localStorage and timeouts. */

import type { PaginatedResponse } from '@/core/types/response';
import type {
  Device,
  DeviceFormData,
  DevicesSearchParams,
} from '@/modules/devices/types';

import camelcaseKeys from 'camelcase-keys';

import { supabaseErrorThrower } from '@/modules/shared/lib/utils';
import { supabase } from '@/supabase';

export async function getAllDevices(): Promise<Device[]> {
  throw new Error('Not implemented yet');
}

export async function getDevicesList(
  params: DevicesSearchParams,
): Promise<PaginatedResponse<Device>> {
  const { page = 1, pageSize = 10, search = '' } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('devices')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('name', { ascending: true });

  if (search !== '') {
    query = query.ilike('name', `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  supabaseErrorThrower(error);

  return {
    meta: {
      currentPage: page,
      pageSize,
      totalItems: count ?? 0,
    },
    items: camelcaseKeys(data ?? []) as Device[],
  };
}

export async function getDeviceById(id: number) {
  throw new Error('Not implemented yet');
}

export async function createDevice(device: DeviceFormData) {
  throw new Error('Not implemented yet');
}

export async function updateDevice(id: number, device: DeviceFormData) {
  throw new Error('Not implemented yet');
}

export async function deleteDevice(id: number) {
  throw new Error('Not implemented yet');
}

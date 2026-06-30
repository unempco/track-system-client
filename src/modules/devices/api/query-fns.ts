/* Example api functions for devices module. These functions simulate API calls using localStorage and timeouts. */

import type { PaginatedResponse } from '@/core/types/response';
import type {
  Device,
  DeviceFormData,
  DevicesSearchParams,
} from '@/modules/devices/types';

export async function getAllDevices(): Promise<Device[]> {
  throw new Error('Not implemented yet');
}

export async function getDevicesList(
  params: DevicesSearchParams,
): Promise<PaginatedResponse<Device>> {
  throw new Error('Not implemented yet');
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

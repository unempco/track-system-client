import { z } from 'zod';

import {
  deviceFormSchema,
  deviceSchema,
  devicesSearchSchema,
} from '@/modules/devices/schemas';

export type Device = z.infer<typeof deviceSchema>;
export type DeviceFormData = z.infer<typeof deviceFormSchema>;

export type DevicesSearchParams = z.infer<typeof devicesSearchSchema>;

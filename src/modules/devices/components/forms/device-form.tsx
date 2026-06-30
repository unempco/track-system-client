import type { DeviceFormData } from '@/modules/devices/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { FormSwitch } from '@/core/components/form-fields/form-switch';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { ItemStatus } from '@/core/constants/misc';
import { deviceFormSchema } from '@/modules/devices/schemas';

export function DeviceForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: DeviceFormProps) {
  const { t } = useTranslation();

  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      key: '',
      name: '',
      count: 0,
      description: '',
      status: ItemStatus.PENDING,
      email: '',
      website: '',
      image: '',
      special: false,
      price: 0,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = Object.values(ItemStatus).map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

  return (
    <form id="device-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="name"
            label={t('devices:fields.name')}
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="key"
            label={t('devices:fields.key')}
            disabled={isSubmitting}
            required
          />
        </div>

        <FormInput
          control={form.control}
          name="description"
          label={t('devices:fields.description')}
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="status"
            label={t('devices:fields.status')}
            options={statusOptions}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="count"
            label={t('devices:fields.count')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="email"
            label={t('devices:fields.email')}
            type="email"
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="price"
            label={t('devices:fields.price')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="website"
            label={t('devices:fields.website')}
            type="url"
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="image"
            label={t('devices:fields.image')}
            type="url"
            disabled={isSubmitting}
            required
          />
        </div>

        <FormSwitch
          control={form.control}
          name="special"
          label={t('devices:fields.isSpecial')}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type DeviceFormProps = {
  defaultValues?: Partial<DeviceFormData>;
  onSubmit: (data: DeviceFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};

import {
  CalendarIcon,
  EnvelopeIcon,
  GlobeIcon,
  HashIcon,
  KeyIcon,
  StarIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { Badge } from '@/core/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/core/components/ui/card';
import { Separator } from '@/core/components/ui/separator';
import { formatDate } from '@/core/lib/dates';
import { cn, formatPrice, formatUrl } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';

export function DeviceCard({ device, className }: DeviceCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-0 overflow-hidden border transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {/* Image */}
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        <img
          src={device.image}
          alt={device.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Special badge overlay */}
        {device.special && (
          <div className="absolute left-2 top-2">
            <Badge className="gap-1 bg-amber-500 text-white hover:bg-amber-500">
              <StarIcon size={10} weight="fill" />
              {t('devices:fields.special')}
            </Badge>
          </div>
        )}
        {/* Status badge overlay */}
        <div className="absolute right-2 top-2">
          <StatusBadge status={device.status} />
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        {/* Name + key + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold leading-tight tracking-tight">
              {device.name}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <KeyIcon size={10} weight="duotone" />
              {device.key}
            </p>
          </div>
          <span className="shrink-0 text-base font-bold tabular-nums text-foreground">
            {formatPrice(device.price)}
          </span>
        </div>

        {/* Description */}
        {device.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {device.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-4">
        <Separator />
        <DetailFieldItem
          icon={HashIcon}
          label={t('devices:fields.count')}
          value={device.count.toLocaleString()}
        />
        <DetailFieldItem
          icon={CalendarIcon}
          label={t('devices:fields.createdAt')}
          value={formatDate(device.created_at)}
        />
        <DetailFieldItem
          icon={EnvelopeIcon}
          label={t('devices:fields.email')}
          value={device.email}
        />
        <DetailFieldItem
          icon={GlobeIcon}
          label={t('devices:fields.website')}
          value={
            <a href={device.website} target="_blank" rel="noreferrer">
              <span className="truncate">{formatUrl(device.website)}</span>
            </a>
          }
        />
        <CardFooter>
          <DeviceActions
            device={device}
            variant="outline"
            className="absolute bottom-2 right-4"
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export type DeviceCardProps = {
  device: Device;
  onEdit?: (device: Device) => void;
  onDelete?: (device: Device) => void;
  className?: string;
};

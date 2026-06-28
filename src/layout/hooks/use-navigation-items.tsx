import type { NavigationGroup, NavigationItem } from '@/layout/types';

import {
  ChartDonutIcon,
  DevicesIcon,
  HardDrivesIcon,
  ReceiptIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export function useNavigationItems(): UseNavigationItemsReturn {
  const { t } = useTranslation();

  return {
    main: [
      {
        items: [
          {
            title: t('layout:navigation.dashboard'),
            icon: ChartDonutIcon,
            url: '/app/dashboard',
            permissions: ['dashboard.view'],
          },
        ],
      },
      {
        label: t('layout:navigation.tracking'),
        items: [
          {
            title: t('transactions:name'),
            icon: ReceiptIcon,
            url: '/app/transactions',
          },
          {
            title: t('employees:name'),
            icon: UsersThreeIcon,
            url: '/app/employees',
          },
        ],
      },
      {
        label: t('layout:navigation.equipment'),
        items: [
          {
            title: t('devices:name'),
            icon: DevicesIcon,
            url: '/app/devices',
          },
          {
            title: t('drives:name'),
            icon: HardDrivesIcon,
            url: '/app/drives',
          },
        ],
      },
    ],
    secondary: [],
  };
}

export type UseNavigationItemsReturn = {
  main: NavigationGroup[];
  secondary: NavigationItem[];
};

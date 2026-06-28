import { createFileRoute } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/transactions/')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'transactions:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/transactions/"!</div>;
}

import { createFileRoute } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/devices/')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'devices:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/devices/"!</div>;
}

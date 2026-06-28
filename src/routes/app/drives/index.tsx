import { createFileRoute } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/drives/')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'drives:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/drives/"!</div>;
}

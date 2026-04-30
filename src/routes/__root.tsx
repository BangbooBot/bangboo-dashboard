import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type z from 'zod'
import { type authSchema, getIsAuthenticated, getSessionServerFn, type sessionSchema, setIsAuthenticated, setSessionServerFn } from '#/lib/session'
import { getLocale } from '#/paraglide/runtime'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'
import { Toaster } from 'sonner'

interface MyRouterContext {
  queryClient: QueryClient,
  sessionInfo: z.infer<typeof sessionSchema>,
  isAuthenticated: z.infer<typeof authSchema>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }

    const authInfo = await getIsAuthenticated();
    const sessionInfo = await getSessionServerFn();

    if (authInfo) {
      if (sessionInfo) {
        const expireTime = new Date(sessionInfo.expire_in);
        const currentTime = new Date();
        if (expireTime < currentTime) {
          await setIsAuthenticated({ data: false });
          await setSessionServerFn({ data: {
            expire_in: '',
            avatar: undefined,
            username: undefined,
          } });
        }
      }
      
    }

    return {
      sessionInfo: await getSessionServerFn() || {} as z.infer<typeof sessionSchema>,
      isAuthenticated: await getIsAuthenticated(),
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} className='dark'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Toaster />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

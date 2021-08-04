import { FC, Suspense, lazy } from 'react';

import { AuthGuard, GuardProps, GuestGuard, RoleGuard } from 'guards';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import { Role } from 'store/modules/auth';
import { Fragment } from 'react';
import { Main } from 'components/templates/Main';

const Error404 = lazy(() => import('pages/Error404'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Login = lazy(() => import('pages/Login'));
const Admin = lazy(() => import('pages/Admin'));
const Normal = lazy(() => import('pages/Normal'));

export interface RouteConfig {
  path: string;
  component: FC;
  exact?: boolean;
  roles?: string[];
  guard?: FC;
  layout?: FC;
  disabled?: boolean;
  routes?: RouteConfig[];
}

const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={PATH_NAME.DASHBOARD} />,
  },
  {
    path: PATH_NAME.ERROR_404,
    exact: true,
    component: Error404,
  },
  {
    path: PATH_NAME.LOGIN,
    exact: true,
    guard: GuestGuard,
    component: Login,
  },
  {
    path: '/',
    guard: AuthGuard,
    component: Fragment,
    layout: Main,
    routes: [
      {
        path: PATH_NAME.DASHBOARD,
        component: Dashboard,
      },
      {
        path: PATH_NAME.ADMIN,
        component: Admin,
        roles: [Role.Admin],
        guard: RoleGuard,
      },
      {
        path: PATH_NAME.NORMAL,
        component: Normal,
        roles: [Role.Admin, Role.Normal],
        guard: RoleGuard,
      },
      {
        path: '*',
        component: () => <Redirect to={PATH_NAME.DASHBOARD} />,
      },
    ],
  },
];

const renderRoute = (routes: RouteConfig[]) => {
  return (
    <>
      {routes.length ? (
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {routes.map((route, index) => {
              const {
                guard: Guard = Fragment,
                layout: Layout = Fragment,
                component: Component,
              } = route;
              const guardProps: GuardProps = {};
              if (route.roles) {
                guardProps.requiredRoles = route.roles;
              }
              return (
                <Route key={`route-${index}`} path={route.path} exact={route.exact}>
                  <Guard {...guardProps}>
                    <Layout>
                      {route.routes?.length ? renderRoute(route.routes) : <Component />}
                    </Layout>
                  </Guard>
                </Route>
              );
            })}
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export const Routes = () => {
  return renderRoute(routeConfigs);
};

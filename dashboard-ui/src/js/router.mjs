const isAuthenticated = () => {
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('token='));
};

const router = {
  routes: [
    {
      path: '/',
      controller: 'dashboardController',
      protected: true,
    },
    {
      path: '/dashboard-config',
      controller: 'dashboardConfigController',
      protected: true,
    },
    {
      path: '/devices-config',
      controller: 'devicesConfigController',
      protected: true,
    },
    {
      path: '/admin',
      controller: 'adminController',
      protected: true,
    },
    {
      path: '/user-config',
      controller: 'userConfigController',
      protected: true,
    },
    {
      path: '/login',
      controller: 'loginController',
      protected: false,
    },
  ],
  handleRouteChange(route) {
    window.history.pushState({}, '', route.path);
    import(`./controllers/${route.controller}.mjs`)
      .then((controllerModule) => {
        if (
          controllerModule.default &&
          typeof controllerModule.default.init === 'function'
        ) {
          controllerModule.default.init();
        } else {
          console.error(
            'Controller does not have an init method:',
            route.controller
          );
        }
      })
      .catch((err) => console.error(err));
  },
  checkRouteChange() {
    const route = this.routes.find((r) => window.location.pathname === r.path);
    if (!route) {
      return this.handleRouteChange({
        path: '/not-found',
        controller: '404Controller',
      });
    }

    if (
      (route.protected && isAuthenticated()) ||
      (!route.protected && !isAuthenticated())
    ) {
      return this.handleRouteChange(route);
    }

    if (route.protected && !isAuthenticated()) {
      return this.handleRouteChange({
        path: '/login',
        controller: 'loginController',
      });
    }

    if (!route.protected && isAuthenticated()) {
      return this.handleRouteChange({
        path: '/',
        controller: 'dashboardController',
      });
    }
  },
  init() {
    window.addEventListener('popstate', this.checkRouteChange.bind(this));
    window.addEventListener('load', this.checkRouteChange.bind(this));
    this.checkRouteChange();
  },
};

export default router;

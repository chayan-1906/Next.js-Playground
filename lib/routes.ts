const routes = {
    scriptDemo: '/script-demo',
    cachingDemo: '/caching-demo',
    clientActionStateDemo: '/action-state-demo/client-only',
    serverActionStateDemo: '/action-state-demo/server-only',
    serverClientHybridActionStateDemo: '/action-state-demo/server-client-hybrid',
    funda: '/funda',
    fundaPeople: '/funda/people',
    fundaCompanies: '/funda/companies',
    fundaPerson: (personId: string) => `/funda/people/${personId}`,
    fundaCompany: (companyId: string) => `/funda/companies/${companyId}`,
};

export {routes};

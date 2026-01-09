const routes = {
    scriptDemo: '/script-demo',
    cachingDemo: '/caching-demo',
    clientActionStateDemo: '/action-state-demo/client-only',
    serverActionStateDemo: '/action-state-demo/server-only',
    serverClientHybridActionStateDemo: '/action-state-demo/server-client-hybrid',
    transitionsDemo: '/transitions-demo',
    errorDemo: '/error-demo',
    proxyDemo: '/proxy-demo',
    redirectDemo: '/redirect-demo',
    serverRedirect: '/redirect-demo/server-redirect',
    clientRedirect: '/redirect-demo/client-redirect',
    redirectRewriteDemo: '/redirect-rewrite-demo',
    testRedirect: '/redirect-rewrite-demo/test-redirect',
    testRewrite: '/redirect-rewrite-demo/test-rewrite',

    funda: '/funda',
    fundaPeople: '/funda/people',
    fundaCompanies: '/funda/companies',
    fundaPerson: (personId: string) => `/funda/people/${personId}`,
    fundaCompany: (companyId: string) => `/funda/companies/${companyId}`,
};

export {routes};

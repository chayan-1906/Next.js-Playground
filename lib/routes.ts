const routes = {
    scriptDemo: '/script-demo',

    cachingDemo: '/caching-demo',

    clientActionStateDemo: '/action-state-demo/client-only',
    serverActionStateDemo: '/action-state-demo/server-only',
    serverClientHybridActionStateDemo: '/action-state-demo/server-client-hybrid',

    transitionsDemo: '/transitions-demo',

    errorDemo: '/error-demo',

    interceptingParallelDemo: '/intercepting-parallel-demo',
    interceptingDemo: '/intercepting-parallel-demo/intercepting',
    photoDetailsDemo: (id: string) => `/intercepting-parallel-demo/intercepting/photos/${id}`,
    parallelDemo: `/intercepting-parallel-demo/parallel`,
    settingsDemo: `/intercepting-parallel-demo/settings`,
    settingsProfileDemo: `/intercepting-parallel-demo/settings/profile`,
    settingsSecurityDemo: `/intercepting-parallel-demo/settings/security`,
    settingsPaymentDemo: `/intercepting-parallel-demo/settings/payment-methods`,
    settingsInvoicesDemo: `/intercepting-parallel-demo/settings/invoices`,
    settingsPreferencesDemo: `/intercepting-parallel-demo/settings/preferences`,
    productsDemo: `/intercepting-parallel-demo/products-demo`,
    productDemo: (productId: string) => `/intercepting-parallel-demo/products-demo/products/${productId}`,

    proxyDemo: '/proxy-demo',

    redirectDemo: '/redirect-demo',
    serverRedirect: '/redirect-demo/server-redirect',
    clientRedirect: '/redirect-demo/client-redirect',

    redirectRewriteDemo: '/redirect-rewrite-demo',
    testRedirect: '/redirect-rewrite-demo/test-redirect',
    testRewrite: '/redirect-rewrite-demo/test-rewrite',

    staticParamsDemo: '/static-params-demo',
    staticParamsProductDetailsDemo: (productId: string) => `/static-params-demo/products/${productId}`,

    funda: '/funda',
    fundaPeople: '/funda/people',
    fundaCompanies: '/funda/companies',
    fundaPerson: (personId: string) => `/funda/people/${personId}`,
    fundaCompany: (companyId: string) => `/funda/companies/${companyId}`,
};

export {routes};

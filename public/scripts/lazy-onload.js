// lazyOnload script - loads during browser idle time
console.log('[SCRIPT] lazyOnload loaded at:', performance.now().toFixed(2), 'ms');
window.lazyOnloadLoaded = performance.now();

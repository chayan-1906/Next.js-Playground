// beforeInteractive script - loads BEFORE Next.js hydration
console.log('[SCRIPT] beforeInteractive loaded at:', performance.now().toFixed(2), 'ms');
window.beforeInteractiveLoaded = performance.now();

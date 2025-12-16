This is a [Next.js](https://nextjs.org) playground project for learning Next.js concepts.

---

<details>
<summary><strong>1. next/script</strong> - Optimized third-party script loading</summary>

### Strategies

| Strategy            | When it loads                       | Use case                           |
|---------------------|-------------------------------------|------------------------------------|
| `beforeInteractive` | Before React hydrates               | Cookie consent, bot detection      |
| `afterInteractive`  | After page is interactive (default) | Analytics, tag managers            |
| `lazyOnload`        | During browser idle time            | Chat widgets, maps, social buttons |

### Key Points

- `beforeInteractive` must be in root `layout.tsx`
- Use `onLoad`/`onReady` for post-load initialization
- External scripts only (Google Analytics, Maps, etc.)

### Demo: `http://localhost:3000/script-demo`

![next/script demo](https://github.com/user-attachments/assets/67f99d91-ab4f-40ea-83fa-9e415359a56f)

[Official Docs](https://nextjs.org/docs/app/api-reference/components/script)

</details>

---

<details>
<summary><strong>2. Caching (use cache, cacheTag, revalidateTag)</strong> - Server-side caching and revalidation</summary>

### Core Concepts

| Feature                       | Purpose                              | Usage                                           |
|-------------------------------|--------------------------------------|-------------------------------------------------|
| `"use cache"`                 | Persistent caching across requests   | Primary caching mechanism (Next.js 15)          |
| `cacheTag('tag')`             | Tag caches for targeted invalidation | Works with "use cache"                          |
| `revalidateTag('tag', 'max')` | Invalidate caches by tag             | Needs profile parameter ("max" or custom)       |
| `revalidatePath('/path')`     | Invalidate + refresh specific path   | Sufficient alone for single-page scenarios      |
| `cache()` from React          | Request-level deduplication          | Supplementary - most useful without "use cache" |

### Key Learnings

**✅ What Works:**

- `"use cache"` is the foundation - can work alone
- `cache()` wrapper is independent - neither needs the other
- `revalidatePath()` alone is sufficient (invalidates caches + refreshes page)
- Put timestamp inside cached function to observe caching: `const cachedAt = new Date().toISOString()`

**⚠️ Common Gotchas:**

- `cache()` is redundant with `"use cache" + fetch()` (Next.js already deduplicates fetch)
- Functions get called 3-4 times during build/render - **this is normal!**
- The actual API/DB call happens once; other calls use cached data (marked "Cache" in logs)
- `revalidateTag()` alone doesn't refresh UI - need `revalidatePath()` or manual refresh
- Browser cache (DevTools) ≠ Server cache (Next.js "use cache")

**🎯 When cache() Actually Matters:**

- Without "use cache" for deduplication within a single request
- With database calls or expensive operations (not simple fetch)
- When same function is called from multiple components in one render

### Demo: `http://localhost:3000/caching-demo`

[Official Docs - use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache) | [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) | [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

</details>

---

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

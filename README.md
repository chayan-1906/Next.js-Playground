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
<summary><strong>2. Caching (use cache, updateTag, PPR)</strong> - Server-side caching, revalidation, and Partial Prerendering</summary>

### Core Concepts

| Feature                       | Purpose                                 | Usage                                                    |
|-------------------------------|-----------------------------------------|----------------------------------------------------------|
| `"use cache"`                 | Persistent caching across requests      | Primary caching mechanism (Next.js 15+)                  |
| `cacheTag('tag')`             | Tag caches for targeted invalidation    | Works with "use cache"                                   |
| `updateTag('tag')`            | Invalidate + refresh (read-your-writes) | **Recommended** - Server Actions only, immediate refresh |
| `revalidatePath('/path')`     | Invalidate + refresh specific path      | Alternative - works alone                                |
| `revalidateTag('tag', 'max')` | Invalidate with stale-while-revalidate  | Legacy - use updateTag instead                           |
| `cache()` from React          | Request-level deduplication             | Supplementary - most useful without "use cache"          |
| `cacheComponents: true`       | Enable Partial Prerendering (PPR)       | Config flag - mix static + dynamic content               |

### Recommended Setup

```typescript
// 1. Enable PPR in next.config.ts
const nextConfig = {cacheComponents: true};

// 2. Cached function with tag
const getData = cache(async () => {
    "use cache";
    cacheTag('products');
    const cachedAt = new Date().toISOString(); // Observe caching
    return await fetch(...);
});

// 3. Server Action for revalidation
async function revalidate() {
    "use server";
    updateTag('products'); // Invalidates + refreshes (no revalidatePath needed!)
}

// 4. Component structure with Suspense
<div>
    <Header / > {/* Static - instant */}
< Suspense
fallback = { < Loading / >
}>
<DynamicData / > {/* Streams at request time */}
< /Suspense>
< /div>
```

### Key Learnings

**✅ What Works:**

- `updateTag()` replaces `revalidateTag() + revalidatePath()` - simpler, one call!
- `"use cache"` is the foundation - can work alone
- `cache()` wrapper is independent - neither needs the other
- Put timestamp inside cached function to observe caching: `const cachedAt = new Date().toISOString()`
- PPR requires Suspense boundaries around dynamic content

**⚠️ Common Gotchas:**

- `cache()` is redundant with `"use cache" + fetch()` (Next.js already deduplicates fetch)
- Functions get called 3-4 times during build/render - **this is normal!**
- The actual API/DB call happens once; other calls use cached data (marked "Cache" in logs)
- `revalidateTag()` alone doesn't refresh UI - use `updateTag()` instead
- Browser cache (DevTools) ≠ Server cache (Next.js "use cache")
- PPR only streams components that are: (1) in Suspense + (2) not fully cached with "use cache"

**🎯 When cache() Actually Matters:**

- Without "use cache" for deduplication within a single request
- With database calls or expensive operations (not simple fetch)
- When same function is called from multiple components in one render

**📊 PPR vs Static:**

| With "use cache"       | Without "use cache" (in Suspense) |
|------------------------|-----------------------------------|
| ✅ Prerendered at build | ✅ Static shell + streaming        |
| ✅ updateTag works      | ❌ No cache to revalidate          |
| ❌ No streaming         | ✅ Shows loading → content         |

### Demo: `http://localhost:3000/caching-demo`

[Official Docs - use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache) | [updateTag](https://nextjs.org/docs/app/api-reference/functions/updateTag) | [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)

</details>

---

<details>
<summary><strong>3. Server Actions & Forms</strong> - Three approaches: Client Component, Server Component, and Hybrid</summary>

### Core Concepts

| Feature          | Purpose                                         | Returns/Usage                         |
|------------------|-------------------------------------------------|---------------------------------------|
| `useActionState` | Manage Server Action state in Client Components | `[state, formAction, pending]`        |
| `state`          | Current state returned from Server Action       | Success/error data for display        |
| `formAction`     | Wrapped action function for form                | Pass to `<form action={formAction}>`  |
| `pending`        | Boolean indicating submission in progress       | Use for loading indicators/disable UI |
| `prevState`      | Previous state passed to Server Action          | First parameter in Server Action      |
| `useFormStatus`  | Get form status in Client Component             | `{ pending, data, method, action }`   |

### Recommended Setup

```typescript
// 1. Server Action (in separate file with "use server" at top)
// lib/actions/myActions.ts
"use server";

import {FormState} from "@/types";
import {useActionState, useEffect, useRef} from "react";
import {addProduct} from "@/lib/actions/myActions";
import {error} from "next/dist/build/output/log";

export async function addProduct(prevState: FormState, formData: FormData): Promise<FormState> {
    const title = formData.get('title') as string || '';
    const price = formData.get('price') || 0;

    // Validate fields
    const errors: Record<string, string> = {};
    if (!title) errors.title = 'Title is required';
    if (!price || Number(price) <= 0) errors.price = 'Price must be greater than 0';

    // Return errors with submitted data (so form can repopulate on error)
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            error: errors,
            data: {title, price: Number(price)},
        };
    }

    // Simulate async work (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Return success (no data needed - form will reset)
    return {success: true};
}

// 2. Client Component using useActionState
"use client";

function MyForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const initialState = {success: false};
    const [state, formAction, pending] = useActionState(addProduct, initialState);

    // Reset form on success
    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <form ref = {formRef}
    action = {formAction} >
    <input
        name = "title"
    defaultValue = {state.data?.title || ''}
    required
    / >
    {
        state.error?.title && <p>{state.error.title} < /p>}

            < button type = "submit" disabled = {pending} >
            {pending ? 'Submitting...' : 'Submit'}
            < /button>

    {
        state.success && <p>Success! < /p>}
        < /form>
    )
        ;
    }
```

### Three Approaches to Forms

**Approach 1: Client Component with `useActionState` (Full features)**

```tsx
"use client";
import { useActionState } from "react";

// Server Action signature: (prevState, formData) => Promise<State>
export async function addProduct(prevState: State, formData: FormData): Promise<State> {
  // Returns state object with success/error/data
  return { success: true };
}

function Form() {
  const [state, formAction, pending] = useActionState(addProduct, initialState);
  return (
    <form action={formAction}>
      <input name="title" defaultValue={state.data?.title || ''} />
      {state.error?.title && <p>{state.error.title}</p>}
      <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
      {state.success && <p>Success!</p>}
    </form>
  );
}
```

**Approach 2: Server Component (Pure server, no feedback)**

```tsx
// No "use client" - Server Component by default

// Server Action signature: (formData) => Promise<void>
export async function addProductServerForm(formData: FormData) {
  "use server";
  // Can't return state to Server Component
  // Use redirect() for feedback
}

function Form() {
  return (
    <form action={addProductServerForm}>
      <input name="title" />
      {/* ❌ No pending state */}
      {/* ❌ No error display */}
      {/* ❌ No success message */}
      <button>Submit</button>
    </form>
  );
}
```

**Approach 3: Hybrid (Server Component + Client button with `useFormStatus`)**

```tsx
// Button.tsx - Client Component
"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// page.tsx - Server Component
import { SubmitButton } from "./Button";

function Form() {
  return (
    <form action={addProductServerForm}>
      <input name="title" />
      {/* ✅ Has pending state */}
      {/* ❌ No error display */}
      {/* ❌ No success message */}
      <SubmitButton />
    </form>
  );
}
```

### Key Learnings

**✅ What Works:**

- **Uncontrolled inputs** - No `useState` needed! Form manages its own state
- **`action` prop** - Use `<form action={formAction}>`, NOT `onSubmit`
- **Field-specific errors** - Return `error: { title: '...', price: '...' }` for per-field validation
- **`defaultValue` for repopulation** - Use `defaultValue={state.data?.field || ''}` to keep values on error
- **File-level `"use server"`** - More reliable than inline when imported by Client Components
- **Separate files by directive** - `lib/actions/` for "use server", `lib/queries/` for "use cache"

**⚠️ Common Gotchas:**

- **Server Action signatures differ!**
  - `useActionState`: `(prevState, formData) => Promise<State>` (returns state object)
  - Direct form action: `(formData) => Promise<void>` (returns void or redirects)
- **`prevState` is required** - Server Actions used with `useActionState` MUST have `(prevState, formData)` signature
- **`useFormStatus` limitations** - Only gives `pending` state, NOT errors/success from Server Action
- **Form resets automatically** - Default browser behavior after submission
- **`defaultValue` vs `value`** - `defaultValue` sets initial value; changing it doesn't update controlled inputs
- **Can't mix directives** - Don't put "use cache" and "use server" in the same file imported by Client Components
- **Inline "use server" works, but...** - File-level `"use server"` is clearer and more reliable for Client Component imports
- **Validation runs server-side** - If validation fails before async work, pending state is very brief (just network roundtrip)
- **Server Components can't show Server Action return values** - Use `redirect()` or URL params for feedback

**🎯 Form Reset Behavior:**

| Scenario  | What to return from Server Action | Form behavior                        |
|-----------|-----------------------------------|--------------------------------------|
| ✅ Success | `{ success: true }` (no data)     | Clears (defaultValue is empty)       |
| ❌ Error   | `{ success: false, error, data }` | Keeps values (defaultValue has data) |

**📊 Three Approaches Compared:**

| Feature | Client (useActionState) | Server (Pure) | Hybrid (useFormStatus) |
|---------|------------------------|---------------|------------------------|
| **Component Type** | Client Component | Server Component | Server + Client button |
| **Pending State** | ✅ Yes | ❌ No | ✅ Yes |
| **Error Messages** | ✅ Yes | ❌ No | ❌ No |
| **Success Messages** | ✅ Yes | ❌ No | ❌ No |
| **Form Repopulation** | ✅ Yes | ❌ No | ❌ No |
| **Server Action Signature** | `(prevState, formData) => Promise<State>` | `(formData) => Promise<void>` | `(formData) => Promise<void>` |
| **Complexity** | High | Low | Medium |
| **When to Use** | Forms with validation feedback | Simple forms, no feedback needed | Forms where you only need pending state |

### Demos

- Client Component: `http://localhost:3000/client-action-state-demo`
- Server Component: `http://localhost:3000/server-action-state-demo`
- Hybrid: `http://localhost:3000/action-state-demo/server-client-hybrid`

[Official Docs](https://nextjs.org/docs/app/getting-started/error-handling#functions)

</details>

---

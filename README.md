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

| Feature                     | Client (useActionState)                   | Server (Pure)                    | Hybrid (useFormStatus)                  |
|-----------------------------|-------------------------------------------|----------------------------------|-----------------------------------------|
| **Component Type**          | Client Component                          | Server Component                 | Server + Client button                  |
| **Pending State**           | ✅ Yes                                     | ❌ No                             | ✅ Yes                                   |
| **Error Messages**          | ✅ Yes                                     | ❌ No                             | ❌ No                                    |
| **Success Messages**        | ✅ Yes                                     | ❌ No                             | ❌ No                                    |
| **Form Repopulation**       | ✅ Yes                                     | ❌ No                             | ❌ No                                    |
| **Server Action Signature** | `(prevState, formData) => Promise<State>` | `(formData) => Promise<void>`    | `(formData) => Promise<void>`           |
| **Complexity**              | High                                      | Low                              | Medium                                  |
| **When to Use**             | Forms with validation feedback            | Simple forms, no feedback needed | Forms where you only need pending state |

### Demos

- Client Component: `http://localhost:3000/client-action-state-demo`
- Server Component: `http://localhost:3000/server-action-state-demo`
- Hybrid: `http://localhost:3000/action-state-demo/server-client-hybrid`

[Official Docs](https://nextjs.org/docs/app/getting-started/error-handling#functions)

</details>

---

<details>
<summary><strong>4. useTransition</strong> - Keep UI responsive during expensive state updates</summary>

### Core Concepts

| Feature           | Purpose                                | Returns                        | Usage                                  |
|-------------------|----------------------------------------|--------------------------------|----------------------------------------|
| `useTransition`   | Mark state updates as non-urgent       | `[isPending, startTransition]` | Keep UI responsive during slow updates |
| `isPending`       | Indicates if transition is in progress | `boolean`                      | Show loading indicators                |
| `startTransition` | Wrap slow state updates                | `(callback) => void`           | Updates inside won't block UI          |

### The Problem Without Transitions

```tsx
"use client";
function WithoutTransition() {
  const [filteredList, setFilteredList] = useState(items); // 10,000 items
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);           // ⚠️ UI BLOCKS here
    setFilteredList(                         // Expensive filtering (300ms+)
      items.filter(item => item.name.includes(e.target.value))
    );
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleSearch} />
      {/* Input feels laggy - can't type smoothly! */}
      {filteredList.map(item => <div>{item.name}</div>)}
    </div>
  );
}
```

**Result:** Input field lags/stutters because React blocks to render 10,000 items on every keystroke.

### The Solution With Transitions

```tsx
"use client";
import { useTransition } from "react";

function WithTransition() {
  const [filteredList, setFilteredList] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);          // ✅ Updates immediately (urgent)

    startTransition(() => {                 // ✅ Non-blocking (non-urgent)
      setFilteredList(                      // Expensive filtering happens in background
        items.filter(item => item.name.includes(e.target.value))
      );
    });
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleSearch} />
      {/* Input stays responsive! */}
      {isPending && <div>Filtering...</div>}
      {filteredList.map(item => <div>{item.name}</div>)}
    </div>
  );
}
```

**Result:** Input field stays smooth! Filter results update slightly delayed but UI never blocks.

### Key Learnings

**✅ What Works:**

- **Separate urgent from non-urgent updates** - Input state (urgent) vs filtered results (non-urgent)
- **`startTransition` keeps UI responsive** - Expensive updates don't block user input
- **`isPending` for loading states** - Show "Filtering..." or skeleton UI
- **Works with any expensive computation** - Filtering large lists, complex calculations, heavy renders
- **No async needed** - `startTransition` is for synchronous expensive updates

**⚠️ Common Gotchas:**

- **Don't wrap controlled input state** - `setSearchTerm` should NOT be in `startTransition` (needs immediate update)
- **Only for non-urgent updates** - If user expects immediate feedback, don't use transitions
- **Not for async operations** - `startTransition` callback must be synchronous (can't use `async/await`)
- **State updates only** - Can't wrap side effects like `fetch` directly
- **Multiple state updates in one transition** - All updates inside `startTransition` are treated as one transition

**🎯 When to Use Transitions:**

| Scenario                          | Use Transition? | Why                                       |
|-----------------------------------|-----------------|-------------------------------------------|
| Search filtering 10,000+ items    | ✅ Yes           | Keeps input responsive while filtering    |
| Tab switching with heavy content  | ✅ Yes           | Old tab stays visible while new tab loads |
| Sorting/paginating large datasets | ✅ Yes           | UI doesn't freeze during re-render        |
| Simple form input                 | ❌ No            | Input should respond immediately          |
| Navigation/routing                | ❌ No            | Next.js handles this automatically        |
| Async data fetching               | ❌ No            | Use Suspense + Server Components instead  |

**📊 With vs Without Transitions:**

| Aspect                   | Without Transition    | With Transition               |
|--------------------------|-----------------------|-------------------------------|
| **Input responsiveness** | ❌ Blocks/lags         | ✅ Smooth/instant              |
| **Update timing**        | Immediate (but janky) | Slightly delayed (but smooth) |
| **User experience**      | Feels slow            | Feels fast                    |
| **Loading indicator**    | Hard to show          | ✅ `isPending` available       |
| **Code complexity**      | Simple                | Slightly more complex         |

**🔄 How It Works Internally:**

```tsx
// Without transition (blocking)
User types "a" → setSearchTerm("a") → setFilteredList (300ms) → Re-render → UI updates
                                     ↑ User is blocked here! Can't type next character

// With transition (non-blocking)
User types "a" → setSearchTerm("a") → Re-render input immediately → User can type next character
                                   → startTransition → setFilteredList (300ms, in background)
                                                    → Re-render list when ready
```

**💡 Mental Model:**

Think of transitions like putting a task in the background:
- **Urgent:** "User is typing, update input NOW!"
- **Non-urgent:** "Filter results when you get a chance, but don't block the user"

React prioritizes urgent updates over non-urgent ones, keeping UI responsive.

**🎓 Common Confusion Points:**

1. **"Can I use async/await in startTransition?"**
   - ❌ No! The callback must be synchronous
   - For async operations, use Suspense or manual loading states

2. **"Should I wrap my fetch() in startTransition?"**
   - ❌ No! Transitions are for synchronous expensive state updates
   - Fetch is async - use Suspense + Server Components instead

3. **"Why is my input state inside startTransition not updating?"**
   - Transitions deprioritize updates - controlled inputs need immediate updates
   - Move `setSearchTerm` OUTSIDE `startTransition`

4. **"What's the difference between isPending and loading state?"**
   - `isPending`: Automatically true when transition is active
   - `loading`: Manual state you control (for async operations)

### Demo: `http://localhost:3000/transitions-demo`

**Try it yourself:**
- Type in the **left input (Without Transition)** - Notice the lag/jank
- Type in the **right input (With Transition)** - Feels smooth!
- Both filter 10,000 items with 300ms simulated delay

[Official Docs](https://react.dev/reference/react/useTransition)

</details>

---

<details>
<summary><strong>5. Error Handling (error.tsx, global-error.tsx)</strong> - Error boundaries, client vs server errors, and async error handling</summary>

### Core Concepts

| Feature            | Purpose                           | Placement               | Must Include                       |
|--------------------|-----------------------------------|-------------------------|------------------------------------|
| `error.tsx`        | Route-level error boundary        | `app/[route]/error.tsx` | `"use client"` directive           |
| `global-error.tsx` | Root layout error boundary        | `app/global-error.tsx`  | `"use client"`, `<html>`, `<body>` |
| `error` prop       | Error object from boundary        | Both files              | `Error` type with `.message`       |
| `reset()` prop     | Re-render error boundary children | Both files              | Resets component state to initial  |

### Error Boundary Scope

```
app/layout.tsx                    ← global-error.tsx catches this
  └── app/error-demo/layout.tsx   ← error.tsx CANNOT catch this!
      └── app/error-demo/page.tsx ← error.tsx catches this ✓
```

**Key Rule:** error.tsx catches errors in its children, but NOT in layout.tsx at the same level.

### What Error Boundaries Catch

| Error Type                           | Caught by error.tsx? | How to Test                                             |
|--------------------------------------|----------------------|---------------------------------------------------------|
| **Rendering errors** (Server/Client) | ✅ Yes                | `throw new Error()` in component body                   |
| **Event handler errors**             | ❌ No                 | `onClick={() => throw Error()}` - won't work!           |
| **Async errors in event handlers**   | ❌ No                 | `onClick={async () => { await fetch() }}` - won't work! |

### Recommended Setup

```typescript
// 1. error.tsx - Route-level error boundary
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}

// 2. global-error.tsx - Root layout error boundary
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>Application Error</h1>
          <p>{error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      </body>
    </html>
  );
}

// 3. Triggering errors during render (works with error boundaries)

// Server Component - async error
async function ServerComponent() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  throw new Error("Server error!"); // ✅ Caught by error.tsx
  return <div>Won't render</div>;
}

// Client Component - state-based error
"use client";
function ClientComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("Client error!"); // ✅ Caught by error.tsx
  }

  return <button onClick={() => setShouldError(true)}>Trigger Error</button>;
}

// 4. Async errors in event handlers (requires manual handling)
"use client";
function AsyncErrorComponent() {
  const [shouldError, setShouldError] = useState(false);

  // Error thrown during render - caught by error boundary
  if (shouldError) {
    throw new Error("Async fetch failed!");
  }

  const handleClick = async () => {
    const response = await fetch('/api/data');
    if (!response.ok) {
      setShouldError(true); // Triggers re-render that throws
    } else {
      const data = await response.json();
    }
  };

  return <button onClick={handleClick}>Fetch Data</button>;
}
```

### Key Learnings

**✅ What Works:**

- **error.tsx must be Client Component** - Needs interactivity (reset button) and React error boundaries
- **loading.tsx is Server Component** - Just static UI, no interactivity needed (they're opposites!)
- **Rendering errors are caught** - Both server and client component errors during render
- **State-based pattern for event handlers** - Set state in onClick, throw during render
- **reset() resets state** - Unmounts and remounts components with fresh initial state
- **global-error.tsx needs `<html>` and `<body>`** - Replaces root layout when active
- **Server errors reach client boundaries** - Next.js serializes server errors and sends to client error.tsx

**⚠️ Common Gotchas:**

- **❌ WRONG ASSUMPTION: "Client Component errors aren't caught"**
  - Reality: error.tsx catches BOTH client and server component errors
  - The key is WHEN the error happens (rendering vs event handler), NOT WHERE (client vs server)
- **Event handler errors NOT caught** - `onClick={() => throw Error()}` bypasses error boundary
- **Async errors in event handlers NOT caught** - Need manual try/catch or state pattern
- **error.tsx can't catch same-level layout.tsx** - Error boundaries only catch children, not siblings
- **global-error.tsx only shows in production** - Dev mode shows Next.js error overlay instead
- **Don't throw directly in page.tsx for testing** - Page will always error! Use conditional (searchParams, state)
- **setState doesn't stop function execution** - After `setShouldError(true)`, code continues! Use `return` or `else`
- **reset() with unconditional errors creates loop** - If error always happens during render, reset triggers same error

**🎯 Client vs Server - The Real Distinction:**

| Aspect                           | Client Component | Server Component                   |
|----------------------------------|------------------|------------------------------------|
| **Can be async?**                | ❌ No             | ✅ Yes                              |
| **Errors during render caught?** | ✅ Yes            | ✅ Yes                              |
| **Event handler errors caught?** | ❌ No             | N/A (no event handlers)            |
| **Execution location**           | Browser          | Server (then serialized to client) |

**🔄 How reset() Works:**

```tsx
// Before reset
<ErrorBoundary>
  <ComponentWithError shouldError={true} /> {/* Has error state */}
</ErrorBoundary>

// After clicking reset
<ErrorBoundary>
  <ComponentWithError shouldError={false} /> {/* Fresh instance! */}
</ErrorBoundary>
```

1. Unmounts errored component
2. Remounts with initial state
3. If error condition still exists → errors again immediately!

**📊 Error Boundaries vs Try/Catch:**

| Error Type             | Handle With                | Why                                      |
|------------------------|----------------------------|------------------------------------------|
| Rendering errors       | error.tsx                  | React error boundaries designed for this |
| Event handler errors   | Try/catch or state pattern | Error boundaries don't catch these       |
| Async errors in events | Try/catch or state pattern | Outside render phase                     |
| Server Action errors   | Server Action return value | Can't use error boundaries               |

**🎓 Common Confusion Points:**

1. **"Why doesn't my onClick error show error.tsx?"**
   - Event handlers run AFTER rendering, outside error boundary scope
   - Solution: Use state to trigger a render error

2. **"Why do I see red overlay instead of global-error.tsx?"**
   - Development mode prioritizes debugging
   - Production shows your custom error UI

3. **"When does global-error.tsx actually activate?"**
   - Only when root `app/layout.tsx` throws an error
   - Very rare in practice - most errors caught by route-level error.tsx

4. **"Why does reset() not work for my error?"**
   - If error happens unconditionally during render, reset just re-renders → same error
   - Need to fix the error condition or make it conditional

### Testing Different Error Scenarios

```tsx
// Test with searchParams (conditional server error)
async function Page({ searchParams }) {
  const { error } = await searchParams;

  if (error) {
    await new Promise(r => setTimeout(r, 1000));
    throw new Error("Server error triggered!"); // Test server error
  }

  return <ClientErrorButton />; // Test client error
}

// Visit /error-demo?error=true → server error
// Visit /error-demo → click button → client error
```

### Demo: `http://localhost:3000/error-demo`

**Test scenarios:**
- `/error-demo` - Normal page with client error button
- `/error-demo?error=true` - Server-side error during render
- Click "Trigger Client-Side Error" - Client error during render (state-based)
- Click "Call Fake API" - Async error in event handler (state-based)

[Official Docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

</details>

---

<details>
<summary><strong>8. Intercepting Routes</strong> - Show modals on navigation, full pages on direct visits/refresh</summary>

### Core Concepts

| Feature             | Purpose                                       | Convention                                | Behavior                 |
|---------------------|-----------------------------------------------|-------------------------------------------|--------------------------|
| Intercepting Routes | Show different UI based on navigation context | Folder prefix: `(.)`, `(..)`, `(...)`     | Same URL, different view |
| `(.)`               | Intercept routes at the **same level**        | `(.)photos/[id]` intercepts `photos/[id]` | Most common pattern      |
| `(..)`              | Intercept routes **one level up**             | `(..)dashboard` intercepts `../dashboard` | For nested routes        |
| `(..)(..)`          | Intercept routes **two levels up**            | `(..)(..)settings`                        | Rare, deep nesting       |
| `(...)`             | Intercept from **app root**                   | `(...)admin` intercepts `/admin`          | Global interception      |

### The "Aha Moment"

**Same URL, Different UI:**

```
Scenario 1: Click photo from gallery
  → Navigate to /photos/15
  → Next.js checks: Is there a (.)photos/[id] route?
  → YES! Show modal (intercepting route)
  → URL in browser: /photos/15
  → UI: Modal overlay

Scenario 2: Refresh page or direct visit
  → Visit /photos/15 directly
  → Next.js checks: Is there a (.)photos/[id] route?
  → NO navigation happened, so NO interception
  → Show full page (photos/[id]/page.tsx)
  → URL in browser: /photos/15
  → UI: Full page layout
```

**Key Insight:** Interception only happens during Link navigation, NOT on direct visits or page refreshes.

### Recommended Setup

```typescript
// Folder structure
app/
  intercepting-parallel-demo/
    page.tsx                    // Photo grid
    photos/
      [id]/
        page.tsx                // Full page view (direct visit/refresh)
    (.)photos/
      [id]/
        page.tsx                // Modal view (intercepted navigation)

// 1. Gallery page with Links
// app/intercepting-parallel-demo/page.tsx
import Link from "next/link";

const PHOTOS = Array.from({length: 16}, (_, i) => ({
  id: (10 + i).toString(),
  title: `Photo ${i + 1}`,
  url: `https://picsum.photos/id/${10 + i}/900/900`,
}));

export default function Gallery() {
  return (
    <div>
      {PHOTOS.map((photo) => (
        <Link key={photo.id} href={`/intercepting-parallel-demo/photos/${photo.id}`}>
          <Image src={photo.url} alt={photo.title} />
        </Link>
      ))}
    </div>
  );
}

// 2. Full page view (shown on direct visit/refresh)
// app/intercepting-parallel-demo/photos/[id]/page.tsx
export default async function PhotoDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <Link href="/intercepting-parallel-demo">← Back to Gallery</Link>
      <h1>Photo {id}</h1>
      <Image src={`https://picsum.photos/id/${id}/1200/800`} alt={`Photo ${id}`} />
      {/* Full page layout with details */}
    </div>
  );
}

// 3. Modal view (shown on Link navigation from gallery)
// app/intercepting-parallel-demo/(.)photos/[id]/page.tsx
"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>; // IMPORTANT: params is a Promise in Next.js 15+
};

export default function PhotoModal({ params }: Props) {
  const router = useRouter();
  const { id } = use(params); // Unwrap Promise with use()

  return (
    <div className="fixed inset-0 bg-black/90 z-50" onClick={() => router.back()}>
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => router.back()}>×</button>
        <Image src={`https://picsum.photos/id/${id}/1200/800`} alt={`Photo ${id}`} fill />
      </div>
    </div>
  );
}
```

### Key Learnings

**✅ What Works:**

- **`(.)` is the interceptor indicator** - Tells Next.js to intercept navigation to matching route
- **Must use `<Link>` components** - Intercepting only works with Link navigation, not direct URL visits
- **Same URL, different views** - `/photos/15` can show modal OR full page depending on how you got there
- **Browser back button works** - `router.back()` closes modal and returns to gallery
- **Default export required** - Page components MUST use `export default`, not named exports
- **`params` is a Promise in Next.js 15+** - Must unwrap with `use(params)` or `await params`
- **Client component for interactivity** - Modal needs `"use client"` for `onClick`, `useRouter()`, etc.
- **Server component possible** - Can use `<Link>` for close button instead of `router.back()` for pure server component

**⚠️ Common Gotchas:**

- **❌ Named export doesn't work** - `export { PhotoModal }` won't be recognized as a page
  - ✅ Must use `export default PhotoModal`
- **Gallery NOT visible behind modal** - Without parallel routes, the intercepting route REPLACES the page content
  - The modal is just **styled** to look like a modal (fixed positioning, overlay)
  - To have BOTH gallery AND modal visible simultaneously, you need **Parallel Routes** (Phase 2)
- **`params` type confusion** - Must be `Promise<{ id: string }>` not `{ id: string }`
  - ❌ `const { id } = params;` → TypeScript error
  - ✅ `const { id } = use(params);` → Correct
- **Interception only on navigation** - Direct URL visits and refreshes bypass interception
  - Test by clicking from gallery (shows modal)
  - Then refresh (shows full page) - same URL!
- **Click-outside-to-close requires client component** - Server components can't use `onClick` handlers
  - Client component: `router.back()` on overlay click ✅
  - Server component: Only `<Link>` for close button (no click-outside) ❌

**🎯 Server Component vs Client Component for Modals:**

| Aspect                     | Client Component                        | Server Component                  |
|----------------------------|-----------------------------------------|-----------------------------------|
| **Directive**              | `"use client"`                          | No directive (default)            |
| **Close mechanism**        | `router.back()` on button/overlay click | `<Link href="/gallery">` only     |
| **Click-outside-to-close** | ✅ Yes - use `onClick` on overlay        | ❌ No - can't use `onClick`        |
| **params handling**        | `use(params)`                           | `await params`                    |
| **When to use**            | Need interactivity (click handlers)     | Pure navigation, no interactivity |

**📊 Navigation Context Matters:**

| How You Got There           | Route Shown               | Why                                       |
|-----------------------------|---------------------------|-------------------------------------------|
| Click `<Link>` from gallery | `(.)photos/[id]` (modal)  | Intercepting route catches navigation     |
| Direct URL visit in browser | `photos/[id]` (full page) | No navigation, no interception            |
| Refresh page                | `photos/[id]` (full page) | Page reload, no navigation context        |
| Browser back from modal     | Gallery page              | `router.back()` returns to previous page  |
| Share URL with friend       | `photos/[id]` (full page) | They're visiting directly, not navigating |

**💡 Mental Model:**

Think of intercepting routes like a "navigation trap":

```
User clicks Link → Next.js: "Wait! Before showing photos/[id],
                            let me check if there's an interceptor..."
                  → Finds (.)photos/[id]
                  → Shows modal instead

User types URL   → Next.js: "No navigation happened, no interception"
                  → Shows photos/[id] normally (full page)
```

The `(.)` prefix is a special folder naming convention that Next.js recognizes as an interceptor.

**🎓 Common Confusion Points:**

1. **"Why don't I see the gallery behind the modal?"**
   - The intercepting route **replaces** the page content, it doesn't render on top
   - You've only styled it with `fixed` positioning to look like a modal
   - To have BOTH visible, you need **Parallel Routes** (covered in Phase 2)

2. **"Why does my modal show as a full page on refresh?"**
   - This is expected! Refresh = page reload = no navigation = no interception
   - Intercepting only happens during **Link navigation**, not direct visits

3. **"Can't I just use named export for the page?"**
   - No! Next.js pages **must** use `export default`
   - Named exports (`export { Component }`) won't be recognized as pages

4. **"Why is params a Promise? It used to be a regular object!"**
   - Next.js 15+ made `params` async for performance optimizations
   - Must unwrap with `use(params)` in client components or `await params` in server components

5. **"What's the difference between (.) and (..)?"**
   - `(.)` - Same level: `(.)photos` intercepts `photos` in same folder
   - `(..)` - One level up: `(..)dashboard` intercepts `../dashboard`
   - `(...)` - App root: `(...)admin` intercepts `/admin` from anywhere

6. **"Can I test interception with browser address bar?"**
   - No! Typing URLs directly = no navigation = no interception
   - Must click `<Link>` components to trigger interception

**🔄 Testing Interception Behavior:**

```tsx
// Test 1: Click from Gallery (Interception works)
1. Go to /intercepting-parallel-demo
2. Click a photo
3. URL changes to /photos/15
4. See: Modal overlay (intercepting route)

// Test 2: Refresh (No interception)
1. While modal is open, press F5
2. URL stays /photos/15
3. See: Full page view (normal route)

// Test 3: Direct Visit (No interception)
1. Open new tab
2. Type /intercepting-parallel-demo/photos/15
3. See: Full page view (normal route)

// Test 4: Back Button (Modal closes)
1. Click photo to open modal
2. Press browser back button
3. See: Gallery page (router.back() works!)
```

**🚀 Next Steps:**

Phase 1 covered **Intercepting Routes** (modals on navigation).

**Phase 2** will cover **Parallel Routes** (rendering multiple sections simultaneously), enabling:
- Gallery visible behind modal
- Independent loading states per section
- Multiple panels with independent navigation

### Demo: `http://localhost:3000/intercepting-parallel-demo`

**Test it yourself:**
- Click any photo → Modal appears, URL changes to `/photos/[id]`
- Refresh → Full page view appears, same URL
- Direct visit `/photos/15` → Full page view
- Click photo, then browser back → Returns to gallery

[Official Docs - Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

</details>

---

<details>
<summary><strong>9. Parallel Routes</strong> - Render multiple page sections simultaneously with independent loading states</summary>

### Core Concepts

| Feature         | Purpose                                                 | Convention            | Behavior                               |
|-----------------|---------------------------------------------------------|-----------------------|----------------------------------------|
| Parallel Routes | Render multiple pages in the same layout simultaneously | Folder prefix: `@`    | Slots passed as props to layout        |
| `@slotName`     | Define a slot (parallel section)                        | `@stats`, `@activity` | NOT routable - passed to parent layout |
| Slot Props      | Layout receives slots as props                          | `{ stats, activity }` | Render slots wherever you want         |
| `loading.tsx`   | Independent loading state per slot                      | `@stats/loading.tsx`  | Each slot can have its own loading UI  |
| `page.tsx`      | Default content for slot                                | `@stats/page.tsx`     | Shows when no nested route active      |

### The Key Difference

**Parallel Routes vs Route Groups:**

| Aspect | Route Groups `()` | Parallel Routes `@` |
|--------|-------------------|---------------------|
| **URL routing** | ✅ Still routable | ❌ NOT routable |
| **Purpose** | Organize files | Create slots for parallel rendering |
| **Example** | `(auth)/login` → `/login` | `@stats` → No URL, it's a prop! |

**The `@` prefix means:** "This is a slot, not a route. Pass it to parent layout as a prop."

### The "Aha Moment"

**Multiple sections loading independently:**

```
Visit: /dashboard

Without Parallel Routes:
  → Wait 5 seconds
  → Everything appears at once

With Parallel Routes:
  → Page header appears instantly
  → Stats loading skeleton (2s)
  → Activity loading skeleton (4s)
  → Stats data appears at 2s ⚡
  → Stats is done, activity still loading!
  → Activity data appears at 4s ⚡
```

**Key Insight:** Each slot loads independently - fast slots don't wait for slow ones!

### Recommended Setup

```typescript
// Folder structure
app/
  dashboard/
    @stats/
      page.tsx          // Stats slot content
      loading.tsx       // Stats loading state
    @activity/
      page.tsx          // Activity slot content
      loading.tsx       // Activity loading state
    layout.tsx          // Receives both slots as props
    page.tsx            // Main content

// 1. Stats Slot with async data fetching
// app/dashboard/@stats/page.tsx
async function getStats() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
  return {
    activeUsers: 1234,
    revenue: 5678,
  };
}

export default async function StatsSlot() {
  const stats = await getStats();

  return (
    <div>
      <h2>Key Metrics</h2>
      <p>Active Users: {stats.activeUsers}</p>
      <p>Revenue: ${stats.revenue}</p>
    </div>
  );
}

// 2. Stats Loading State
// app/dashboard/@stats/loading.tsx
export default function StatsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-6 bg-gray-300 rounded w-1/2" />
    </div>
  );
}

// 3. Activity Slot with slower loading
// app/dashboard/@activity/page.tsx
async function getActivity() {
  await new Promise(resolve => setTimeout(resolve, 4000)); // 4s delay
  return [
    { id: 1, action: 'User signed up', time: '2m ago' },
    { id: 2, action: 'New purchase', time: '5m ago' },
  ];
}

export default async function ActivitySlot() {
  const activities = await getActivity();

  return (
    <div>
      <h2>Recent Activity</h2>
      {activities.map(a => (
        <p key={a.id}>{a.action} - {a.time}</p>
      ))}
    </div>
  );
}

// 4. Activity Loading State
// app/dashboard/@activity/loading.tsx
export default function ActivityLoading() {
  return (
    <div className="animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-6 bg-gray-200 rounded mb-2" />
      ))}
    </div>
  );
}

// 5. Layout receives slots as props
// app/dashboard/layout.tsx
type LayoutProps = {
  children: React.ReactNode;
  stats: React.ReactNode;      // From @stats
  activity: React.ReactNode;   // From @activity
};

export default function DashboardLayout({ children, stats, activity }: LayoutProps) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2 gap-4">
        <div>{stats}</div>      {/* Renders @stats slot */}
        <div>{activity}</div>   {/* Renders @activity slot */}
      </div>
    </div>
  );
}

// 6. Main page content
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  );
}
```

### Key Learnings

**✅ What Works:**

- **`@` folders are NOT routes** - `@stats` doesn't create `/dashboard/stats` URL
- **Slots are props** - Layout receives `stats` and `activity` as React props
- **Independent loading states** - Each slot can have its own `loading.tsx`
- **Server components by default** - Slots can be async server components
- **Page.tsx required at route level** - Without `dashboard/page.tsx`, route returns 404
- **All slots render simultaneously** - They're truly parallel, not sequential
- **Slots can have error boundaries** - Each slot can have its own `error.tsx`

**⚠️ Common Gotchas:**

- **❌ WRONG: "@stats creates /dashboard/stats URL"**
  - Reality: `@` folders are NOT routable - they're slots, not routes
  - To access: The slot is rendered automatically in the layout, no URL needed
- **Without page.tsx at route level → 404** - `dashboard/page.tsx` is required to make `/dashboard` a valid route
  - Slots alone don't create routes!
- **All slots wait for each other without loading.tsx** - Add `loading.tsx` per slot for independent loading
  - Without it, Next.js waits for ALL slots before rendering anything
- **Lazy loading vs Parallel Routes confusion** - They serve different purposes:
  - Lazy Loading: Load JavaScript code on demand (code splitting)
  - Parallel Routes: Load data independently with separate loading states
- **Suspense alone can achieve similar results** - But Parallel Routes add:
  - Clear folder structure (`@slots`)
  - URL-based routing inside slots (Phase 3!)
  - `default.tsx` fallback system

**🎯 Parallel Routes vs Other Patterns:**

| Pattern               | Purpose                               | Use Case                             |
|-----------------------|---------------------------------------|--------------------------------------|
| **Parallel Routes**   | Independent data loading & navigation | Dashboard with multiple data sources |
| **Suspense**          | Loading boundaries                    | Simple loading states                |
| **Lazy Loading**      | Code splitting                        | Heavy libraries (charts, maps)       |
| **Route Groups `()`** | File organization                     | Group routes without affecting URLs  |

**📊 Loading Behavior:**

| Setup                          | Behavior                                                       |
|--------------------------------|----------------------------------------------------------------|
| No `loading.tsx` files         | All slots block each other - nothing shows until all are ready |
| With `loading.tsx` per slot    | Each slot shows loading → data independently                   |
| One slot without `loading.tsx` | That slot blocks everything else                               |

**💡 Mental Model:**

Think of slots like **picture frames on a wall**:
- Each frame (`@stats`, `@activity`) holds a different picture
- They're all visible at the same time (parallel)
- Each picture can load at its own pace (independent)
- The layout decides where to hang each frame

**🎓 Common Confusion Points:**

1. **"Can I visit /dashboard/stats directly?"**
   - No! `@stats` is not a route, it's a slot
   - The slot is automatically rendered when you visit `/dashboard`

2. **"What's the difference between @stats and (stats)?"**
   - `@stats` = Parallel slot (passed as prop to layout, NOT routable)
   - `(stats)` = Route group (still routable, just organizational)

3. **"Why do I need page.tsx if I have slots?"**
   - Slots don't create routes - they're just sections within a route
   - `page.tsx` is required to make the route exist

4. **"Can I achieve the same with Suspense?"**
   - For basic independent loading: Yes
   - But Parallel Routes add nested navigation (Phase 3!), `default.tsx`, and better structure

5. **"What happens if I don't provide loading.tsx?"**
   - Next.js waits for all slots to finish before rendering anything
   - User sees blank page until slowest slot completes

**🔄 How It Works:**

```typescript
// Visit: /dashboard

Step 1: Next.js checks for page.tsx
  ✅ Found: dashboard/page.tsx

Step 2: Look for layout.tsx
  ✅ Found: dashboard/layout.tsx

Step 3: Check layout props
  - Sees `stats` prop → Look for @stats/page.tsx ✅
  - Sees `activity` prop → Look for @activity/page.tsx ✅

Step 4: Start rendering
  - Render page.tsx (children) → Shows immediately
  - Start @stats/page.tsx (async) → Shows loading.tsx
  - Start @activity/page.tsx (async) → Shows loading.tsx

Step 5: Data arrives
  - @stats finishes (2s) → Replace loading with real data
  - @activity finishes (4s) → Replace loading with real data
```

### Demo (Phase 2): `http://localhost:3000/intercepting-parallel-demo/parallel`

**Test it yourself:**
- Visit the page - see both loading skeletons
- Stats appears at ~2 seconds
- Activity still loading (independent!)
- Activity appears at ~4 seconds
- Refresh and observe the same behavior

---

### **Phase 3: Parallel Routes + Navigation (Tabs with Independent Slot Content)**

**Advanced Pattern:** Combine parallel routes with nested navigation inside slots!

**Use Case:** Settings page with tabs - each tab section loads independently:
- **3 parallel slots:** `@account`, `@billing`, `@notifications`
- **Nested routes inside slots:** `/profile`, `/security`, `/payment-methods`, etc.
- **Tabbed navigation:** Click tabs to change slot content while keeping all 3 visible

#### Folder Structure (Phase 3)

```
app/intercepting-parallel-demo/settings/
├── @account/
│   ├── page.tsx                    ← Default account content
│   ├── default.tsx                 ← Fallback when route doesn't match
│   ├── profile/page.tsx            ← /settings/profile
│   └── security/page.tsx           ← /settings/security
├── @billing/
│   ├── page.tsx
│   ├── default.tsx
│   ├── payment-methods/page.tsx    ← /settings/payment-methods
│   └── invoices/page.tsx           ← /settings/invoices
├── @notifications/
│   ├── page.tsx
│   ├── default.tsx
│   └── preferences/page.tsx        ← /settings/preferences
├── layout.tsx                      ← Renders tabs + all 3 slots
├── page.tsx                        ← Main settings content
└── [...slug]/page.tsx              ← Catch-all for direct visits
```

#### Key Concepts (Phase 3)

**1. `default.tsx` - The Fallback System** ⚠️

When navigating to a route that doesn't exist in a slot, Next.js needs a fallback:

```typescript
// @account/default.tsx
export default function AccountDefault() {
  return null; // Don't render anything for this slot
}
```

**Why needed?**
- Visit `/settings/payment-methods` (billing route)
- `@billing` slot has `payment-methods/page.tsx` ✅
- `@account` slot has NO `payment-methods/page.tsx` ❌ → Needs `default.tsx`!

**2. Catch-all Route `[...slug]/page.tsx`** 🎯

Required for direct URL visits to work:

```typescript
// [...slug]/page.tsx
export default function CatchAll() {
  return null; // Just enables routing, layout handles rendering
}
```

**Why needed?**
- Direct visit `/settings/profile` would 404 without it
- The catch-all makes the route valid, layout renders the slots

**3. Tabbed Navigation with `usePathname()`**

```typescript
"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SettingsLayout({ children, account, billing, notifications }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Security', href: '/settings/security' },
    { name: 'Payment', href: '/settings/payment-methods' },
    { name: 'Invoices', href: '/settings/invoices' },
    { name: 'Preferences', href: '/settings/preferences' },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={pathname === tab.href ? 'active' : ''}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* All 3 slots visible at once */}
      <div className="grid grid-cols-3 gap-6">
        {account}
        {billing}
        {notifications}
      </div>
    </div>
  );
}
```

### Demo (Phase 3): `http://localhost:3000/intercepting-parallel-demo/settings/profile`

**Test it yourself:**
- Click different tabs - watch URL change and slot content update
- All 3 slots stay visible throughout navigation
- Refresh page - works because of catch-all route
- Direct visit different URLs - works!

---

### **Phase 4: Combining Intercepting Routes + Parallel Routes** 🎯

**The Power Move:** Use **both** intercepting routes AND parallel routes together!

**Use Case:** E-commerce product modal with 3 independent sections (details, reviews, related products):
- **Click from grid** → Modal with 3 parallel slots
- **Direct visit/refresh** → Full page with same 3 slots
- **Same data, different layouts!**

#### Folder Structure (Phase 4)

```
app/intercepting-parallel-demo/products-demo/
├── page.tsx                               ← Product grid
├── products/[productId]/                  ← Full page route
│   ├── @details/page.tsx                  ← Product details slot
│   ├── @reviews/page.tsx                  ← Reviews slot
│   ├── @related/page.tsx                  ← Related products slot
│   ├── layout.tsx                         ← Full page layout (vertical stack)
│   └── page.tsx                           ← Main content
└── (.)products/[productId]/               ← Intercepting route (MODAL!)
    ├── @details/page.tsx                  ← Same details slot
    ├── @reviews/page.tsx                  ← Same reviews slot
    ├── @related/page.tsx                  ← Same related slot
    ├── layout.tsx                         ← MODAL layout (backdrop + centered)
    └── page.tsx                           ← Main content
```

#### Key Concepts (Phase 4)

**1. Shared Components Pattern** ✅

Both routes use the SAME slot content by importing shared components:

```typescript
// components/intercepting-parallel-demo/ProductDetailsContent.tsx
export async function ProductDetailsContent({ params }: Props) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Independent 2s delay
  const { productId } = await params;
  const product = await getProduct('general', productId);
  return (/* Product details UI */);
}

// Both slots import the same component:
// products/[productId]/@details/page.tsx
// (.)products/[productId]/@details/page.tsx
import { ProductDetailsContent } from '@/components/intercepting-parallel-demo/ProductDetailsContent';

export default async function DetailsSlot({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
```

**Why?** No code duplication! Same data, same UI, different layouts.

**2. Independent Loading States** ⏱️

Each slot has its own loading delay:
- `@details`: 2s delay
- `@reviews`: 3s delay
- `@related`: 4s delay

**Result:** Progressive rendering - users see content as it loads!

**3. The ONLY Difference: Layout** 🎨

```typescript
// products/[productId]/layout.tsx (Full Page)
export default function ProductDetailsLayout({ children, details, reviews, related }) {
  return (
    <div className="p-4 flex flex-col gap-6">
      {children}
      {details}
      {reviews}
      {related}
    </div>
  );
}

// (.)products/[productId]/layout.tsx (MODAL)
"use client"; // ← Must be client component for useRouter!

export default function ProductDetailsLayout({ children, details, reviews, related }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black/60" onClick={(e) => {
      if (e.target === e.currentTarget) router.back(); // Click outside to close
    }}>
      <div className="relative max-w-6xl max-h-[90vh] overflow-y-auto">
        <button onClick={() => router.back()}>✕</button>
        <div className="p-6 flex flex-col gap-6">
          {children}
          {details}
          {reviews}
          {related}
        </div>
      </div>
    </div>
  );
}
```

**Key Differences:**
- Full page: Server component, simple stack
- Modal: Client component (`"use client"`), backdrop, close handlers

**4. React `cache()` for Performance** ⚡

```typescript
// lib/queries/amazon.queries.ts
import { cache } from 'react';
import { connectDB, getClient } from "@/lib/connectDB";

// Cached function - prevents duplicate MongoDB queries across slots
export const getProduct = cache(async (collection: string, productId: string) => {
  await connectDB();
  const db = getClient().db('amazon');
  const document = await db.collection(collection).findOne({ 
    _id: new ObjectId(productId) 
  });
  return JSON.parse(JSON.stringify(document));
});
```

**Result:** When `@details` and `@reviews` slots both call `getProduct()`, only **1 MongoDB query** is executed, even though they load independently!

#### How It Works (Phase 4)

| Action | Route | Layout | Behavior |
|--------|-------|--------|----------|
| Click product from grid | `(.)products/[productId]` | Modal layout | Intercepting route catches navigation → Shows modal |
| Direct visit URL | `products/[productId]` | Full page layout | No interception → Shows full page |
| Refresh while on product | `products/[productId]` | Full page layout | No navigation context → Shows full page |
| Click X or outside modal | - | - | `router.back()` → Returns to grid |

### Demo (Phase 4): `http://localhost:3000/intercepting-parallel-demo/products-demo`

**Test it yourself:**

1. **Click vs Direct Visit:**
   - Click product from grid → Should show MODAL
   - Copy URL → Paste in new tab → Should show FULL PAGE
   - Click product → Refresh page → Should show FULL PAGE

2. **Modal Interaction:**
   - Click X button → Should return to grid
   - Click outside modal → Should return to grid
   - Browser back button → Should return to grid

3. **Independent Slot Loading:**
   - Watch slots load progressively: Details (2s) → Reviews (3s) → Related (4s)
   - Modal and full page both show same 3 slots with independent loading

4. **Same Components, Different Layouts:**
   - Modal: Centered with backdrop, close button
   - Full page: Vertical stack, no backdrop

---

### 🚀 Summary: All 4 Phases

You now understand:
- ✅ **Phase 1:** Intercepting Routes (modals on navigation) - See section 8
- ✅ **Phase 2:** Parallel Routes (simultaneous sections with independent loading)
- ✅ **Phase 3:** Parallel Routes + Navigation (tabs with independent slot content)
- ✅ **Phase 4:** Combining Intercepting + Parallel Routes (modal with multiple independent slots)

[Official Docs - Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

</details>

---

<details>
<summary><strong>11. router.refresh() vs revalidatePath()</strong> - Client-side refresh vs server-side cache invalidation</summary>

### Core Concepts

| Method                  | Side          | Purpose                                    | Cache Behavior                  |
|-------------------------|---------------|--------------------------------------------|---------------------------------|
| `router.refresh()`      | Client        | Re-render current route, refetch data      | **Respects cache** (no purge)   |
| `revalidatePath(path)`  | Server        | Invalidate cache, force regeneration       | **Purges cache** (full refresh) |

### Key Difference

**`router.refresh()`:**
- Re-renders the page and refetches Server Component data
- **Keeps cached data cached** - only uncached data refreshes
- Useful for showing fresh dynamic data without busting static caches

**`revalidatePath()`:**
- Invalidates the cache and forces fresh regeneration
- **Everything refreshes** - both cached and uncached data
- Necessary after mutations (e.g., editing a blog post)

### Implementation Pattern

```typescript
// lib/queries/time.queries.ts
"use server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Cached function - timestamp persists across requests
const getCachedTime = async () => {
    "use cache";
    return new Date();
}

// Uncached function - fresh on every render
const getUncachedTime = async () => {
    await headers(); // Opt into dynamic rendering
    return new Date();
}

// Server Action for cache invalidation
const revalidateTime = async () => {
    revalidatePath('/refresh-demo');
}
```

```tsx
// app/refresh-demo/page.tsx (Server Component)
import { getCachedTime, getUncachedTime } from "@/lib/queries/time.queries";
import { ClientRefreshButton } from "./ClientRefreshButton";

export default async function Page() {
    const cachedTime = await getCachedTime();    // Cached
    const uncachedTime = await getUncachedTime(); // Fresh

    return (
        <div>
            <p>Cached: {cachedTime.toISOString()}</p>
            <p>Uncached: {uncachedTime.toISOString()}</p>
            <ClientRefreshButton />
        </div>
    );
}
```

```tsx
// app/refresh-demo/ClientRefreshButton.tsx (Client Component)
"use client";
import { useRouter } from "next/navigation";
import { revalidateTime } from "@/lib/queries/time.queries";

export function ClientRefreshButton() {
    const router = useRouter();

    return (
        <div>
            <button onClick={() => router.refresh()}>
                Client Refresh (uncached only)
            </button>
            <button onClick={revalidateTime}>
                Server Refresh (all data)
            </button>
        </div>
    );
}
```

### When to Use Each

| Use Case                                      | Method               |
|-----------------------------------------------|----------------------|
| Refresh notifications without busting cache   | `router.refresh()`   |
| Show fresh dynamic data, keep static cached   | `router.refresh()`   |
| After editing content (need to see changes)   | `revalidatePath()`   |
| After mutations (create/update/delete)        | `revalidatePath()`   |
| Invalidate stale cached data                  | `revalidatePath()`   |

### Key Learnings

**✅ What You Need to Know:**

1. **Cache behavior is the key difference:**
   - `router.refresh()` = respects cache (cheaper, faster)
   - `revalidatePath()` = invalidates cache (necessary after mutations)

2. **Server Actions can be called from Client Components:**
   - Just import and use in `onClick` handlers
   - Pattern: Client button → Server Action → `revalidatePath()`

3. **Making data uncached:**
   - Use `await headers()` to opt into dynamic rendering
   - This forces Next.js to compute fresh values on every render
   - Avoids "Route used Date() without opting into dynamic rendering" warning

4. **onClick only works in Client Components:**
   - Can't use event handlers in Server Components
   - Server Components are for rendering, not interactivity

**⚠️ Common Gotchas:**

- Thinking `router.refresh()` clears all caches (it doesn't!)
- Using `revalidatePath()` when `router.refresh()` would suffice (wastes resources)
- Trying to use `onClick` in Server Components (won't work)
- Forgetting to use `await headers()` with dynamic data like `new Date()`
- Confusing request-level cache (`cache()`) with persistent cache (`"use cache"`)

**🎯 Real-World Examples:**

- **Dashboard:** Use `router.refresh()` to update notifications without invalidating user profile cache
- **Blog editor:** Use `revalidatePath()` after saving edits to see updated content
- **E-commerce:** Use `revalidatePath()` after adding to cart to reflect inventory changes

### Demo: `http://localhost:3000/refresh-demo`

[Official Docs - router.refresh()](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter)
[Official Docs - revalidatePath()](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

</details>

---

<details>
<summary><strong>12. nextUrl (URL vs nextUrl)</strong> - Why nextUrl is better for middleware/proxy</summary>

### Core Concepts

| Feature        | Purpose                     | Usage                                      |
|----------------|-----------------------------|--------------------------------------------|
| `nextUrl`      | Next.js-specific URL object | `request.nextUrl` in Proxy/Middleware      |
| `pathname`     | Path of the URL             | `request.nextUrl.pathname`                 |
| `searchParams` | Query parameters object     | `request.nextUrl.searchParams.get('name')` |
| `basePath`     | Configured base path of app | `request.nextUrl.basePath`                 |
| `locale`       | Current locale (i18n)       | `request.nextUrl.locale`                   |

### Why nextUrl > Native URL API?

`nextUrl` is framework-aware. It automatically handles **basePath** and **locales**, stripping them from the `pathname` so your routing logic remains consistent regardless of deployment configuration.

| Aspect       | Native `new URL(request.url)`                         | Next.js `request.nextUrl`  |
|--------------|-------------------------------------------------------|----------------------------|
| **pathname** | Includes basePath/locale (e.g., `/en/dashboard/page`) | Clean path (e.g., `/page`) |
| **Parsing**  | Manual string manipulation needed                     | Automatic                  |

### Demo Output Comparison

**1. Normal Route:** `http://localhost:3000/proxy-demo?name=Gemini&mode=teacher`

```text
--- nextUrl Inspection ---
Pathname: /proxy-demo
Search Params: name=Gemini&mode=teacher
Base Path:
Locale:

--- URL Comparison ---
NextUrl Pathname: /proxy-demo
Native Pathname: /proxy-demo
NextUrl Host: localhost:3000
Native Host: localhost:3000

GET /proxy-demo?name=Gemini&mode=teacher 200 in 64ms (compile: 3ms, proxy.ts: 7ms, render: 54ms)
```

**2. Non-existent Sub-path:** `http://localhost:3000/proxy-demo/test-sub-path`

```text
--- nextUrl Inspection ---
Pathname: /proxy-demo/test-sub-path
Search Params:
Base Path:
Locale:

--- URL Comparison ---
NextUrl Pathname: /proxy-demo/test-sub-path
Native Pathname: /proxy-demo/test-sub-path
NextUrl Host: localhost:3000
Native Host: localhost:3000

GET /proxy-demo/test-sub-path 404 in 59ms (compile: 4ms, proxy.ts: 6ms, render: 49ms)
```

### Key Learnings (Clearing Confusion)

**✅ Proxy Lifecycle:**
- The proxy runs **before** Next.js checks if a page exists. 
- `NextResponse.next()` simply tells Next.js to continue its normal routing.

**⚠️ Common Gotchas:**
- **Proxy runs first:** This is why you see logs in the console even if the browser shows a 404.
- **404 is Expected:** If you visit a path (like `/proxy-demo/test-sub-path`) that doesn't have a matching folder/file in `app/`, Next.js will 404 **after** the proxy has finished its job. `nextUrl` doesn't prevent 404s; it's just a tool for inspection.

### Demo: `http://localhost:3000/proxy-demo`

[Official Docs](https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl)

</details>

---

<details>
<summary><strong>13. Proxy (NextResponse.redirect vs NextResponse.rewrite)</strong> - Middleware replacement in Next.js 16, URL manipulation at the edge</summary>

### Core Concepts

| Feature                   | Purpose                                    | File Location                       | When It Runs                 |
|---------------------------|--------------------------------------------|-------------------------------------|------------------------------|
| `proxy.ts`                | Intercept requests before page renders     | Project root (same level as `app/`) | Before every matched request |
| `NextResponse.redirect()` | Send HTTP redirect to different URL        | Inside `proxy()` function           | Browser sees new URL         |
| `NextResponse.rewrite()`  | Serve different content, keep original URL | Inside `proxy()` function           | Browser sees original URL    |
| `NextResponse.next()`     | Pass through, don't modify request         | Inside `proxy()` function           | Continue to page normally    |
| `config.matcher`          | Filter which routes trigger proxy          | Export from `proxy.ts`              | Limits proxy execution scope |

### Key Distinction: redirect vs rewrite

**Real-world Analogy:**

- **Redirect:** You call a store, they say "We moved! Call this new number instead." You hang up and dial the new number. (You know you're calling somewhere else)
- **Rewrite:** You call a store, they secretly forward your call to another department. You never know you're not talking to the original number. (Transparent to you)

| Aspect              | `redirect()`                                 | `rewrite()`                               |
|---------------------|----------------------------------------------|-------------------------------------------|
| **Browser URL**     | Changes to new URL                           | Stays the same                            |
| **User perception** | "I was sent somewhere else"                  | "I'm still on the same page"              |
| **HTTP behavior**   | 307/308 response → browser makes new request | Server proxies internally, single request |
| **SEO**             | Search engines follow to new URL             | Search engines index original URL         |
| **Use when**        | "Go there instead"                           | "Secretly serve this"                     |

### Recommended Setup

```typescript
// proxy.ts (project root)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Redirect: URL changes in browser
    if (pathname === '/old-page') {
        return NextResponse.redirect(new URL('/new-page', request.url));
    }

    // Rewrite: URL stays same, content from different route
    if (pathname === '/test-rewrite') {
        return NextResponse.rewrite(new URL('/internal-page', request.url));
    }

    // Pass through normally
    return NextResponse.next();
}

export const config = {
    matcher: ['/old-page', '/test-rewrite'],
};
```

### Why `new URL('/path', request.url)`?

```typescript
// ❌ WRONG - just a path, not a complete URL
NextResponse.redirect('/new-page');

// ✅ CORRECT - complete URL with origin (localhost:3000)
NextResponse.redirect(new URL('/new-page', request.url));
// Result: http://localhost:3000/new-page
```

The `request.url` provides the origin (protocol + host + port). Without it, you'd just have `/new-page` which isn't a valid URL for HTTP redirects.

### Key Learnings

**✅ What Works:**

- **proxy.ts = middleware.ts renamed** - Next.js 16 renamed Middleware to Proxy (same functionality, better name)
- **Export `proxy` function** - Can be named export or default export
- **Matcher filters routes** - Only matched paths trigger the proxy function
- **Proxy runs before page renders** - Can intercept, modify, redirect, or rewrite before React touches the request
- **rewrite() is invisible to user** - URL bar shows original, but content comes from rewritten path
- **Use `request.nextUrl.pathname`** - Get the current path for conditional logic

**⚠️ Common Gotchas:**

- **Only ONE proxy.ts per project** - Can't have multiple proxy files; organize with imports
- **Matcher uses string literals** - Can't use variables from other files in matcher array
- **rewrite() doesn't need target page to NOT exist** - Proxy intercepts first, so target page is never reached
- **redirect() returns HTTP response** - Browser makes a second request to new URL
- **rewrite() is single request** - Server handles it internally, no extra round trip

**🎯 When to Use Each:**

| Scenario                                            | Use          | Why                                                          |
|-----------------------------------------------------|--------------|--------------------------------------------------------------|
| Page permanently moved                              | `redirect()` | User should see new URL, SEO updated                         |
| Auth redirect to login                              | `redirect()` | User knows they're going to login page                       |
| A/B testing                                         | `rewrite()`  | Same URL serves different content to different users         |
| Multi-tenancy (`acme.app.com` → `/workspaces/acme`) | `rewrite()`  | Hide internal structure, clean URLs                          |
| Feature flags                                       | `rewrite()`  | `/dashboard` serves old or new version based on user segment |
| Vanity URLs (`/pricing` → `/products/pricing-page`) | `rewrite()`  | Clean public URL, organized internal structure               |
| API proxying                                        | `rewrite()`  | Hide backend implementation (`/api/data` → external API)     |

**📊 Proxy vs Page-level Redirects:**

| Aspect        | Proxy (proxy.ts)                       | Page (redirect/permanentRedirect) |
|---------------|----------------------------------------|-----------------------------------|
| **Runs when** | Before page renders                    | During page render                |
| **Access to** | Request headers, cookies, URL          | Page props, searchParams          |
| **Scale**     | All routes matching pattern            | Single page                       |
| **Best for**  | Auth guards, rewrites, global patterns | Page-specific redirects           |

**🎓 Common Confusion Points:**

1. **"What happened to middleware.ts?"**
   - Next.js 16 renamed it to `proxy.ts` to better reflect its purpose
   - Same functionality, different name

2. **"When would I use rewrite over redirect?"**
   - **rewrite:** When you want to hide internal URL structure (multi-tenancy, vanity URLs, A/B testing)
   - **redirect:** When the user should know/see the new URL (page moved, auth redirect)

3. **"Does the target page need to exist for rewrite?"**
   - Yes! The rewritten path must have a valid page, or you'll get 404
   - But you DON'T need a page at the original path - proxy intercepts before that matters

4. **"Why doesn't matcher accept variables?"**
   - Matcher is statically analyzed at build time for optimization
   - Must be string literals or regex patterns

5. **"Can I use both redirect and rewrite in the same proxy?"**
   - Yes! Use conditional logic based on pathname, headers, cookies, etc.
   - Just return the appropriate `NextResponse` for each case

### Demo: `http://localhost:3000/redirect-rewrite-demo`

**Test scenarios:**
- Click "Test Redirect" → URL changes to `/funda`, content from `/funda`
- Click "Test Rewrite" → URL stays `/redirect-rewrite-demo/test-rewrite`, content from `/funda`

[Official Docs](https://nextjs.org/docs/app/api-reference/functions/next-response)

</details>

---

<details>
<summary><strong>21. Redirects (redirect, permanentRedirect, next.config.js)</strong> - HTTP redirects, status codes, and when to use each approach</summary>

### Core Concepts

| Method                    | Where                        | Status Code       | Type                   | Use Case                                                |
|---------------------------|------------------------------|-------------------|------------------------|---------------------------------------------------------|
| `redirect()`              | Server Component             | **307** Temporary | HTTP redirect          | Conditional redirects (auth, form submission)           |
| `redirect()`              | **Server Action**            | **303** See Other | HTTP redirect          | After form POST (prevents resubmit dialog)              |
| `permanentRedirect()`     | Server Component/Action      | **308** Permanent | HTTP redirect          | Permanent URL changes (renamed routes)                  |
| `next.config.js`          | Config file                  | 307 or 308        | HTTP redirect          | Static redirects, bulk patterns, no page files needed   |
| `router.push()`           | Client Component (useRouter) | N/A               | Client-side navigation | Client-side programmatic navigation (no HTTP redirect!) |
| `NextResponse.redirect()` | Middleware                   | Any               | HTTP redirect          | Conditional redirects at scale (auth, headers, cookies) |

### Key Distinction: HTTP Redirect vs Client-Side Navigation

**IMPORTANT:** `redirect()` is NOT equivalent to `router.push()`!

```tsx
// ❌ WRONG MENTAL MODEL
// "redirect() is just like router.push() but for server-side"

// ✅ CORRECT UNDERSTANDING
redirect()           → Server sends HTTP redirect (307/308/303 status code)
router.push()        → Client-side navigation via JavaScript (no HTTP redirect)
```

**How to observe the difference:**
- Type URL directly in browser address bar (not via `<Link>`)
- Check Network tab → Status Code column
- `redirect()` shows 307/308/303, `router.push()` shows 200 OK

### Temporary (307) vs Permanent (308) Redirects

| Aspect                   | 307 Temporary                              | 308 Permanent                               |
|--------------------------|--------------------------------------------|---------------------------------------------|
| **Meaning**              | "This redirect might change in the future" | "This redirect will NEVER change"           |
| **Search Engines (SEO)** | Keep indexing original URL                 | Update index to new URL (critical for SEO!) |
| **Browser Caching**      | Don't cache long-term                      | May cache aggressively                      |
| **When to use**          | Auth redirects, feature flags, A/B testing | Renamed routes, permanent URL restructuring |
| **Next.js function**     | `redirect()`                               | `permanentRedirect()`                       |
| **next.config.js**       | `permanent: false`                         | `permanent: true`                           |

**Real-world examples:**

```tsx
// ✅ Use 307 Temporary - redirect might change based on auth state
if (!user) {
  redirect('/login');  // User will eventually be logged in
}

// ✅ Use 308 Permanent - URL renamed forever
// Old route: /old-page/page.tsx
export default function OldPage() {
  permanentRedirect('/new-page');  // This URL moved permanently
}
```

### When to Use next.config.js vs Code

**Use `next.config.js` when:**
- ✅ Redirects are static/known ahead of time
- ✅ Pattern matching needed (`/blog/*` → `/articles/*`)
- ✅ Bulk redirects (100+ URLs)
- ✅ Don't want to create page files for old routes

**Use `redirect()` / `permanentRedirect()` in code when:**
- ✅ Conditional logic needed (auth checks, feature flags)
- ✅ Dynamic redirects based on user state, cookies, database
- ✅ Need to access request data

**Rule of thumb:** If you can write it in a config file, use `next.config.js`. If you need to run code to decide, use `redirect()`/`permanentRedirect()`.

### Recommended Setup

```typescript
// 1. next.config.js - Static redirects (no page files needed!)
const nextConfig = {
  async redirects() {
    return [
      // Simple redirect
      {
        source: '/about-us',
        destination: '/about',
        permanent: true, // 308
      },
      // Pattern matching (bulk redirects)
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true, // 308
      },
      // Temporary redirect
      {
        source: '/temp-page',
        destination: '/funda',
        permanent: false, // 307
      },
    ];
  },
};

// 2. Server Component - Conditional redirect
async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login'); // 307 - temporary (user will log in)
  }

  return <Dashboard />;
}

// 3. Old route permanently moved (create page file for old route)
// app/old-blog/page.tsx
export default function OldBlog() {
  permanentRedirect('/articles'); // 308 - permanent URL change
}

// 4. Server Action - Form submission redirect
async function createPost(formData: FormData) {
  'use server';

  const post = await db.posts.create({ /* ... */ });
  redirect(`/posts/${post.id}`); // 303 - POST/Redirect/GET pattern
}

// 5. Middleware - Large-scale conditional redirects
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

### Key Learnings

**✅ What Works:**

- **Test redirects by typing URL directly** - Next.js `<Link>` uses client-side navigation that masks HTTP redirects
- **Check Network tab Status Code** - This reveals the true redirect type (307/308/303)
- **permanentRedirect() for renamed routes** - Tells search engines + browsers the URL moved forever
- **redirect() for conditional logic** - Auth checks, feature flags, etc.
- **next.config.js for bulk redirects** - No need to create 100 page files with `permanentRedirect()`
- **303 in Server Actions** - Prevents "resubmit form" dialog on page refresh
- **Pattern matching in next.config.js** - `/blog/:slug` → `/articles/:slug` redirects all blog posts

**⚠️ Common Gotchas:**

- **❌ WRONG: "redirect() is like router.push()"**
  - Reality: `redirect()` sends HTTP redirect, `router.push()` is client-side navigation (fundamentally different!)
- **Next.js Link navigation hides redirect behavior** - You'll see 200 OK in Network tab because `<Link>` uses client-side routing
- **Must type URL in address bar to see redirect status codes** - This triggers real HTTP request
- **permanentRedirect() enables browser caching** - Browser may skip server and go directly to new URL
- **Temporary doesn't mean "short duration"** - It means "might change in the future" (could be temporary for years!)
- **redirect() in Server Actions uses 303, not 307** - Different status code for POST/Redirect/GET pattern
- **Can't use redirect() in Client Components** - Server-only function (use `router.push()` instead)
- **next.config.js redirects run before middleware** - Order: config → middleware → page render
- **Old route needs page file for redirect()** - If using code-based redirect, must create the old route file

**🎯 When to Use Each Approach:**

| Scenario                                        | Approach                                              | Why                                         |
|-------------------------------------------------|-------------------------------------------------------|---------------------------------------------|
| User not authenticated → `/login`               | `redirect()` in code                                  | Conditional logic based on user state       |
| 100+ blog posts moved `/blog/*` → `/articles/*` | `next.config.js` with pattern                         | Bulk redirects, no need for 100 page files  |
| Renamed `/about-us` → `/about` permanently      | `permanentRedirect()` in old page OR `next.config.js` | Either works; config cleaner (no page file) |
| After form submission → success page            | `redirect()` in Server Action                         | POST/Redirect/GET pattern (303)             |
| Auth check for entire app                       | `NextResponse.redirect()` in middleware               | Runs before all pages, efficient            |
| Navigate on button click (client-side)          | `router.push()`                                       | Client-side, no page reload                 |

**📊 Status Code Reference:**

| Status Code | Name               | When It Appears                   | Meaning                                    |
|-------------|--------------------|-----------------------------------|--------------------------------------------|
| **307**     | Temporary Redirect | `redirect()` in Server Component  | "Go to new URL, but this might change"     |
| **308**     | Permanent Redirect | `permanentRedirect()`             | "Go to new URL, and remember this forever" |
| **303**     | See Other          | `redirect()` in Server Action     | "Go to new URL, and change POST to GET"    |
| **200**     | OK                 | `router.push()`, normal page load | Not a redirect - page loaded successfully  |

**🔄 How Redirects Work:**

```tsx
// Server redirect (307/308)
Browser: "GET /old-page"
Server:  "307 Temporary Redirect → Location: /new-page"
Browser: "OK, GET /new-page instead"
         (User sees /new-page in address bar)

// Client-side navigation (router.push)
Browser: "GET /current-page" → 200 OK
         (JavaScript runs)
JavaScript: "Update URL to /new-page and render new content"
            (No HTTP redirect, no server involved)
```

**💡 Mental Model:**

Think of redirect types based on your intention:

- **Temporary (307):** "I'm redirecting you for now, but this might change later"
  - Examples: Auth redirects (user will log in), feature flags (might enable later), A/B tests

- **Permanent (308):** "This URL moved forever, update your bookmarks and search results"
  - Examples: Renamed routes, URL restructuring, migrated content

- **POST/Redirect/GET (303):** "You submitted a form, now let me show you the result"
  - Prevents duplicate form submissions on page refresh

**🎓 Common Confusion Points:**

1. **"I see 200 OK in Network tab, not 307!"**
   - You're clicking a `<Link>` component → uses client-side navigation
   - Type the URL directly in browser address bar to see the real HTTP redirect

2. **"What does 'temporary' mean? How long is temporary?"**
   - It's not about duration! It's about whether the redirect might change in the future
   - An auth redirect is "temporary" even if it lasts for months (user might log in eventually)

3. **"Why not just use router.push() everywhere?"**
   - `router.push()` only works in Client Components
   - Server Components need `redirect()` for programmatic navigation
   - SEO: HTTP redirects (308) tell search engines the URL moved permanently

4. **"When do I see 303 vs 307?"**
   - **303:** Server Actions (form submissions) - prevents "resubmit form" dialog
   - **307:** Server Components - general purpose temporary redirect

5. **"Should I create a page file for old routes?"**
   - With `redirect()`/`permanentRedirect()`: Yes, create `/old-page/page.tsx`
   - With `next.config.js`: No, just add config - Next.js handles it

6. **"What's the difference between redirect() and NextResponse.redirect()?"**
   - `redirect()`: In Server Components/Actions
   - `NextResponse.redirect()`: In middleware (runs before page rendering)

### Testing Redirect Behavior

```tsx
// ❌ BAD: Testing via Link (masks redirect)
<Link href="/server-redirect">
  <button>Test Redirect</button>
</Link>
// Result: Network tab shows RSC request (200 OK), not HTTP redirect!

// ✅ GOOD: Testing via direct URL access
1. Open new browser tab
2. Type in address bar: http://localhost:3000/server-redirect
3. Watch Network tab → see 307/308 status code
```

### Demos

- Main redirect demo: `http://localhost:3000/redirect-demo`
- Server redirect (307): Direct access to `/redirect-demo/server-redirect`
- Client navigation: `/redirect-demo/client-redirect`
- Server Action (303): `/redirect-demo/server-action-redirect`

[Official Docs](https://nextjs.org/docs/app/guides/redirecting)

</details>

---

<details>
<summary><strong>23. generateStaticParams with Cache Components</strong> - Build-time cache warming, PPR vs fully static, and the new Next.js 16 mental model</summary>

### Core Concepts

| Feature                  | Purpose                                                 | Usage                           | Next.js 16 Behavior                                   |
|--------------------------|--------------------------------------------------------|---------------------------------|-------------------------------------------------------|
| `generateStaticParams()` | Pre-warm cache at build time for dynamic routes         | Export from `page.tsx`          | Cache warming hint, NOT static HTML generation        |
| `"use cache"`            | Enable caching for function/component output            | Directive in function body      | Runtime cache with revalidation (default: 15min, 1yr) |
| `cacheComponents: true`  | Enable Cache Components (PPR + granular cache control)  | `next.config.ts`                | Disables old route segment configs                    |
| `◐` (PPR symbol)         | Partial Prerender - static shell + dynamic content      | Build output indicator          | Default with Cache Components enabled                 |
| `○` (Static symbol)      | Fully static - complete HTML at build time              | Build output indicator          | Not achievable with Cache Components (old model only) |
| `dynamicParams`          | Control access to params not in `generateStaticParams`  | `export const dynamicParams`    | ❌ NOT compatible with Cache Components               |
| `dynamic`                | Force route rendering behavior                          | `export const dynamic`          | ❌ NOT compatible with Cache Components               |

### The Fundamental Shift: Old vs New Model

**This is THE critical mental model shift in Next.js 16:**

#### Old Model (Next.js 15 and earlier, without Cache Components)

```
generateStaticParams → Fully Static HTML at BUILD time

Build time (products 1-6):
  🔨 Run getProduct(1) → Bake into HTML file
  🔨 Run getProduct(2) → Bake into HTML file
  ⏱️ Takes: 6 products × 2s = 12 seconds

Runtime (first user visit):
  ✅ Product 1 → 0 delay (HTML already exists)
  ✅ Product 7 (not in list) → 2s delay OR 404 (if dynamicParams=false)

Symbol: ○ (Fully Static)
```

#### New Model (Next.js 16, with Cache Components)

```
generateStaticParams → Cache Warming at BUILD time

Build time (products 1-6):
  🔥 Run getProduct(1) → Populate cache → Store in build artifact
  🔥 Run getProduct(2) → Populate cache → Store in build artifact
  ⏱️ Takes: ~10 seconds (parallel execution, not sequential)

Runtime (when server starts):
  🔥 Product 7 pre-warms in background (if time permits)

Runtime (first user visit):
  ✅ Product 1 → 0 delay (cache hit from build time)
  ✅ Product 7 → 0 delay if pre-warmed, OR 5s delay (cache miss)

Symbol: ◐ (Partial Prerender - static shell + cached data)
```

### Key Insight: generateStaticParams Role Changed

| Aspect            | Old Model (No Cache Components)      | New Model (Cache Components)              |
|-------------------|--------------------------------------|-------------------------------------------|
| **What it does**  | Generates static HTML files          | Pre-warms cache at build time             |
| **Products 1-6**  | Fully baked HTML (0 delay always)    | Cache populated at build (0 delay always) |
| **Product 7**     | 404 or on-demand generation          | Cached on-demand at runtime               |
| **Build output**  | `○` Static                           | `◐` PPR (Partial Prerender)              |
| **Route configs** | ✅ `dynamic`, `dynamicParams` work   | ❌ Incompatible, must remove              |

### The "use cache" Directive

**What is it?**
- A directive that marks a function's output as cacheable
- Creates a **runtime cache** (not build-time static generation)
- Default revalidation: 15 minutes (cache), 1 year (expire)

**How to use:**

```tsx
// Mark function as cacheable
async function getProduct(id: string) {
    "use cache";  // ← Cache directive
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5s delay

    const products = [/* ... */];
    return products.find(p => p.id === id);
}

// First call: 5s delay → cache populated
// Subsequent calls (within 15min): 0s delay → cache hit
// After 15min: 5s delay → cache refreshed
```

**Key behavior:**
```
Visit Product 1 (first time):
  → getProduct('1') runs → 5s delay → result cached

Visit Product 1 (again, within 15min):
  → Cache hit → 0s delay

Visit Product 1 (after 15min):
  → Cache expired → getProduct('1') runs → 5s delay → cache refreshed
```

### What We Can't Do with Cache Components

**ALL old route segment configs are incompatible:**

```tsx
// ❌ Does NOT work with cacheComponents: true
export const dynamic = 'force-static';       // Build error
export const dynamicParams = false;          // Build error
export const revalidate = 60;                // Build error

// Error message:
// "Route segment config 'dynamic' is not compatible with
//  nextConfig.cacheComponents. Please remove it."
```

**Why?** Cache Components represents a **component-level** caching model, not route-level configs:

```tsx
// Old approach (route-level, all-or-nothing):
export const dynamic = 'force-static';  // Entire route is static

// New approach (component-level, granular):
async function getData() {
    "use cache";  // Just this function is cached
    // ...
}
```

### Common Confusion #1: Why Still PPR Symbol?

**Initial confusion:**
> "I removed Suspense and added 'use cache', but build output still shows `◐` (PPR), not `○` (static). Why?"

**Answer:**

The `◐` symbol with Cache Components means:
- **Static shell** generated at build time (page structure)
- **Data fetching** cached at runtime (first build time for generateStaticParams, then runtime)

The `○` symbol is from the **old model** - it means fully static HTML with data baked in. With Cache Components, you **cannot** achieve `○` because:
- Cache Components fundamentally operates on **caching**, not **static generation**
- Even with `"use cache"`, data is cached at runtime, not baked into HTML at build time

**Mental model shift:**
```
Old: ○ = Fully static HTML with data
New: ◐ = Static shell + cached data (this is the new "static")
```

### Common Confusion #2: Build Time Expectation

**Initial confusion:**
> "With 6 products × 5s delay = 30s expected build time, but it only took ~10s. Why?"

**Answer:**

Build logs reveal **parallel execution**:

```
🔥 getProduct() called for ID: 1 at 15:34:38.750Z
🔥 getProduct() called for ID: 2 at 15:34:38.756Z  ← Started almost simultaneously!
✅ getProduct() completed for ID: 1 at 15:34:43.753Z (5s later)
✅ getProduct() completed for ID: 2 at 15:34:43.757Z (5s later)
🔥 getProduct() called for ID: 3,5,6,4 at 15:34:43.795Z  ← Next batch starts!
✅ All completed at 15:34:48.797Z
```

**Key insight:**
- Next.js runs `generateStaticParams` items in **parallel batches** (using 9 workers)
- Not sequential: 6 × 5s = 30s
- Parallel: 2 batches × 5s = ~10s

### Common Confusion #3: Product 7 Instant After Product 1

**Mysterious behavior discovered:**

```
Test 1: Visit Product 1 first
  → Product 1: Instant ✓
  → Product 7: Instant ❓ (Why? It's not in generateStaticParams!)

Test 2: Visit Product 7 first
  → Product 7: 5s delay ✓ (Expected)
  → Product 1: Instant ✓ (Expected)
```

**What's happening?**

When you run `npm start` (production server):

```
Server startup:
  → Next.js starts listening on port 3000
  → Background: Pre-warming Product 7 cache (discovered in logs!)

Server logs:
🔥 getProduct() called for ID: 7 at 15:37:38.078Z  ← Pre-warming started
✅ getProduct() completed for ID: 7 at 15:37:43.079Z  ← 5s later

Timeline:
  0s: npm start (server starting)
  5s: Product 7 cache warmed

If you visit Product 7:
  - Before 5s: 5s delay (cache miss)
  - After 5s: Instant (cache hit from pre-warming)
```

**Why pre-warm Product 7?**
- Next.js may pre-warm recent/popular routes in background
- Implementation detail, not documented behavior
- Race condition: Your first visit might beat the pre-warming

### Common Confusion #4: Removing Suspense Causes Error

**Initial attempt:**
```tsx
// Removed Suspense, kept "use cache"
async function ProductPage({ params }) {
    const { productId } = await params;
    const product = await getProduct(productId);
    // ... render
}
```

**Error:**
```
Blocking Route Error

Data that blocks navigation was accessed outside of <Suspense>

This delays the entire page from rendering, resulting in a slow user experience.

To fix this, you can either:
1. Provide a fallback UI using <Suspense> around this component
2. Move the asynchronous await into a Cache Component ("use cache")
```

**Why this error?**

With Cache Components enabled, Next.js requires **explicit caching intent**:

1. **Option 1:** Wrap in Suspense → "This data is dynamic, stream it"
2. **Option 2:** Use `"use cache"` → "This data should be cached"

Without either, Next.js doesn't know: "Is this data dynamic or cacheable?"

**The fix:** Add `"use cache"` to the data fetching function:

```tsx
async function getProduct(id: string) {
    "use cache";  // ← Tells Next.js: "Cache this!"
    // ... fetch logic
}
```

### Common Confusion #5: Can't Prevent Access to Product 7

**Expectation from old model:**
```tsx
export const dynamicParams = false;  // Product 7 should 404
```

**Reality with Cache Components:**
```
Build error: "Route segment config 'dynamicParams' is not compatible
             with nextConfig.cacheComponents"
```

**Why?**

Cache Components operates on a **different philosophy**:
- **Old model:** Binary choice at route level (static OR dynamic)
- **New model:** Granular caching at component level

**Result:** You **cannot** return 404 for Product 7 with Cache Components. It will always be accessible (cached on-demand).

If you NEED to restrict access to specific params:
```tsx
// Manual check in the page component
async function ProductPage({ params }) {
    const { productId } = await params;

    const allowedIds = ['1', '2', '3', '4', '5', '6'];
    if (!allowedIds.includes(productId)) {
        notFound();  // Manual 404
    }

    // ... rest of logic
}
```

### Recommended Setup

```typescript
// 1. Enable Cache Components in next.config.ts
const nextConfig = {
    cacheComponents: true,  // Enables PPR + "use cache"
};

// 2. Dynamic route with generateStaticParams
// app/products/[productId]/page.tsx

// Pre-warm cache for products 1-6 at build time
export async function generateStaticParams() {
    console.log('Pre-warming cache at build time...');
    const productIds = ['1', '2', '3', '4', '5', '6'];
    return productIds.map(id => ({ productId: id }));
}

// Cached data fetching function
async function getProduct(id: string) {
    "use cache";  // Enable caching
    console.log(`🔥 getProduct() called for ID: ${id}`);

    await new Promise(resolve => setTimeout(resolve, 5000));  // Simulate DB call

    const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        // ... up to 7
    ];

    console.log(`✅ getProduct() completed for ID: ${id}`);
    return products.find(p => p.id === id);
}

// Page component (no Suspense needed because "use cache" declared intent)
export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Product ID: {productId}</p>
        </div>
    );
}
```

### Key Learnings

**✅ What Works:**

- **"use cache" enables runtime caching** - Not build-time static generation
- **generateStaticParams pre-warms cache at build time** - Products 1-6 cached during build
- **Parallel execution speeds up builds** - Not sequential (6 × 5s), but batched
- **Background pre-warming may happen** - Product 7 might be cached when server starts
- **Console logs help debug** - Add logs to see when functions actually run
- **No Suspense needed with "use cache"** - The directive declares your caching intent
- **PPR is the new default** - `◐` symbol is expected with Cache Components
- **Cache revalidation defaults to 15min** - Configurable with cache tags

**⚠️ Common Gotchas:**

- **❌ WRONG: "generateStaticParams creates static HTML"**
  - Reality: With Cache Components, it **pre-warms the cache**, not generates HTML
- **❌ WRONG: "I should see `○` (static) symbol with 'use cache'"**
  - Reality: With Cache Components, you get `◐` (PPR) - this is the new "static"
- **All old route segment configs blocked** - `dynamic`, `dynamicParams`, `revalidate` all error
- **Can't use Suspense without "use cache"** - Get "blocking route" error
- **Can't use "use cache" without Suspense in some cases** - Or remove Suspense entirely
- **Build time != product count × delay** - Parallel execution makes it faster
- **Product 7 might be instant on first visit** - Background pre-warming is unpredictable
- **First visit after cache expires** - Users will experience delay again (default 15min)
- **Cannot prevent access to non-listed params** - Use manual `notFound()` check instead

**🎯 When to Use generateStaticParams:**

| Scenario                                  | Use generateStaticParams? | Why                                                   |
|-------------------------------------------|---------------------------|-------------------------------------------------------|
| E-commerce: 1000 products, 50 popular     | ✅ Yes (for top 50)        | Pre-warm cache for popular items at build time        |
| Blog: 500 posts, all equally important    | ✅ Yes (all 500)           | Pre-warm all posts, users get instant load            |
| User profiles: Millions of users          | ❌ No                      | Cache on-demand, can't pre-warm millions at build     |
| Dynamic content from external API         | ❌ No                      | Data changes frequently, cache at runtime instead     |
| Admin dashboard with real-time data       | ❌ No                      | Data must be fresh, don't cache at build              |

**📊 Build vs Runtime Behavior:**

| Product | In generateStaticParams? | Build Time                     | First Runtime Visit       | Second Runtime Visit |
|---------|--------------------------|--------------------------------|---------------------------|----------------------|
| 1-6     | ✅ Yes                    | Cache populated (5s per batch) | Instant (cache hit)       | Instant (cache hit)  |
| 7       | ❌ No                     | Nothing                        | 5s delay OR instant (pre-warming) | Instant (cache hit)  |

**💡 Mental Model:**

Think of `generateStaticParams` as a **"priority list"** for caching:

```
generateStaticParams = [1, 2, 3, 4, 5, 6]

Build time:
  Next.js: "These IDs are important, let me warm their cache NOW"
  → Runs getProduct(1-6) → Stores results in cache

Runtime (Product 1 visit):
  → Cache lookup: Found! → Return instantly

Runtime (Product 7 visit):
  → Cache lookup: Not found → Run getProduct(7) → Store in cache → Return
```

Without `generateStaticParams`:
```
Build time:
  Next.js: "No priority list, I'll cache on-demand"
  → Nothing happens

Runtime (first visit to any product):
  → All products have 5s delay (cache miss)
```

**🎓 Common Confusion Points:**

1. **"Why isn't my page fully static with generateStaticParams?"**
   - Because you have `cacheComponents: true` enabled
   - This shifts the model from "static HTML" to "cached data"
   - The `◐` (PPR) symbol is expected and correct

2. **"How do I force fully static generation like Next.js 15?"**
   - Disable `cacheComponents` in `next.config.ts`
   - Use `export const dynamic = 'force-static'` in page
   - This goes back to the old model (not recommended by Next.js team)

3. **"Why does my build take less time than expected?"**
   - Parallel execution! Next.js uses multiple workers
   - Check logs for timestamps - items start almost simultaneously

4. **"Why is Product 7 instant on first visit?"**
   - Background pre-warming (undocumented behavior)
   - Race condition between your visit and server warmup
   - Not guaranteed - may still have 5s delay

5. **"Can I block access to Product 7 with dynamicParams?"**
   - No, `dynamicParams` doesn't work with Cache Components
   - Use manual check: `if (!allowedIds.includes(id)) notFound()`

6. **"What's the difference between 'use cache' and cache()?"**
   - `"use cache"`: Next.js 16 directive for caching function output
   - `cache()`: React function for request-level deduplication
   - Use `"use cache"` as primary caching mechanism with Cache Components

7. **"When should I use Suspense with 'use cache'?"**
   - **With Suspense:** Want streaming UI with loading states (progressive rendering)
   - **Without Suspense:** Want to wait for all data before showing page (simpler)
   - Both work! It's about UX preference, not correctness

### Demo: `http://localhost:3000/static-params-demo`

**Test it yourself:**

1. **Build and observe logs:**
   ```bash
   npm run build
   # Watch for:
   # - "Running generateStaticParams..." log
   # - "🔥 getProduct() called for ID: 1-6" logs
   # - Total build time (~10s, not 30s)
   # - Symbol: ◐ (PPR, not ○ static)
   ```

2. **Test Products 1-6 (in generateStaticParams):**
   ```bash
   npm start
   # Visit: http://localhost:3000/static-params-demo/products/1
   # Expected: Instant load (0 delay)
   # Cache hit from build time!
   ```

3. **Test Product 7 (NOT in generateStaticParams):**
   ```bash
   # Visit: http://localhost:3000/static-params-demo/products/7
   # Expected: Either instant (pre-warmed) OR 5s delay (cache miss)
   # If delayed, refresh → instant (cache hit)
   ```

4. **Check server logs:**
   ```bash
   # In the terminal where npm start is running:
   # - See "🔥 getProduct() called for ID: 7" if cache miss
   # - Or nothing if cache hit (pre-warmed)
   ```

### Next.js Team Recommendation

**The Next.js team actively encourages the Cache Components (PPR) approach:**

1. **Cache Components is the default** in Next.js 16
2. **Old route segment configs intentionally blocked** (`dynamic`, `dynamicParams`)
3. **Vercel's blog posts emphasize** "instant navigation" through PPR + caching
4. **Philosophy shift:** From binary (static OR dynamic) to granular (component-level caching)

**However:** You can still opt-out by not enabling `cacheComponents: true`, but this is considered the "legacy" approach.

[Official Docs - generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) | [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components) | [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)

</details>

---

<details>
<summary><strong>28. Catch-all and Optional Catch-all Routes</strong> - Dynamic route segments for flexible URL patterns ([...slug] vs [[...slug]])</summary>

### Core Concepts

| Pattern       | Route Example                | Matches                                                      | Use Case                                     |
|---------------|------------------------------|--------------------------------------------------------------|----------------------------------------------|
| `[...slug]`   | `/docs/[...slug]/page.tsx`   | `/docs/intro`, `/docs/api/auth`, `/docs/a/b/c` (1+ segments) | Documentation, categories with required path |
| `[[...slug]]` | `/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/intro`, `/docs/a/b/c` (0+ segments)          | Documentation with homepage, file browsers   |
| `[id]`        | `/products/[id]/page.tsx`    | `/products/123` (exactly 1 segment)                          | Single resource by ID                        |

### Params Structure

**This is critical to understand:**

```typescript
// URL: /catch-all/apple/banana/cherry
params = {
  slug: ['apple', 'banana', 'cherry']  // ✅ Object with array property
}
// NOT: ['apple', 'banana', 'cherry']  // ❌ Not a plain array!

// URL: /optional-catch-all
params = {
  slug: undefined  // ✅ Property doesn't exist
}
// NOT: { slug: [] }  // ❌ NOT an empty array!
```

**Key insights:**
- Property name (`slug`) matches the folder name `[...slug]`
- With segments: `slug` is a non-empty array like `['a', 'b']`
- Without segments (optional only): `slug` is `undefined` (not `[]`)
- Trailing slashes are automatically removed by Next.js

### Common Confusion #1: Empty Array vs Undefined

**Initial expectation:**
> "I thought `/optional-catch-all` would give `slug = []` because the array gets initialized before filling."

**Reality:**
```typescript
// Optional catch-all with NO segments
slug = undefined  // ✅ Actual behavior

// Why not []?
// Because the property doesn't exist at all when there are no segments
// This is MORE explicit: undefined = "not provided" vs [] = "provided but empty"
```

**Practical benefit:**
```typescript
// Clean check
if (slug) {
  // Handle segments
} else {
  // Handle no segments
}

// vs having to check both existence AND length
if (slug && slug.length > 0) {  // Unnecessary!
  // Handle segments
}
```

### Common Confusion #2: Can slug Ever Be []?

**Test with trailing slashes:**
```
/optional-catch-all/  → Redirects to → /optional-catch-all → slug = undefined
/catch-all/           → Redirects to → /catch-all         → 404
```

**Answer:** No! Next.js removes trailing slashes automatically.

`slug` can ONLY be:
- `undefined` (no segments)
- Non-empty array like `['a']` or `['a', 'b', 'c']`

**Never:** `[]` (empty array)

### URL Examples & Results

| URL                         | `[...slug]`                     | `[[...slug]]`                   |
|-----------------------------|---------------------------------|---------------------------------|
| `/demo`                     | 404                             | `undefined`                     |
| `/demo/apple`               | `['apple']`                     | `['apple']`                     |
| `/demo/apple/banana`        | `['apple', 'banana']`           | `['apple', 'banana']`           |
| `/demo/apple/banana/cherry` | `['apple', 'banana', 'cherry']` | `['apple', 'banana', 'cherry']` |

### When to Use Each Pattern

#### Use `[...slug]` (Catch-all) When:
- Base route should 404 or be handled separately
- You have a dedicated landing page at a different route
- Example: Product categories where `/products` is a custom page

```
products/
  page.tsx              ← Custom landing page with featured products
  [...categories]/
    page.tsx            ← All category pages use same template
```

#### Use `[[...slug]]` (Optional Catch-all) When:
- Base route should be handled by the same component
- All depth levels share the same rendering logic
- Example: Documentation, file browsers, breadcrumb navigation

```
docs/
  [[...slug]]/
    page.tsx            ← Handles /docs, /docs/intro, /docs/api/auth, etc.
```

### Decision Framework

Ask yourself: **"Does each page need custom React code, or do all pages share the same template?"**

| Scenario              | Custom React Code?   | Data Source     | Pattern                   |
|-----------------------|----------------------|-----------------|---------------------------|
| Blog with 1000 posts  | ❌ Same template      | Database/CMS    | `[slug]`                  |
| Documentation site    | ❌ Same template      | Markdown files  | `[[...slug]]`             |
| Product categories    | ❌ Same template      | Database        | `[...categories]`         |
| File browser          | ❌ Same template      | File system/API | `[[...path]]`             |
| Student profile pages | ✅ Custom logic       | Database        | `/students/[id]/page.tsx` |
| Event details         | ✅ Custom forms       | Database        | `/events/[id]/page.tsx`   |
| Admin dashboard       | ✅ Different sections | N/A             | Explicit routes           |

**Rule of thumb:**
- **Content-driven** (CMS, markdown, DB with shared template) → Catch-all
- **Logic-driven** (custom components per page) → Explicit routes

### Practical Example: Documentation Site

```tsx
// docs/[[...slug]]/page.tsx
export default async function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;

  // Convert slug to file path
  const filePath = slug ? `content/${slug.join('/')}.md` : 'content/index.md';

  // Read markdown
  const content = await fs.readFile(filePath, 'utf-8');

  // Render using shared template
  return <MarkdownRenderer content={content} />;
}
```

**With one file, you handle:**
- `/docs` → reads `content/index.md`
- `/docs/getting-started` → reads `content/getting-started.md`
- `/docs/api/authentication` → reads `content/api/authentication.md`

**Benefits:**
- Technical writers can add new docs without touching code
- All docs share consistent styling/layout
- No code deployment needed for content updates

### Key Learnings

**✅ What You Need to Know:**

1. **Params structure:** `{ slug: string[] | undefined }`, NOT a plain array
2. **undefined vs []:** With no segments, `slug` is `undefined`, never `[]`
3. **Simplified checking:** Use `if (slug)` instead of `if (slug && slug.length > 0)`
4. **Decision rule:** Choose catch-all when content comes from external sources with shared templates
5. **Most apps don't need it:** Regular `[id]` routes are more common for custom page logic

**⚠️ Common Gotchas:**

- Expecting `[]` instead of `undefined` for zero segments
- Using catch-all when explicit routes would be clearer
- Forgetting that `slug` is a property of `params`, not `params` itself
- Over-engineering with catch-all when simple dynamic routes suffice

### Demo: `http://localhost:3000/catch-optional-all-demo`

Structure:
```
catch-optional-all-demo/
  page.tsx                              ← Hub page with links
  catch-all/
    [...slug]/page.tsx                  ← Requires 1+ segments
  optional-catch-all/
    [[...slug]]/page.tsx                ← Allows 0+ segments
```

[Official Docs](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#catch-all-segments)

</details>

---

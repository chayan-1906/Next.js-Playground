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

<details>
<summary><strong>4. useTransition</strong> - Keep UI responsive during expensive state updates</summary>

### Core Concepts

| Feature | Purpose | Returns | Usage |
|---------|---------|---------|-------|
| `useTransition` | Mark state updates as non-urgent | `[isPending, startTransition]` | Keep UI responsive during slow updates |
| `isPending` | Indicates if transition is in progress | `boolean` | Show loading indicators |
| `startTransition` | Wrap slow state updates | `(callback) => void` | Updates inside won't block UI |

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

| Scenario | Use Transition? | Why |
|----------|----------------|-----|
| Search filtering 10,000+ items | ✅ Yes | Keeps input responsive while filtering |
| Tab switching with heavy content | ✅ Yes | Old tab stays visible while new tab loads |
| Sorting/paginating large datasets | ✅ Yes | UI doesn't freeze during re-render |
| Simple form input | ❌ No | Input should respond immediately |
| Navigation/routing | ❌ No | Next.js handles this automatically |
| Async data fetching | ❌ No | Use Suspense + Server Components instead |

**📊 With vs Without Transitions:**

| Aspect | Without Transition | With Transition |
|--------|-------------------|-----------------|
| **Input responsiveness** | ❌ Blocks/lags | ✅ Smooth/instant |
| **Update timing** | Immediate (but janky) | Slightly delayed (but smooth) |
| **User experience** | Feels slow | Feels fast |
| **Loading indicator** | Hard to show | ✅ `isPending` available |
| **Code complexity** | Simple | Slightly more complex |

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

| Feature | Purpose | Placement | Must Include |
|---------|---------|-----------|--------------|
| `error.tsx` | Route-level error boundary | `app/[route]/error.tsx` | `"use client"` directive |
| `global-error.tsx` | Root layout error boundary | `app/global-error.tsx` | `"use client"`, `<html>`, `<body>` |
| `error` prop | Error object from boundary | Both files | `Error` type with `.message` |
| `reset()` prop | Re-render error boundary children | Both files | Resets component state to initial |

### Error Boundary Scope

```
app/layout.tsx                    ← global-error.tsx catches this
  └── app/error-demo/layout.tsx   ← error.tsx CANNOT catch this!
      └── app/error-demo/page.tsx ← error.tsx catches this ✓
```

**Key Rule:** error.tsx catches errors in its children, but NOT in layout.tsx at the same level.

### What Error Boundaries Catch

| Error Type | Caught by error.tsx? | How to Test |
|------------|---------------------|-------------|
| **Rendering errors** (Server/Client) | ✅ Yes | `throw new Error()` in component body |
| **Event handler errors** | ❌ No | `onClick={() => throw Error()}` - won't work! |
| **Async errors in event handlers** | ❌ No | `onClick={async () => { await fetch() }}` - won't work! |

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

| Aspect | Client Component | Server Component |
|--------|------------------|------------------|
| **Can be async?** | ❌ No | ✅ Yes |
| **Errors during render caught?** | ✅ Yes | ✅ Yes |
| **Event handler errors caught?** | ❌ No | N/A (no event handlers) |
| **Execution location** | Browser | Server (then serialized to client) |

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

| Error Type | Handle With | Why |
|------------|-------------|-----|
| Rendering errors | error.tsx | React error boundaries designed for this |
| Event handler errors | Try/catch or state pattern | Error boundaries don't catch these |
| Async errors in events | Try/catch or state pattern | Outside render phase |
| Server Action errors | Server Action return value | Can't use error boundaries |

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

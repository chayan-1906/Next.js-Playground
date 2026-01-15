import {Suspense} from "react";

// Provide static params for all settings sub-routes
export function generateStaticParams() {
    return [
        {slug: ['profile']},
        {slug: ['security']},
        {slug: ['payment-methods']},
        {slug: ['invoices']},
        {slug: ['preferences']},
    ];
}

async function SettingsCatchAll() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SettingsCatchAllWrapper/>
        </Suspense>
    );
}

function SettingsCatchAllWrapper() {
    return null;
}

export default SettingsCatchAll;

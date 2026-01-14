import {Suspense} from "react";

function SettingsCatchAll() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SettingsCatchAll/>
        </Suspense>
    );
}

function SettingsCatchAllWrapper() {
    return null;
}

export default SettingsCatchAll;

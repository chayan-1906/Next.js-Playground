import React from "react";

function ParallelLayout({children, stats, activity}: { children: React.ReactNode; stats: React.ReactNode; activity: React.ReactNode; }) {
    return (
        <div className={'p-4 flex flex-col gap-6'}>
            {children}
            {stats}
            {activity}
        </div>
    );
}

export default ParallelLayout;

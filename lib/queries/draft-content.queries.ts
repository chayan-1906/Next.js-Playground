type DraftContent = {
    title: string;
    body: string;
    status: string;
};

const getContent = (isDraft: boolean): DraftContent => {
    if (isDraft) {
        return {
            title: 'Upcoming Feature: Dark Mode Support',
            body: 'We are excited to announce dark mode support coming in the next release. This draft preview includes early styling changes and toggle behavior that are still under review.',
            status: 'draft',
        };
    }

    return {
        title: 'Welcome to Our Platform',
        body: 'This is the published content visible to all users. Everything here has been reviewed and approved for production.',
        status: 'published',
    };
};

export {getContent};
export type {DraftContent};

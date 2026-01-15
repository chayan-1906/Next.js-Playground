import React from 'react';
import {FiEdit, FiShoppingCart, FiUserCheck} from 'react-icons/fi';

type ActivityType = 'signup' | 'purchase' | 'update';

const ICONS: Record<ActivityType, React.ReactElement> = {
    'signup': <FiUserCheck className={'size-5 text-green-500'}/>,
    'purchase': <FiShoppingCart className={'size-5 text-blue-500'}/>,
    'update': <FiEdit className={'size-5 text-yellow-500'}/>,
};

async function getActivity() {
    await new Promise(resolve => setTimeout(resolve, 4000)); // 4-second delay
    return [
        {id: 1, type: 'signup', user: 'user_a', time: '2m ago'},
        {id: 2, type: 'purchase', user: 'user_b', time: '5m ago'},
        {id: 3, type: 'update', user: 'user_c', time: '1h ago'},
        {id: 4, type: 'signup', user: 'user_d', time: '3h ago'},
    ] as { id: number; type: ActivityType; user: string; time: string }[];
}

async function ActivitySlot() {
    const activities = await getActivity();

    return (
        <div className={'p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg mt-8'}>
            <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-6'}>
                Recent Activity
            </h2>
            <ul className={'space-y-4'}>
                {activities.map(activity => (
                    <li key={activity.id} className={'flex items-center'}>
                        <div className={'w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mr-4'}>
                            {ICONS[activity.type]}
                        </div>
                        <div className={'grow'}>
                            <p className={'text-gray-900 dark:text-white'}>
                                New <span className={'font-semibold'}>{activity.type}</span> from {activity.user}
                            </p>
                        </div>
                        <p className={'text-gray-500 dark:text-gray-400 text-sm'}>
                            {activity.time}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivitySlot;

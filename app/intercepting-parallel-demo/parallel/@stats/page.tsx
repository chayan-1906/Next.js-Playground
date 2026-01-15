import {FiUsers, FiTrendingUp} from 'react-icons/fi';

async function getStats() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    return {
        activeUsers: Math.floor(Math.random() * 5000) + 1000,
        sales: Math.floor(Math.random() * 200000) + 50000,
    };
}

async function StatsSlot() {
    const stats = await getStats();

    return (
        <div className={'p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg'}>
            <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-4'}>
                Key Metrics
            </h2>
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>
                {/* Active Users */}
                <div className={'flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl'}>
                    <FiUsers className={'size-8 text-blue-500 mr-4'}/>
                    <div>
                        <p className={'text-gray-500 dark:text-gray-400 text-sm'}>Active Users</p>
                        <p className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                            {stats.activeUsers.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Sales */}
                <div className={'flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl'}>
                    <FiTrendingUp className={'size-8 text-green-500 mr-4'}/>
                    <div>
                        <p className={'text-gray-500 dark:text-gray-400 text-sm'}>Sales</p>
                        <p className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                            ${stats.sales.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsSlot;

function PreferencesPage() {
    return (
        <div className={'p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800'}>
            <h3 className={'text-xl font-bold text-purple-900 dark:text-purple-100 mb-4'}>
                Notification Preferences
            </h3>
            <div className="space-y-4">
                {['Email Notifications', 'Push Notifications', 'SMS Alerts'].map((item) => (
                    <div key={item} className={'flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-300 dark:border-purple-700'}>
                        <span className={'font-medium text-purple-900 dark:text-purple-100'}>
                            {item}
                        </span>
                        <label className={'relative inline-flex items-center cursor-pointer'}>
                            <input type={'checkbox'} defaultChecked className={'sr-only peer'}/>
                            <div className={'w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600'}/>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PreferencesPage;

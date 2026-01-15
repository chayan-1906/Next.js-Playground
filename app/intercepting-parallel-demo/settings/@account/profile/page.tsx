function ProfilePage() {
    return (
        <div className={'p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'}>
            <h3 className={'text-xl font-bold text-blue-900 dark:text-blue-100 mb-4'}>
                Profile Settings
            </h3>
            <div className={'space-y-4'}>
                <div>
                    <label className={'block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'}>
                        Display Name
                    </label>
                    <input type={'text'} defaultValue={'John Doe'} className={'w-full px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-800'}/>
                </div>
                <div>
                    <label className={'block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'}>
                        Email
                    </label>
                    <input type={'email'} defaultValue={'john@example.com'} className={'w-full px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-800'}/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

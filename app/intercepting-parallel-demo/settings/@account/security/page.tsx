function SecurityPage() {
    return (
        <div className={'p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'}>
            <h3 className={'text-xl font-bold text-blue-900 dark:text-blue-100 mb-4'}>
                Security Settings
            </h3>
            <div className={'space-y-4'}>
                <div>
                    <h4 className={'font-semibold text-blue-900 dark:text-blue-100 mb-2'}>
                        Two-Factor Authentication
                    </h4>
                    <p className={'text-blue-700 dark:text-blue-300 text-sm mb-2'}>
                        Add an extra layer of security to your account
                    </p>
                    <button className={'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'}>
                        Enable 2FA
                    </button>
                </div>
                <div>
                    <h4 className={'font-semibold text-blue-900 dark:text-blue-100 mb-2'}>
                        Change Password
                    </h4>
                    <button className={'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'}>
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SecurityPage;

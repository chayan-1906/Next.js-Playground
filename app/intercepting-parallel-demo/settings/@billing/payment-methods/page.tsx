function PaymentMethodsPage() {
    return (
        <div className={'p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800'}>
            <h3 className={'text-xl font-bold text-green-900 dark:text-green-100 mb-4'}>
                Payment Methods
            </h3>
            <div className={'space-y-4'}>
                <div className={'p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-300 dark:border-green-700'}>
                    <div className={'flex items-center justify-between'}>
                        <div>
                            <p className={'font-semibold text-green-900 dark:text-green-100'}>
                                Visa •••• 4242
                            </p>
                            <p className={'text-sm text-green-700 dark:text-green-300'}>
                                Expires 12/2025
                            </p>
                        </div>
                        <span className={'px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm'}>
                Primary
              </span>
                    </div>
                </div>
                <button className={'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'}>
                    Add Payment Method
                </button>
            </div>
        </div>
    );
}

export default PaymentMethodsPage;

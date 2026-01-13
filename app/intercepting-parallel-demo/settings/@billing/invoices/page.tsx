function InvoicesPage() {
    return (
        <div className={'p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800'}>
            <h3 className={'text-xl font-bold text-green-900 dark:text-green-100 mb-4'}>
                Invoices
            </h3>
            <div className={'space-y-3'}>
                {['January 2024', 'February 2024', 'March 2024'].map((month) => (
                    <div key={month} className={'p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-300 dark:border-green-700 flex items-center justify-between'}>
                        <div>
                            <p className={'font-semibold text-green-900 dark:text-green-100'}>
                                {month}
                            </p>
                            <p className={'text-sm text-green-700 dark:text-green-300'}>
                                $99.00 - Paid
                            </p>
                        </div>
                        <button className={'text-green-600 dark:text-green-400 hover:underline text-sm'}>
                            Download PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InvoicesPage;

function BillingDefault() {
    return (
        <div className={'p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800'}>
            <h3 className={'text-xl font-bold text-green-900 dark:text-green-100 mb-2'}>
                Billing Overview
            </h3>
            <p className={'text-green-700 dark:text-green-300'}>
                Select a billing option from the tabs above.
            </p>
        </div>
    );
}

export default BillingDefault;

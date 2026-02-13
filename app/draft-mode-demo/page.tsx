import {draftMode} from "next/headers";
import {getContent} from "@/lib/queries/draft-content.queries";
import {ClientDraftSwitch} from "@/app/draft-mode-demo/ClientDraftSwitch";

async function DraftModeDemoPage() {
    const draft = await draftMode();

    const content = await getContent(draft.isEnabled);

    return (
        <div className={'min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8'}>
            <div className={'max-w-xl mx-auto space-y-8'}>
                <div className={'text-center space-y-4'}>
                    <h1 className={'text-4xl font-bold text-slate-900'}>
                        Draft Mode Demo
                    </h1>
                    <p className={'text-lg text-slate-600'}>
                        Toggle draft mode on or off using the switch below
                    </p>
                </div>

                <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'space-y-1'}>
                            <h2 className={'text-xl font-semibold text-slate-900'}>
                                Draft Mode
                            </h2>
                            <p className={'text-sm text-slate-500'}>
                                {draft.isEnabled ? 'Currently enabled' : 'Currently disabled'}
                            </p>
                        </div>

                        <ClientDraftSwitch isEnabled={draft.isEnabled}/>
                    </div>
                </div>
                <div className={`rounded-xl shadow-lg p-8 border ${draft.isEnabled ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'}`}>
                    <div className={'flex items-center gap-2 mb-4'}>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${draft.isEnabled ? 'bg-amber-200 text-amber-800' : 'bg-green-200 text-green-800'}`}>
                            {content.status.toUpperCase()}
                        </span>
                    </div>
                    <h2 className={'text-2xl font-bold text-slate-900 mb-3'}>
                        {content.title}
                    </h2>
                    <p className={'text-slate-600 leading-relaxed'}>
                        {content.body}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DraftModeDemoPage;

import {TabSwitcher} from "@/app/transitions-demo/TabSwitcher";
import {WithTransition} from "@/app/transitions-demo/WithTransition";
import {WithoutTransition} from "@/app/transitions-demo/WithoutTransition";

function TransitionsDemo() {
    return (
        <div className={'px-4'}>
            <h1 className={'text-emerald-300 text-2xl font-bold my-4 text-center'}>Transitions Demo</h1>

            <TabSwitcher/>

            <div className={'flex gap-8 h-1/2 overflow-hidden'}>
                {/** Left Side */}
                <WithoutTransition/>

                {/** Divider */}
                <div className={'w-0.5 bg-yellow-300 self-stretch'}/>

                {/** Right Side */}
                <WithTransition/>
            </div>
        </div>
    );
}

export default TransitionsDemo;

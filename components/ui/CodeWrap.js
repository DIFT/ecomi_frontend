import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeWrap = ({ children, gradientTo, gradientFrom }) => {
    return(
        <div className="relative md:px-8 lg:px-0 col-start-1 col-span-full lg:col-start-1 xl:col-start-3 xl:col-end-4 row-start-1 row-end-2 xl:row-start-2 xl:row-end-5 self-center pt-8 lg:pt-0">
            <div className={`w-full h-full transform translate-x-4 translate-y-4 rotate-6 rounded-xl scale-105 absolute bg-gradient-to-r ${gradientFrom} ${gradientTo}`}></div>
            <div className="mx-auto lg:max-w-2xl xl:max-w-none">
                <div
                    className="relative overflow-hidden md:rounded-xl shadow-2xl flex bg-blue-400 pb-6 md:pb-0">
                    <div className="absolute inset-0 bg-black bg-opacity-75"></div>
                    <div className="relative w-full flex flex-col">
                        <div className="flex-none h-11 flex items-center px-4">
                            <div className="flex space-x-1.5">
                                <div className="w-3 h-3 border-2 rounded-full border-red-500"></div>
                                <div className="w-3 h-3 border-2 rounded-full border-amber-400"></div>
                                <div className="w-3 h-3 border-2 rounded-full border-green-400"></div>
                            </div>
                        </div>
                        <div className="relative border-t border-white border-opacity-10 min-h-0 flex-auto flex flex-col">
                            <div className="hidden md:block absolute inset-y-0 left-0 bg-black bg-opacity-25"></div>
                            <div className="w-full flex-auto flex min-h-0 overflow-auto">
                                <div className="w-full relative flex-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeWrap
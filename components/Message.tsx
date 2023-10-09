import { cn } from "@/lib/utils";
import UserAvatar from "./user-avatar";
import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import AiAvatar from "./ai-avatar";

type MessageType = {
    role: string;
    content: string;
};

const Message = ({ message, id }: { message: MessageType; id: string }) => {
    const preRef = useRef<HTMLPreElement | null>(null);

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(preRef.current?.innerText!);
        } catch {
            const contentToCopy = preRef.current?.innerText!;
            const textarea = document.createElement("textarea");
            textarea.value = contentToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        } finally {
            toast("Copied to Clipboard");
        }
    };

    // return (
    //     <div>
    //         <div className="">
    //             {message.role} : {message.content}
    //         </div>
    //     </div>
    // );

    return (
        <div
            id={id}
            className={cn(
                "w-full py-4 px-3 md:px-4",
                message.role === "user" ? "" : "bg-slate-50"
            )}>
            <div className="max-w-2xl mx-auto flex align-top space-x-4">
                <div>{message.role === "user" ? <UserAvatar /> : <AiAvatar />}</div>
                <ReactMarkdown
                    components={{
                        pre: ({ node, ...props }) => (
                            <div className="relative">
                                <div className="overflow-auto w-full my-2 bg-black/90 p-4 text-slate-200 rounded-lg m-0">
                                    <pre {...props} ref={preRef} />
                                </div>
                                <Copy
                                    onClick={handleCopy}
                                    className="absolute right-2 top-2 text-indigo-300/70 hover:text-indigo-300/90 cursor-pointer p-2 w-8 h-8 bg-black/90 z-10 hover:bg-white/10 rounded-sm"
                                    size={15}
                                />
                            </div>
                        ),
                        code: ({ node, ...props }) => (
                            <code className="text-slate-700 " {...props} />
                        ),
                    }}
                    className="py-1 flex-grow leading-[1.7rem] w-1 md:pe-8 text-sm text-slate-900 whitespace-pre-line overflow-wrap-break-word space-y-0">
                    {message.content || ""}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Message;

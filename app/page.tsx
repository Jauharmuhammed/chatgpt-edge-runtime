"use client";

import Message from "@/components/Message";
import Empty from "@/components/empty";
import ScrollDownButton from "@/components/scroll-down-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const bottomRef = useRef(null);

    const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(true);

    // Function to submit form when Enter key is pressed and the Shift key is not held down (to allow for multiline input),
    const handleEnterKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the newline character from being added
            handleSubmit(e); // Submit the form
        }
    };

    const scrollToBottom = () => {
        window.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight,
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
      if(input === ''){
        setIsPromptEmpty(true)
      } else {
        setIsPromptEmpty(false)
      }

    }, [input])


    return (
        <div className="flex flex-col h-full w-full items-center justify-between">
            {messages.length === 0 ? (
                <Empty />
            ) : (
                <div className="w-full flex flex-col items-center h-full mt-12 md:mt-0">
                    {messages.map((message) => (
                        <Message id={`message-${message.id}`} key={message.id} message={message} />
                    ))}
                    <div
                        ref={bottomRef}
                        className="bg-slate-925 w-full h-full min-h-[8rem] md:min-h-[10rem] mt-auto"></div>
                </div>
            )}
            <div className="fixed bottom-0 left-0  right-0 z-20 bg-gradient-to-b from-transparent via-slate-100 to-slate-100 flex flex-col justify-end items-center h-32 md:h-40 py-3 md:py-10 px-3 md:px-4">
                <div className="w-full max-w-2xl relative">
                    <form
                        onKeyDown={(e) => {
                            handleEnterKeyDown(e);
                        }}
                        onSubmit={handleSubmit}
                        className="rounded-sm absolute bottom-0 md:bottom-1 w-full ps-2 py-1 pe-1 md:ps-3 bg-slate-200 focus-within:shadow-sm flex gap-1">
                        <TextareaAutosize
                            maxRows={10}
                            className="w-full py-2 border-0 outline-none text-slate-900 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                            placeholder="Send a message"
                            value={input}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            variant="link"
                            disabled={isPromptEmpty}
                            className={cn("mt-auto duration-500 w-10 h-10 p-2", {
                                "bg-emerald-500": !isPromptEmpty,
                            })}>
                            <SendHorizonal
                                className={cn("text-slate-700", {
                                    "text-slate-100": !isPromptEmpty,
                                })}
                                strokeWidth={1.5}
                            />
                        </Button>
                    </form>
                </div>
                <p className="text-xs mt-2 text-center text-slate-500">
                    BeyondGPT may produce inaccurate information about people, places, or facts.
                </p>
                <ScrollDownButton />
            </div>
        </div>
    );
}

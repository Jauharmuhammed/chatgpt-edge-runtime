import { User2 } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const UserAvatar = () => {
    return (
        <Avatar>
            <AvatarFallback>
                <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-md">
                    <User2 fill="white" size={18} />
                </div>
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;

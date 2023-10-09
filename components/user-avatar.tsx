import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
    return (
        <Avatar>
            <AvatarImage src="./logo.png" />
            <AvatarFallback>
                <div className="w-10 h-10 flex justify-center items-center bg-violet rounded-md">
                    <User2 fill="white" size={18} />
                </div>
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;

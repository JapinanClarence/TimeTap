import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    IconLogout,
    IconUserCircle,
    IconId,
    IconHistory
} from "@tabler/icons-react";
import { useForm, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/user";
import { User } from "lucide-react";

interface PageProps {
    auth: {
        user: {
            data: UserType;
        };
    };
    [key: string]: unknown;
}
export default function ProfileDropdown() {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    const user = auth.user.data;
    const { post } = useForm();
    const handleLogout = () => {
        post("/logout");
    };
    console.log(user);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="rounded-full bg-[#b6cbfb] text-primary hover:bg-[#b6cbfb]/50"
                    variant="default"
                    size="icon-lg"
                >
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage alt={user.first_name} />
                            <AvatarFallback className="rounded-full">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user.first_name} {user.last_name}
                            </span>
                            <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <IconUserCircle />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconHistory />
                        History
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconId />
                        My Id
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <IconLogout />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

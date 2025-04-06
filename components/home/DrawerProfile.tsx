"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarUser from "../AvatarUser";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const DrawerProfile = () => {
  const logUserOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error("Impossible d'effectuer cette action, réessayez plus tard!");
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem>Bookmark</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logUserOut} className="text-destructive">
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DrawerProfile;

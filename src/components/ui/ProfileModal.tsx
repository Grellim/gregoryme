"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileData {
  name: string;
  bio: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export default function ProfileModal({ isOpen, onClose, initialData, onSave }: ProfileModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>({
    defaultValues: initialData,
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: ProfileData) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sobre Mim</DialogTitle>
          <DialogDescription>
            Saiba mais sobre mim.
          </DialogDescription>
        </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
          </div>
          <div className="space-y-2">
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="w-64 h-64">
              <AvatarImage src="/profile.jpg" />
              <AvatarFallback>GV</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">Gregory Vallim</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Gregory Vallim</p>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
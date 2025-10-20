"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/store/usePostsStore";
import { Pen } from "lucide-react";
import { useState } from "react";

type EditPostDialogProps = {
  post: { id: number; title: string; body: string };
};

export function EditPostDialog({ post }: EditPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.body);
  const updatePost = usePostsStore((s) => s.updatePost);
  const loading = usePostsStore((s) => s.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(post.id, { title, body: description });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-sm w-[35px] h-[35px] bg-white border border-gray-200 flex justify-center items-center cursor-pointer">
          <Pen color="black" size={20} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-2">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter post description"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="w-full">
                  <Spinner className="text-white size-6"/>
                </div>
              ) : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

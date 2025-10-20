"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash} from "lucide-react";
import { usePostsStore } from "@/store/usePostsStore";
import { Spinner } from "@/components/ui/spinner";

type DeletePostDialogProps = {
  postId: number;
};

export function DeletePostDialog({ postId }: DeletePostDialogProps) {
  const { deletePost, loading } = usePostsStore();

  const handleDelete = async () => {
    await deletePost(postId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-sm w-[35px] h-[35px] bg-white border border-primary flex justify-center items-center cursor-pointer hover:bg-red-50 transition">
          <Trash color="red" size={20} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">
            Delete Post
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2 sm:gap-4 mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
              <Spinner className="text-white size-6"/>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

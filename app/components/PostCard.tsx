import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { DeletePostDialog } from "./DeletePostDialog";
import { EditPostDialog } from "./EditPostDialog";
import Link from "next/link";

type PostCardProps = {
    post: { id: number; title: string; body:string };
  };
const PostCard = ({post}:PostCardProps) => {
    
  return (
    <Card className="w-full p-3 rounded-sm flex-row justify-between items-center">
    <div className="w-[70%] flex justify-start items-center gap-3">
      <Checkbox />
      <Link  href={`/posts/${post.id}`} className="text-black text-sm font-medium hover:underline">{post.title}</Link>
    </div>

    <div className="w-[20%] flex  justify-end items-center gap-2 z-40">
    <EditPostDialog post={post} />
    <DeletePostDialog postId={post.id} />
    </div>
  </Card>
  );
};

export default PostCard;

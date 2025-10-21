"use client";

import React, { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/store/usePostsStore";
import Link from "next/link";


type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { posts, fetchPosts, loading } = usePostsStore();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const existingPost = posts.find((p) => p.id === Number(id));

    if (existingPost) {
      setPost(existingPost);
    } else {
      fetchPosts().then(() => {
        const updated = usePostsStore
          .getState()
          .posts.find((p) => p.id === Number(id));
          setPost(updated || null);
      });
    }
  }, [id, posts, fetchPosts]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Card className="p-6 w-full md:w-[30%] mx-auto flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-[120px]">
            <Spinner className="size-6 text-primary" />
          </div>
        ) : post ? (
          <>
            <div className="flex flex-col gap-4 w-full">
              <Input value={post.title} readOnly className="text-lg" />
              <Textarea
                value={post.body}
                readOnly
                className="text-black min-h-[120px]"
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Post not found.</p>
        )}

        <Link href="/" passHref>
          <Button className="mt-2 w-full cursor-pointer">Home Page</Button>
        </Link>
      </Card>
    </div>
  );
}

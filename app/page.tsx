"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PostForm } from "./components/PostForm";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";
import { usePostsStore } from "@/store/usePostsStore";
import { PostPagination } from "./components/PostPagination";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const { posts, fetchPosts, search, setSearch, loading } = usePostsStore();
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // Filter posts by search term (from store)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Card className="overflow-hidden p-4 w-full md:w-[50%] mx-auto  flex flex-col">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="font-bold  md:text-lg">HIOFUTASK</h1>
          <PostForm />
        </div>

        {/* Search Input */}
        <div>
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>

        {/* Post list */}
        <div className="w-full flex flex-col justify-start items-center gap-2 flex-1 ">
          {loading ? (
            <div className="w-full flex justify-center items-center h-full">
              <Spinner className="size-8 text-primary" />
            </div>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <PostCard key={`${post.id}-${index}`} post={post} />
            ))
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              <p className="text-4xl mb-2">😞</p>
              <p className="text-gray-500">No posts found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <PostPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
}

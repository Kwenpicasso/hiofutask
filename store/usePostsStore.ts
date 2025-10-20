import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: number, post: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
};

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  search: "",
  page: 1,

  setSearch: (s) => set({ search: s }),
  setPage: (p) => set({ page: p }),

  // FETCH POSTS
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const { page, search } = get();
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

      const filtered = res.data.filter((p: Post) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );

      const paginated = filtered.slice((page - 1) * 10, page * 10);
      set({ posts: paginated, loading: false });

      toast.success("Posts loaded successfully");
    } catch (e: any) {
      set({ error: e.message, loading: false });
      toast.error("Failed to load posts");
    }
  },

 // CREATE POSTS
createPost: async (post) => {
    set({ loading: true });
    try {
      const nextId = Math.max(11, ...get().posts.map((p) => p.id + 1));
      const payload = {
        ...post,
        id: nextId,
        userId: Math.floor(Math.random() * 1000),
      };
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
      const newPost = { ...res.data, id: nextId, userId: payload.userId };
  
      set((s) => ({
        posts: [newPost, ...s.posts],
        loading: false,
      }));
  
      toast.success(`Post #${nextId} created successfully!`);
    } catch (e: any) {
      set({ error: e.message, loading: false });
      toast.error(`Failed to create post: ${e.message}`);
    }
  },
  

  // UPDATE POST
  updatePost: async (id, post) => {
    set({ loading: true });
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? { ...p, ...post } : p)),
        loading: false,
      }));
      toast.success("Post updated successfully");
    } catch (e: any) {
      set({ error: e.message, loading: false });
      toast.error(`Failed to update post: ${e.message}`);
    }
  },
  //  DELETE POST
  deletePost: async (id) => {
    const prevPosts = get().posts;
    set({ loading: true });
    set((s) => ({ posts: s.posts.filter((p) => p.id !== id) }));

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      set({ loading: false });
      toast.success("Post deleted successfully");
    } catch (e) {
      set({
        posts: prevPosts,
        error: "Failed to delete, rolled back.",
        loading: false,
      });
      toast.error("Failed to delete post");
    }
  },
}));

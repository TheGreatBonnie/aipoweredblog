import { supabase } from "@/utils/supabase";
import { cookies } from "next/headers";
import Header from "@/app/components/Header";

// Define an asynchronous function named 'getArticles' that retrieves article data based on the provided parameters
async function getArticles(params: any) {
  // Extract the 'id' parameter from the provided 'params' object
  const { id } = params;

  // Retrieve article data from Supabase database where the 'id' matches the provided value
  const { data, error } = await supabase(cookies)
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  // Return the retrieved data
  return data;
}

// Define a default asynchronous function named 'Post' that takes 'params' as props
export default async function Post({ params }: { params: any }) {
  // Retrieve the post data asynchronously based on the provided 'params'
  const post = await getArticles(params);

  // Return JSX to render the post details
  return (
    <>
      {/* Render the header component */}
      <Header />
      {/* Main content wrapper */}
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              {/* Render the post title */}
              <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
                {/* Render the post title only if 'post' is truthy */}
                {post && post.title}
              </h2>
              {/* Render the post content */}
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {/* Render the post content only if 'post' is truthy */}
                {post && post.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

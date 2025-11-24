import CallToAction from "@/components/CallToAction";
import RecentPost from "@/components/RecentPost";
import Image from "next/image";

export default async function Home() {
  let posts = null;

  try {
    const baseUrl =
      process.env.URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const result = await fetch(`${baseUrl}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 9,
        order: "desc",
      }),
      cache: "no-store",
    });

    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.Console.log("Error getting post", error);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to My Blog</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover verity of article and tutorial on topic such as web
          development,softwarw engineering and programing lang,all brought to
          you through blogbuild with NextJs and{" "}
          <a
            className="text-teal-500 hover:underline"
            href="https://go.clerk.com/"
            target="_blank"
          ></a>
          .
        </p>
        <Link
          href="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

     <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction/>
     </div>

     <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPost limit={9}/>
        <Link href={"/search?category=null"} className={'text-lg text-teal-500 hover:underline text-center'}>
          View all posts
        </Link>
     </div>
    </div>
  );
}

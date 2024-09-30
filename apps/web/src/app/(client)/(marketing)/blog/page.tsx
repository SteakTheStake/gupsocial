import dayjs from "dayjs";
import Image from "next/image";

import { Badge } from "@turbostarter/ui-web/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { getPages } from "~/lib/content/blog";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Blog",
  description: "News and updates about the platform",
});

const BlogPage = () => {
  const posts = getPages();

  return (
    <div className="flex flex-col gap-10 self-start sm:gap-12 md:gap-14 lg:mt-12 lg:gap-16">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          News and updates about the platform
        </p>
      </header>

      <main className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {posts.map((post) => (
          <TurboLink
            key={post.data.slug}
            href={pathsConfig.marketing.blog.post(post.data.slug)}
            className="group basis-[34rem]"
          >
            <Card className="overflow-hidden transition-colors group-hover:bg-muted">
              <CardHeader className="space-y-2 pb-3">
                <div className="-mx-6 -mt-6 mb-4 aspect-video overflow-hidden bg-muted">
                  <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      alt=""
                      fill
                      src={post.data.thumbnail}
                      className="object-cover"
                    />
                  </div>
                </div>
                <CardTitle className="leading-tight lg:text-3xl">
                  {post.data.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3">
                  <time className="text-muted-foreground">
                    {dayjs(post.data.publishedAt).format("MMMM D, YYYY")}
                  </time>

                  <div className="flex flex-wrap gap-1">
                    {post.data.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">{post.data.description}</p>
              </CardContent>
            </Card>
          </TurboLink>
        ))}
      </main>
    </div>
  );
};

export default BlogPage;

import { MDXContent } from "@content-collections/mdx/react";
import dayjs from "dayjs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import Image from "next/image";
import { memo } from "react";

import { Badge } from "@turbostarter/ui-web/badge";

import type { TableOfContents } from "fumadocs-core/server";

interface MdxProps {
  readonly data: {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly toc: TableOfContents;
    readonly thumbnail?: string;
    readonly publishedAt?: Date;
    readonly tags?: string[];
  };
}

export const Mdx = memo<MdxProps>(({ data }) => {
  return (
    <DocsPage
      toc={data.toc}
      footer={{ enabled: false }}
      tableOfContent={{ footer: <div className="md:h-10" /> }}
    >
      <div className="-mx-2 flex w-[calc(100+1rem)] max-w-[45rem] flex-col gap-4 md:mx-auto">
        <DocsTitle className="text-balance text-left text-4xl font-bold tracking-tight md:text-5xl">
          {data.title}
        </DocsTitle>
        <div className="flex flex-wrap items-center gap-3">
          {data.publishedAt && (
            <time className="text-muted-foreground">
              {dayjs(data.publishedAt).format("MMMM D, YYYY")}
            </time>
          )}

          {data.tags && (
            <div className="flex flex-wrap gap-1">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <DocsDescription className="mb-2 text-base">
          {data.description}
        </DocsDescription>
        {data.thumbnail && (
          <div className="relative -mx-2 aspect-video">
            <Image
              alt=""
              fill
              src={data.thumbnail}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <DocsBody className="py-6">
          <MDXContent
            code={data.body}
            components={{ ...defaultMdxComponents }}
          />
        </DocsBody>
      </div>
    </DocsPage>
  );
});

Mdx.displayName = "Mdx";

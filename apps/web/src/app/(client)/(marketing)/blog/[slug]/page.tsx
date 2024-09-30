import { notFound } from "next/navigation";

import { Mdx } from "~/components/common/mdx";
import { getPage, getPages } from "~/lib/content/blog";
import { getMetadata } from "~/lib/metadata";

import type { TableOfContents } from "fumadocs-core/server";

export default function Page({ params }: { params: { slug: string } }) {
  const page = getPage([params.slug]);

  if (!page) {
    notFound();
  }

  return (
    <Mdx
      data={{
        ...page.data,
        toc: page.data.toc as TableOfContents,
      }}
    />
  );
}

export function generateStaticParams() {
  const pages = getPages();

  return pages.map((page) => ({
    slug: page.data.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getPage([params.slug]);

  if (!page) {
    return notFound();
  }

  return getMetadata({
    title: page.data.title,
    description: page.data.description,
  });
}

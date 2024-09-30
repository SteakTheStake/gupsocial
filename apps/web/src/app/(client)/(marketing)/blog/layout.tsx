import { DocsLayout } from "fumadocs-ui/layout";

import { pageTree } from "~/lib/content/legal";

export default function BlogLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-full self-start lg:-mt-12">
      <DocsLayout
        tree={pageTree}
        sidebar={{ enabled: false }}
        nav={{ enabled: false }}
      >
        {props.children}
      </DocsLayout>
    </div>
  );
}

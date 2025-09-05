import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyAgent Documentation - Complete Guide",
  description: "Complete guide to building intelligent agents with TinyAgent: three-tier architecture, 20 built-in tools, enterprise security, multi-provider support, API reference, and best practices.",
  keywords: ["TinyAgent docs", "AI agent documentation", "TinyAgent tutorial", "agent framework guide", "Python AI agents", "enterprise AI", "subagent swarm"],
  authors: [{ name: "AskBudi Team" }],
  openGraph: {
    title: "TinyAgent Documentation - Complete Guide",
    description: "Complete guide to building intelligent agents with TinyAgent's three-tier architecture and enterprise features.",
    type: "website",
    url: "https://askbudi.com/tinyagent/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyAgent Documentation - Complete Guide",
    description: "Complete guide to building intelligent agents with TinyAgent's three-tier architecture and enterprise features.",
  },
};

export default function TinyAgentDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
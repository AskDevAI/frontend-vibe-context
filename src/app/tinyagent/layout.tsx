import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyAgent - Enterprise AI Agent Framework",
  description: "The most powerful yet minimal AI agent framework with three-tier architecture: TinyAgent + TinyCodeAgent + Subagent Swarm. 20 built-in tools, enterprise security, multi-provider support.",
  keywords: ["AI agent", "TinyAgent", "machine learning", "artificial intelligence", "Python", "OpenAI", "Anthropic", "automation", "enterprise AI"],
  authors: [{ name: "AskBudi Team" }],
  openGraph: {
    title: "TinyAgent - Enterprise AI Agent Framework",
    description: "Build intelligent agents with three-tier architecture, 20 built-in tools, and enterprise security.",
    type: "website",
    url: "https://askbudi.com/tinyagent",
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyAgent - Enterprise AI Agent Framework",
    description: "Build intelligent agents with three-tier architecture, 20 built-in tools, and enterprise security.",
  },
};

export default function TinyAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
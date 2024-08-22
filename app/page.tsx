import Image from "next/image";
import { Text, TextLink, Strong } from "../components/text";
import { Button } from "../components/button";
import { Navbar, NavbarSection, NavbarSpacer } from "../components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Navbar className="w-full max-w-7xl">
        <NavbarSection>
          <Image src="/rankflow-logo.svg" alt="RankFlow Logo" width={120} height={40} />
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <Button href="/login">Log In</Button>
          <Button href="/signup">Sign Up</Button>
        </NavbarSection>
      </Navbar>

      <div className="flex flex-col items-center text-center max-w-4xl mt-20">
        <h1 className="text-4xl font-bold mb-6">
          AI-Powered Webflow CMS Editor for Faster Search Engine Rankings
        </h1>
        <Text className="text-xl mb-8">
          RankFlow helps Webflow users create SEO-optimized content effortlessly, 
          boosting your pages' search engine performance.
        </Text>
        <Button href="/signup">Get Started</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl">
        <FeatureCard
          title="Webflow Integration"
          description="Log in with your Webflow account and connect your desired collections seamlessly."
        />
        <FeatureCard
          title="AI-Powered Content"
          description="Use AI to fill rich text and plain text fields with SEO-optimized content."
        />
        <FeatureCard
          title="Rank Faster"
          description="Improve your search engine rankings with content tailored for SEO performance."
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
      <Strong className="text-lg mb-2">{title}</Strong>
      <Text>{description}</Text>
    </div>
  );
}
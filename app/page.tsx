import { Text } from "../components/text";
import { Button } from "../components/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between bg-black bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent p-8">
      <div className="mt-16 flex max-w-3xl flex-col items-center text-center">
        <h1 className="mb-6 text-5xl font-bold text-white">
          AI-Powered Webflow CMS Editor for Faster Search Engine Rankings
        </h1>
        <Text className="mb-8 max-w-md text-xl text-gray-300">
          RankFlow helps Webflow users create SEO-optimized content
          effortlessly, boosting your pages&apos; search engine performance.
        </Text>
        <Button
          href="https://forms.clickup.com/9005006652/f/8cbuztw-38714/VZX08WML55BESNV057"
          className="text-white transition-colors duration-200 hover:bg-red-600"
          color="red"
        >
          Connect your first collection for free
        </Button>
      </div>
    </div>
  );
}

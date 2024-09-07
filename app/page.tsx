'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, TextLink, Strong } from '@/components/ui/text';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { WaitlistDialog } from '@/components/self-hosted-waitlist-dialog';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleGetStarted = (plan?: string) => {
    const url = plan ? `/sign-up?plan=${encodeURIComponent(plan)}` : '/sign-up';
    router.push(url);
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup logic
    console.log('Email signup:', email);
    setEmail('');
  };

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative">
      <header className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-2xl">
          <span className="bg-zinc-700 text-white dark:bg-white dark:text-zinc-900">
            Add AI to Webflow's CMS
          </span>
          {' Rank Higher in Search Engines'}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-prose">
          Rankflow connects your Webflow Collections, making it easy to manage and optimize your content for search engines.
        </p>
        <div className="mt-6 flex items-center gap-x-6">
          <Button onClick={() => handleGetStarted()}>Get Started For Free</Button>
        </div>
      </header>

      <section className="mb-20 max-w-prose">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Key Features</h2>
        <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
          <li><Strong>Target Keywords:</Strong> Set keywords for each collection item to ensure properly targeted content.</li>
          <li><Strong>CMS Optimization:</Strong> Edit field help text for better CMS practices and improved AI-generated content.</li>
          <li><Strong>AI Content Auditor:</Strong> Ensure your content is as human as possible for better Google indexing.</li>
        </ul>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-zinc-600 dark:text-zinc-400">
          <li>Sign up for a Rankflow account</li>
          <li>Connect your site with a <TextLink href="https://docs.developers.webflow.com/data/docs/get-a-site-token">Webflow site token</TextLink></li>
          <li>Start editing your text with the help of AI</li>
        </ol>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Our AI Approach</h2>
        <Text className="mb-4">
          At Rankflow, we believe in transparency about our AI usage. We leverage a variety of language models to ensure your content is relevant, original, and optimized for each specific use case.
        </Text>
        <Text className="mb-4">
          Our current AI stack includes:
        </Text>
        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
          <li>Perplexity AI</li>
          <li>Anthropic</li>
          <li>OpenAI</li>
          <li>Cohere</li>
          <li>Mistral</li>
        </ul>
        <Text>
          While it's possible to replicate our workflow using individual AI subscriptions, Rankflow offers a streamlined, continuously updated solution. We handle the complexities of prompt engineering, model selection, and feature development, allowing you to focus on creating great content.
        </Text>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Pricing</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Plan</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Collections</TableHeader>
                <TableHeader>Features</TableHeader>
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Starter</TableCell>
                <TableCell>$20/mo</TableCell>
                <TableCell>Up to 5</TableCell>
                <TableCell>Unlimited generations, Unlimited websites</TableCell>
                <TableCell>
                  <Button onClick={() => handleGetStarted('Starter')}>Get Started with Starter</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pro</TableCell>
                <TableCell>$35/mo</TableCell>
                <TableCell>Up to 10</TableCell>
                <TableCell>Unlimited generations, Unlimited websites</TableCell>
                <TableCell>
                  <Button onClick={() => handleGetStarted('Pro')}>Get Started with Pro</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Business</TableCell>
                <TableCell>$50/mo</TableCell>
                <TableCell>Up to 20</TableCell>
                <TableCell>Unlimited generations, Unlimited websites</TableCell>
                <TableCell>
                  <Button onClick={() => handleGetStarted('Business')}>Get Started with Business</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Self-hosted</TableCell>
                <TableCell>$200/Once</TableCell>
                <TableCell>Unlimited</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>
                  <Button onClick={openWaitlist}>Join Waitlist</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">What is Rankflow?</h3>
            <Text>Rankflow is a SaaS tool that connects to your Webflow Collections, allowing you to easily manage and optimize your plain text and rich text fields for search engines using AI.</Text>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">How do I get started with Rankflow?</h3>
            <Text>Simply sign up for an account, connect your Webflow site using a site token, and start optimizing your content with AI assistance.</Text>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Is there a limit to the number of AI generations?</h3>
            <Text>No, all plans include unlimited generations across unlimited websites.</Text>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Can I use Rankflow with multiple Webflow sites?</h3>
            <Text>Yes, you can connect and manage multiple Webflow sites with your Rankflow account.</Text>
          </div>
        </div>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Stay Updated</h2>
        <Text className="mb-4">
          Subscribe to our newsletter for product updates, general SEO tips, and Webflow-specific SEO management advice to boost your success.
        </Text>
        <form onSubmit={handleEmailSignup} className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>

      {/* Floating Login Button */}
      <div className="fixed bottom-4 right-4">
        <Button outline onClick={() => router.push('/login')} >Login</Button>
      </div>

      {/* Waitlist Dialog */}
      <WaitlistDialog isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </div>
  );
}

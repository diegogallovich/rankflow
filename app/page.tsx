import { getLogtoContext, signIn } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { Text, TextLink, Strong } from '@/components/text';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import SelfHostedWaitlistButton from '@/app/ui/self-hosted-waitlist-dialog';
import EmailListSubscriptionForm from '@/app/ui/email-list-subscription-form';
import SignIn from '@/app/ui/sign-in';
import { Button } from '@/components/button';

export default async function Home() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-20">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          <span className="bg-zinc-800 text-white dark:bg-white dark:text-zinc-900">
            Add AI to Webflow&apos;s CMS
          </span>
          {' Rank Higher in Search Engines'}
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Rankflow connects your Webflow Collections, making it easy to manage and optimize your
          content for search engines.
        </p>
        <div className="mt-6 flex items-center gap-x-6">
          {isAuthenticated ? (
            <Button outline href="/dashboard">
              Go to Dashboard
            </Button>
          ) : (
            <SignIn
              color="blue"
              onSignIn={async () => {
                'use server';
                await signIn(logtoConfig);
              }}
              cta="Get Started For Free"
            />
          )}
        </div>
      </header>

      <section className="mb-20 max-w-prose">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Key Features</h2>
        <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
          <li>
            <Strong>Target Keywords:</Strong> Set keywords for each collection item to ensure
            properly targeted content.
          </li>
          <li>
            <Strong>CMS Optimization:</Strong> Edit field help text for better CMS practices and
            improved AI-generated content.
          </li>
          <li>
            <Strong>AI Content Auditor:</Strong> Ensure your content is as human as possible for
            better Google indexing.
          </li>
        </ul>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">How It Works</h2>
        <ol className="list-inside list-decimal space-y-4 text-zinc-600 dark:text-zinc-400">
          <li>Sign up for a Rankflow account</li>
          <li>
            Connect your site with a{' '}
            <TextLink href="https://docs.developers.webflow.com/data/docs/get-a-site-token">
              Webflow site token
            </TextLink>
          </li>
          <li>Start editing your text with the help of AI</li>
        </ol>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Our AI Approach</h2>
        <Text className="mb-4">
          At Rankflow, we believe in transparency about our AI usage. We leverage a variety of
          language models to ensure your content is relevant, original, and optimized for each
          specific use case.
        </Text>
        <Text className="mb-4">Our current AI stack includes:</Text>
        <ul className="mb-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Perplexity AI</li>
          <li>Anthropic</li>
          <li>OpenAI</li>
          <li>Cohere</li>
          <li>Mistral</li>
        </ul>
        <Text>
          While it&apos;s possible to replicate our workflow using individual AI subscriptions,
          Rankflow offers a streamlined, continuously updated solution. We handle the complexities
          of prompt engineering, model selection, and feature development, allowing you to focus on
          creating great content.
        </Text>
      </section>

      <section className="mb-20">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Pricing</h2>
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
                <TableCell>$40/mo</TableCell>
                <TableCell>Up to 5</TableCell>
                <TableCell>Unlimited generations, Unlimited websites</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pro</TableCell>
                <TableCell>$60/mo</TableCell>
                <TableCell>Up to 10</TableCell>
                <TableCell>Unlimited generations, Unlimited websites</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Business</TableCell>
                <TableCell>$80/mo</TableCell>
                <TableCell>Up to 20</TableCell>
                <TableCell>
                  Unlimited generations, Unlimited websites, Request new features
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Self-hosted</TableCell>
                <TableCell>$300/Once</TableCell>
                <TableCell>Unlimited</TableCell>
                <TableCell>Coming soon</TableCell>
                <TableCell>
                  <SelfHostedWaitlistButton />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
              What is Rankflow?
            </h3>
            <Text>
              Rankflow is a SaaS tool that connects to your Webflow Collections, allowing you to
              easily manage and optimize your plain text and rich text fields for search engines
              using AI.
            </Text>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
              How do I get started with Rankflow?
            </h3>
            <Text>
              Simply sign up for an account, connect your Webflow site using a site token, and start
              optimizing your content with AI assistance.
            </Text>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
              Is there a limit to the number of AI generations?
            </h3>
            <Text>No, all plans include unlimited generations across unlimited websites.</Text>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
              Can I use Rankflow with multiple Webflow sites?
            </h3>
            <Text>
              Yes, you can connect and manage multiple Webflow sites with your Rankflow account.
            </Text>
          </div>
        </div>
      </section>

      <section className="mb-20 max-w-prose">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Stay Updated</h2>
        <Text className="mb-4">
          Subscribe to our newsletter for product updates, general SEO tips, and Webflow-specific
          SEO management advice to boost your success.
        </Text>
        <EmailListSubscriptionForm />
      </section>

      {/* Floating Login Button */}
      <div className="fixed bottom-4 right-4">
        {isAuthenticated ? (
          <Button outline href="/dashboard">
            Dashboard
          </Button>
        ) : (
          <SignIn
            onSignIn={async () => {
              'use server';
              await signIn(logtoConfig);
            }}
          />
        )}
      </div>
    </div>
  );
}

import { Text } from '@/components/ui/text';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <Text className="mb-4">
        At Rankflow, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <Text className="mb-4">
        We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide when using our services.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <Text className="mb-4">
        We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
      <Text className="mb-4">
        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
      <Text className="mb-4">
        We may use third-party services that collect, monitor and analyze this information to improve our service&apos;s functionality and user experience.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
      <Text className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <Text className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at privacy@rankflow.com.
      </Text>

      <Text className="mt-8 text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </Text>
    </div>
  );
}

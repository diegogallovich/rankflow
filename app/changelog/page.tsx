import { Text } from '@/components/ui/text';

type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

const changelogData: ChangelogEntry[] = [
  {
    version: "1.1.0",
    date: "2024-03-15",
    changes: [
      "Added support for multiple Webflow sites",
      "Improved AI content generation accuracy",
      "Fixed bug in keyword targeting feature"
    ]
  },
  {
    version: "1.0.1",
    date: "2024-02-28",
    changes: [
      "Performance improvements for large collections",
      "UI enhancements for better user experience",
      "Bug fixes and stability improvements"
    ]
  },
  {
    version: "1.0.0",
    date: "2024-02-01",
    changes: [
      "Initial release of Rankflow",
      "Basic AI-powered content optimization",
      "Integration with Webflow CMS",
      "Keyword targeting feature"
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Changelog</h1>
      <Text className="mb-8">
        Keep track of the latest updates and improvements to Rankflow.
      </Text>

      {changelogData.map((entry, index) => (
        <div key={index} className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <h2 className="text-2xl font-semibold mb-2">
            Version {entry.version} <span className="text-sm font-normal text-gray-500">({entry.date})</span>
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {entry.changes.map((change, changeIndex) => (
              <li key={changeIndex} className="text-gray-700 dark:text-gray-300">
                {change}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
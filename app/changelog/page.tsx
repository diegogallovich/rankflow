import { Text } from '@/components/ui/text';

type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

const changelogData: ChangelogEntry[] = [
  {
    version: "0.2.0",
    date: "2023-09-07",
    changes: [
      "Added public changelog page",
      "Implemented feedback submission feature",
      "Created privacy policy page",
      "Improved middleware to handle public and authenticated routes",
      "Enhanced app layout with sidebar navigation",
      "Integrated Supabase authentication",
      "Added dark mode support"
    ]
  },
  {
    version: "0.1.1",
    date: "2023-09-06",
    changes: [
      "Set up basic Next.js project structure",
      "Implemented initial UI components",
      "Created placeholder pages for key features",
      "Added Tailwind CSS for styling"
    ]
  },
  {
    version: "0.1.0",
    date: "2023-09-05",
    changes: [
      "Initial project setup",
      "Created project repository",
      "Defined basic project requirements and features"
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
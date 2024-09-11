'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';

export default function ShareFeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send this data to your backend or a third-party service
    // For this example, we'll just log it and set submitted to true
    console.log('Feedback submitted:', { feedback, email });

    // You could also store the feedback in Supabase if you have a table for it
    // const { data, error } = await supabase
    //   .from('feedback')
    //   .insert({ feedback, email });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
        <h1 className="mb-6 text-3xl font-bold">Thank You!</h1>
        <Text>Your feedback has been submitted. We appreciate your input!</Text>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
      <h1 className="mb-6 text-3xl font-bold">Share Your Feedback</h1>
      <Text className="mb-4">
        We value your opinion and would love to hear your thoughts on Rankflow.
      </Text>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your Feedback
          </label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email (optional)
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit">Submit Feedback</Button>
      </form>
    </div>
  );
}

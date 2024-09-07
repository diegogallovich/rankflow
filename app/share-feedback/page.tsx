'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

export const dynamic = 'force-dynamic';

export default function ShareFeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClientComponentClient();

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
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Thank You!</h1>
        <Text>Your feedback has been submitted. We appreciate your input!</Text>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Share Your Feedback</h1>
      <Text className="mb-4">We value your opinion and would love to hear your thoughts on Rankflow.</Text>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

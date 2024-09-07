import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Text } from '@/components/ui/text'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <Text>Email: {user.email}</Text>
    </div>
  )
}
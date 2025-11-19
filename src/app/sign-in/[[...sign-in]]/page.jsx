import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center p-8 max-w-6xl mx-auto h-fit '>
    <SignIn />
  </div>
  )
  
}
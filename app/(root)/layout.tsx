import { auth } from '@/auth'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (!session) redirect('/sign-in')
    console.log(session)
    return (
        <main className='root-container'>
            <div className="mx-auto w-full max-w-7xl">
                {/* @ts-ignore */}
                <Header session={session} />
            </div>
            {children}
        </main>
    )
}

export default layout

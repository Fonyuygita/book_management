import { auth } from '@/auth'
import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    console.log(session)
    return (
        <main className='root-container'>
            <div className="mx-auto max-w-7xl">
                <Header session={session} />
            </div>
            {children}
        </main>
    )
}

export default layout

import { auth } from '@/auth'
import Header from '@/components/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (!session) redirect('/sign-in')

    // we only want to check the users last visit only when user is signiN, THIS IS TO SEE LAST TIME User was logged in

    // get the user and see if last activity is today
    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1)
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return
    after(async () => {
        if (!session?.user?.id) return
        // if user do exist,  we want to update our database
        // take the year, month and day without the time 
        await db.update(users).set({ lastActivityDate: new Date().toISOString().slice(0, 10) }).where(eq(users.id, session?.user?.id))
    })

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

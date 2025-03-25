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

    //    AFTER USER SIGN IN
    after(async () => {
        if (!session?.user?.id) return

        const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1)
        if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return
        // if user do exist,  we want to update our database
        // take the year, month and day without the time 
        // keep updating to know when the user was last active-> you cxan use useEffect or avoid uisng it in the client side
        await db.update(users).set({ lastActivityDate: new Date().toISOString().slice(0, 10) }).where(eq(users.id, session?.user?.id))
    })
    // NOW GO TO OUR ONBOARDING API KEY AND ADD CONDITIONS FOR SENDING EMAILS ACCORDING TO THE CONDITIONS ABOVE
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

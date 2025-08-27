"use client"

import Link from 'next/link';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

export default function Appbar() {
    return (
        <div className='flex justify-between items-center p-4'>
            <div>
                <div>Ping Patrol</div>
            </div>
            <div> 
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <div>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

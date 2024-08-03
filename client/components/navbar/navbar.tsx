"use client"
import React from 'react'
import { MainNav } from './main-nav'
import { cn } from '../../lib/utils'

export const Navbar = () => {

    return (
        <div className={cn("border-b")}>
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
            </div>
        </div>
    )
}
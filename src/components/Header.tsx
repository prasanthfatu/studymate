import { HomeIcon, File, UserRound, LogOut, UsersRound } from "lucide-react"
import NavButton from "@/components/NavButton"
import Link from "next/link"
import { ModeToggle } from '@/components/ModeToggle'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from '@/components/ui/button'

import { NavButtonMenu } from "./NavButtonMenu"

export default function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
        <div className="flex h-8 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <NavButton href="/home" label="Home" icon={HomeIcon} />
            <Link href='/home' className="flex justify-center items-center ml-0" title='Home'>
              <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">StudyMate</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <NavButton href="/tasks" label="Tasks" icon={File} />
            <NavButtonMenu
                icon={UsersRound}
                label='Students Menu'
                choices={[
                  {title: 'Search Students', href:'/students'},
                  {title: 'New Student', href:'/students/form'},
                ]}
            />
            <ModeToggle />
            <Button
              variant='ghost'
              size='icon'
              aria-label="LogOut"
              title="LogOut"
              className="rounded-full"
              asChild
            >
              <LogoutLink>
                <LogOut />
              </LogoutLink>
            </Button>
          </div>
        </div>
    </header>
  )
}

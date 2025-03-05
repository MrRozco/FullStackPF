  'use client'
  import { useHeaderTheme } from '@/providers/HeaderTheme'
  import Link from 'next/link'
  import { usePathname } from 'next/navigation'
  import React, { useEffect, useState } from 'react'
  import { Media } from '@/components/Media'
  import styles from './Header.module.css'

  import type { Header } from '@/payload-types'

  import { Logo } from '@/components/Logo/Logo'
  import { HeaderNav } from './Nav'
  import { SearchIcon } from 'lucide-react'

  interface HeaderClientProps {
    data: Header
  }

  export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
    /* Storing the value in a useState to avoid hydration errors */
    const [theme, setTheme] = useState<string | null>(null)
    const { headerTheme, setHeaderTheme } = useHeaderTheme()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
      setHeaderTheme(null)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
      if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerTheme])

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
      setIsMobileMenuOpen(false)
    }, [pathname])


    return (
      <header className="relative z-20 bg-red-100" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="container flex justify-between">
          <Link href="/">
            <Media imgClassName="w-[200px] h-[70px]" priority resource={data.logo} />
          </Link>
          <div className="flex items-center">
          <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary h-[100%] flex items-center ml-4 lg:hidden" />
        </Link>
          <button
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          </div>
          <div className="hidden lg:flex">
            <HeaderNav data={data} />
          </div>
        </div>
        <div
        className={`
          lg:hidden bg-red-500 shadow-lg absolute left-0 w-full transition-all duration-500 
          ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%] pointer-events-none'}
        `}
      >
        <HeaderNav data={data} />
      </div>
      </header>
    )
  }
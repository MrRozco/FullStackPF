'use client'

import React, { useState } from 'react'
import type { Header as HeaderType, Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const pathname = usePathname()

  const getLinkUrl = (link: { type?: 'reference' | 'custom' | null; url?: string | null; reference?: { relationTo: 'pages' | 'posts'; value: { slug: string } | string | Page | Post } | null }): string | null => {
      if (link.type === 'custom' && link.url) {
        return link.url;
      } else if (link.type === 'reference' && link.reference) {
        const { relationTo, value } = link.reference;
        if (relationTo === 'pages' && value) {
          if (typeof value === 'string') {
            return `/${value}`;
          } else if (typeof value === 'object' && 'slug' in value) {
            return `/${value.slug}`;
          }
        } else if (relationTo === 'posts' && value) {
          if (typeof value === 'string') {
            return `/posts/${value}`;
          } else if (typeof value === 'object' && 'slug' in value) {
            return `/posts/${value.slug}`; // Adjust this prefix based on your post routes
          }
        }
      }
      return null; // Fallback if no URL can be determined
    };

  const normalizePath = (path: string) => path.replace(/\/$/, '');


  const handleToggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  useEffect(() => {
    setOpenDropdown(null) // Close all dropdowns on navigation
  }, [pathname])

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden lg:flex lg:flex-row lg:justify-between ">
        {navItems.map(({ link, hasDropdown, dropdownItems }, i) => {
          const linkUrl = getLinkUrl(link);
          const isActive = linkUrl && normalizePath(pathname) === normalizePath(linkUrl);
          return (
          <div key={i} className="relative group ">
            <CMSLink
              {...link}
              className={`text-lg px-7 h-full flex items-center hover:bg-gray-800 hover:cursor-pointer relative ${
                isActive ? 'bg-slate-300' : '' // Apply hover background if active
              }`}
            >
              <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-green-700 
                  transition-all duration-700 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left 
                  ${isActive ? 'bg-green-700 scale-x-100' : ''}`}></span>
            </CMSLink>
            {hasDropdown && dropdownItems && <DropdownMenu dropdownLinks={dropdownItems} />}
          </div>
          )})}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary h-[100%] flex items-center ml-4" />
        </Link>
      </nav>

      {/* Mobile Menu */}
      <nav className="lg:hidden flex flex-col space-y-2 h-auto container ">
        {navItems.map(({ link, hasDropdown, dropdownItems }, i) => (
          <div key={i} className="relative py-2 border-b border-white last:border-b-0">
            <div
              onClick={hasDropdown ? () => handleToggleDropdown(i) : undefined}
              className="text-lg px-4 h-full flex items-center justify-between hover:cursor-pointer relative "
            >
              <CMSLink {...link} className="flex-1">
              </CMSLink>
              {hasDropdown && (
                <svg
                  className={`w-4 h-4 ml-auto transition-transform ${openDropdown === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              )}
            </div>
            {hasDropdown && dropdownItems && (
              <DropdownMenu dropdownLinks={dropdownItems} isOpen={openDropdown === i} />
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
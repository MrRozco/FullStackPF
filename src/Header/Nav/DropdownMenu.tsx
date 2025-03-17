import React from 'react'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface DropdownMenuProps {
  dropdownLinks: NonNullable<Header['navItems']>[number]['dropdownItems']
  isOpen?: boolean
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ dropdownLinks, isOpen = false }) => {
  return (
    <div
      className={`
        flex flex-col w-full bg-gray-400 shadow-lg
        ${isOpen ? 'flex' : 'hidden'}
        relative
        lg:absolute lg:left-0 lg:top-[100%] lg:min-w-[300px]
        lg:hidden
        lg:group-hover:flex
      `}
    >
      {dropdownLinks?.map((dropdownLink, j) => (
        <CMSLink key={j} {...dropdownLink.link} appearance="link" className="block px-4 py-2 text-white whitespace-nowrap" />
      ))}
    </div>
  )
}
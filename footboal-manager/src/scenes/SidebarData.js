import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';
export const SidebarData = [
 {
    title: 'Exit',
    path: '/',
    icon: <ImIcons.ImExit />,
    cName: 'nav-text'
  },
  {
    title: 'Main',
    path: '/main',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/reports',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/products',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Liga',
    path: '/team',
     icon: <IoIcons.IoMdFootball />,
    cName: 'nav-text'
  },
  {
    title: 'Statistic',
    path: '/messages',
    icon: <IoIcons.IoIosStats />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
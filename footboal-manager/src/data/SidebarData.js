import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
export const SidebarData = [
 {
    title: 'Exit',
    path: '/exitModal',
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
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Transfers',
    path: '/transfer',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
      title: 'Training',
      path: '/training',
      icon: <BsIcons.BsBullseye />,
      cName: 'nav-text'
     // BsChevronDoubleUp
    },
  {
    title: 'Liga',
    path: '/liga',
     icon: <IoIcons.IoMdFootball />,
    cName: 'nav-text'
  },
  {
    title: 'Statistic',
    path: '/statistic',
    icon: <IoIcons.IoIosStats />,
    cName: 'nav-text'
  },

  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
    {
      title: 'Play',
      path: '/gameplay',
      icon: <AiIcons.AiOutlinePlayCircle />,
      cName: 'nav-text'
    }
];
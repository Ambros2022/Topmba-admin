// ** React Imports
import { ReactNode } from 'react'
import NextLink from 'next/link'
// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'


import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

//change our logo
import Box from '@mui/material/Box'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
  children: ReactNode
  contentHeightFixed?: boolean
}


const AppBrand = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <NextLink href="/" >
        <img src='/images/Learntech160.webp' style={{ objectFit: "contain" }} alt='logo' width='200' height='100' />
      </NextLink>
    </Box>
  )
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()



  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      // footerProps={{
      //   content: () => '© 2024 All Right Reserved Ambros tech solutions.',
      //   sx: { textAlign: 'center'}
      // }}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems(),
          branding: () => <AppBrand />
          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },

        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}

    </Layout>
  )
}

export default UserLayout

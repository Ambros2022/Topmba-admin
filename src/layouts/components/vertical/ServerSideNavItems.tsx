// ** React Imports
import { useState } from 'react'



// ** Type Import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems] = useState<VerticalNavItemsType>([])


  return { menuItems }
}

export default ServerSideNavItems

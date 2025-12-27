import React, {ReactNode } from 'react';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import Error404Page from 'src/views/Error404Page'

const Error404 = () => {

  return (
    <Error404Page />
  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404

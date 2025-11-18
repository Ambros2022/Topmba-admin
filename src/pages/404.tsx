import React, {ReactNode } from 'react';

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'

// ** Demo Imports
import Error404Page from 'src/views/Error404Page'

const Error404 = () => {

  return (
    <Error404Page />
  )
}

Error404.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

export default Error404

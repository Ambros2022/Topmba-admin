import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerBoardPage from 'src/views/InnerBoardPage'

const BoardContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    )
  }

  const { slug } = router.query

  return (
    <>
      {Array.isArray(slug) && slug.length <= 2 && (
        <InnerBoardPage id={slug[0]} />
      )}
    </>
  )
}

const Board = () => <BoardContent />

Board.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
Board.guestGuard = true

export default Board

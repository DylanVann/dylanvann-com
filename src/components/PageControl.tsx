import React from 'react'
import Link from './Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons/index'
import styled from '@emotion/styled'

const showPrev = (page: number, pageCount: number) =>
  !(page === 1) && pageCount > 1

const showNext = (page: number, pageCount: number) =>
  !(page === pageCount) && pageCount > 1

interface PageControlProps {
  page: number
  pageCount: number
  className?: string
}

export const PageControl = ({
  page,
  pageCount,
  className,
}: PageControlProps) => (
  <div className={className}>
    <div style={{ flex: 1 }}>
      {showPrev(page, pageCount) && (
        <Link to={page - 1 === 1 ? '/' : `/${page - 1}`}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Previous
        </Link>
      )}
    </div>
    <div>{`${page} of ${pageCount}`}</div>
    <div style={{ flex: 1 }}>
      {showNext(page, pageCount) && (
        <Link to={`/${page + 1}`}>
          Next
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
  </div>
)

export default styled(PageControl)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  svg {
    width: 1.5rem;
    height: 1rem;
    margin: 0 5px;
  }
`

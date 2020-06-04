import React from 'react'
import styled from '@emotion/styled'
import { Link } from './Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

const showPrev = (page: number, pageCount: number) =>
  !(page === 1) && pageCount > 1

const showNext = (page: number, pageCount: number) =>
  !(page === pageCount) && pageCount > 1

interface PageControlProps {
  page: number
  pageCount: number
  className?: string
}

export const PageControlBase = ({
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

export const PageControl = styled(PageControlBase)`
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

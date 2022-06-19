import './Pagination.css'

function Pagination({pageCount = 5, currentPage = 1, loadPage}) {
  return (
    <div className='pagination'>
      {
        currentPage > 1 ?
          <div onClick={() => loadPage(currentPage - 1)}>
            <i className='fas fa-chevron-left'></i>
          </div>
        : null
      }

      {
        Array.from(Array(pageCount)).map((_, i) => {
          return (
            <div onClick={() => loadPage(i + 1)} className={(currentPage === i + 1) ? 'page-selected' : ''}>
              {i + 1}
            </div>
          )
        })
      }

      {
        currentPage < pageCount ?
          <div onClick={() => loadPage(currentPage + 1)}>
            <i className='fas fa-chevron-right'></i>
          </div>
        : null
      }
    </div>
  )
}

export default Pagination
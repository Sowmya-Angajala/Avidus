const Pagination = ({
  currentPage,
  totalPages,
  setPage
}) => {

  return (
    <div className="pagination">

      {[...Array(totalPages)].map(
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              setPage(i + 1)
            }
          >
            {i + 1}
          </button>
        )
      )}

    </div>
  );
};

export default Pagination;
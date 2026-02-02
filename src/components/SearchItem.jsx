import { useNavigate } from "react-router-dom";

function SearchItem({ id, image, title, author, book }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`, { state: { book } });
  };

  return (
    <div
      onClick={handleClick}
      className="w-60 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-4"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

      <h2 className="font-display text-lg font-semibold text-gray-900 dark:text-slate-50 mb-1 line-clamp-1">
        {title}
      </h2>

      <p className="font-sans text-sm text-gray-600 dark:text-slate-400 line-clamp-1">
        {author}
      </p>
    </div>
  );
}

export default SearchItem;

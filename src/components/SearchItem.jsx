import { useNavigate } from "react-router-dom";

function SearchItem({id, image, title, author }) {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(`/book/${id}`)
  }

  return (
    <div
        onClick={handleClick} 
        className="flex flex-col gap-2 w-45 group">
      {
        <img
          src={image}
          alt={title}
          className="w-full h-72 rounded-md shadow-lg group-hover:shadow-xl transition duration-300"
        ></img>
      }
      <div className="flex flex-col">
        <p className="font-bold text-lg group-hover:text-blue-900">{title}</p>
        <p className="font-semibold group-hover:text-blue-800">{author}</p>
      </div>
    </div>
  );
}

export default SearchItem;

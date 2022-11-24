//Items like mens,shoes...etc in directory of home page
import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    // we can use LINK component instead of useNavigate()
    <div className="directory-item-container" onClick={onNavigateHandler}>
      {/* <img/> */}
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useSelector } from "react-redux";
import { getItemById } from "../../libs/redux/selectors/itemsSelectors";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ itemId, itemType, showImage, customStyles, reverse }) => {
  const item = useSelector((state) => getItemById(state, itemId, itemType));
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleCardClick = () => {
    navigate(`/${itemType}/${itemId}`); // Переход на страницу персонажа
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "240px",
        boxShadow:
          "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.20)",
        ...customStyles?.card,
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        {showImage && (
          <CardMedia
            sx={{ maxHeight: "196px" }}
            component="img"
            image={item.image}
            alt={item.name}
          />
        )}
        <CardContent
          sx={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ...customStyles?.cardContent,
          }}
        >
          <Typography
            sx={{
              margin: 0,
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: "700",
              fontSize: "20px",
              ...customStyles?.typography1,
            }}
            gutterBottom
            component="div"
          >
            {reverse ? item.episode : item.name}
          </Typography>
          <Typography
            sx={{ margin: 0, color: "rgba(0, 0, 0, 0.6)", fontWeight: "400", fontSize: "14px" }}
          >
            {reverse ? item.name : item.species || item.type || item.air_date}
          </Typography>
          <Typography
            sx={{
              margin: 0,
              color: "rgba(0, 0, 0, 0.6)",
              fontWeight: "700",
              fontSize: "14px",
              ...customStyles?.typography3,
            }}
          >
            {showImage ? "" : reverse ? item.air_date : item.episode}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

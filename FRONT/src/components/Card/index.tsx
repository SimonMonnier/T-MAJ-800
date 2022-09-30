import { CardType } from "../../Types";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextDate,
  CardTextTitle
} from "./CardStyles";

import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

export const Card = ({ title, date, imgUrl, id }: CardType) => {
  const navigate = useNavigate()

  function Select() {
    navigate("/item/" + id)
  }

  return (
    <Tilt>
      <CardWrapper onClick={Select}>
        <CardImage background={imgUrl} />
        <CardTextWrapper>
          <CardTextTitle>{title}</CardTextTitle>
          <CardTextDate>Date de sortie {date}</CardTextDate>
        </CardTextWrapper>
      </CardWrapper>
    </Tilt>
  );
};

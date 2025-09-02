
import "../assets/SlideCardMenuAdmin.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAllMenus } from "../Hooks/Menus";
import MenuCard from "./MenuCard";
import NewMenuCard from "./NewMenuCard";
import { useState } from "react";


export default function SlideCardMenuAdmin() {

  const {data, isLoading} = useAllMenus();
  
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    isLoading ? <div>Cargando</div>:
    <>
      <div className="SlideCardMenuAdmin-container">
        <div className="Card-container">
          <Slider {...settings}>
            {data.map((d) => (
              <MenuCard key ={d.id} d = {d}/>
            ))}
            <NewMenuCard key ="addNewMenu"/>
          </Slider>
        </div>
      </div>
    </>
  );
}

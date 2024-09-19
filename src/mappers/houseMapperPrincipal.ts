import { House } from "../models/houseModel";

interface HouseList {
  name: string;
  picture_url: string;
}

export const houseToHouseApiList = (house: House): HouseList => {
  return {
    name: house.name,
    picture_url: house.images.picture_url,
  };
};

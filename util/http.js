import axios from "axios";
import { func } from "prop-types";

const BACKEND_URL = "https://motorpak.000webhostapp.com/car_api/";

export default async function fetchAds() {
  try {
    const response = await axios.get(BACKEND_URL + "fetch_cars_api.php");

    const Ads = [];
    response.data.forEach((adData) => {
      const {
        CarID,
        MakerName,
        ModelName,
        Variant,
        RegistrationYear,
        Price,
        Mileage,
        FuelType,
        Transmission,
        carCondition,
        Description,
        SellerID,
        Location,
        carStatus,
        date,
        title,
        ImageUrls,
      } = adData;

      const imageUrls = ImageUrls.flatMap((item) => item.ImageUrl.split(","));

      const adObj = {
        carId: CarID,
        makerName: MakerName,
        modelName: ModelName,
        variant: Variant,
        registrationYear: RegistrationYear,
        price: Price,
        mileage: Mileage,
        fuelType: FuelType,
        transmission: Transmission,
        carCondition: carCondition,
        description: Description,
        sellerId: SellerID,
        location: Location,
        carStatus: carStatus,
        date: new Date(date),
        title: title,
        imageUrls: imageUrls,
      };

      Ads.push(adObj);
    });

    return Ads;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
}

export async function fetchAdWithId(index) {
  const Ads = await fetchAds();
  return Ads.find((ad) => ad.carId === index);
}

export async function fetchAdsWithIds(ids) {
  const Ads = await fetchAds();
  return Ads.filter((ad) => ids.includes(ad.carId));
}

const USERS_API_URL =
  "https://motorpak.000webhostapp.com/users_api/fetch_user_details_api.php";

export async function fetchUserById(userId) {
  try {
    const response = await axios.post(USERS_API_URL, {
      userID: userId,
    });

    // Check if the response is successful and contains data
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch user details");
    }
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
}

export async function fetchAdsWithSellerId(id) {
  try {
    const response = await axios.post(BACKEND_URL + "fetch_user_cars_api.php", {
      userID: id,
    });

    // Check if the response is successful and contains data
    if (response.status === 200 && response.data) {
      const ads = response.data.map((adData) => {
        const {
          CarID,
          MakerName,
          ModelName,
          Variant,
          RegistrationYear,
          Price,
          Mileage,
          FuelType,
          Transmission,
          carCondition,
          Description,
          SellerID,
          Location,
          carStatus,
          date,
          title,
          ImageUrls,
        } = adData;

        const imageUrls = ImageUrls.flatMap((item) => item.ImageUrl.split(","));

        return {
          carId: CarID,
          makerName: MakerName,
          modelName: ModelName,
          variant: Variant,
          registrationYear: RegistrationYear,
          price: Price,
          mileage: Mileage,
          fuelType: FuelType,
          transmission: Transmission,
          carCondition: carCondition,
          description: Description,
          sellerId: SellerID,
          location: Location,
          carStatus: carStatus,
          date: new Date(date),
          title: title,
          imageUrls: imageUrls,
        };
      });

      return ads;
    } else {
      throw new Error("Failed to fetch user cars");
    }
  } catch (error) {
    console.error("Error fetching user cars:", error.message);
    throw error;
  }
}

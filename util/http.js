import axios from "axios";

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
        price: parseInt(Price).toLocaleString(),
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

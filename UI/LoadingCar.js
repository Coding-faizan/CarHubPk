import React, { useRef, useEffect } from "react";
import { View, Animated, Dimensions, Image, Text } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const LoadingCar = () => {
  const carAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(carAnimation, {
        toValue: 1,
        duration: 2000, // Adjust duration to control the speed of the car
        useNativeDriver: true,
      })
    ).start();
  }, [carAnimation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.Image
        source={require("./car128.png")} // Replace 'car.png' with your image source
        style={{
          width: 128,
          height: 128,
          transform: [
            {
              translateX: carAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, screenWidth], // Adjust range based on road length
              }),
            },
          ],
        }}
      />
      <Text style={{ fontSize: 24 }}>Logging In</Text>
    </View>
  );
};

export default LoadingCar;

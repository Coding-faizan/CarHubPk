import React, { useContext,useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, SafeAreaView } from "react-native"; // Import SafeAreaView

// Importing screen components
import { Home, PostAd, More, Profile, MyAds } from "../../screens";

// Importing icon components
import HomeIcon from "./Icons/HomeIcon";
import AdsIcon from "./Icons/AdsIcon";
import PostAdIcon from "./Icons/PostAdIcon";
import MoreIcon from "./Icons/MoreIcon";
import ProfileIcon from "./Icons/ProfileIcon";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name="MyAds"
          component={MyAds}
          options={{
            tabBarIcon: ({ focused }) => <AdsIcon focused={focused} />,
          }}
        />

        <Tab.Screen
          name="PostAd"
          component={PostAd}
          options={{
            tabBarIcon: ({ focused }) => <PostAdIcon focused={focused} />,
          }}
        />

        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({ focused }) => <MoreIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "fixed", // Change position to absolute
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
  },
};

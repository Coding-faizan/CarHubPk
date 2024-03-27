import AdForm from "../components/Ads/AdForm";

import { KeyboardAvoidingView, Platform } from "react-native";

export default function PostAd() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 60}
    >
      <AdForm />
    </KeyboardAvoidingView>
  );
}

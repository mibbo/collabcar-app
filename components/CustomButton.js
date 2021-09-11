import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Proptypes from "prop-types";
import colors from "../assets/colors";

//Custom position for the button
function getPosition(position) {
   switch (position) {
      case "bottom-left":
         return { position: "absolute", left: 20, bottom: 20 };
      case "bottom-right":
         return { position: "absolute", right: 20, bottom: 20 };
      case "top-left":
         return { position: "absolute", left: 20, top: 20 };
      case "top-right":
         return { position: "absolute", right: 20, top: 20 };
   }
}

const CustomButton = ({ children, onPress, style, position, disabled }) => {
   const floatingActionButton = position ? getPosition(position) : [];
   return (
      <TouchableOpacity style={floatingActionButton} onPress={onPress} disabled={disabled}>
         <View style={[styles.button, style]}>{children}</View>
      </TouchableOpacity>
   );
};

CustomButton.propTypes = {
   onPress: Proptypes.func.isRequired,
   children: Proptypes.element.isRequired,
   style: Proptypes.object,
};

CustomButton.defaultProps = {
   style: {},
};

export default CustomButton;

const styles = StyleSheet.create({
   button: {
      width: 50,
      backgroundColor: colors.bgError,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
   },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Proptypes from "prop-types";
import colors from "../assets/colors";

function getPosition(position) {
   switch (position) {
      case "left":
         return { position: "absolute", left: 20, bottom: 20 };
      default:
         return { position: "absolute", right: 20, bottom: 20 };
   }
}

const CustomActionButton = ({ children, onPress, style, position }) => {
   const floatingActionButton = position ? getPosition(position) : [];
   return (
      <TouchableOpacity style={floatingActionButton} onPress={onPress}>
         <View style={[styles.button, style]}>{children}</View>
      </TouchableOpacity>
   );
};

CustomActionButton.propTypes = {
   onPress: Proptypes.func.isRequired,
   children: Proptypes.element.isRequired,
   style: Proptypes.object,
};

CustomActionButton.defaultProps = {
   style: {},
};

export default CustomActionButton;

const styles = StyleSheet.create({
   button: {
      width: 50,
      backgroundColor: colors.bgError,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
   },
});

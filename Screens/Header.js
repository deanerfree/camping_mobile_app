import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"

const Header = () => {
	const [loaded] = useFonts({
		Roboto: require("../assets/Roboto/Roboto-Regular.ttf"),
	})
	if (!loaded) {
		return null
	}
	return (
		<View style={styles.header}>
			<Text style={styles.title}>The Header</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 80,
		paddingTop: 38,
		backgroundColor: "coral",
	},
	title: {
		textAlign: "center",
		fontFamily: "Roboto",
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
	},
})
export default Header

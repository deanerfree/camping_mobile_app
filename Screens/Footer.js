import React from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"

const Footer = () => {
	const [loaded] = useFonts({
		Roboto: require("../assets/Roboto/Roboto-Regular.ttf"),
	})
	if (!loaded) {
		return null
	}
	return (
		<View style={styles.footer}>
			<Text style={styles.title}>This is the Footer</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
		height: 80,
		paddingTop: 20,
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

export default Footer

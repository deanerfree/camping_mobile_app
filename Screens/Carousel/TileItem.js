import React from "react"
import { View, Text, StyleSheet } from "react-native"

const TileItem = ({ campground }) => {
	return (
		<View style={styles.listItem}>
			<Text>{campground.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	listItem: {
		color: "#222",
		fontSize: 18,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
	},
})

export default TileItem

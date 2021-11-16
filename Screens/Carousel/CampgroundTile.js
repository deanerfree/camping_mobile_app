import React from "react"
import {
	View,
	ScrollView,
	StyleSheet,
	Image,
	Text,
	Dimensions,
} from "react-native"

export const SLIDER_WIDTH = Dimensions.get("window").width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const CampgroundTile = ({ ...data }) => {
	const { item } = data
	// console.log(item)
	return (
		<View style={styles.container}>
			<Image source={{ uri: item.images[0].url }} style={styles.image} />

			<Text style={styles.header}>{item.name}</Text>

			<ScrollView style={styles.scrollBody}>
				<Text style={styles.body}>{item.description}</Text>
			</ScrollView>
		</View>
	)
}

export default CampgroundTile
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 200,
		width: ITEM_WIDTH,
		padding: 24,
		borderRadius: 10,
	},
	image: {
		position: "absolute",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		width: ITEM_WIDTH,
		height: 100,
	},
	header: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: -5,
		marginTop: -5,
		marginBottom: 60,
	},

	body: {
		color: "#222",
		fontSize: 12,
		paddingLeft: 20,
		paddingRight: 20,
	},
	scrollBody: {
		marginTop: 5,
		marginLeft: -30,
		position: "relative",
		height: 50,
	},
})

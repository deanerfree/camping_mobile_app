import React from "react"
import { Text, View } from "react-native"
import { Marker } from "react-native-maps"

const MarkerList = ({ campgroundData }) => {
	let keys = Object.keys(campgroundData)
	// console.log("keys", campgroundData.chis[0])r
	return (
		<>
			{keys.map((park) => {
				return campgroundData[park].map((campground, index) => {
					return (
						<Marker
							key={index}
							coordinate={{
								latitude: campground.coordinates.latitude,
								longitude: campground.coordinates.longitude,
							}}
							title={campground.name}
							description={campground.description}
						/>
						// <View key={index}>
						// 	<Text>Hey</Text>
						// </View>
					)
				})
			})}
		</>
	)
}

export default MarkerList

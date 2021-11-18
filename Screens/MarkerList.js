import React from "react"
import { Text, View } from "react-native"
import { Marker } from "react-native-maps"

const MarkerList = ({ campgroundData }) => {
	// let keys = Object.keys(campgroundData)
	// console.log("keys", campgroundData[0].campground[0].name)
	return (
		<>
			{campgroundData.map((park, index) => {
				return park.campground.map((camp) => {
					return (
						<Marker
							key={camp.id}
							coordinate={{
								latitude: camp.latitude,
								longitude: camp.longitude,
							}}
							title={camp.name}
							description={camp.description}
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

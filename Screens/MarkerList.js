import React from "react"
import { Marker } from "react-native-maps"

const MarkerList = ({ campgroundData }) => {
	return (
		<>
			{campgroundData.map((campground, index) => {
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
				)
			})}
		</>
	)
}

export default MarkerList

import React, { useState, useEffect, useRef } from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import MapView, {
	Marker,
	PROVIDER_GOOGLE,
	PROVIDER_DEFAULT,
} from "react-native-maps"
import * as Location from "expo-location"
import MarkerList from "./MarkerList"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { SLIDER_WIDTH, ITEM_WIDTH } from "./Carousel/CampgroundTile"
import CampgroundTile from "./Carousel/CampgroundTile"
let deviceWidth = Dimensions.get("window").width
let deviceHeight = Dimensions.get("window").height

const UserMap = ({ campgroundData, nationalParkData, ...props }) => {
	const isCarousel = useRef(null)
	const mapRef = useRef(null)
	const { northMax, southMax, eastMax, westMax } = props

	const aspectRatio = deviceWidth / deviceHeight
	const latitudeDelta = (northMax - southMax) / aspectRatio
	const longitudeDelta = latitudeDelta * aspectRatio
	const latMidPoint = (northMax + southMax) / 2
	const longMidPoint = (eastMax + westMax) / 2
	const initialRegion = {
		latitude: latMidPoint,
		longitude: longMidPoint,
		latitudeDelta: latDelta,
		longitudeDelta: longDelta,
	}
	let text = "Waiting..."
	const [errorMsg, setErrorMsg] = useState()
	const [lat, setLat] = useState()
	const [long, setLong] = useState()
	const [displayUser, setDisplayUser] = useState(true)
	const [latDelta, setLatDelta] = useState(latitudeDelta)
	const [longDelta, setLongDelta] = useState(longitudeDelta)
	const [yourPosition, setYourPosition] = useState()
	const [region, setRegion] = useState(initialRegion)

	//Determines the user's current location
	const getLocation = async () => {
		// console.log("services enabled", await Location.hasServicesEnabledAsync())
		let { status } = await Location.requestForegroundPermissionsAsync()
		// console.log("status", status)
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied")
			return
		} else {
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})
			setYourPosition(location)
			setLat(location.coords.latitude)
			setLong(location.coords.longitude)
		}
	}

	useEffect(() => {
		//Have to move this to a button to decide to show location
		getLocation()
	}, [lat, long])

	if (errorMsg) {
		text = errorMsg
	}
	if (campgroundData) {
		text = JSON.stringify(yourPosition)
	}

	const animateToPark = (index) => {
		// console.log(nationalParkData[index])
		let location = nationalParkData[index]
		mapRef.current.animateToRegion({
			latitude: location.latitude,
			longitude: location.longitude,
			latitudeDelta: 0.75,
			longitudeDelta: 1.35,
		})
	}

	return (
		<View style={styles.mapView}>
			<MapView
				ref={mapRef}
				// style={styles.map}
				style={{ alignSelf: "stretch", height: "100%" }}
				provider={PROVIDER_DEFAULT}
				initialRegion={{
					latitude: latMidPoint,
					longitude: longMidPoint,
					latitudeDelta: latDelta,
					longitudeDelta: longDelta,
				}}>
				{displayUser && lat && long ? (
					<Marker
						coordinate={{ latitude: lat, longitude: long }}
						title='You'
						description='This is your current location'
						pinColor='blue'
					/>
				) : null}
				{campgroundData ? (
					<>
						<MarkerList campgroundData={campgroundData} />
					</>
				) : (
					<Text>{text}</Text>
				)}
			</MapView>
			{campgroundData ? (
				<View style={styles.container}>
					<Carousel
						layout={"default"}
						layoutCardOffset={9}
						containerCustomStyle={styles.carousel}
						ref={isCarousel}
						data={nationalParkData}
						renderItem={CampgroundTile}
						sliderWidth={SLIDER_WIDTH}
						itemWidth={ITEM_WIDTH}
						inactiveSlideShift={0}
						useScrollView={true}
						removeClippedSubviews={false}
						onSnapToItem={(index) => animateToPark(index)}
					/>
				</View>
			) : (
				<Text>{text}</Text>
			)}
		</View>
	)
}

export default UserMap

const styles = StyleSheet.create({
	mapItem: {
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	mapView: {
		height: deviceHeight * 0.82,
	},
	// map: {
	// 	...StyleSheet.absoluteFillObject,
	// },
	carousel: {
		position: "absolute",
		bottom: 40,
		marginBottom: 80,
	},
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 50,
	},
})

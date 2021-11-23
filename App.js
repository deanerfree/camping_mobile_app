import axios from "axios"

import React, { useState, useEffect, useRef } from "react"
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	Animated,
} from "react-native"
import UserMap from "./Screens/UserMap"
import Header from "./Screens/Header"
import Footer from "./Screens/Footer"
import { URL } from ".env"

let deviceWidth = Dimensions.get("window").width
let deviceHeight = Dimensions.get("window").height
const App = () => {
	const translation = useRef(new Animated.Value(0)).current
	const translation1 = useRef(new Animated.Value(0)).current

	const [campgroundData, setCampgroundData] = useState([])
	const [nationalParkData, setNationalParkData] = useState([])
	const [eastMax, setEastMax] = useState(0)
	const [westMax, setWestMax] = useState(0)
	const [northMax, setNorthMax] = useState(0)
	const [southMax, setSouthMax] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setErrorFlag] = useState(false)
	const [message, setMessage] = useState("")
	// const [translation, setTranslation] = useState()

	const getNationalParks = async () => {
		setIsLoading(true)
		// const url = "http://10.0.0.203:4001/api/v1/parkLocations"
		const url = URL

		try {
			// setIsLoading(true)
			const nationalParkData = await axios(url)

			if (nationalParkData.status === 200) {
				const parkList = nationalParkData.data.filteredData
				setNationalParkData(parkList)
				// console.log(parkList)
				// setCampgroundData(parkList.campgrounds)

				let latList = []
				let longList = []
				const campgrounds = parkList.map((park) => {
					park.campground.map((camp) => {
						if (typeof camp.latitude === "string") {
							camp.latitude = parseFloat(camp.latitude)
						}
						if (typeof camp.longitude === "string") {
							camp.longitude = parseFloat(camp.longitude)
						}
						longList.push(camp.longitude)
						latList.push(camp.latitude)
						return camp
					})

					return park
				})
				let diffLat = { max: Math.max(...latList), min: Math.min(...latList) }
				let diffLong = {
					max: Math.max(...longList),
					min: Math.min(...longList),
				}

				setNorthMax(diffLat.max)
				setSouthMax(diffLat.min)
				setWestMax(diffLong.max)
				setEastMax(diffLong.min)
				setCampgroundData(campgrounds)
				setIsLoading(false)
				return
			}
		} catch (error) {
			setErrorFlag(true)
			setIsLoading(false)
			console.error("not loading" + error)
			if (hasError === true) {
				setMessage(error)
			}
		}
	}
	useEffect(() => {
		// getCampgrounds()
		getNationalParks()
	}, [])

	useEffect(() => {
		if (isLoading === true) {
			setMessage("Loading")
		}
	}, [isLoading])

	useEffect(() => {
		Animated.sequence([
			Animated.timing(translation, {
				toValue: 3,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(translation, {
				toValue: -3,
				duration: 1000,
				useNativeDriver: true,
			}),
		]).start()
		Animated.sequence([
			Animated.timing(translation1, {
				toValue: -3,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(translation1, {
				toValue: 3,
				duration: 1000,
				useNativeDriver: true,
			}),
		]).start()
	}, [])
	const dots = "..."
	return (
		<View style={styles.droidSafeArea}>
			<View>
				<View>
					<StatusBar barStyle='dark-content' />
				</View>
				<View>
					<Header />
				</View>
				<View>
					{campgroundData &&
					Math.abs(northMax) > 0 &&
					Math.abs(southMax) > 0 &&
					Math.abs(eastMax) > 0 &&
					Math.abs(westMax) > 0 ? (
						<UserMap
							campgroundData={campgroundData}
							nationalParkData={nationalParkData}
							northMax={northMax}
							southMax={southMax}
							westMax={westMax}
							eastMax={eastMax}
						/>
					) : (
						<>
							{message === "Loading" ? (
								<View style={styles.loadingScreen}>
									<Text
										style={[
											styles.loadingMessageText,
											{
												letterSpacing: 0.1,
											},
										]}>
										{message}
									</Text>
									{dots.split("").map((letter, index) => {
										translationStyle = translation
										if (index % 2 !== 0) {
											translationStyle = translation1
										}
										return (
											<Animated.Text
												key={index * Math.random()}
												style={[
													styles.loadingMessageText,
													{
														opacity: translation.interpolate({
															inputRange: [0, 50, 100],
															outputRange: [0.2, 1, 0.2],
														}),
														transform: [
															{
																translateY: translationStyle,
															},
														],
													},
												]}>
												{letter}
											</Animated.Text>
										)
									})}
								</View>
							) : (
								<View style={styles.loadingScreen}>
									<Text
										style={{
											fontSize: 50,
										}}>
										{message}
									</Text>
								</View>
							)}
						</>
					)}
				</View>
				<View>
					<Footer />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	droidSafeArea: {
		flex: 1,
		backgroundColor: "#1976d1",
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	mapView: {
		height: deviceHeight * 0.82,
	},
	loadingScreen: {
		flexGrow: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: deviceHeight * 0.82,
	},
	loadingMessageText: {
		fontSize: 50,
		// transform: [
		// 	{
		// 		translateY: fadeAnim.interpolate({
		// 			inputRange: [0, 1],
		// 			outputRange: [150, 0],
		// 		}),
		// 	},
		// ],
	},
})
export default App

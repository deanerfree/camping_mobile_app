import React, { useState, useEffect } from "react"
import axios from "axios"
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native"
import UserMap from "./Screens/UserMap"
import Header from "./Screens/Header"
import Footer from "./Screens/Footer"

let deviceWidth = Dimensions.get("window").width
let deviceHeight = Dimensions.get("window").height
const App = () => {
	const [campgroundData, setCampgroundData] = useState([])
	const [nationalParkData, setNationalParkData] = useState([])
	const [eastMax, setEastMax] = useState(0)
	const [westMax, setWestMax] = useState(0)
	const [northMax, setNorthMax] = useState(0)
	const [southMax, setSouthMax] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setErrorFlag] = useState(false)
	const [message, setMessage] = useState("")

	const getNationalParks = async () => {
		setIsLoading(true)
		const url = "http://localhost:4001/api/v1/parkLocations"

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
			setMessage("Loading...")
		}
	}, [isLoading])

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
						<View style={styles.loadingScreen}>
							<Text style={styles.loadingMessageText}>{message}</Text>
						</View>
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
		justifyContent: "center",
		alignItems: "center",
		height: deviceHeight * 0.82,
	},
	loadingMessageText: {
		fontSize: 50,
	},
})
export default App

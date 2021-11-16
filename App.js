import React, { useState, useEffect } from "react"
import axios from "axios"
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native"
import UserMap from "./Screens/UserMap"
import Header from "./Screens/Header"
import Footer from "./Screens/Footer"
import {
	getLatitude,
	getLongitude,
	// getListOfEachPark,
} from "./functions/functions"
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

	const getCampgrounds = async () => {
		// const url = "http://127.0.0.1:4001/api/v1/mapItems"
		const url = "http://localhost:4001/api/v1/mapItems"

		try {
			setIsLoading(true)
			const importedCampgroundData = await axios(url)

			if (importedCampgroundData.status === 200) {
				const parkList = importedCampgroundData.data.organizedMapData

				// console.log(parkList)r
				setCampgroundData(parkList[0])
				// let diffLat = getLatitude(importedCampgroundData.data.cleanedMapData)
				// let diffLong = getLongitude(importedCampgroundData.data.cleanedMapData)

				setNorthMax(parkList[1].max)
				setSouthMax(parkList[1].min)
				setWestMax(parkList[2].max)
				setEastMax(parkList[2].min)

				setIsLoading(false)
				return
			}
		} catch (error) {
			setErrorFlag(true)
			setIsLoading(false)
			console.error("not loading" + error)
		}
	}

	const getNationalParks = async () => {
		setIsLoading(true)
		const url = "http://localhost:4001/api/v1/parkLocations"

		try {
			setIsLoading(true)
			const nationalParkData = await axios(url)

			if (nationalParkData.status === 200) {
				const parkList = nationalParkData.data.filteredData
				// console.log(parkList)
				setNationalParkData(parkList)
				// console.log(parkList)r

				setIsLoading(false)
				return
			}
		} catch (error) {
			setErrorFlag(true)
			setIsLoading(false)
			console.error("not loading" + error)
		}
	}
	useEffect(() => {
		getCampgrounds()
		getNationalParks()
	}, [])

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
						<View style={styles.mapView}>
							<Text>Loading...</Text>
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
})
export default App

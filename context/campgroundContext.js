import React, { useState, createContext, useEffect } from "react"
import axios from "axios"

export const CampgroundContext = createContext()

const CampgroundContextProvider = (props) => {
	const [campgroundData, setCampgroundData] = useState([])
	// const [nationalParkData, setNationalParkData] = useState([])
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

	useEffect(() => {
		getCampgrounds()
	}, [])
	return (
		<CampgroundContext.Provider
			value={{
				isLoading,
				hasError,
				campgroundData,
				hasError,
				northMax,
				southMax,
				eastMax,
				westMax,
			}}>
			{props.children}
		</CampgroundContext.Provider>
	)
}

export default CampgroundContextProvider

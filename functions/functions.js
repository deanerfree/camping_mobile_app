//Get a list of the Latitude then return the Max and Min values
export const getLatitude = (dataList) => {
	// console.log("what", dataList)
	let latitudeList = []

	dataList.forEach((dataPoint) => {
		if (dataPoint.latitude === undefined) {
			return
		}
		latitudeList.push(dataPoint.latitude)
	})
	let values = getMaxandMin(latitudeList)
	return values
}
//Get a list of the Longitudes then return the Max and Min values
export const getLongitude = (dataList) => {
	let longitudeList = []
	// console.log("thing", dataList)
	dataList.forEach((dataPoint) => {
		if (dataPoint.longitude === undefined) {
			return
		}
		if (dataPoint.longitude > 0) {
			dataPoint.longitude = dataPoint.longitude * -1
		}
		// console.log(longitudeList)
		longitudeList.push(dataPoint.longitude)
	})
	let values = getMaxandMin(longitudeList)
	return values
}

//Get max and min values from a list
export const getMaxandMin = (dataList) => {
	let values = { max: Math.max(...dataList), min: Math.min(...dataList) }

	return values
}

//Get find each park name and create an empty array for each
const listOfParks = (dataList) => {
	// console.log("before the reduce", dataList)
	const cleanedList = dataList.reduce((prev, nxt) => {
		prev[nxt] = new Array()
		return prev
	}, {})
	// console.log("after reduce", cleanedList)
	return cleanedList
}

export const getListOfEachPark = (dataList) => {
	const tempList = []
	dataList.map((campground) => {
		return tempList.push(campground.parkCode)
	})
	return listOfParks(tempList)
}

export const getParkNames = (object) => {
	const keys = Object.keys(object)
	return keys
}

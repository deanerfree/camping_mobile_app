//Get a list of the Latitude then return the Max and Min values
export const getLatitude = (dataList) => {
	let latitudeList = []

	dataList.forEach((dataPoint) => {
		latitudeList.push(dataPoint.latitude)
	})
	let values = getMaxandMin(latitudeList)
	return values
}
//Get a list of the Longitudes then return the Max and Min values
export const getLongitude = (dataList) => {
	let longitudeList = []

	dataList.forEach((dataPoint) => {
		if (dataPoint.longitude > 0) {
			dataPoint.longitude = dataPoint.longitude * -1
		}
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

//Get count of each name
export const namesAndCount = (dataList) => {
	return dataList.reduce((prev, nxt) => {
		prev[nxt] = prev[nxt] + 1 || 1
		return prev
	}, {})
}

/* 判断当前经纬度是否在多边形中 */
const isPtInPoly = (aLat, aLon, pointList) => {
    /* 
    :param aLat: double 纬度 
    :param aLon: double 经度 
    :param pointList: list [{latitude: 22.22, longitude: 113.113}...] 多边形点的顺序需根据顺时针或逆时针，不能乱 
    */
    let iSum = 0
    let iCount = pointList.length

    if (iCount < 3) {
        return false
    }
    for (let i = 0; i < iCount; i++) {
        let pLat1 = pointList[i].latitude
        let pLon1 = pointList[i].longitude
        let pLat2 = 0,
            pLon2 = 0;
        if (i == iCount - 1) {
            pLat2 = pointList[0].latitude
            pLon2 = pointList[0].longitude
        } else {
            pLat2 = pointList[i + 1].latitude
            pLon2 = pointList[i + 1].longitude
        }
        if (((aLat >= pLat1) && (aLat < pLat2)) || ((aLat >= pLat2) && (aLat < pLat1))) {
            if (Math.abs(pLat1 - pLat2) > 0) {
                let pLon = pLon1 - ((pLon1 - pLon2) * (pLat1 - aLat)) / (pLat1 - pLat2);
                if (pLon < aLon) {
                    iSum += 1
                }
            }
        }
    }
    if (iSum % 2 != 0) {
        return true
    } else {
        return false
    }
}

export default isPtInPoly
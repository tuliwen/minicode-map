import MapUtil from '../utils/mapUtil';
import polygons from "./polygons"
Page({
    data: {
        polygons,
        preI: -1
    },
    /* 选中态 */
    activate(i) {
        this.setData({
            preI: i,
            [`polygons[${i}].fillColor`]: "#FFDD0050"
        })
    },
    /* 取消选中态 */
    deactivate(preI) {
        this.setData({
            preI: -1,
            [`polygons[${preI}].fillColor`]: "#FFDD00"
        })
    },
    /* 点击地图区域事件 */
    onMapTaped(e) {
        let i = polygons.findIndex(item => {
            return MapUtil(e.detail.latitude, e.detail.longitude, item.points)
        })
        let preI = this.data.preI
        if (i > -1) {
            if (preI > -1) this.deactivate(preI)
            this.activate(i)
            let {
                name,
                size
            } = polygons[i].info
            wx.showModal({
                title: "区域信息",
                content: `区域：${name}，面积：${size}公顷`
            })
        } else if (preI > -1) {
            this.deactivate(preI)
        }
    },

})
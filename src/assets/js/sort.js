import md5 from 'js-md5'
import * as API from "./api";

export function objKeySort (obj) {
		obj['appSecret'] = API.appSecret
		var newKey = Object.keys(obj).sort()
    var newObj = {}
    for (let i=0;i<newKey.length;i++) {
        newObj[newKey[i]] = obj[newKey[i]]
    }
		let newValue = ''
    for (let i in newObj) {
        newValue += newObj[i]
		}   
		return md5(newValue)
}
export function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
	}
	for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
			}
	}
	return fmt
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}
export function getOnly () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
	})
}
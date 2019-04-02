
export function formatDatetime(time) {
	let y = new Date(time).getFullYear();
	let m =
	  new Date(time).getMonth() + 1 <= 9
		? "0" + (new Date(time).getMonth() + 1)
		: new Date(time).getMonth() + 1;
	let d = new Date(time).getDate()<= 9?'0'+new Date(time).getDate():new Date(time).getDate();
	return y + "-" + m + "-" + d
  }
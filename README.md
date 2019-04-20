# financialmarkets

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

infomationList(val) {
			
		}


		getDate(datestr){
		  var temp = datestr.split("-");
		  var date = new Date(temp[0],temp[1],temp[2]);
		  return date;
		},
		getDateArry (start,end) {
			var startTime = this.getDate(start);
			var endTime = this.getDate(end);
			while((endTime.getTime()-startTime.getTime())>=0){
			  var year = startTime.getFullYear();
			  var month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
			  var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
				startTime.setDate(startTime.getDate()+1);
				return year+"-"+month+"-"+day
			}
		},
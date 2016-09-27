var day = "someday"
var hour = -1
var month = "somemonth"

var timestamp = {
    datetime: new Date(),
    getDayOfWeek: function(){
            switch (this.datetime.getDay()){
                case 1:
                    day =  "Mon"
                    break
                case 2:
                    day =  "Tues"
                    break
                case 3:
                    day =  "Wed"
                    break
                case 4:
                    day =  "Thur"
                    break
                case 5:
                    day =  "Fri"
                    break
                case 6:
                    day =  "Sat"
                    break
                case 7:
                    day =  "Sun"
                    break
            }
            return day
    },
    getHour: function(){
        return this.datetime.getHours()
    },
    getMin: function(){
        return this.datetime.getMinutes()
    },
    getDayOfMonth: function(){
        return this.datetime.getDate()
    },
    getMonth: function(){
            switch (this.datetime.getMonth()){
                case 1:
                    month =  "Jan"
                    break
                case 2:
                    month =  "Feb"
                    break
                case 3:
                    month =  "Mar"
                    break
                case 4:
                    month =  "Apr"
                    break
                case 5:
                    month =  "May"
                    break
                case 6:
                    month =  "Jun"
                    break
                case 7:
                    month =  "Jul"
                    break
                case 8:
                    month =  "Aug"
                    break
                case 8:
                    month =  "Sept"
                    break
                case 10:
                    month =  "Oct"
                    break
                case 11:
                    month =  "Nov"
                    break
                case 12:
                    month =  "Dec"
                    break
            }
            return month
    },
}

module.exports = timestamp
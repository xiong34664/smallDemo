window.onload = function () {
    //判断闰年
    function runNian(year) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            return 1;
        }
        else {
            return 0;
        }
    }

    //返回  year年month月  是星期几
    function getWeek(year, month) {
        return new Date(year + "/" + month).getDay();
    }

    function getMonth(year, month) {
        var monthDay = {
            day: 0,
            week: 0
        };
        switch (month) {
            case 1: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 2: {
                monthDay.day = 28 + runNian(year);
                monthDay.week = getWeek(year, month)
            }
                break;
            case 3: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 4: {
                monthDay.day = 30;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 5: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 6: {
                monthDay.day = 30;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 7: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 8: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 9: {
                monthDay.day = 30;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 10: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 11: {
                monthDay.day = 30;
                monthDay.week = getWeek(year, month)
            }
                break;
            case 12: {
                monthDay.day = 31;
                monthDay.week = getWeek(year, month)
            }
                break;
        }
        return monthDay;
    }


    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var times = document.getElementById("times");
    var showDate = document.getElementById("showDate");
    var control = document.getElementById("control");
    var box = document.getElementById("box");
    var next = control.children[1];
    var previous = control.children[0];
    console.log(time);

    var calendar = document.getElementById("calendar");

    //当前事件
    showDate.children[0].innerHTML = format();
    setInterval(function () {
        showDate.children[0].innerHTML = format();
    }, 1000);

    showDate.children[0].onclick = function () {
        year = time.getFullYear();
        month = time.getMonth() + 1;
        show(current(year, month));
    }

    show(current(year, month));

    box.onclick = function (e) {
        var div = document.querySelector(".row");
        var lis = calendar.getElementsByTagName("li");
        if (div) {
            div.style.height = 0;
            setTimeout(function () {
                calendar.removeChild(div);
            }, 500)
        }
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("current");

        }

    };

    next.addEventListener("click", function () {
        if (month == 12) {
            year++;
            month = 1;
        } else {
            month++;
        }
        show(current(year, month));
    });

    previous.addEventListener("click", function () {
        if (month == 1) {
            year--;
            month = 12;
        } else {
            month--;
        }
        show(current(year, month));
    });

    times.children[0].onchange = function () {
        year = parseInt(this.value);
        show(current(year, month))
    };
    times.children[0].onclick = function (e) {
        e.stopPropagation();
    };
    times.children[1].onchange = function () {
        month = parseInt(this.value);
        show(current(year, month))
    };
    times.children[1].onclick = function (e) {
        e.stopPropagation();
    }
    function show(array) {

        //显示当前日期
        //第一次  出现  一号的位置
        calendar.innerHTML = "";
        times.children[0].value = year;
        times.children[1].value = month < 10 ? "0" + month : month;

        var flag = false;

        if (time.getFullYear() == year && time.getMonth() + 1 == month) {
            flag = true;
        }

        var first = array.indexOf(1);
        //最后一次 出现  一号的位置
        var last = array.lastIndexOf(1);   //用来分割  是否是本月

        for (var i = 0; i < array.length; i++) {
            var li = document.createElement("li");
            if (i >= first && i < last) {
                if (flag && time.getDate() == array[i]) {
                    console.log(i);
                    li.classList.add("curr")
                }
                li.innerText = array[i];
                li.index = i;
                li.str = year + "/" + month + "/" + array[i];
                li.onclick = showRow;
            } else {
                li.classList.add("formerly");
                li.innerText = array[i];
            }

            calendar.appendChild(li);

        }
    }

    //显示row   并在row  上显示 距当前时间的时间差
    function showRow(e) {
        //阻止冒泡
        e.stopPropagation();

        //查找  是否存在  row
        var div = document.querySelector(".row");
        var lis = calendar.getElementsByTagName("li");

        if (this.classList.contains("current")) {
            this.classList.remove("current");
            if (div) {
                div.style.height = 0;
                setTimeout(function () {
                    calendar.removeChild(div);
                }, 500)
            }
            return ;
        }

        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("current");

        }
        this.classList.add("current");
        //存在的话  将他  删除
        if (div) {
            div.style.height = 0;
            setTimeout(function () {
                calendar.removeChild(div);
            }, 500)
        }
        divs = document.createElement("div");
        divs.className = "row";
        //阻止冒泡
        divs.onclick = function (e) {
            e.stopPropagation();
        }

        //将row  显示在  没7个li之前
        var i = Math.floor(this.index / 7);

        //获取当前时差的对象
        var date = getInterval(new Date(), new Date(this.str));
        var day = date.day;
        var hour = date.hour;
        var minute = date.minute;
        var str = "";
        if (day < 0 || hour < 0 || minute < 0) {
            str = "已经过去<span>" + Math.abs(day) + "</span>天<span>" + Math.abs(hour) + "</span>小时<span>" + Math.abs(minute) + "</span>分";
        } else {
            str = "还剩<span>" + day + "</span>天<span>" + hour + "</span>小时<span>" + minute + "</span>分";
        }
        divs.innerHTML = str;
        calendar.insertBefore(divs, lis[i * 7]);
        setTimeout(function () {
            divs.style.height = 70 + "px"
        }, 500)
    }

    //将当前 月份  和当前月份空着的  位置存入数组  并返回
    function current(year, month) {
        //获取当前月份  一号为星期几
        var week = getMonth(year, month).week;  //0

        //获取上个月  的天数
        if (month == 1) {
            var front = 31;
        } else {
            var front = getMonth(year, month - 1).day;  //
        }

        var arr = [];
        //判断上个月需要在当前页面显示多少天  当星期一是  上个月  还剩最一天要显示 当星期6是  上个月  还剩最6天要显示
        var d = front - week;   //31
        //把需要显示的天数存进数组arr
        if (d != front) {
            for (; d < front;) {
                arr.push(++d);
            }
        }

        //把当前月份的每一天存进 数组  arr
        for (var i = 1; i <= getMonth(year, month).day; i++) {
            arr.push(i);

        }
        //下个月  在当前页面显示  从一号开始
        var k = 1;
        //当前页面显示  42 天  即 6星期  兼容  每一种情况
        for (i = arr.length; i < 42; i++) {
            arr.push(k++);
        }
        //返回当前月份  的  排列数组  arr[0] 为  星期日
        return arr;
    }

    //格式化年月日  时分秒
    function format() {
        var time = new Date();
        var year = time.getFullYear(); //年
        var month = time.getMonth() + 1;//月
        var day = time.getDate();//日
        var hours = time.getHours();  //hour
        var minutes = time.getMinutes();//minute
        var seconds = time.getSeconds();//second
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return year + "年" + month + "月" + day + "日" + "&nbsp;" + hours + ":" + minutes + ":" + seconds;
    }

    // 获取两个日期的时间差
    function getInterval(start, end) {
        // 两个日期对象，相差的毫秒数
        var interval = end - start;
        // 求 相差的天数/小时数/分钟数/秒数
        var day, hour, minute, second;

        // 两个日期对象，相差的秒数
        // interval = interval / 1000;
        interval /= 1000;

        if (interval > 0) {
            day = Math.floor(interval / 60 / 60 / 24);
            hour = Math.floor(interval / 60 / 60 % 24);
            minute = Math.floor(interval / 60 % 60);
            second = Math.floor(interval % 60);
        } else {
            day = Math.ceil(interval / 60 / 60 / 24);
            hour = Math.ceil(interval / 60 / 60 % 24);
            minute = Math.ceil(interval / 60 % 60);
            second = Math.ceil(interval % 60);
        }
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }

}
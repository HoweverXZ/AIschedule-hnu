function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    let bbb = $('div[class=kbcontent]')
    return add(bbb)
}

function _create_array(rangeNum) {//对范围操作
     let resultArray = []
     let begin = rangeNum.split('-')[0];
    let end = rangeNum.split('-')[1];
    for (let i = Number(begin); i <= Number(end); i++) {
         resultArray.push(i);
     }
    return resultArray;
 }
   function _get_week(data) {
      //weeks data will be inputed as '4,7-18', to handle ,we will split them by ',' and operate seperately.
      let result = [];
      let raw = data.split(',');
     for (i in raw) {
  
          if (raw[i].indexOf('-') == -1) {
              //create array
              result.push(parseInt(raw[i]));
         } else {
            let begin = raw[i].split('-')[0];
        let end = raw[i].split('-')[1];
             for (let i = parseInt(begin); i <= parseInt(end); i++) {
                 result.push(i);
             }
         }
     }
     //sort the array,
     return result.sort(function (a, b) {
         return a - b
     });
 
 }

//读取出周次格式不准确 进行修改
function weeksParser(weeks) {
    var numArr = weeks.match(/.*\d+.*\)/g) //匹配第几周
    for(let i=0;i<numArr.length;i++){
        numArr[i] = numArr[i].replace('(周)', '');
        return _get_week(numArr[i])
    }
    

//读出课次格式不准确 进行修改
function sectionParser(section) {
    var numArr2 = section.match(/\[.*\]/g) //匹配第几节课
    var ressection = numArr2[0].match(/\d+.*\d+/g)//匹配出xx-xx的格式
    var collection = []
    ressection = ressection[0].split('-')//格式整理为int数组
    for (let a = 0; a < ressection.length; a++) {
        collection[a] = parseInt(ressection[a])
    }
    return collection
}

//去重
function unique(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
}

//主要添加功能抽离
function add(bbb) {
    let result = []
    for (var u = 0; u < bbb.length; u++) {
        let re = {sections: [], weeks: []}

        //name添加区
        if (bbb[u].children[0].data == "&nbsp;") {
            continue
        } else {
            if (bbb[u].children[0].data == undefined) {
                //官网有部分标签代码不一致 需要分类
                re.name = $(bbb[u]).children('font').children('font')[0].children[0].data
            } else {
                re.name = bbb[u].children[0].data
            }


            //position添加区
            re.position = $(bbb[u]).find('font[title=教室]').find('font[title=教室]')[0].children[0].data

            //teacher添加区
            re.teacher = $(bbb[u]).find('font[title=老师]')[0].children[0].data

            //weeks添加区
            //对week格式进行处理
            re.weeks = weeksParser($(bbb[u]).find("font[title='周次(节次)']")[0].children[0].data)

            //sections添加区
            var newSection = sectionParser($(bbb[u]).find("font[title='周次(节次)']")[0].children[0].data)
            for (let a = 0; a < newSection.length; a++) {
                re.sections.push({"section": newSection[a]})
            }

            //day添加区 只有5*7=35个格子 直接遍历循环解决 不使用获取头的方法
            let day = new Number((u % 7) + 1)
            re.day = day.toString()
            result.push(re)

            for (let useful = 1; useful < $(bbb[u]).find('font[title=老师]').length; useful++) {
                let re2 = {sections: [], weeks: []}
                re2.day = re.day
                re2.position = $(bbb[u]).find('font[title=教室]')[2 * useful + 1].children[0].data
                re2.teacher = $(bbb[u]).find('font[title=老师]')[useful].children[0].data
                re2.weeks = weeksParser($(bbb[u]).find("font[title='周次(节次)']")[useful].children[0].data)
                var newSection = sectionParser($(bbb[u]).find("font[title='周次(节次)']")[useful].children[0].data)
                re2.name = $(bbb[u]).find('font[title=教室]').find('br')[1].children[0].data
                for (let a = 0; a < newSection.length; a++) {
                    re2.sections.push({"section": newSection[a]})
                }
                result.push(re2)
            }
        }
    }
    console.log(result)
    return {
        courseInfos: result,
        "sectionTimes": [
            {
                "section": 1,
                "startTime": "07:40",
                "endTime": "08:25"
            },
            {
                "section": 2,
                "startTime": "08:35",
                "endTime": "09:20"
            },
            {
                "section": 3,
                "startTime": "09:45",
                "endTime": "10:25"
            },
            {
                "section": 4,
                "startTime": "10:35",
                "endTime": "11:20"
            },
            {
                "section": 5,
                "startTime": "14:40",
                "endTime": "15:25"
            },
            {
                "section": 6,
                "startTime": "15:35",
                "endTime": "16:20"
            },
            {
                "section": 7,
                "startTime": "16:45",
                "endTime": "17:25"
            },
            {
                "section": 8,
                "startTime": "17:35",
                "endTime": "18:20"
            },
            {
                "section": 9,
                "startTime": "19:30",
                "endTime": "20:15"
            },
            {
                "section": 10,
                "startTime": "20:25",
                "endTime": "21:10"
            },

        ]
    }
}


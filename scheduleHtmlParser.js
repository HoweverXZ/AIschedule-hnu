function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    
    let result = []
    let bbb = $('div[class=kbcontent]')
 
    for(var u = 0;u<bbb.length;u++){
       let re = { sections: [], weeks: [] }
        
       //name添加区
       if(bbb[u].children[0].data=="&nbsp;"){
           continue
       }else{
           if(bbb[u].children[0].data==undefined){
               //官网有部分标签代码不一致 需要分类
               re.name = $(bbb[u]).children('font').children('font')[0].children[0].data
           }else{
                re.name = bbb[u].children[0].data
           }

       //day添加区
           switch(u%7) {
     case 0:
        re.day = '星期一'
        break;
     case 1:
        re.day = '星期二'
        break;
      case 2:
        re.day = '星期三'
        break;
      case 3:
        re.day = '星期四'
        break;
      case 4:
        re.day = '星期五'
        break;
      case 5:
        re.day = '星期六'
        break;
      case 6:
        re.day = '星期日'
        break;

} 
        re.position = $(bbb[u]).find('font[title=教室]').find('font[title=教室]')[0].children[0].data
        
          
       }


    

       result.push(re)
   }
  
    console.log(result)

    return { courseInfos: result }
}

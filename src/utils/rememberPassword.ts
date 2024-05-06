export function setCookie(username:string|number, tempPassword:string|number, days:number) {
  let exDate= new Date(); // 获取时间；
  exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
  //字符串拼接cookie
  // @ts-ignore
  window.document.cookie =
    "username" + "=" + username + ";path=/;expires=" + exDate.toUTCString();
  // @ts-ignore
  window.document.cookie =
    "tempPassword" + "=" + tempPassword + ";path=/;expires=" + exDate.toUTCString();
  // @ts-ignore
  window.document.cookie =
    "isRemember" + "=" + true + ";path=/;expires=" + exDate.toUTCString();
}

export function getCookie() {
  let data:any = {};
  if (document.cookie.length > 0) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("="); //再次切割
      //判断查找相对应的值
      if (arr2[0] == "username") {
        data['username'] = arr2[1];
      } else if (arr2[0] == "tempPassword") {
        data['tempPassword'] = arr2[1];
      } else if (arr2[0] === "isRemember") {
        data['isRemember'] = Boolean(arr2[1]);
      }
    }
  }
  return data;
}

export function clearCookie() {
  setCookie("", "", -1);
}

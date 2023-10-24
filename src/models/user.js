const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

export default {
  state: {
    token: localStorage.getItem("token") || "",
    waterMarkContent: localStorage.getItem("waterMarkContent") || generatesRandomNumber(),
    courseList: localStorage.getItem("courseList") ? JSON.parse(localStorage.getItem("courseList")) : []
  },
  reducers: {
    changeToken(state, { payload }) {
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    },
    changeWaterMarkContent(state, { payload }) {
      localStorage.setItem("waterMarkContent", payload);
      return {
        ...state,
        waterMarkContent: payload,
      };
    },
    changeCourseList(state, { payload }) {
      localStorage.setItem("courseList", JSON.stringify(payload));
      return {
        ...state,
        courseList: payload,
      };
    },
  },
};

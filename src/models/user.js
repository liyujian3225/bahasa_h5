const generatesRandomNumber = () => {
  let res = ''
  for(let i = 0; i < 12; i++){
    res += Math.floor(Math.random()*10);
  }
  return res.slice(0, 3) + '.' + res.slice(3, 6) + '.' + res.slice(6, 9) + '.' + res.slice(9, 12);
}

export default {
  state: {
    waterMarkContent: generatesRandomNumber(),
    courseList: [],
  },
  reducers: {
    changeWaterMarkContent(state, { payload }) {
      return {
        ...state,
        waterMarkContent: payload,
      };
    },
    changeCourseList(state, { payload }) {
      return {
        ...state,
        courseList: payload,
      };
    },
  },
};

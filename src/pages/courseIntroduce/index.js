import { Image, Space } from 'antd-mobile'

const imageList = function() {
  let imageList = [];
  for(let i = 2; i < 14 ;i++) {
    imageList.push(
      <Image lazy src={`./image/course/${i}.jpg`} key={i} />
    )
  }
  return imageList;
}

export default () => {
  return (
    <div className="course">
      <Space direction='vertical'>
        { imageList() }
      </Space>
    </div>
  )
}

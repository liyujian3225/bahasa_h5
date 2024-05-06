import { Button } from 'antd-mobile'
import './index.less'

export default ({ onClick, children }) => {
  return (
    <Button className="CustomButton" block={true} onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      { children }
    </Button>
  )
}

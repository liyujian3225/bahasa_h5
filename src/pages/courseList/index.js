import { useLocation, connect } from 'umi';
import {request} from "@/services";

const courseList = () => {

  const stateParams = useLocation();
  const { id } = stateParams.state;
  const [courseListData, setCourseListData] = useState([])
  const queryCourse = () => {
    request.get('/business/web/course/find/TYAIILon')
      .then(res => {
        const { success, content } = res;
        if(success) {
          let { chapters, sections } = content;
          chapters = chapters.map(item => {
            const { id } = item;
            item.sectionList = sections.filter(j => j.chapterId === id );
            item.sectionList = item.sectionList.sort((a, b) => a.sort - b.sort)
            return item;
          })
          setCourseListData(chapters[0])
        }
      })
  }
  useEffect(() => { queryCourse() }, [])

  return (
    <div className="courseList">
      <ul>

      </ul>
    </div>
  )
}

export default courseList;

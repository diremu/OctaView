import { Badge } from "@/components/ui/badge"
import Selections from "@/components/selections"

const tableTop = ({mode, showVenue, setLevel, setDepartment}) => {
  return (
     <div className="w-full bg-slate-300 flex p-2 px-4 justify-between items-center space-x-6">
        <h1 className="text-lg font-medium">Chemical Engineering weekly timetable</h1>
        <Badge
         className=""
        >{mode !== 'exam' ? 'Classes' : 'Exam'}</Badge>
        <Selections venue={showVenue} setLevel={setLevel} setDepartment={setDepartment}/>
     </div>
  )
}
export default tableTop
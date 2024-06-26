import Levels from "@/components/levelSelection"
import Department from "@/components/departmentSelection"
import Days from "@/components/daysSelection"

const selections = ({ venue, setLevel, setDepartment, enabled }) => {
  return (
    <div className="flex md:justify-end w-full md:w-fit space-x-4 justify-start">
        { venue ? <Days /> : null}
        <Levels 
          setLevel={setLevel} 
          enabled={enabled}/>
        <Department 
          enabled={enabled}
          setDepartment={setDepartment}
          contentClassName="h-fit max-h-56 p-1"/>
    </div>
  )
}
export default selections
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Options from "./timetableOption"
import { useEffect, useState } from "react"
import axios from "axios"
import {Vortex, Triangle} from 'react-loader-spinner'
import { Skeleton } from "@/components/ui/skeleton"

// const timetables = [1,2,3,4,5]
const serverLink = import.meta.env.VITE_SERVER_LINK

export default function list() {
    const [ timetables, setTimetables ] = useState([])

    useEffect(() => {
        async function fetchInitTimetables(){             
            try {
                const response = await axios.post(`${serverLink}/timetable/get-timetable`, {})

                // console.log(response, 444)
                if (response?.status === 200) {
                    
                    const cleanedResponse = response?.data?.timetables?.map(({createdAt, type, _id, name, status, current}) => ({createdAt, type, _id, name, status, current}))
                    console.log(response, 342)
                    if(cleanedResponse.length === 0) return setTimetables('');
                    setTimetables(cleanedResponse);
                } else {
                    console.log(response, 342)
                }
                
            } catch (error) {
                
            }
        }

        fetchInitTimetables();
    }, [])

    const Loader = () => {
        return (
            <TableBody>
                {Array(4).fill(null).map(() => (
                    <TableRow>
                        {/* <TableCell className="font-medium underline" asChild colSpan={4}><Loader /></TableCell> */}
                        <TableCell className="font-medium underline" asChild ><Skeleton className="h-8 w-36" /></TableCell>
                        <TableCell className="font-medium underline" asChild ><Skeleton className="h-8 w-36" /></TableCell>
                        <TableCell className="font-medium underline" asChild ><Skeleton className="h-8 w-36" /></TableCell>
                    </TableRow>)
                )}
            </TableBody>
        )
    }

    if(timetables === '') return <p>No timetables found. Try creating one using our AI</p>

  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <>
        {
            timetables.length > 0 
            ?  (<TableBody>
                    {timetables.map((details, index) => {
                        const date = new Date(details?.createdAt);

                        const parsedDate = date?.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return <Options 
                            key={index} 
                            id={details?._id}
                            name={details?.name}
                            status={details?.status}
                            createdAt={parsedDate}
                            current={details?.current}
                        />})}
                </TableBody>)
            : <Loader />
        }
        </>
    </Table>
  )
}
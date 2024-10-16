import axios from "axios";
import CourseCard from "./CourseCard";
import { useLoaderData } from "react-router-dom";

export default function AllCourses() {
  const courses = useLoaderData();
  
  return (
    <div className="max-w-[90vw] mx-auto flex flex-col gap-4 mb-10">
      {courses.map((course) => {
        return <CourseCard key={course._id} course={course} />;
      })}
    </div>
  );
}

export async function loader() {
  try {
    const res = await axios.get("/api/v1/course/all/preview");
    return res.data.courses;
  } catch (error) {
    return error.response.data;
  }
}

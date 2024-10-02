import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Loader2 } from "lucide-react";

export default function AllCourses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/v1/course/all/preview");
        setCourses(res.data.courses);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 size={100} className="animate-spin text-gray-500" />;
      </div>
    );
  }

  return (
    <div className="max-w-[90vw] mx-auto flex flex-col gap-4 mb-10">
      {courses.map((course) => {
        return <CourseCard key={course._id} course={course} />;
      })}
    </div>
  );
}

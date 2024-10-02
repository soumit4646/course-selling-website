import axios from "axios";
import { Loader2, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CourseCard from "../CourseCard";

export default function CoursePage() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  console.log(courseId);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/v1/course/${courseId}`);
        setCourse(res.data.course);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 size={100} className="animate-spin text-gray-500" />;
      </div>
    );
  }
  console.log(course);

  return (
    <div className="border p-4 flex flex-col gap-4 rounded">
      <img
        src={course.imageUrl}
        alt="logo"
        className="w-full h-80 object-fill rounded"
      />
      <p className="text-center text-4xl font-bold">{course.title}</p>
      <hr />
      <p>{course.courseContent}</p>
    </div>
  );
}

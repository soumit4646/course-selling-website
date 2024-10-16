import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function CoursePage() {
  const course = useLoaderData();

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

export async function loader({ params }) {
  try {
    const res = await axios.get(`/api/v1/course/${params.courseId}`);
    return res.data.course;
  } catch (error) {
    return error.response.data;
  }
}

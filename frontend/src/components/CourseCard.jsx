import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function CourseCard({ course, purchased }) {
  const buyCourse = async () => {
    try {
      const res = await axios.post("/api/v1/course/purchase", {
        courseId: course._id,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="border p-4 flex gap-4 rounded">
      <img
        src={course.imageUrl}
        alt="logo"
        className="w-80 h-56 object-fill rounded"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">{course.title.slice(0, 22)}</h1>
          <p className="text-slate-500">
            {course.description.length > 100
              ? course.description.slice(0, 100) + "..."
              : course.description}
          </p>
          <p className="text-slate-700">
            <span className="font-bold text-black">Instructor:</span>{" "}
            {course.creatorId.firstName} {course.creatorId.lastName}
          </p>
          <p className="font-bold">
            Price: <span className="font-mono">&#8377;{course.price}</span>
          </p>
        </div>

        <div>
          {purchased ? (
            <button className="bg-purple-500 hover:bg-purple-700  px-4 py-2 rounded-md flex gap-x-2 items-center text-white">
              <Link to={"/course/" + course._id}>View Course</Link>
            </button>
          ) : (
            <button
              className="bg-purple-500 hover:bg-purple-700  px-4 py-2 rounded-md flex gap-x-2 items-center text-white"
              onClick={buyCourse}
            >
              Buy Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

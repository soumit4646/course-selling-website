import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditCoursePage() {
  const { courseId } = useParams();
  console.log(courseId);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState(null);
  const [courseContent, setCourseContent] = useState("");

  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("/api/v1/admin/course", {
        title,
        description,
        imageUrl: coverImage,
        price,
        courseContent,
        courseId,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.post(`/api/v1/admin/preview/${courseId}`);

        setTitle(res.data.course.title);
        setDescription(res.data.course.description);
        setCoverImage(res.data.course.imageUrl);
        setPrice(res.data.course.price);
        setCourseContent(res.data.course.courseContent);

        setLoading(false);
      } catch (error) {}
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

  return (
    <div className="flex flex-col gap-4 mb-10">
      <div>
        <h1 className="text-center text-4xl font-bold"> {} Course</h1>
      </div>

      <form onSubmit={updateCourse}>
        <div className="border rounded p-6 flex flex-col gap-4">
          <div>
            <p className="mb-4 text-2xl font-semibold">Title:</p>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Description:</p>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
              rows={4}
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Cover Image:</p>
            <input
              type="text"
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
            />
          </div>

          <div>
            <p className="text-2xl font-semibold mb-4">Price:</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Course Content:</p>
            <input
              type="text"
              name="courseContent"
              value={courseContent}
              onChange={(e) => setCourseContent(e.target.value)}
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
            />
          </div>

          <button
            type="submit"
            className="mt-10 py-2 px-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
}

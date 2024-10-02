import axios from "axios";
import toast from "react-hot-toast";

export default function CreateCourse() {
  const createCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const coverImage = formData.get("coverImage");
    const price = formData.get("price");
    const courseContent = formData.get("courseContent");

    console.log(title, description, coverImage, price, courseContent);

    try {
      const res = await axios.post("/api/v1/admin/course", {
        title,
        description,
        imageUrl: coverImage,
        price,
        courseContent,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto flex flex-col gap-4">
      <div>
        <h1 className="text-center text-4xl font-bold">Create Course</h1>
      </div>

      <form onSubmit={createCourse}>
        <div className="border rounded p-6 flex flex-col gap-4">
          <div>
            <p className="mb-4 text-2xl font-semibold">Title:</p>
            <input
              type="text"
              name="title"
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Title"
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Description:</p>
            <textarea
              type="text"
              name="description"
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Description"
              rows={4}
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Cover Image:</p>
            <input
              type="text"
              name="coverImage"
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Cover Image"
            />
          </div>

          <div>
            <p className="text-2xl font-semibold mb-4">Price:</p>
            <input
              type="number"
              name="price"
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Price"
            />
          </div>

          <div>
            <p className="mb-4 text-2xl font-semibold">Course Content:</p>
            <input
              type="text"
              name="courseContent"
              required
              className="py-3 px-4 w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
              placeholder="Course Content"
            />
          </div>

          <button
            type="submit"
            className="mt-10 py-2 px-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onSubmit={createCourse}
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}

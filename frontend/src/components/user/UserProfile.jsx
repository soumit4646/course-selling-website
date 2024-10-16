import { useContext } from "react";
import axios from "axios";
import { BadgeIndianRupee } from "lucide-react";
import { Form, redirectDocument, useLoaderData } from "react-router-dom";

import userContext from "../../../lib/globalContext";
import CourseCard from "../CourseCard";

export default function UserProfile() {
  const { user } = useContext(userContext);
  const purchasedCourses = useLoaderData();

  return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">User Profile</h1>
        <div className="border rounded p-6">
          <div className="flex items-center gap-8 max-w-3xl mx-auto">
            <img
              src="https://st3.depositphotos.com/6672868/13801/v/380/depositphotos_138013506-stock-illustration-user-profile-group.jpg"
              alt="user profile"
              height={300}
              width={300}
              className="rounded"
            />
            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">First Name: {user.firstName}</p>
              <p className="text-xl font-bold">Last Name: {user.lastName}</p>
              <p className="text-xl font-bold">
                Current Balance: &#8377;{user.balance}
              </p>

              <Form method="post">
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="amount"
                      required
                      className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-none focus:outline-blue-500"
                      placeholder="Enter Amount"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 start-0 flex items-center ps-4"
                    >
                      <BadgeIndianRupee
                        size={15}
                        className="text-neutral-500"
                      />
                    </button>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700  px-4 py-2 rounded-md items-center text-white">
                    Add Balance
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center">Purchased Courses</h1>
        <div className="mb-10 flex flex-col gap-4">
          {purchasedCourses.map((course) => {
            return (
              <CourseCard key={course._id} course={course} purchased={true} />
            );
          })}
        </div>
      </div>
  );
}

export async function loader() {
  try {
    const res = await axios.get("/api/v1/user/purchases");
    return res.data.coursesData;
  } catch (error) {
    console.log(error.response.data);
    return { coursesData: [] };
  }
}

export async function action({ request }) {
  let formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    await axios.post("/api/v1/user/add-money", payload);
    return redirectDocument(".");
  } catch (error) {
    console.log(error.response.data);
  }
  return null;
}

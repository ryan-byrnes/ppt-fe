import { NextPage } from "next";
import { useEffect, useState } from "react";

const PersonalRecords: NextPage = () => {

    const userId = 1;

    const [personalRecordsList, setPersonalRecordsList] = useState<([{
      exercise_id: number;
      exercise_name: string;
      weight: number;
      updated_at: string;
    }])>([{exercise_id: 0, exercise_name: '', weight: 0, updated_at: ''}]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/personal-records/${userId}`)
          .then(res => res.json())
          .then(data => {
            console.log("data: ", JSON.stringify(data));
            setPersonalRecordsList(data);
          })
    }, []);

    console.log("prs: ", personalRecordsList);

    const date = new Date();
    const update = date.toISOString();

    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add user
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-20">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Exercise
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Weight
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {personalRecordsList.map((exercise) => (
                        <tr key={exercise.exercise_id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {exercise.exercise_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.weight}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.updated_at}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Edit<span className="sr-only">, {exercise.exercise_name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default PersonalRecords;
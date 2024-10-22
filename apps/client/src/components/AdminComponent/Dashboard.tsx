import { useEffect, useState } from "react";
import { API } from "../../utils/baseAxios";
import { Adminpiechart } from "./Adminpiechart";

export const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const user = await API.get("/getusercount", {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });
        setUserCount(user.data.count);

        console.log(userCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    })();
    (async () => {
      try {
        const project = await API.get("/getprojectcount", {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });
        setProjectCount(project.data);
        console.log(projectCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    })();
    (async () => {
      try {
        const message = await API.get("/getmessagecount", {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });
        setMessageCount(message.data);
        console.log(message.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    })();
  }, []);
  return (
    <div>
      <h2 className="text-2xl mb-6 font-semibold">Dashboard Overview</h2>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Projects</h3>
            <p className="text-2xl font-bold">{projectCount}</p>
          </div>
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Messages</h3>
            <p className="text-2xl font-bold">{messageCount}</p>
          </div>
        </div>
        <div className=" !w-full !h-full">
          <Adminpiechart />
        </div>
      </div>
    </div>
  );
};

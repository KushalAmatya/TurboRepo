import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { API } from "../../utils/baseAxios";

Chartjs.register(ArcElement, Tooltip, Legend);

export const Adminpiechart = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  useEffect(() => {
    try {
      (async () => {
        const user = await API.get("/getusercount", {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });
        setUserCount(user.data.count);
        setAdminCount(user.data.adminCount);
        console.log("ssss", userCount);
        console.log("asdsda", adminCount);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="h-[50dvh]  flex justify-center">
      <Doughnut
        data={{
          labels: ["Users", "Admins"],
          datasets: [
            {
              label: "Users",
              data: [userCount, adminCount],
              backgroundColor: ["#292825", "#94938f"],
              hoverBackgroundColor: ["#403d34", "#b5b4ae"],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
          },
        }}
      />
    </div>
  );
};

import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import WidGetSmall from "../../components/admin/WidGetSmall";
import WidGetLarge from "../../components/admin/WidGetLarge";
import Chart from "../../components/admin/Chart";

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec ",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "nhat" + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        console.log(res);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "New User": item.total,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="New User"
        />
        <div className="flex m-5">
          <WidGetSmall />
          <WidGetLarge />
        </div>
      </div>
    </div>
  );
};

export default Home;

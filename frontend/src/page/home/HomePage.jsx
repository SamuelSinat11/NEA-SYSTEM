import React from "react";
import { Chart } from "react-google-charts";
import {create} from "zustand"; 

function HomePage() {

    const data = [
        ["Year", "Sales", "Expenses"],
        ["2013", 1000, 400],
        ["2014", 1170, 460],
        ["2015", 660, 1120],
        ["2016", 1030, 540],
      ];
      
      const options = {
        title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "70%", height: "70%" },
      };

      const data1 = [
        ["Task", "Hours per Day"],
        ["Work", 9],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ];
    
      const options1 = {
        title: "My Daily Activities",
      };
      
    return <div>

<Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  <Chart
      chartType="PieChart"
      data={data1}
      options={options1}
      width={"100%"}
      height={"400px"}
    />
    </div>;
}

export default HomePage;




import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutations";
import { GET_TRANSACTION_STATISTICS } from "../graphql/mutations/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/mutations/queries/user.query";
import { useEffect, useState } from "react";

// const chartData = {
// 	labels: ["Saving", "Expense", "Investment"],
// 	datasets: [
// 		{
// 			label: "%",
// 			data: [20, 40, 40],
// 			backgroundColor: ["rgba(75, 192, 192)", "#fe523b", "rgba(54, 162, 235)"],
// 			borderColor: ["rgba(75, 192, 192)", "#fe523b", "rgba(54, 162, 235, 1)"],
// 			borderWidth: 4,
// 			borderRadius: 100,
// 			spacing: 10,
// 			cutout: 130,
// 		},
// 	],
// };

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const { data } = useQuery(GET_TRANSACTION_STATISTICS); 
	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER); 

     
	const [logout, { loading, client }] = useMutation(LOGOUT, {
	  refetchQueries: ["GetAuthenticatedUser"],
	});
     
	const [chartData, setChartData] = useState({
	  labels: [],
	  datasets: [
	    {
	      label: "Rs.",
	      data: [],
	      backgroundColor: [],
	      borderColor: [],
	      borderWidth: 4,
	      borderRadius: 100,
	      spacing: 9,
	      cutout: 128,
	    },
	  ],
	});
     
	useEffect(() => {
		
	  if (data?.categoryStatistics && data.categoryStatistics.length > 0) {
	    const categories = data.categoryStatistics.map((stat) => stat.category);
	    const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);
     
	    console.log("Categories:", categories);
	    console.log("Total Amounts:", totalAmounts);
     
	    const backgroundColors = [];
	    const borderColors = [];
     
	    categories.forEach((category) => {
	      const normalizedCategory = category.trim().toLowerCase(); 
     
	      if (normalizedCategory === "saving") {
		 backgroundColors.push("rgba(75, 192, 192)"); 
		 borderColors.push("rgba(75, 192, 192)"); 
	      } else if (normalizedCategory === "expense") {
		 backgroundColors.push("#fe523b"); 
		 borderColors.push("#fe523b"); 
	      } else if (normalizedCategory === "investment") {
		 backgroundColors.push("rgba(54, 162, 235)"); 
		 borderColors.push("rgba(54, 162, 235)"); 
	      }
	    });
     
	    setChartData({
	      labels: categories,
	      datasets: [
		 {
		   label: "Rs.",
		   data: totalAmounts,
		   backgroundColor: backgroundColors,
		   borderColor: borderColors, 
		 },
	      ],
	    });
	  }
	}, [data]); 
     
	const handleLogout = async () => {
	  try {
	    await logout();
	    client.resetStore();
	  } catch (error) {
	    console.error("Error logging out:", error);
	    toast.error(error.message);
	  }
	};
     
	return (
	  <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
	    <div className="flex items-center">
	      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-[#fe523b] via-indigo-500 to-[#fe523b] inline-block text-transparent bg-clip-text">
		 Spend wisely, track wisely
	      </p>
	      <img
		 src={authUserData?.authUser.profilePicture}
		 className="w-11 h-11 rounded-full border cursor-pointer"
		 alt="Avatar"
	      />
	      {!loading && <MdLogout className="mx-2 w-5 h-5 cursor-pointer" onClick={handleLogout} />}
	      {loading && <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>}
	    </div>
     
	    <div className="flex flex-wrap w-full justify-center items-center gap-6">
		{data?.categoryStatistics.length > 0 && (
	      <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
		 <Doughnut data={chartData} options={{ responsive: true }} />
	      </div>
     )}
	      <TransactionForm />
	    </div>
     
	    <Cards />
	  </div>
	);
     };
     
     export default HomePage;
import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-[#fe523b] to-[#fe523b]",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ transaction, authUser }) => {
	let { category,amount,location,date,paymentType,description } = transaction;
	const cardClass = categoryColorMap[category];
	const [deleteTransaction,{loading}] = useMutation(DELETE_TRANSACTION,{
		refetchQueries : ["GetTransactions","GetTransactionStatistics"],
	});

	description = description[0]?.toUpperCase() + description.slice(1);
	category = category[0]?.toUpperCase() + category.slice(1);
	paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);
	
	const handleDelete = async () => {
		try {
			await deleteTransaction({ variables: { transactionId: transaction._id }});
			toast.success("Your Transaction Delete Successfully");
		} catch (error) {
			console.error("Error deleting transaction:", error);
			toast.error(error.message);
		}
	}
	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						{!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
						{loading && <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div>}
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: Rs.{amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location || "N/A"}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{date}</p>
					<img
						src={authUser?.profilePicture}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;
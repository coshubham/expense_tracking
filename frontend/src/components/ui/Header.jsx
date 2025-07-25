import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='mb-10'>
			<h1 className='md:text-6xl text-4xl lg:text-7xl font-bold text-center  relative z-50 text-white pt-10'>
				EXPENSE <Link to='/'>TRACK</Link>
			</h1>
			<div className='relative mb-10 w-1/2 mx-auto hidden md:block'>
				{/* Gradients */}
                <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[4px] w-3/4 blur-sm' />
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#fe523b] to-transparent h-[7px] w-2/4 blur-sm' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#fe523b] to-transparent h-px w-2/4' />
			</div>
		</div>
	);
};
export default Header;

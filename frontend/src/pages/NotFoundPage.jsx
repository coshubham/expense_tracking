import React from 'react'

const NotFound = () => {
	return (
		<section>
			<div className=' text-white'>
				<div className='flex h-screen'>
					<div className='m-auto text-center'>
						<div>
							<img src='/404.svg' alt='404' />
						</div>
						<p className='text-lg md:text-base text-[#fff] font-bold p-8 mb-4'>
							The stuff you were looking for doesn't exist
						</p>
						<a
							href='/'
							className='bg-transparent hover:text-white hover:font-bold hover:bg-[#fe523b]  text-[#fff] rounded shadow hover:shadow-sm py-2 px-7 border border-[#fe523b] '
						>
							Take me home
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
export default NotFound;
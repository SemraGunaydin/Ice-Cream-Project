
import { FaStar } from 'react-icons/fa';

const HeroCard = () => {
  return (
	<div>
	  {/* Card */}
	  <div className="flex gap-[23px]">
		<div className="bg-white p-[30px_25px_40px_30px] rounded-2xl text-black">
			<div className="flex gap-[20px]">
				<img src="/profile.png" alt="profile" className="size-11" />

				<div>
					<h3 className="text-[24px] font-semibold">Semra</h3>
					<div className="text-yellow-500 flex gap-1">
						<FaStar/>
						<FaStar/>
						<FaStar/>
						<FaStar/>
						<FaStar/>
					</div>
				</div>
			</div>
			<p className="mt-[15px] lg:max-w-[300px] flex flex-col">
				Rich and intense dark chocolate ice cream.

				<span className="font-semibold">#dairy #darkchocolate</span>
			</p>
		</div>
		<img src="/dots.svg" />
	  </div>

	  {/* Buttons */}
	  <div className="mt-[40px] lg:mt-[83px]">
		<h3 className="fs-5 mb-[15px] font-medium">Select Category</h3>

		<div className="flex gap-[40px]">
			<button className="card-btn">
				<img src="/icon-3.svg" />
			</button>
			<button className="card-btn">
				<img src="/icon-2.svg" />
			</button>
			<button className="card-btn">
				<img src="/icon-1.svg" />
			</button>
			<button className="card-btn">
				<img src="/icon-4.svg" />
			</button>
		</div>


	  </div>
	</div>
  )
}

export default HeroCard;

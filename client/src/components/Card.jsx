import { useNavigate } from "react-router-dom";

const Card = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 border border-gray-300 shadow-md p-5 max-w-[322px]  flex-wrap ">
      <div>
        <img
          className="w-12 h-12  rounded-4xl object-cover"
          src={job.companyId.image}
          alt="job image"
        />
      </div>
      <div>
        <h3 className="font-medium text-xl mb-2">{job.title}</h3>
        <div className="flex gap-2">
          <div className="inline-flex items-center cursor-default bg-blue-50 border border-blue-200 rounded px-4 py-1.5 justify-center">
            <p>{job.location}</p>
          </div>
          <div className="inline-flex items-center cursor-default bg-red-50 border border-red-200 rounded px-4 py-1.5">
            <p>{job.level}</p>
          </div>
        </div>
      </div>
      <div>
        <p
          className="break-words"
          dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
        ></p>
      </div>
      <div className="flex gap-2">
        <div className="inline-flex items-center cursor-pointer bg-blue-600 border border-blue-200 rounded px-4 py-1.5 text-white ">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              navigate(`/apply-job/${job._id}`);
              scrollTo(0, 0);
            }}
          >
            Apply Now
          </button>
        </div>
        <div className="inline-flex items-center cursor-pointer border border-gray-300 rounded px-4 py-1.5 text-gray-600">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              navigate(`/apply-job/${job._id}`);
              scrollTo(0, 0);
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

import { useSelector } from "react-redux";

const EditProfileCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const data = useSelector((store)=>store.user);
  const allSkills = data.skills;

  return (
    <div className="flex justify-center m-3">
      <div className="w-80 bg-gray-950/50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <figure className="rounded-t-xl overflow-hidden p-8 rounded ">
          <img
            src={photoUrl}
            alt="profile photo"
            className="w-full h-60 object-cover rounded-t-xl"
          />
        </figure>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-1 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-300 text-sm mb-2">{age + ", " + gender}</p>
          )}
          {skills?.length > 0 && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-semibold">skillls : </span> {allSkills.join(" | ")}
            </p>
          )}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed"><span className="font-semibold">About : </span>{about}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;

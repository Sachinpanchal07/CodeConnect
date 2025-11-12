import { useSelector } from "react-redux";

const EditProfileCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills, isPremium } = user;
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
          <div className="flex items-center gap-2">
              <h2 className="text-2xl bg-gradient-to-br from-blue-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold flex items-center gap-2">
                {firstName + " " + lastName}
              </h2>
                {isPremium && (
                  <span className="flex items-center justify-center mt-1 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                    ✓
                  </span>
                )}
            </div>
          {age && gender && (
            <p className="text-gray-300 text-sm mb-2">{age + ", " + gender}</p>
          )}
          {skills?.length > 0 && (
            <p className="text-sm font-semibold">
              {/* Skills: <span className="font-medium ">{skills.join(" | ")}</span> */}
              {skills.map((skill, index) => (
                <button key={index} className="text-white italic font-normal bg-gradient-to-r from-blue-500 to-purple-500  m-1 px-2 pb-0.5 rounded-full">{skill}</button>
              ) )}
            </p>
          )}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed"><span className="font-semibold">About : </span>{about}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;

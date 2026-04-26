import { useSelector } from "react-redux";

const EditProfileCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills, isPremium } = user;
  const data = useSelector((store)=>store.user);
  const allSkills = data.skills;

return (
    <div className="flex justify-center m-3 animate-in fade-in zoom-in duration-500">
      <div className="w-80 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-blue-500/30">
        
        {/* Photo Section */}
        <figure className="relative p-4 pb-0">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-full h-64 object-cover rounded-2xl shadow-inner bg-gray-800"
          />
          {isPremium && (
            <div className="absolute top-6 right-6 bg-blue-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-gray-900">
              <i className='bx bxs-badge-check text-lg'></i>
            </div>
          )}
        </figure>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-3">
            <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                {age} Years • {gender}
              </p>
            )}
          </div>

          {/* About Section */}
          <div className="mb-5">
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
              <span className="text-blue-500 font-bold uppercase text-[9px] block mb-1 tracking-tighter">Bio</span>
              {about || "Your story starts here..."}
            </p>
          </div>

          {/* Skills Section */}
          <div className="flex flex-wrap gap-1.5">
            {skills?.length > 0 ? (
              skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-lg uppercase transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-gray-700 italic">No skills added yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;

import React, { useState } from "react";

const RequestCard = ({ request, reviewRequest, requestId }) => {
  if (!request) return null;

  const { firstName, lastName, age, gender, photoUrl, about, skills, isPremium } = request;
  const [showFullView, setShowFullView] = useState(false);

  // Updated Modal UI
  const fullView = (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] px-4">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setShowFullView(false)}
        >
          <i className='bx bxs-x-circle text-3xl'></i> 
        </button>

        <div className="flex flex-col items-center text-center sm:text-left sm:items-start sm:flex-row gap-6">
          <figure className="relative">
            <img
              src={photoUrl}
              alt="profile"
              className="h-32 w-32 rounded-2xl object-cover border-2 border-blue-500/50 shadow-lg shadow-blue-500/10"
            />
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-blue-500 p-1.5 rounded-full border-2 border-gray-900 shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
            )}
          </figure>

          <div className="flex-1">
            <h2 className="text-2xl font-black tracking-tight">{firstName + " " + lastName}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <span className="px-2 py-0.5 bg-gray-800 rounded-md text-[10px] font-bold text-gray-400 uppercase tracking-widest">{gender}</span>
              <span className="px-2 py-0.5 bg-gray-800 rounded-md text-[10px] font-bold text-gray-400 uppercase tracking-widest">{age} Years</span>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mb-1">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, i) => (
                    <span key={i} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter mb-1">Bio</p>
                <p className="text-sm text-gray-400 leading-relaxed italic">"{about}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full px-4 py-3 bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl flex justify-between items-center transition-all hover:bg-gray-800/60 group">
        
        {/* User Info Trigger */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setShowFullView(true)}
        >
          <div className="relative">
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-12 h-12 rounded-xl object-cover border border-gray-700 shadow-lg group-hover:border-blue-500/50 transition-colors"
            />
            {isPremium && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              {firstName} {lastName}
            </h2>
            <p className="text-[10px] text-gray-500 font-medium">View profile details</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => reviewRequest("rejected", requestId)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
            title="Reject"
          >
            <span className="text-xs">✕</span>
          </button>
          
          <button
            onClick={() => reviewRequest("accepted", requestId)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
            title="Accept"
          >
             <i className="bx bx-check text-2xl"></i>
          </button>
        </div>
      </div>

      {showFullView && fullView}
    </>
  );
};

export default RequestCard;
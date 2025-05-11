import React, { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  image: string;
}

const Team: React.FC = () => {
  // Team members list
  const [teamMembers] = useState<TeamMember[]>([
    {
      name: "Selmani Lyna",
      role: "Admin",
      email: "l_selmani@estin.dz",
      image:
        "https://i.pinimg.com/736x/e4/39/54/e4395494e82f2706e15d2c855f3c0e60.jpg",
    },
    {
      name: "Bensallah Khadidja",
      role: "Admin",
      email: "k_bensallah@estin.dz",
      image:
        "https://i.pinimg.com/736x/ff/81/70/ff8170acb79b057bdf194dada66c0767.jpg",
    },
    {
      name: "Maakni Ines",
      role: "Admin",
      email: "i_maakni@estin.dz",
      image:
        "https://i.pinimg.com/736x/bf/67/42/bf67420cfb310ef6d29c276a56abd39d.jpg",
    },
    {
      name: "Bennouar Yassmine",
      role: "Admin",
      email: "y_bennouar@estin.dz",
      image:
        "https://i.pinimg.com/736x/24/91/0f/24910f726e8e849d73ba395a584181f0.jpg",
    },
    {
      name: " Chettab Nazim",
      role: "Admin",
      email: "n_chettab@estin.dz",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Notre Équipe</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 hover:shadow-gray-500/50"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-center text-lg font-semibold">{member.name}</h3>
            <p className="text-center text-gray-500 text-sm">{member.role}</p>
            <p className="text-center text-gray-400 text-xs mt-1">
              {member.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

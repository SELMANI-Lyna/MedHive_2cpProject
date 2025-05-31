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
        "https://i.pinimg.com/736x/77/8b/b4/778bb4ab74245992b48926e7770d3a14.jpg",
    },
    {
      name: "Bensallah Khadidja",
      role: "Admin",
      email: "k_bensallah@estin.dz",
      image:
        "https://i.pinimg.com/736x/c3/09/ff/c309ff391488a8f1ef0a488b2e61c642.jpg",
    },
    {
      name: "Maakni Ines",
      role: "Admin",
      email: "i_maakni@estin.dz",
      image:
        "https://i.pinimg.com/736x/d0/50/72/d050724637a2633b42c5c0b7856a3d95.jpg",
    },
    {
      name: "Bennouar Yassmine",
      role: "Admin",
      email: "y_bennouar@estin.dz",
      image:
        "https://i.pinimg.com/736x/24/91/0f/24910f726e8e849d73ba395a584181f0.jpg",
    },
    {
      name: "Chettab Nazim",
      role: "Admin",
      email: "n_chettab@estin.dz",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Team</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md transition transform hover:scale-105 active:scale-95 active:shadow-inner"
            style={{ boxShadow: "0 6px 20px 6px rgba(107, 114, 128, 0.4)" }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-center text-lg font-semibold">{member.name}</h3>
            <p className="text-center text-gray-500 text-sm">{member.role}</p>
            <p className="text-center text-gray-500 text-sm mt-1">
              <a
                href={`mailto:${member.email}`}
                className="text-gray-500 text-sm hover:underline"
              >
                {member.email}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

import VisitorsChart from "../components/VisitorsChart";
import DashboardCards from "../components/DashboardCards";
import AdminHeader from "../components/Adminsidebar";
import NotificationButton from "../components/Notifications";
import Adminprofile from "../components/AdminProfile";
import SearchBar from "../components/Searchbaradmin";

export default function Dashboard() {
  return (
    <div className="p-4 flex max-w-full overflow-hidden">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}

      <div className="flex-1 ml-[50px]  mr-[20px]  overflow-hidden">
        <div>
          <SearchBar />
          <NotificationButton />
          <Adminprofile adminName="team" adminEmail="teamMedHive@estin.dz" />
        </div>

        {/* Main Content */}
        <div>
          <h1 className="text-2xl font-bold mb-6 mt-[100px]">Dashboard</h1>

          <div>
            <DashboardCards />
          </div>
          <div>
            <VisitorsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

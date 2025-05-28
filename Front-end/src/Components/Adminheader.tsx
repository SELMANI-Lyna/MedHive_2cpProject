// AdminHeader.tsx
import Searchbar from "./Searchbar";
import NotificationButton from "./Notification";
import Adminprofile from "./Adminprofile";

const AdminHeader = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Searchbar />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <NotificationButton />
        <Adminprofile 
          adminName="Selmani Lyna" 
          adminEmail="lenn334@example.com" 
        />
      </div>
    </header>
  );
};

export default AdminHeader;
// components/Header.jsx




const titleStyle = {
  color: '#2c3e50',
  margin: 0,
  fontSize: '2rem'
};

const Header = () => {
  return (
    <header style={{backgroundColor: '#f8f9fa',
        padding: '1rem',
        textAlign: 'center',
        borderBottom: '1px solid #e1e1e1'}}>
      <h1 style={titleStyle}>MedHive.com</h1>
    </header>
  );
};

export default Header;

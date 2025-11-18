import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

// ---------- Styled Components ----------
const AvatarContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
});

interface DropdownProps {
  isHovered: boolean;
}

const Dropdown = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<DropdownProps>(({ theme, isHovered }) => ({
  display: isHovered ? 'block' : 'none',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

// ---------- Props ----------
interface AvatarDropdownProps {
  openModal: () => void;
}

// ---------- Component ----------
const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);


  // --new added--

  useEffect(() => {
  const loadUser = () => {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      setUserData(null);
    }
  };

  loadUser(); // run once on mount

  // listen for storage changes (like after login)
  window.addEventListener("storage", loadUser);

  return () => {
    window.removeEventListener("storage", loadUser);
  };
}, []);

// -----
  const handleLogout = async () => {
    localStorage.removeItem('UserData');
    setUserData(null);
    await signOut({ redirect: false });
    router.push('/');
  };

  // 👉 If no user logged in → open modal on click
  const handleClick = () => {
    if (!userData) {
      openModal();
    }
  };

  return (
    <AvatarContainer
      onMouseEnter={() => userData && setIsHovered(true)}
      onMouseLeave={() => userData && setIsHovered(false)}
      onClick={handleClick}
    >
      {/* {userData ? (
        <Avatar alt={userData.name} className="mx-2">
          {userData.name.charAt(0)}
        </Avatar>
      ) : (
        <i className="bi bi-person-fill text-blue mx-2 fs-2"></i>
      )} */}

      {userData ? (
        <Avatar
          alt={userData.name}
          className="mx-2"
          sx={{ width: 40, height: 40 }}
        >
          {userData.name.charAt(0)}
        </Avatar>
      ) : (
        <i className="bi bi-person-fill text-blue mx-2 fs-2"></i>
      )}

    
      {userData && (
        <Dropdown isHovered={isHovered} className="p-3">
          <h5 className="mb-2 text-blue">
            Welcome, {userData.name}!
          </h5>
          <Button
            variant="outlined"
            className="mb-2 p-2 viewMoreCollegeBtn"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Dropdown>
      )}
    </AvatarContainer>
  );
};

export default AvatarDropdown;



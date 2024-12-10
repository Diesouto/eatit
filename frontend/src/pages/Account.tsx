import React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import {
  AccountCircle,
  Language,
  Article,
  Settings,
  Notifications,
  Campaign,
  Help,
  ExitToApp,
} from '@mui/icons-material';

// Components
import Navbar from '../components/Navigation';

const sections = [
  {
    title: 'Meu perfil',
    items: [
      { icon: <AccountCircle />, text: 'Información persoal' },
      { icon: <Language />, text: 'Idioma' },
      { icon: <Article />, text: 'Política de privacidade' },
      { icon: <Settings />, text: 'Axustes' },
    ],
  },
  {
    title: 'Notificacións',
    items: [
      { icon: <Notifications />, text: 'Notificacións push' },
      { icon: <Campaign />, text: 'Notificacións promocionais' },
    ],
  },
  {
    title: 'Máis',
    items: [
      { icon: <Help />, text: 'Centro de axuda' },
      { icon: <ExitToApp />, text: 'Pechar sesión' },
    ],
  },
];

const Account: React.FC = () => {
  return (
    <>
      <Box sx={{
        marginBottom: 'var(--navbar-height)'
        }}>
        {/* Header section */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            height: '150px',
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
            position: 'relative',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
            }}
          >
            Perfil
          </Typography>
        </Box>

        {/* Avatar section */}
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '-50px',
            marginBottom: '20px',
          }}
        >
          <Avatar
            sx={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
              boxShadow: 3,
            }}
          >
            {/* Initials or icon */}
            <AccountCircle fontSize="large" />
          </Avatar>
          <Typography variant="h6" sx={{ marginTop: '10px' }}>
            Nome Completo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            email@example.com
          </Typography>
        </Box>

        {/* Dynamic sections */}
        <Box sx={{ padding: '16px', maxWidth: '500px', margin: 'auto' }}>
        <Paper sx={{ padding: 2, marginBottom: 2, boxShadow: 2 }}>
          {sections.map((section, index) => (
            <section key={index}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {section.title}
              </Typography>
              <List>
                {section.items.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </section>
          ))}
          </Paper>
        </Box>
      </Box>
      <Navbar/>
    </>
  );
};

export default Account;

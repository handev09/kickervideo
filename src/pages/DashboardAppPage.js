import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme, useMediaQuery, Container, Typography, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../components/iconify';

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to control the cards visibility
  const [isFirstCardOpen, setIsFirstCardOpen] = useState(true);
  const [isSecondCardOpen, setIsSecondCardOpen] = useState(true);

  const handleFirstCardClose = () => {
    setIsFirstCardOpen(false);
  };

  const handleSecondCardClose = () => {
    setIsSecondCardOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome Paul
        </Typography>

        <Button variant="contained" color="primary">
          + Create a Budget
        </Button>
      </Container>

      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px', flexDirection: isMobile ? 'column' : 'row' }}>
        {isFirstCardOpen && (
          <Card sx={{ width: isMobile ? '100%' : '48%', marginBottom: isMobile ? '20px' : '0' }}>
            <CardContent>
              <Typography variant="h5">Card 1 Title</Typography>
              <Typography variant="body1">
                This is the content of the first card. You can add your paragraph here.
              </Typography>
              <div style={{ marginTop: '10px', marginBottom: '20px', paddingTop: '56.25%', position: 'relative' }}>
                {/* Your video section goes here */}
                {/* For example, you can use an embedded video player */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0 }}
                ></iframe>
              </div>
              <IconButton onClick={handleFirstCardClose}>
                {/* <CloseIcon /> */}
              </IconButton>
            </CardContent>
          </Card>
        )}

        {isSecondCardOpen && (
          <Card sx={{ width: isMobile ? '100%' : '48%', marginBottom: isMobile ? '20px' : '0' }}>
            <CardContent>
              <Typography variant="h5">Card 2 Title</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary">
                  Click Me
                </Button>
              </div>
              <div style={{ marginTop: 'auto' }}>
                {/* Your image goes here */}
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/300"
                  alt="Card 2 Image"
                />
              </div>
              <IconButton onClick={handleSecondCardClose}>
                {/* <CloseIcon /> */}
              </IconButton>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}

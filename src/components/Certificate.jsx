import React, { useState } from "react";
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

// Import certificates
import googleCert from "../assets/google.png";
import honorCert from "../assets/honor.jpg";
import nptlCert from "../assets/nptl.png";

const Certificate = () => {
  const certificates = [
    { id: 1, img: googleCert, title: "Google Certificate" },
    { id: 2, img: honorCert, title: "Honor Certificate" },
    { id: 3, img: nptlCert, title: "NPTEL Certificate" },
  ];

  const [open, setOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpen = (cert) => {
    setSelectedCert(cert);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCert(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3, // space between certificates
        flexWrap: "wrap", // wraps only if screen is too small
        width: "100%",
        padding: 2,
      }}
    >
      {certificates.map((cert) => (
        <Box
          key={cert.id}
          sx={{
            width: 250, // fixed width for each certificate
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            position: "relative",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              "& .overlay": { opacity: 1 },
              "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
            },
          }}
        >
          <img
            src={cert.img}
            alt={cert.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              cursor: "pointer",
            }}
            onClick={() => handleOpen(cert.img)}
          />
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              opacity: 0,
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleOpen(cert.img)}
          >
            <Box className="hover-content" sx={{ textAlign: "center", color: "white" }}>
              <FullscreenIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {cert.title}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" },
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              zIndex: 1,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedCert && (
            <img
              src={selectedCert}
              alt="Certificate Full View"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "90vh",
                margin: "0 auto",
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;

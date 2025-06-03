// ROIPopup.tsx
import { Box, Button, Stack, Typography, InputBase } from "@mui/material";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { generatePdf } from "@src/components/pdf/generate-pdf"; // ✅ Fixed: named import
import { type State } from "@src/helpers";

const IMAGES = {
  EA_Logo_Violet: "/images/EA_Logo_Horizontal_RGB_Deep_Violet.svg",
};

const ROIPopup = ({
  isOpen,
  onClose,
  state,
  getChartImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  state: State;
  getChartImage: () => any;
}) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: false, email: false });
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setFormData({ name: "", email: "" });
      setErrors({ name: false, email: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name,
      email: !validateEmail(formData.email),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email) return;

    setPending(true);

    try {
      const chartImage = getChartImage();
      const blob = await generatePdf(state, formData.name, chartImage);

      // Trigger browser download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "ROI_Report.pdf";
      downloadLink.click();

      // Save name/email to backend
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Download error:", err);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          mx: "auto",
          background: "linear-gradient(135deg, #fdfdfd 20%, #f7f3f8 50%, #e9e7ee 90%)",
          borderRadius: 4,
          boxShadow: 6,
          p: { xs: 3, md: 5 },
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            minWidth: "auto",
            color: "grey.600",
            zIndex: 10,
          }}
        >
          <X size={24} />
        </Button>

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={IMAGES.EA_Logo_Violet}
            alt="EA Logo"
            style={{ maxWidth: "160px", height: "auto", display: "block", margin: "0 auto" }}
          />
        </Box>

        {success ? (
          <Box sx={{ textAlign: "center", my: 3 }}>
            <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
              Report downloaded successfully! ✅
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              Your ROI report has been downloaded. Your details have also been saved.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
            >
              Your ROI report will be downloaded after entering your details.
            </Typography>

            <Stack spacing={3} sx={{ maxWidth: 400, mx: "auto" }}>
              <Box>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>
                  First Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <InputBase
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    borderBottom: `2px solid ${errors.name ? "red" : "#ccc"}`,
                    px: 0,
                    py: 1,
                    fontSize: "1rem",
                  }}
                />
                {errors.name && (
                  <Typography color="error" variant="caption">
                    Please complete this required field
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>
                  Email <span style={{ color: "red" }}>*</span>
                </Typography>
                <InputBase
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  type="email"
                  sx={{
                    borderBottom: `2px solid ${errors.email ? "red" : "#ccc"}`,
                    px: 0,
                    py: 1,
                    fontSize: "1rem",
                  }}
                />
                {errors.email && (
                  <Typography color="error" variant="caption">
                    {formData.email
                      ? "Please enter a valid email address"
                      : "Please complete this required field"}
                  </Typography>
                )}
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  textAlign: "center",
                  color: "text.secondary",
                  mt: 2,
                }}
              >
                By submitting this form, you agree to receive occasional product updates, tips, and
                news from Easy Agile. You can unsubscribe anytime.
              </Typography>

              <Button
                variant="contained"
                disabled={pending}
                onClick={handleSubmit}
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "8px",
                  backgroundColor: pending ? "grey" : "#7B2CBF",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#6822ad",
                  },
                }}
              >
                {pending ? "Generating..." : "Download Report"}
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ROIPopup;

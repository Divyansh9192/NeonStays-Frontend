import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  FormControl,
  InputLabel,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Camera, X, Calendar, MapPin, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { getCurrentUser, updateProfile } from "../api/auth";
import api from "../api/axios"; // Ensure you have your axios instance imported

export default function ProfilePopup({ open, onClose }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // Booking States
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load User Profile
  useEffect(() => {
    if (profile?.data) {
      setUserData(profile.data);
      setEditForm(profile.data);
    }
  }, [open, profile]);

  // ✅ FETCH BOOKINGS API INTEGRATION
  useEffect(() => {
    if (activeTab === 1 && open) {
      fetchBookings();
    }
  }, [activeTab, open]);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      // Replace with your actual endpoint
      const response = await api.get("/users/bookings");
      console.log(response.data.data);

      // ✅ Map Java DTO to UI Format, accessing nested properties
      const mappedBookings = response?.data?.data.map((b) => ({
        id: b.id,
        // Accessing nested DTO properties:
        hotelName: b.hotel?.name || "Hotel Booking",
        location:
          b.hotel?.hotelContactInfo?.location ||
          b.hotel?.city ||
          "Unknown Location",

        // Use the first photo as the image, or a fallback placeholder
        image:
          b.hotel?.photos?.[0] ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200",

        // Formatting Dates
        dates: `${formatDateShort(b.checkInDate)} - ${formatDateShort(
          b.checkOutDate
        )}`,

        status: b.bookingStatus, // e.g., "CONFIRMED", "PENDING"
        price: b.amount,
        guests: b.guests?.length || b.roomsCount, // Assuming guests count or room count if guests is null
      }));

      setBookings(mappedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  // Helper: Format "2024-03-08" to "Mar 8"
  const formatDateShort = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Ensure date is valid; sometimes backend LocalDate needs time zone treatment
    if (isNaN(date)) {
      // Fallback for cases where direct parsing fails, often needs Z suffix
      const fallbackDate = new Date(dateString + "T00:00:00Z");
      return fallbackDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Helper: Get Color based on BookingStatus Enum
  const getStatusColor = (status) => {
    // Note: The status from the backend will be uppercase string (e.g., "CONFIRMED")
    switch (status) {
      case "CONFIRMED":
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#4ade80" };
      case "PENDING":
        return { bg: "rgba(234, 179, 8, 0.1)", text: "#facc15" };
      case "CANCELLED":
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#f87171" };
      default:
        return { bg: "rgba(100, 116, 139, 0.2)", text: "#94a3b8" };
    }
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleInputChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editForm.name || editForm.name.trim().length < 2)
      newErrors.name = "Name too short";
    if (!editForm.dateOfBirth) newErrors.dateOfBirth = "Date required";
    if (!editForm.gender) newErrors.gender = "Gender required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      await updateProfile({
        name: editForm.name,
        dateOfBirth: editForm.dateOfBirth,
        gender: editForm.gender,
      });
      const refreshed = await getCurrentUser();
      dispatch(setUser(refreshed.data));
      setUserData(refreshed.data);
      setToastOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!userData || !editForm) return null;

  // --- STYLES ---
  const inputStyles = {
    "& .MuiInputLabel-root": { color: "#aaa" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#333" },
      "&:hover fieldset": { borderColor: "#555" },
      "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
      color: "white",
      backgroundColor: "rgba(255,255,255,0.03)",
    },
    "& .MuiSvgIcon-root": { color: "white" },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#a3a3a3",
      color: "#a3a3a3",
      opacity: 1,
    },
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "#0f0f11",
            color: "white",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0px 20px 50px rgba(0,0,0,0.7)",
            backgroundImage: "none",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <DialogTitle className="p-0 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Account Settings
          </DialogTitle>
          <IconButton
            onClick={onClose}
            sx={{ color: "gray", "&:hover": { color: "white" } }}
          >
            <X size={24} />
          </IconButton>
        </div>

        <DialogContent className="p-0">
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 border-r border-gray-800 p-4 bg-white/5">
              <div className="flex flex-col items-center mb-8 mt-4">
                <div className="relative">
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "transparent",
                      border: "2px solid #60a5fa",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {getInitials(userData.name)}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full cursor-pointer hover:bg-blue-400 transition">
                    <Camera size={14} color="white" />
                  </div>
                </div>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  className="mt-3 text-white"
                >
                  {userData.name}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-400 block truncate w-full text-center px-2"
                >
                  {userData.email}
                </Typography>
              </div>

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTab-root": {
                    color: "gray",
                    alignItems: "start",
                    textTransform: "none",
                    fontSize: "1rem",
                    minHeight: "48px",
                  },
                  "& .Mui-selected": {
                    color: "#60a5fa !important",
                    fontWeight: "bold",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#60a5fa",
                    width: "3px",
                  },
                }}
              >
                <Tab label="Profile Details" />
                <Tab label="My Bookings" />
              </Tabs>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* TAB 0: PROFILE */}
              {activeTab === 0 && (
                <div className="space-y-6 animate-fadeIn">
                  <Typography variant="h6" className="text-gray-200 mb-4">
                    Personal Information
                  </Typography>
                  <div className="grid grid-cols-1 gap-6">
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={editForm.name}
                      error={!!errors.name}
                      helperText={errors.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      sx={inputStyles}
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <TextField
                        fullWidth
                        type="date"
                        label="Date of Birth"
                        value={editForm.dateOfBirth}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        sx={inputStyles}
                      />
                      <FormControl fullWidth sx={inputStyles}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={editForm.gender}
                          label="Gender"
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          MenuProps={{
                            PaperProps: {
                              sx: { bgcolor: "#1a1a1a", color: "white" },
                            },
                          }}
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                          <MenuItem value="OTHER">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <TextField
                      fullWidth
                      value={editForm.email}
                      label="Email Address"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          color: "#a3a3a3",
                          "&.Mui-disabled": { color: "#a3a3a3" },
                        },
                      }}
                      sx={inputStyles}
                    />
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={loading}
                      sx={{
                        background: "linear-gradient(45deg, #2563eb, #60a5fa)",
                        textTransform: "none",
                        padding: "8px 32px",
                        borderRadius: "8px",
                      }}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 1: BOOKINGS */}
              {activeTab === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <Typography variant="h6" className="text-gray-200 mb-4">
                    Booking History
                  </Typography>

                  {bookingsLoading ? (
                    <div className="flex justify-center mt-10">
                      <CircularProgress sx={{ color: "#60a5fa" }} />
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                      No bookings found.
                    </div>
                  ) : (
                    bookings.map((booking) => {
                      const statusStyle = getStatusColor(booking.status);
                      return (
                        <Paper
                          key={booking.id}
                          elevation={0}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.03)",
                            border: "1px solid #333",
                            borderRadius: "12px",
                            overflow: "hidden",
                            display: "flex",
                            transition: "all 0.2s",
                            "&:hover": {
                              borderColor: "#555",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          {/* Image */}
                          <img
                            src={booking.image}
                            alt={booking.hotelName}
                            className="w-24 h-auto object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/200?text=No+Image";
                            }} // Fallback if image URL is bad
                          />

                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  className="text-white"
                                >
                                  {booking.hotelName}
                                </Typography>
                                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                                  <MapPin size={12} /> {booking.location}
                                </div>
                              </div>
                              <Chip
                                label={booking.status}
                                size="small"
                                sx={{
                                  bgcolor: statusStyle.bg,
                                  color: statusStyle.text,
                                  fontWeight: "bold",
                                  borderRadius: "6px",
                                }}
                              />
                            </div>

                            <div className="flex justify-between items-end mt-3">
                              <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                  <Calendar size={14} /> {booking.dates}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                  <Users size={14} /> {booking.guests} Guests
                                </div>
                              </div>
                              <Typography
                                variant="body2"
                                className="text-blue-400 font-semibold"
                              >
                                ₹{booking.price?.toFixed(2) || "0.00"}
                              </Typography>
                            </div>
                          </div>
                        </Paper>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        message="Profile updated successfully"
        ContentProps={{
          sx: { bgcolor: "#10b981", color: "white", fontWeight: "bold" },
        }}
      />
    </>
  );
}

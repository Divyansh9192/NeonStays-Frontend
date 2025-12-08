import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
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
  useMediaQuery,
  useTheme,
  Box,
  CircularProgress,
  Badge,
} from "@mui/material";
import {
  Camera,
  X,
  Calendar,
  MapPin,
  Users,
  User,
  CreditCard,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { getCurrentUser, updateProfile } from "../api/auth";
import api from "../api/axios";

// --- Custom Styles & Animation Constants ---
const GLASS_STYLE = {
  background: "rgba(17, 25, 40, 0.75)",
  backdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.125)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
};

const INPUT_STYLES = {
  "& .MuiOutlinedInput-root": {
    color: "#e2e8f0",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": {
      borderColor: "#818cf8", // Indigo-400
      boxShadow: "0 0 0 4px rgba(129, 140, 248, 0.1)",
    },
  },
  "& .MuiInputLabel-root": { color: "#94a3b8" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#818cf8" },
  "& .MuiSvgIcon-root": { color: "#94a3b8" },
};

export default function ProfilePopup({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile?.data) {
      setUserData(profile.data);
      setEditForm(profile.data);
    }
  }, [open, profile]);

  useEffect(() => {
    if (activeTab === 1 && open) fetchBookings();
  }, [activeTab, open]);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const response = await api.get("/users/bookings");
      const mappedBookings = response?.data?.data.map((b) => ({
        id: b.id,
        hotelName: b.hotel?.name || "Hotel Booking",
        location:
          b.hotel?.hotelContactInfo?.location || b.hotel?.city || "Unknown",
        image:
          b.hotel?.photos?.[0] ||
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=300",
        dates: `${formatDateShort(b.checkInDate)} - ${formatDateShort(
          b.checkOutDate
        )}`,
        status: b.bookingStatus,
        price: b.amount,
        guests: b.guests?.length || b.roomsCount,
      }));
      setBookings(mappedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) {
      const fallbackDate = new Date(dateString + "T00:00:00Z");
      return fallbackDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return {
          bg: "rgba(16, 185, 129, 0.15)",
          text: "#34d399",
          border: "rgba(16, 185, 129, 0.2)",
        };
      case "PENDING":
        return {
          bg: "rgba(245, 158, 11, 0.15)",
          text: "#fbbf24",
          border: "rgba(245, 158, 11, 0.2)",
        };
      case "CANCELLED":
        return {
          bg: "rgba(239, 68, 68, 0.15)",
          text: "#f87171",
          border: "rgba(239, 68, 68, 0.2)",
        };
      default:
        return {
          bg: "rgba(148, 163, 184, 0.15)",
          text: "#94a3b8",
          border: "rgba(148, 163, 184, 0.2)",
        };
    }
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

  const handleSave = async () => {
    if (!editForm.name || !editForm.dateOfBirth) {
      setErrors({ name: "Required", dateOfBirth: "Required" });
      return;
    }
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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!userData || !editForm) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile} // Fullscreen on mobile for better UX
        PaperProps={{
          style: {
            ...GLASS_STYLE,
            borderRadius: isMobile ? 0 : "24px",
            overflow: "hidden",
            backgroundImage: "none",
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <div className="flex flex-col h-full md:h-[600px] md:flex-row">
          {/* --- SIDEBAR (Desktop) / TOPBAR (Mobile) --- */}
          <div className="w-full md:w-[280px] bg-black/20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
            
            {/* Header / Close Button */}
            <div className="p-4 flex justify-between md:justify-end items-center">
               <Typography variant="h6" className="md:hidden font-bold text-white pl-2">
                  My Profile
               </Typography>
              <IconButton
                onClick={onClose}
                className="hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X size={20} />
              </IconButton>
            </div>

            {/* Profile Summary */}
            <div className="flex flex-col items-center px-6 pb-6 pt-2">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <div className="bg-indigo-500 p-1.5 rounded-full border-4 border-[#1a1f2e] cursor-pointer hover:bg-indigo-400 transition shadow-lg">
                    <Camera size={14} className="text-white" />
                  </div>
                }
              >
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    border: "2px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {getInitials(userData.name)}
                </Avatar>
              </Badge>
              <Typography variant="h6" className="mt-4 font-bold text-white tracking-wide">
                {userData.name}
              </Typography>
              <Typography variant="caption" className="text-gray-400 font-medium">
                {userData.email}
              </Typography>
              <div className="mt-4 flex gap-2">
                <Chip 
                    label="Traveler" 
                    size="small" 
                    sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }} 
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="md:flex-1 md:py-4 overflow-x-auto md:overflow-visible no-scrollbar">
              <Tabs
                orientation={isMobile ? "horizontal" : "vertical"}
                value={activeTab}
                onChange={(e, val) => setActiveTab(val)}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={false}
                sx={{
                  "& .MuiTabs-indicator": {
                    left: 0,
                    width: isMobile ? "0px" : "3px", // Hide indicator on mobile, standard on desktop
                    backgroundColor: "#818cf8",
                    borderRadius: "0 4px 4px 0",
                  },
                  "& .MuiTab-root": {
                    color: "#94a3b8",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    justifyContent: isMobile ? "center" : "flex-start",
                    padding: isMobile ? "12px 16px" : "16px 32px",
                    minHeight: "48px",
                    gap: "12px",
                    transition: "all 0.2s",
                    "&.Mui-selected": {
                      color: "white",
                      background: isMobile ? "transparent" : "linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent)",
                    },
                    "&:hover": {
                      color: "#e2e8f0",
                      background: "rgba(255,255,255,0.03)",
                    },
                  },
                }}
              >
                <Tab icon={<User size={18} />} iconPosition="start" label="Personal Info" />
                <Tab icon={<Briefcase size={18} />} iconPosition="start" label="My Bookings" />
              </Tabs>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="flex-1 bg-gradient-to-br from-[#111] to-[#0d0d0d] relative overflow-hidden">
             {/* Subtle Glow Effect in background */}
             <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="h-full overflow-y-auto p-6 md:p-10 custom-scrollbar">
              
              {/* TAB 0: PROFILE FORM */}
              {activeTab === 0 && (
                <div className="max-w-lg mx-auto space-y-8 animate-fade-in-up">
                  <div className="mb-6">
                    <Typography variant="h5" className="text-white font-bold mb-1">
                      Personal Details
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Update your personal information and profile settings.
                    </Typography>
                  </div>

                  <div className="space-y-5">
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={editForm.name || ""}
                      error={!!errors.name}
                      helperText={errors.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      sx={INPUT_STYLES}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <TextField
                        fullWidth
                        type="date"
                        label="Date of Birth"
                        value={editForm.dateOfBirth || ""}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                        sx={INPUT_STYLES}
                      />
                      <FormControl fullWidth sx={INPUT_STYLES}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={editForm.gender || ""}
                          label="Gender"
                          onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                          MenuProps={{
                             PaperProps: { sx: { bgcolor: "#1e293b", color: "white" } }
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
                      label="Email Address"
                      value={editForm.email || ""}
                      disabled
                      sx={{
                          ...INPUT_STYLES,
                          "& .MuiInputBase-input.Mui-disabled": { 
                              WebkitTextFillColor: "#64748b",
                              cursor: "not-allowed" 
                          }
                      }}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={loading}
                      sx={{
                        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        padding: "10px 32px",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
                        "&:hover": {
                           boxShadow: "0 6px 20px rgba(124, 58, 237, 0.5)",
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 1: BOOKINGS */}
              {activeTab === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                        <Typography variant="h5" className="text-white font-bold mb-1">
                        My Bookings
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                        Manage your upcoming and past stays.
                        </Typography>
                    </div>
                  </div>

                  {bookingsLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <CircularProgress sx={{ color: "#818cf8" }} />
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-800 rounded-2xl bg-white/5">
                      <Briefcase size={48} className="text-gray-600 mb-3" />
                      <Typography className="text-gray-400">No bookings found</Typography>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {bookings.map((booking) => {
                        const style = getStatusColor(booking.status);
                        return (
                          <div
                            key={booking.id}
                            className="group relative bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:bg-white/[0.07] flex flex-col sm:flex-row"
                          >
                            {/* Image Section */}
                            <div className="sm:w-32 h-32 sm:h-auto relative overflow-hidden">
                                <img
                                    src={booking.image}
                                    alt={booking.hotelName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:hidden" />
                            </div>

                            {/* Content Section */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">
                                            {booking.hotelName}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                                            <MapPin size={12} /> {booking.location}
                                        </div>
                                    </div>
                                    <span
                                        className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider border"
                                        style={{
                                            backgroundColor: style.bg,
                                            color: style.text,
                                            borderColor: style.border
                                        }}
                                    >
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between mt-3 sm:mt-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-400">
                                        <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded">
                                            <Calendar size={12} className="text-indigo-400" />
                                            {booking.dates}
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded">
                                            <Users size={12} className="text-indigo-400" />
                                            {booking.guests} Guests
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500 mb-0.5">Total Amount</div>
                                        <div className="text-lg font-bold text-white">
                                            ₹{booking.price?.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Hover Arrow (Desktop) */}
                            <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-8 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-black/50 to-transparent">
                                <ChevronRight size={20} className="text-white" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message="Profile updated successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            background: "linear-gradient(to right, #059669, #10b981)",
            color: "white",
            fontWeight: 600,
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}
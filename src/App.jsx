// src/App.jsx
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageWrapper from "./components/PageWrapper";
import useAutoLogin from "./hooks/useAutoLogin";
import GoogleCallback from "./pages/GoogleCallback";
import OAuthSuccess from "./pages/OAuthSuccess";
import Signup from "./pages/Signup";
import RoomsPageWrapper from "./components/RoomPageWrapper";
import HotelDetails from "./pages/HotelDetails";
import AboutPage from "./pages/AboutUs";
import ExperiencePage from "./pages/Experience";
import Payments from "./pages/Payments";
import AddGuests from "./pages/AddGuests";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import JoinHost from "./pages/Owner/JoinHost";
import Dashboard from "./pages/Owner/DashBoard";
import ProtectedOwnerRoute from "./components/ProtectedOwnerRouter";
import MyHotels from "./pages/Owner/MyHotels";
import HotelForm from "./pages/Owner/HotelForm";
import HotelBookings from "./pages/Owner/HotelBookings";
import HotelReports from "./pages/Owner/HotelReports";
import OwnerLayout from "./pages/Owner/OwnerLayout";
import RoomsList from "./pages/rooms/RoomsList";
import RoomForm from "./pages/rooms/RoomForm";
import RoomDetails from "./pages/rooms/RoomDetails";
import InventoryManager from "./pages/InventoryManager";

export default function App() {
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const isOAuthSuccessPath = location.pathname.startsWith("/oauth/success");
  const loading = useAutoLogin();
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {!isOwnerPath && !isOAuthSuccessPath && <Navbar />}

      <div className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/google/callback"
              element={
                <PageWrapper>
                  <GoogleCallback />
                </PageWrapper>
              }
            />
            <Route
              path="/join-host"
              element={
                <PageWrapper>
                  <JoinHost />
                </PageWrapper>
              }
            />
            <Route
              path="/experience"
              element={
                <PageWrapper>
                  <ExperiencePage />
                </PageWrapper>
              }
            />
            <Route path="/owner" element={<ProtectedOwnerRoute />}>
              <Route element={<OwnerLayout />}>
                {/* ⭐ ROOM ROUTES ⭐ */}
                <Route
                  path="hotels/:hotelId/rooms"
                  element={
                    <PageWrapper>
                      <RoomsList />
                    </PageWrapper>
                  }
                />

                <Route
                  path="hotels/:hotelId/rooms/new"
                  element={
                    <PageWrapper>
                      <RoomForm />
                    </PageWrapper>
                  }
                />

                <Route
                  path="hotels/:hotelId/rooms/:roomId"
                  element={
                    <PageWrapper>
                      <RoomDetails />
                    </PageWrapper>
                  }
                /><Route
                  path="hotels/:hotelId/rooms/:roomId/inventory"
                  element={
                    <PageWrapper>
                      <InventoryManager />
                    </PageWrapper>
                  }
                />

                <Route
                  path="hotels/:hotelId/rooms/:roomId/edit"
                  element={
                    <PageWrapper>
                      <RoomForm />
                    </PageWrapper>
                  }
                />

                <Route
                  path="dashboard"
                  element={
                    <PageWrapper>
                      <Dashboard />
                    </PageWrapper>
                  }
                />
                <Route
                  path="hotels"
                  element={
                    <PageWrapper>
                      <MyHotels />
                    </PageWrapper>
                  }
                />
                <Route
                  path="hotels/new"
                  element={
                    <PageWrapper>
                      <HotelForm />
                    </PageWrapper>
                  }
                />
                <Route
                  path="hotels/:hotelId/edit"
                  element={
                    <PageWrapper>
                      <HotelForm />
                    </PageWrapper>
                  }
                />
                <Route
                  path="hotels/:hotelId/bookings"
                  element={
                    <PageWrapper>
                      <HotelBookings />
                    </PageWrapper>
                  }
                />
                <Route
                  path="hotels/:hotelId/reports"
                  element={
                    <PageWrapper>
                      <HotelReports />
                    </PageWrapper>
                  }
                />
              </Route>
            </Route>

            <Route
              path="/hotelinfo/:hotelId"
              element={
                <PageWrapper>
                  <HotelDetails />
                </PageWrapper>
              }
            />
            <Route
              path="/aboutus"
              element={
                <PageWrapper>
                  <AboutPage />
                </PageWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <PageWrapper>
                  <Signup />
                </PageWrapper>
              }
            />
            <Route
              path="/rooms"
              element={
                <PageWrapper>
                  <RoomsPageWrapper />
                </PageWrapper>
              }
            />
            <Route
              path="/addguests/:bookingId"
              element={
                <PageWrapper>
                  <AddGuests />
                </PageWrapper>
              }
            />
            <Route path="/payments/:bookingId" element={<Payments />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailed />} />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/oauth/success"
              element={
                <PageWrapper>
                  <OAuthSuccess />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <div style={{ color: "white", padding: "50px" }}>
                  ROUTER WORKING
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
